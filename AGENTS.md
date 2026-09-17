# AGENTS.md

Guide for AI coding agents working in this repository. **Keep it up to date**: whenever you change the
build, deployment, dependencies, conventions or discover a new gotcha, update this file in the same change.

## What this is

Source of Waldemar Wosiński's personal IT blog, published at https://blog.ww86.eu.
Static site: Jekyll 4.4 + an old (≈2016) fork of the `{ Personal }` theme (Bootstrap 3, jQuery).
Content language: English. No application code, no test suite beyond the build and html-proofer.

## Deployment pipeline

```
dev-blog-env (this repo, master)
  └─ GitHub Actions .github/workflows/deploy.yml
       generate tag/category pages → jekyll build (JEKYLL_ENV=production) → htmlproofer
       └─ on push to master, if secret PAGES_DEPLOY_KEY exists:
          peaceiris/actions-gh-pages pushes _site/ (+CNAME, .nojekyll)
          → kastoestoramadus/kastoestoramadus.github.io, branch master
          → GitHub Pages serves it at blog.ww86.eu (custom domain configured on that repo)
```

History that matters:
- Until Jan 2020 Travis CI (`.travis.yml`, travis-ci.org, now defunct) pushed the *source tree* to the
  github.io repo and GitHub Pages' own Jekyll 3 build rendered it.
- Dec 2020 – Jan 2023 posts were added directly in the github.io repo via the GitHub web editor.
  They were synced back here on 2026-09-15 (3 posts, `img/breath.png`, tag pages, `CNAME`).
- The Actions deploy **replaces** the github.io repo content with built HTML. Before enabling or
  running a deploy, check that repo for commits newer than the last deploy and port them here first.
- This repo also has an old `gh-pages` branch with Pages enabled (blog.ww86.eu/dev-blog-env/) — legacy, unused.

## Layout

| Path | Purpose |
|------|---------|
| `_posts/YYYY-MM-DD-slug.md` | Blog posts (URL: `/:category/:year/:month/:day/:slug.html`) |
| `_config.yml` | Site settings, theme switches, share buttons, timeline, plugins |
| `_layouts/`, `_includes/` | Theme templates (`index` = one-page home built from `about/latest-post/timeline/contact.html`) |
| `_includes/head.html`, `_includes/js.html`, `_includes/syntax-highlight.html` | All CDN assets (pinned versions + SRI) |
| `css/*.scss`, `_sass/` | Styles (Dart Sass via jekyll-sass-converter 3) |
| `js/` | Vendored jQuery plugins: typed.js v1 (jQuery API), rrssb, hammer |
| `tags/<tag>.html`, `categories/<cat>.html` | Stub pages, one per tag/category; **must exist** or links 404 |
| `blog/index.html` | Paginated archive (jekyll-paginate v1, 9 per page) |
| `img/` | Images referenced from posts |
| `scripts/` | `install`, `serve*`, `newpost`, `generate-tags`, `generate-categories` (`integrate-personal` is obsolete) |
| `CNAME` | `blog.ww86.eu`, copied into `_site` |

## Commands

```shell
./scripts/install                       # bundle config path vendor/bundle + bundle install
./scripts/serve                         # dev server on 127.0.0.1:4000
./scripts/newpost <slug>                # new post skeleton dated today
./scripts/generate-categories && ./scripts/generate-tags
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external --ignore-missing-alt --ignore-empty-alt --no-enforce-https
```

Versions: CI uses Ruby 4.0 (`ruby/setup-ruby`), local system Ruby 3.2 also works. `Gemfile.lock` is
multi-platform and `BUNDLED WITH` bundler 4.x. Dependabot bumps gems and actions monthly.

## Conventions

- Post front matter: `layout: post`, `section-type: post`, `title`, `category` (lowercase, one), `tags` (lowercase list).
- After adding a new tag/category, run the generators and commit the new stub pages (CI also generates them, but
  committed pages keep local builds and html-proofer consistent).
- Code blocks: fenced with a language (` ```scala `, ` ```bash `). Rouge is disabled in `_config.yml`; highlight.js 11
  highlights client-side on post pages. The cdnjs core bundle has only common languages — Scala is loaded as an extra
  module in `_includes/js.html`; add other missing ones the same way (`languages/<lang>.min.js` + SRI).
  highlight.js has no HOCON grammar: ` ```hocon ` / ` ```conf ` are registered as aliases of `ini` in `_includes/js.html`.
  ` ```shell ` means an interactive session (lines starting with `$`); plain commands should use ` ```bash `.
- Images in posts: `![alt](/img/file.png)` with a meaningful alt text; site-relative URLs (site `baseurl` is empty).
- Keep the theme's look: this is a conservative fork, not the rewritten upstream theme (v10+). Migrating to
  upstream was attempted once and abandoned.

### Editorial style (unified 2026-09-17)
- English, British spelling (colour, favourite, licence), first person, informal author's voice (`;)` is fine).
  Fix language, keep the author's opinions and facts.
- Front matter order: `layout`, `section-type`, `title`, `category`, [`permalink`], `tags`. No `date:` (the file name has it).
- Titles in sentence case without quotes. Section headings are `##` (`###` below) — the post title is the only H1.
- Categories are a closed set: `apps`, `dev`, `hardware`, `life`, `os`. Every post has at least one tag.
- **URLs must never change** (Disqus threads and RSS GUIDs are keyed by URL). The default permalink contains the
  category, so when a post moves to another category, pin its old URL with `permalink:` (see the ZIO2, Optane and
  "more cores" posts). Compare the list of generated `.html` files before/after any content refactoring.
- Every fenced code block has a language (`plaintext` for output/tables). Internal links to posts use `{% post_url %}`
  (not available in `about.html`/`contact.html`, which are rendered via `markdownify` — use plain paths there).
- Site-wide texts (header lines, timeline, author blurb, description) live in `_config.yml`; keep them consistent with
  `about.html` and the owner's GitHub profile (Scala & Big Data engineer, Warsaw, 15+ years, banking/fintech/public sector).

## Gotchas

- `site.url` is `https://kastoestoramadus.github.io` (redirects to blog.ww86.eu). Changing it changes RSS item GUIDs
  and would re-announce every post in feed readers.
- Liquid can't read config keys starting with a digit via dot syntax: use `site['404-img']`.
- Category pages match `post.category == page.title` case-sensitively (post with `category: APPS` is not listed on `apps`).
- Bootstrap 3.4.1 supports jQuery ≤ 3.x only — do not bump jQuery to 4. When bumping any CDN asset, update its `integrity` hash
  (cdnjs API: `https://api.cdnjs.com/libraries/<lib>/<version>?fields=sri`).
- `google-tracking-id` is a Universal Analytics id (UA sunset in 2023, collects nothing); GA4 would need a new `G-` id and gtag snippet.
- Sass prints deprecation warnings for `darken()` / global built-ins in `css/grayscale.scss`; harmless until Dart Sass 3.
- The owner develops in WSL2 (default NAT networking). `./scripts/serve` binds 127.0.0.1:4000 inside WSL and is reachable
  from the Windows browser at the same URL thanks to WSL localhost forwarding — no 0.0.0.0 / port proxy needed.
- `_includes/force-https.html` redirects to https unless the host starts with `127.0.0.1` — for local/browser tests
  serve on `127.0.0.1`, not `localhost`. Disqus comment counts only load on blog.ww86.eu, so "N COMMENTS" shows as
  "COMMENTS" locally (shifts text in screenshots).
- Verified on 2026-09-15 (Jekyll 4.4 build vs. the live Jekyll 3 GitHub Pages site, HTML diff + screenshots): differences
  are only the copyright year (`site.time`), CSS minification formatting, the removed Google+ share button and code
  blocks without Rouge wrappers (highlight.js 11 adds padding; auto-detected colors in blocks without a language differ slightly).
