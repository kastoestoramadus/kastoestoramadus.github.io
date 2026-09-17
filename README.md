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

5. Push to `master` — GitHub Actions builds, checks and publishes the site.

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

* every push and pull request: generate tag/category pages, `jekyll build`, html-proofer,
* push to `master`: publishes `_site` to
  [kastoestoramadus/kastoestoramadus.github.io](https://github.com/kastoestoramadus/kastoestoramadus.github.io)
  (branch `master`), which GitHub Pages serves under `blog.ww86.eu`.

Publishing needs a deploy key once:

1. `ssh-keygen -t ed25519 -N "" -C "dev-blog-env deploy" -f deploy_key`
2. `kastoestoramadus.github.io` → Settings → Deploy keys → add `deploy_key.pub` with **write access**.
3. `dev-blog-env` → Settings → Secrets and variables → Actions → secret `PAGES_DEPLOY_KEY` = content of `deploy_key`.

Without the secret the workflow still builds and tests, and skips the deploy step.
Dependabot ([`.github/dependabot.yml`](.github/dependabot.yml)) opens monthly PRs with gem and action updates.

## Credits

Theme: [{ Personal }](https://github.com/PanosSakkos/personal-jekyll-theme) by Panos Sakkos (MIT), built on
[Grayscale](http://startbootstrap.com/template-overviews/grayscale/),
[Timeline](https://github.com/kirbyt/timeline-jekyll-theme),
[highlight.js](https://highlightjs.org/),
[RRSSB](https://github.com/kni-labs/rrssb),
[typed.js](https://github.com/mattboldt/typed.js/) and
[hammer.js](https://hammerjs.github.io/).
