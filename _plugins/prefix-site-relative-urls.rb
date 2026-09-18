# frozen_string_literal: true

# PR previews are served below a sub-path (`jekyll build --baseurl /preview/pr-N`, see AGENTS.md), but some
# links are site-relative and ignore the baseurl: post bodies (`![alt](/img/x.png)`, `<img src="/img/x.png">`)
# and config values printed as they are (`url: "/feed.xml"`). Left alone they resolve against the *production*
# site: an image that only exists in the PR is broken, one that already exists silently comes from production.
# So prefix them with the baseurl. Links that already carry it (everything the templates emit) are left alone;
# with an empty baseurl (production, ./scripts/serve) this does nothing, the output is byte-identical.
Jekyll::Hooks.register %i[pages documents], :post_render do |doc|
  baseurl = doc.site.config['baseurl'].to_s
  next if baseurl.empty? || doc.output_ext != '.html'

  prefixed = Regexp.escape(baseurl.delete_prefix('/'))
  site_relative = %r{(\s(?:href|src)=(["']))/(?!/|#{prefixed}(?:/|\2))}
  doc.output = doc.output.gsub(site_relative) { "#{Regexp.last_match(1)}#{baseurl}/" }
end
