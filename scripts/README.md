install
  - Installs the gems pinned in Gemfile.lock into vendor/bundle (run once, and after Gemfile changes)

serve-production
  - Builds and serves your website in 127.0.0.1:4000

serve
  - Builds and serves your website without generating the Disqus comments and the Google Analytics code

newpost <slug>
  - Creates a new post under \_posts

generate-categories
  - Generate all the categories that are used in the \_posts

generate-tags
  - Generate all the tags that are used in the \_posts

check-preview <site-dir> <baseurl>
  - Guards a PR preview build (`JEKYLL_ENV=preview jekyll build --baseurl /preview/pr-N --destination _preview`): every link
  stays below the baseurl, every page is noindex, nothing refers to Disqus or Google Analytics. Run by CI.

publish-pages <gh-pages-checkout> site|preview|remove ...
  - Publishes a built site, a PR preview or the removal of a preview into a checkout of the gh-pages branch and pushes it,
  rebasing and retrying when another publish got in between. Run by CI with GITHUB_TOKEN, see AGENTS.md.

test-publish-pages
  - Tests publish-pages against a throwaway local repo (no network). Run by CI.

integrate-personal
  - Integrates the latest bug fixes and new features from personal-jekyll-theme repository.
  Make sure to read [this](https://github.com/PanosSakkos/personal-jekyll-theme/wiki/Integrating-latest-bug-fixes-and-features-into-your-past-fork) before using it.
  Outdated: upstream theme has been rewritten since this fork was made, running it will break the site.
