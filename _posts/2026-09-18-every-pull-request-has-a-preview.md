---
layout: post
section-type: post
title: Every pull request of this blog has a preview
category: dev
tags: [ 'opensource', 'productivity' ]
---

This article exists only to see a pull request preview working. If you are reading it on the blog itself, somebody merged the wrong pull request ;)

## What I wanted

Until now I saw a post only as it looked on my own laptop. I wanted a public URL for every pull request, before the merge, so I can open it on my phone and send it to a friend for a review.

![A pull request gets a preview, and only then is it merged](/img/preview-test.svg)

## How it works

The site is built twice: once as usual, and once with another `baseurl`. The second build is published under `/preview/pr-<N>/` and deleted again when the pull request is closed. Locally it is one command:

```bash
JEKYLL_ENV=preview bundle exec jekyll build --baseurl /preview/pr-42 --destination _preview
```

The picture above is the actual test. It exists only in this pull request, so it can load only if the site-relative `/img/...` link was rewritten to the preview's sub-path. Links to older posts have to stay inside the preview too, like this one: [There is no ideal OS for a programmer]({% post_url 2016-10-31-no-ideal-os-for-programmer %}).

## No comments, no tracking

A preview has no Disqus thread, no analytics and a `noindex` tag. It is a draft for me and my reviewers, not a second copy of the blog for search engines.
