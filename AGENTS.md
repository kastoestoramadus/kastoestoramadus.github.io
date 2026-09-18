# AGENTS.md

Guide for AI coding agents working in this repository. **Keep it up to date**: whenever you change the
build, deployment, dependencies, conventions or discover a new gotcha, update this file in the same change.

## What this is

Source of Waldemar Wosiński's personal IT blog, published at https://blog.ww86.eu.
Static site: Jekyll 4.4 + an old (≈2016) fork of the `{ Personal }` theme (Bootstrap 3, jQuery).
Content language: English. No application code, no test suite beyond the build and html-proofer.

## Deployment pipeline

```
this repo, branch master (ruleset "Protect master": PR required, `build` check must pass, no direct/force push)
  ├─ .github/workflows/deploy.yml
  │    job build    (the required check; read-only token, this is where all the PR's code runs)
  │                 generate tag/category pages → jekyll build (JEKYLL_ENV=production) → htmlproofer
  │                 PRs also: jekyll build --baseurl /preview/pr-N (JEKYLL_ENV=preview) → check-preview + htmlproofer
  │                 → upload-artifact `site` (master) / `preview` (PRs)
  │    job publish  (master only, contents: write)         scripts/publish-pages site       → root of gh-pages
  │    job preview  (PRs from this repo, contents: write)  scripts/publish-pages preview N  → gh-pages preview/pr-N/
  └─ .github/workflows/preview-cleanup.yml (PR closed)     scripts/publish-pages remove N   → deletes preview/pr-N/
       → branch gh-pages: built HTML only, plus `.nojekyll` and `CNAME`
          → GitHub Pages, "deploy from a branch" (gh-pages, /), custom domain blog.ww86.eu
             → https://blog.ww86.eu/                  production
             → https://blog.ww86.eu/preview/pr-<N>/  one preview per open PR
```

Agents cannot push to `master`: work on a branch and open a PR (`gh pr create -R <owner>/<repo>` — this repo is a
fork of PanosSakkos/personal-jekyll-theme, without `-R` gh targets the upstream theme). `gh pr edit` fails on this repo
(Projects classic deprecation error): use `gh api -X PATCH repos/<owner>/<repo>/pulls/<N> -f title=...`. The PR's
`.head.sha` lags a push by up to a minute: poll until it equals the local HEAD before merging, or the squash merge
silently drops the newest commit.

Rules of the pipeline:
- Only `GITHUB_TOKEN`: no secrets, no deploy keys (the owner rejected one), never `pull_request_target` (it runs
  untrusted code with a write token). `contents: write` sits on the jobs `publish`, `preview` and `cleanup` only, never
  at workflow level. The job `build` and the plain `pull_request` trigger of `deploy.yml` are what the ruleset requires:
  do not rename or change them (that is why the cleanup on close is a separate workflow).
- Previews exist only for PRs from this repo, not for forks and not for Dependabot: their token is read-only. A preview
  is live about a minute after the job (Pages has to build the branch) and disappears when the PR is closed.
- A preview is the same site with another baseurl, and `JEKYLL_ENV=preview` instead of `production`. Everything that
  must not happen there is gated on `production`: no Disqus (its thread ids come from the page URL, previews would
  create junk threads), no Google Analytics, no force-https (Pages enforces https anyway). Previews carry
  `<meta name="robots" content="noindex, nofollow">` and `robots.txt` (on master) disallows `/preview/`.
  `_plugins/prefix-site-relative-urls.rb` prefixes the links that ignore baseurl (post images, the RSS icon) — without it
  a preview shows production's images, or broken ones for images that only exist in the PR. `scripts/check-preview`
  fails the build on a link outside the baseurl, a page without noindex, or a trace of Disqus/GA; html-proofer cannot
  see the first one (it resolves `/img/x.png` against the build root, where it exists).
- `gh-pages` is written by the workflows only, never by hand. It is an orphan branch of built output; a master publish
  replaces everything in the root except `preview/`, a preview publish touches only its `preview/pr-N/`.
  `CNAME` and `.nojekyll` must be in the root: `publish-pages` refuses a site without `CNAME` (the custom domain would
  drop) and re-creates `.nojekyll`. Recreating it from scratch (drops all previews, open PRs get theirs back on their
  next push):
  ```bash
  TZ=UTC JEKYLL_ENV=production bundle exec jekyll build    # TZ=UTC: see the feed.xml gotcha below
  tmp=$(mktemp -d) && cp -a _site/. "$tmp" && touch "$tmp/.nojekyll" && cd "$tmp"
  git init -q -b gh-pages && git add -A && git commit -qm "Recreate gh-pages" \
    && git remote add origin git@github.com:kastoestoramadus/kastoestoramadus.github.io.git \
    && git push --force origin gh-pages
  ```
- Concurrency: each publishing job has its own group per target (`pages-publish-master`, `pages-preview-pr-N`; the
  cleanup workflow shares the group of its PR). Not one shared group: a group holds one running and one *pending* job,
  and a newer pending job cancels the older one, so a preview publish could silently cancel a queued master publish.
  Races between groups are settled by the fetch-rebase-retry in `scripts/publish-pages`, which cannot conflict because
  the jobs touch disjoint paths. `scripts/test-publish-pages` tests the script against a throwaway bare repo, including
  a forced push race; CI runs it in `build`, because the script only runs for real after the merge.

History that matters:
- Until Jan 2020 Travis CI (`.travis.yml`, travis-ci.org, now defunct) pushed the *source tree* to the old
  Pages repo (now `kastoestoramadus.github.io-legacy`) and GitHub Pages' own Jekyll 3 build rendered it.
- Dec 2020 – Jan 2023 posts were added directly in that old Pages repo via the GitHub web editor.
  They were synced back here on 2026-09-15 (3 posts, `img/breath.png`, tag pages, `CNAME`).
- Sept 2026: the owner rejected a deploy key. To publish without secrets the repos were renamed: this source repo
  (formerly `dev-blog-env`, a fork of the theme) became `kastoestoramadus.github.io` — the user site with the custom
  domain blog.ww86.eu — and the old Pages repo became `kastoestoramadus.github.io-legacy` (Pages disabled, archived).
  `site.url` https://kastoestoramadus.github.io keeps redirecting to blog.ww86.eu because the user site owns the custom
  domain. At first it was published by `actions/deploy-pages` (Pages build type "workflow").
- 2026-09-18: switched to branch-based Pages (source `gh-pages`, `/`) to get public previews of PRs; `deploy-pages` is
  gone. The theme-era `gh-pages` branch (525 commits up to 2019-12-26, 21 of them exist nowhere else: web-editor edits)
  was renamed `gh-pages-legacy` and a fresh orphan `gh-pages` started. Delete `gh-pages-legacy` once nobody wants it.

## Layout

| Path | Purpose |
|------|---------|
| `_posts/YYYY-MM-DD-slug.md` | Blog posts (URL: `/:category/:year/:month/:day/:slug.html`) |
| `_config.yml` | Site settings, theme switches, share buttons, timeline, plugins |
| `_layouts/`, `_includes/` | Theme templates (`index` = one-page home built from `about/latest-post/timeline/contact.html`) |
| `_includes/head.html`, `_includes/js.html`, `_includes/syntax-highlight.html` | All CDN assets (pinned versions + SRI) |
| `css/*.scss`, `_sass/` | Styles (Dart Sass via jekyll-sass-converter 3) |
| `js/` | Vendored jQuery plugins: typed.js v1 (jQuery API), rrssb, hammer; `highlight-hocon.js` (own HOCON grammar for highlight.js) |
| `tags/<tag>.html`, `categories/<cat>.html` | Stub pages, one per tag/category; **must exist** or links 404 |
| `blog/index.html` | Paginated archive (jekyll-paginate v1, 9 per page) |
| `img/` | Images referenced from posts |
| `_plugins/prefix-site-relative-urls.rb` | Prefixes links that ignore `baseurl` with it; a no-op unless building a preview |
| `scripts/` | `install`, `serve*`, `newpost`, `generate-tags`, `generate-categories`, `check-preview`, `publish-pages`, `test-publish-pages` (`integrate-personal` is obsolete) |
| `CNAME` | `blog.ww86.eu`, copied into `_site` and from there to the root of `gh-pages` |
| `robots.txt` | Disallows `/preview/` |

## Commands

```shell
./scripts/install                       # bundle config path vendor/bundle + bundle install
./scripts/serve                         # dev server on 127.0.0.1:4000
./scripts/newpost <slug>                # new post skeleton dated today
./scripts/generate-categories && ./scripts/generate-tags
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external --ignore-missing-alt --ignore-empty-alt --no-enforce-https

./scripts/test-publish-pages            # the deploy script against a local bare repo, 1 second

# the PR preview, as CI builds and checks it
JEKYLL_ENV=preview bundle exec jekyll build --baseurl /preview/pr-9 --destination _preview
./scripts/check-preview _preview /preview/pr-9
bundle exec htmlproofer ./_preview --swap-urls '^/preview/pr-9:' --ignore-urls '/#disqus_thread$/' --disable-external --ignore-missing-alt --ignore-empty-alt --no-enforce-https
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
  highlight.js has no HOCON grammar: our `js/highlight-hocon.js` registers ` ```hocon ` / ` ```conf ` (loaded in
  `_includes/js.html` before `hljs.highlightAll()`). Code blocks scroll horizontally instead of wrapping (`css/grayscale.scss`).
  ` ```shell ` means an interactive session (lines starting with `$`); plain commands should use ` ```bash `.
- Tables in posts: kramdown table with `{: .table}` inside `<div class="table-responsive" markdown="1">` (on phones the
  table scrolls, not the page); `{: .table-winner}` highlights the first data column.
- Technical claims and code samples are run for real before publishing (scala-cli + JDK work locally) and outputs are
  pasted verbatim. Backdated posts must not mention anything newer than their date (e.g. library versions).
- Images in posts: `![alt](/img/file.png)` with a meaningful alt text; site-relative URLs (site `baseurl` is empty; previews
  get theirs prefixed by `_plugins/prefix-site-relative-urls.rb`). Templates must still emit `{{site.baseurl}}` themselves.
- Anything that must not run in previews (trackers, comments, redirects) is gated on `jekyll.environment == "production"`.
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
- On a 390px phone viewport every post is ~15px wider than the screen because of the rrssb share buttons (pre-existing);
  compare `scrollWidth` against master rather than expecting 390.
- `_includes/force-https.html` redirects to https unless the host starts with `127.0.0.1` — for local/browser tests
  serve on `127.0.0.1`, not `localhost`. Disqus comment counts only load on blog.ww86.eu, so "N COMMENTS" shows as
  "COMMENTS" locally (shifts text in screenshots).
- Posts have a date but no time, so `feed.xml` (`pubDate`) and `sitemap.xml` (`lastmod`) carry the UTC offset of the build
  machine: `+0000` in CI, `+0200` in the owner's WSL. URLs and GUIDs are the same, but changed `pubDate`s may make feed
  readers treat items as new. CI is the source of truth; never publish a locally built site to `gh-pages` unless it
  was built with `TZ=UTC` (then it is byte-identical to CI's).
- `/preview/` is reserved for PR previews (`publish-pages` refuses a site that has that path): no category, permalink or
  page may live there. Production must stay byte-identical when the preview machinery changes: build `_site` before and
  after and `diff -r` the two (only `robots.txt` was added when previews came in).
- `robots.txt` keeps crawlers from fetching previews, so they never see the `noindex` meta either; a preview URL that is
  posted publicly could still show up as a bare link. Share preview links with people, not with the web.
- Branch-based Pages rebuilds after every push to `gh-pages` (each publish, preview or not), also when `github-actions`
  pushes with `GITHUB_TOKEN` (verified: no extra step, the build takes about 30 s), and has a soft limit of 10 builds per
  hour, which the Actions-based `deploy-pages` did not have. A burst of pushes to a PR can delay its preview.
  Changing the Pages *source* setting does not build the branch as it is: request a build with
  `gh api -X POST repos/<owner>/<repo>/pages/builds` (that is what the switch on 2026-09-18 needed; the live site kept
  serving the old deployment meanwhile, no downtime).
- Every publish adds a commit to `gh-pages`; identical files are stored once, but the history only grows (the site
  limit is 1 GB, previews of open PRs count towards it). Squash it by recreating the branch (recipe above) if it ever matters.
- Verified on 2026-09-15 (Jekyll 4.4 build vs. the live Jekyll 3 GitHub Pages site, HTML diff + screenshots): differences
  are only the copyright year (`site.time`), CSS minification formatting, the removed Google+ share button and code
  blocks without Rouge wrappers (highlight.js 11 adds padding; auto-detected colors in blocks without a language differ slightly).
