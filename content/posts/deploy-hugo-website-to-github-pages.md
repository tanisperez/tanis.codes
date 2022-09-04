---
title: "Deploy Hugo website to GitHub Pages"
date: 2022-09-04T12:22:00+02:00
draft: false
toc: false
image: "/images/deploy-hugo-website-to-github-pages/logo.png"
tags:
  - git
  - github
  - github-actions
  - github-pages
  - hugo
---
GitHub Pages allows us to deploy and serve static websites for free. We need a GitHub Action to build our Hugo site and publish it on GitHub Pages.

This is a example workflow action used in [tanis.codes](https://tanis.codes) to deploy this blog in GitHub Pages. You can check out the last version from [here](https://github.com/tanisperez/tanis.codes/blob/main/.github/workflows/pages.yml).

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

This workflow has 2 jobs that perform the following actions:
* Check out the source code from the **main** branch.
* Set up the last version of Hugo.
* Build the blog using the command `hugo --minify`. In my case I have 2 `config.toml`, so for production environment I use the file `config-pro.toml`.
* Deploy the `./public` folder with all the generated static files to GitHub Pages.

This workflow is executed on every commit or it can be executed manually from the GitHub Actions page.

![Manual deploy from GitHub Pages](/images/deploy-hugo-website-to-github-pages/manual-deploy.png#center)

Finally, you can access your website through the url `https://<username>.github.io/<repository>`. In my case, it will be the url `https://tanisperez.github.io/tanis.codes`.

## Usage limits

These are some usage limits for the free plan of GitHub Pages.
* GitHub Pages source repositories have a recommended limit of 1 GB. For more information, see ["What is my disk quota?"](https://docs.github.com/es/articles/what-is-my-disk-quota/#file-and-repository-size-limitations)
* Published GitHub Pages **sites may be no larger than 1 GB**.
* GitHub Pages sites have a soft **bandwidth limit of 100 GB per month**.
* GitHub Pages sites have a soft limit of 10 builds per hour. This limit does not apply if you build and publish your site with a custom GitHub Actions workflow.
* In order to provide consistent quality of service for all GitHub Pages sites, rate limits may apply. These rate limits are not intended to interfere with legitimate uses of GitHub Pages. If your request triggers rate limiting, you will receive an appropriate response with an HTTP status code of 429, along with an informative HTML body.

Check out the most updated terms in [GitHub Pages usage limits](https://docs.github.com/es/pages/getting-started-with-github-pages/about-github-pages#usage-limits).

## References

* Build a custom blog with Hugo: https://tanis.codes/posts/build-a-custom-blog-with-hugo/
* Hugo hosting on GitHub: https://gohugo.io/hosting-and-deployment/hosting-on-github/
* About GitHub Pages: https://docs.github.com/es/pages/getting-started-with-github-pages/about-github-pages
* GitHub Pages usage limits: https://docs.github.com/es/pages/getting-started-with-github-pages/about-github-pages#usage-limits