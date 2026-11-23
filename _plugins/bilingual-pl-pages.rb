# frozen_string_literal: true

# Every post with `bilingual: true` (and `title-pl`) gets a second URL at /pl + the post URL: the same
# source file rendered through the post layout with <html lang="pl"> and the Polish title, and the Polish
# section selected first (js/post-language-switch.js defaults to #polski when <html lang="pl">). The
# English URL keeps its anchors (#english/#polski links are already shared); the switch's "Polski" link
# on it now points at the /pl/ URL. Both heads carry hreflang en/pl/x-default (_includes/head.html),
# the /pl/ pages are listed in sitemap.xml, and the feed stays untouched (it lists site.posts only).
# scripts/check-bilingual guards the invariants in CI.
class BilingualPlPagesGenerator < Jekyll::Generator
  def generate(site)
    site.posts.docs.each do |post|
      next unless post.data["bilingual"]

      pl_url = "/pl#{post.url}"
      page = Jekyll::PageWithoutAFile.new(site, site.source, File.dirname(pl_url), File.basename(pl_url))
      page.data["layout"] = "post"
      page.data["section-type"] = "post"
      page.data["title"] = post.data["title-pl"]
      page.data["title-en"] = post.data["title"]
      page.data["category"] = post.data["category"]
      page.data["tags"] = post.data["tags"]
      page.data["date"] = post.date
      page.data["bilingual"] = true
      page.data["lang"] = "pl"
      page.data["pl_page"] = true
      page.data["en_url"] = post.url
      page.content = post.content
      site.pages << page
      post.data["pl_url"] = pl_url
    end
  end
end
