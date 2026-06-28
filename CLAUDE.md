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

## Architecture

Hugo static site with fully custom layouts (no `themes/` directory). Two separate configs control the environment:

- `config-local.toml` — `baseURL = "http://localhost"`, `env = "local"`, no minification
- `config-pro.toml` — `baseURL = "https://tanis.codes"`, `env = "pro"`, CSS is minified + fingerprinted

### Layouts

All templates live in `layouts/`. The base template is `layouts/_default/baseof.html`. Partials are in `layouts/partials/`. Post-specific templates are in `layouts/posts/`.

### CSS pipeline

All CSS files in `assets/css/` are concatenated in a specific order defined in `layouts/partials/head.html`: `normalize.css` → `prism.css` → `variables.css` → remaining files. The result is served as a single `style.css`. Theming variables (colors, fonts) live in `variables.css`.

In `pro` mode the bundle is minified and fingerprinted; in `local` mode only fingerprinted.

### JS

`assets/js/` contains `menu.js`, `search.js`, and `prism.js` (syntax highlighting). They are bundled and fingerprinted via `layouts/partials/javascript.html`.

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

Post images are stored under `static/images/`.

### Search

Client-side search is powered by `assets/js/search.js` reading `layouts/index.json` (JSON output format enabled in both configs).

### Cookie consent

Controlled by `data/consent.yml` and rendered by `layouts/partials/consent.html`. Currently only Google Analytics is listed as a functional item.
