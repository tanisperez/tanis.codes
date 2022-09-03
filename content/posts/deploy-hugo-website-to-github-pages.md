---
title: "Deploy Hugo website to GitHub Pages"
date: 2022-09-02T17:20:00+02:00
draft: true
toc: false
image: "/images/deploy-hugo-website-to-github-pages/logo.png"
tags:
  - git
  - github
  - github-actions
  - github-pages
---
GitHub Pages allows us to deploy and serve static websites for free. We need a GitHub Action to build our Hugo site and publish it on GitHub Pages.

This is a example workflow action used in [tanis.codes](https://tanis.codes) to deploy this blog in GitHub Pages. You can checkout the last version from [here](https://github.com/tanisperez/tanis.codes/blob/main/.github/workflows/pages.yml).

```yaml
name: Deploy tanis.codes on GitHub Pages

on:
  push:
    branches:
      - main  # Set a branch to deploy
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      - name: Build
        run: hugo --minify --config config-pro.toml
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```
Explanation:...
* Steps 
* 
*


# Advantages and limitations of GitHub Pages

## References

* Hugo hosting on GitHub: https://gohugo.io/hosting-and-deployment/hosting-on-github/