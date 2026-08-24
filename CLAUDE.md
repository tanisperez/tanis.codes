# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
make run      # Dev server with drafts enabled (config-local.toml, localhost)
make build    # Production build with minification (config-pro.toml)
make clean    # Delete public/ output directory
```

New post scaffold:

```bash
hugo new posts/my-post-title.md   # Uses archetypes/posts.md
```

## Visual testing

When verifying a change in the browser, **always check the mobile view before the desktop one** (~412 px wide). Most traffic and most layout regressions are there, and mobile-only failures are easy to miss from a desktop window — the PageSpeed responsive-images audit, for instance, fails on mobile (DPR 1.5) while passing on desktop (DPR 1).

Responsive behaviour is done in CSS only (media queries, flex, grid) — never by reading the window width from JS.

## Architecture

Hugo static site with fully custom layouts (no `themes/` directory). Two separate configs control the environment:

- `config-local.toml` — `baseURL = "http://localhost"`, `env = "local"`, no minification
- `config-pro.toml` — `baseURL = "https://tanis.codes"`, `env = "pro"`, CSS is minified + fingerprinted

### Layouts

All templates live in `layouts/`. The base template is `layouts/_default/baseof.html`. Partials are in `layouts/partials/`. Post-specific templates are in `layouts/posts/`.

### CSS pipeline

`layouts/partials/head.html` builds **two** stylesheets from `assets/css/`:

- **`style.css` (core)** — always loaded. 16 files concatenated in the order listed in the template, starting with `normalize.css` → `variables.css`. Theming variables (colors, fonts) live in `variables.css`.
- **`code.css` (Prism)** — `prism.css` + `prism-custom.css`, emitted **after** the core and only on pages whose rendered content contains `<pre`, i.e. only the posts that actually have code blocks. The `Concat` target must stay `css/code.css`; naming it `css/prism.css` would collide with the source asset of the same path.

Inline `code` styling lives in `main.css`, not in `prism.css`, so pages gated out of the Prism bundle still style inline code correctly.

In `pro` mode both bundles are minified and fingerprinted; in `local` mode only fingerprinted.

### JS

`layouts/partials/javascript.html` bundles `menu.js` + `search.js` into `bundle.js`, loaded with `defer` on every page.

`prism.js` (syntax highlighting) is **not** in that bundle: it is a standalone, self-initializing PrismJS build emitted as its own deferred script, under the same `<pre` gate as `code.css`. It is 33 KB, so keeping it off the ~94 pages without code blocks matters.

`assets/js/libs/fuse.min.js` is not bundled either — `search.js` fetches it on demand.

### Content

Posts go in `content/posts/` as Markdown. Front matter fields in use:

```yaml
title: ""
date: 2026-01-01T00:00:00+02:00
draft: false
toc: true           # Shows table of contents
image: "/images/common/something.png"
description: ""
tags:
  - arch linux
```

Post images are stored under `assets/images/`.

### Images

Images referenced from markdown (`![alt](/images/...)`) and the home thumbnails (`Params.image`) are processed by Hugo image processing rather than served as static files. `layouts/_default/_markup/render-image.html` is a render hook that converts each image to WebP (picking whichever is smaller between lossless and q82), generates a `srcset` for larger images, and preserves any `#center`/`#phone`/`#badge` fragment on the `src` (required by the CSS selectors in `assets/css/main.css`). It also republishes the original file at its historical URL via `$r.Publish`, so old, indexed `.png`/`.jpg` links keep resolving; this is meant to be kept for a few months, then removed.

`resources/` is Hugo's build cache for these processed images (and other resources). It is build output, not source — it must **not** be committed (already in `.gitignore`) and `make clean` must not delete it. Deleting it forces a full re-transcode on the next build (~1 min for this site).

### Search

Client-side search is powered by `assets/js/search.js` reading `layouts/index.json` (JSON output format enabled in both configs).

### Ads and consent

There is no in-repo consent system and no Google Analytics. The only third party is Google AdSense, injected from `layouts/partials/javascript.html` when `env = "pro"` and deferred until the first `scroll`/`pointerdown`/`keydown` or `requestIdleCallback` (3 s timeout).

No `<ins class="adsbygoogle">` blocks exist in the templates: **Auto Ads** is enabled dashboard-side and injects the units itself. The consent message shown to EEA/UK/Swiss visitors is managed by Google, not by this repo (see `content/privacy.md`).

### Security headers

`static/_headers` (Cloudflare Pages) carries the `Cache-Control` rules for fingerprinted assets and a two-layer CSP: an enforced one limited to directives AdSense does not use, plus a `Content-Security-Policy-Report-Only` that is the real target. The report-only policy is meant to be tightened by reading the console and then promoted to enforced — keep its allowlist in sync with what AdSense actually loads, since leftover violations surface in Lighthouse as `inspector-issues`.
