# frozen_string_literal: true

require 'cgi'
require 'json'

module PreviewBuild
  def self.metadata
    @metadata ||= begin
      event_path = ENV['GITHUB_EVENT_PATH']
      event = event_path && File.file?(event_path) ? JSON.parse(File.read(event_path)) : {}
      {
        revision: ENV['PREVIEW_REVISION'] || event.dig('pull_request', 'head', 'sha') || 'local',
        repository: ENV['PREVIEW_REPOSITORY'] || event.dig('repository', 'full_name') || '',
        run: ENV['PREVIEW_BUILD'] || "#{ENV.fetch('GITHUB_RUN_ID', 'local')}-#{ENV.fetch('GITHUB_RUN_ATTEMPT', '1')}"
      }
    end
  end
end

# Pages does not accept custom Cache-Control headers. Only preview builds get
# versioned local URLs and a freshness check; production output stays identical.
class PreviewStatusScript < Jekyll::Generator
  def generate(site)
    return unless Jekyll.env == 'preview'

    page = Jekyll::PageWithoutAFile.new(site, site.source, '', 'preview-status.js')
    page.content = File.read(File.join(site.source, '_includes', 'preview-status.js'))
    page.data['layout'] = nil
    site.pages << page
  end
end

Jekyll::Hooks.register %i[pages documents], :post_render do |doc|
  next unless Jekyll.env == 'preview'

  baseurl = doc.site.config['baseurl'].to_s
  pr = baseurl[%r{\A/preview/pr-(\d+)\z}, 1]
  next unless pr

  metadata = PreviewBuild.metadata
  revision = metadata[:revision]
  build = "#{revision}-#{metadata[:run]}"
  repository = metadata[:repository]
  version = CGI.escape(build)
  if doc.output_ext == '.css'
    doc.output = doc.output.gsub(/url\((["']?)([^\s)"']+)\1\)/) do
      quote, url = Regexp.last_match.captures
      next Regexp.last_match(0) if url.match?(%r{\A(?:[a-z]+:|//|#)}i)

      path, fragment = url.split('#', 2)
      separator = path.include?('?') ? '&' : '?'
      "url(#{quote}#{path}#{separator}preview=#{version}#{fragment ? "##{fragment}" : ''}#{quote})"
    end
    next
  end
  next unless doc.output_ext == '.html' && doc.output.include?('</head>')
  # Includes navigation links, scripts, stylesheets and images. External CDN
  # dependencies keep their normal caching policy.
  doc.output = doc.output.gsub(/(\s(?:href|src)=)(["'])(#{Regexp.escape(baseurl)}\/[^"']*)\2/) do
    prefix, quote, url = Regexp.last_match.captures
    path, fragment = url.split('#', 2)
    separator = path.include?('?') ? '&amp;' : '?'
    "#{prefix}#{quote}#{path}#{separator}preview=#{version}#{fragment ? "##{fragment}" : ''}#{quote}"
  end

  head = <<~HTML
    <meta name="preview-build" content="#{CGI.escapeHTML(build)}">
    <style>
    body { padding-bottom: 90px; }
    #preview-status { position: fixed; bottom: 0; left: 0; right: 0; z-index: 10000; padding: 10px 16px; background: #222; color: #fff; border-top: 1px solid #00cdff; font: 14px/1.5 Arial, sans-serif; display: flex; flex-wrap: wrap; gap: 6px 16px; align-items: center; }
    #preview-status a, #preview-status button { color: #00cdff; }
    #preview-status button { background: transparent; border: 1px solid #00cdff; padding: 4px 10px; }
    </style>
    <script defer src="#{baseurl}/preview-status.js?preview=#{version}"></script>
  HTML
  badge = <<~HTML
    <aside id="preview-status" aria-label="Pull request preview" data-revision="#{CGI.escapeHTML(revision)}" data-repository="#{CGI.escapeHTML(repository)}" data-pr="#{pr}">
      <span>Preview PR ##{pr} · revision #{CGI.escapeHTML(revision[0, 7])}</span>
      <span id="preview-freshness" role="status">Freshness not checked (JavaScript required).</span>
      <button type="button" id="preview-refresh" hidden>Refresh preview</button>
    </aside>
  HTML
  doc.output = doc.output.sub('</head>', "#{head}</head>").sub('</body>', "#{badge}</body>")
end
