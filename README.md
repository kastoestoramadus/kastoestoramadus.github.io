# { IT blog - Waldemar Wosiński }

Source of [blog.ww86.eu](https://blog.ww86.eu), built with Jekyll 4 on a fork of the
[{ Personal } Jekyll Theme](https://github.com/PanosSakkos/personal-jekyll-theme).

## Writing a post

1. Create the file (or add `_posts/YYYY-MM-DD-slug.md` straight in the GitHub web editor):

   ```shell
   ./scripts/newpost my-new-post
   ```

2. Fill in the front matter — `title`, `category` and `tags` (lowercase):

   ```yaml
   ---
   layout: post
   section-type: post
   title: My new post
   category: dev
   tags: [ 'scala', 'hardware' ]
   ---
   ```

3. Images go to `img/` and are referenced as `![description](/img/file.png)`.
   Code blocks are fenced with a language, e.g. ` ```scala `.
4. Generate pages for new tags/categories and commit them together with the post:

   ```shell
   ./scripts/generate-categories && ./scripts/generate-tags
   ```

5. Open a pull request to `master`. When the `build` check is green, merge it — GitHub Actions publishes the site.

## Running locally

Requires Ruby >= 3.2 with bundler (e.g. `sudo apt install ruby-full build-essential`).

```shell
./scripts/install            # once: gems into vendor/bundle
./scripts/serve              # http://127.0.0.1:4000, auto-rebuild, no Disqus/analytics
./scripts/serve-production   # same as the published site
```

The same checks as CI:

```shell
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external --ignore-missing-alt --ignore-empty-alt --no-enforce-https
```

## CI/CD

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (replaces the former Travis CI setup):

* every pull request: generate tag/category pages, `jekyll build`, html-proofer - the `build` check,
* every commit on `master`: the same build, then GitHub Pages of this repository publishes `_site`
  to https://blog.ww86.eu. No secrets or deploy keys are involved.

`master` is protected by a ruleset: changes land only through pull requests with a green `build` check,
direct and force pushes are rejected. In the GitHub web editor choose *Create a new branch for this commit and
start a pull request*.

Dependabot ([`.github/dependabot.yml`](.github/dependabot.yml)) opens monthly PRs with gem and action updates.

## Credits

Theme: [{ Personal }](https://github.com/PanosSakkos/personal-jekyll-theme) by Panos Sakkos (MIT), built on
[Grayscale](http://startbootstrap.com/template-overviews/grayscale/),
[Timeline](https://github.com/kirbyt/timeline-jekyll-theme),
[highlight.js](https://highlightjs.org/),
[RRSSB](https://github.com/kni-labs/rrssb),
[typed.js](https://github.com/mattboldt/typed.js/) and
[hammer.js](https://hammerjs.github.io/).
