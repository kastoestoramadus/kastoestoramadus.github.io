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

integrate-personal
  - Integrates the latest bug fixes and new features from personal-jekyll-theme repository.
  Make sure to read [this](https://github.com/PanosSakkos/personal-jekyll-theme/wiki/Integrating-latest-bug-fixes-and-features-into-your-past-fork) before using it.
  Outdated: upstream theme has been rewritten since this fork was made, running it will break the site.
