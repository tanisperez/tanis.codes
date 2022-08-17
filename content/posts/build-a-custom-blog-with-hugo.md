---
title: "Build a custom blog with Hugo"
date: 2022-08-17T16:46:00+02:00
draft: true
toc: false
image: "/images/build-a-custom-blog-with-hugo/logo.png"
tags:
  - hugo
  - markdown
  - blog
---
[Hugo](https://gohugo.io/) is one of the most fastest *static site generator* for building websites writen in [Go](https://en.wikipedia.org/wiki/Go_(programming_language)). It is a tool which combines a bunch of files and turns them into HTML, CSS and JavaScript files.

The content for your site can be written in HTML, JavaScript or *markdown* files. It is very common to write blog posts or technical documentation using Hugo and markdown files.

**This blog** is made with Hugo based on the theme [hello-friend-ng](https://github.com/rhazdon/hugo-theme-hello-friend-ng), some custom HTML, CSS, JavaScript and the posts are made in markdown. You can check out the code [here](https://github.com/tanisperez/tanis.codes).

## Why you should use it?
There are many benefits from using Hugo instead of a CMS like WordPress.
* Fully and easy customizable with minimal web knowledge.
* The content is usually written in markdown.
* Lots of free themes availables.
* You can deploy it for free in some hostings like GitHub Pages.

## Installation

On [the Hugo website](https://gohugo.io/getting-started/installing/) there’s a big list of all the ways you can install it.

If you are using a debian based Linux or WSL, you can install hugo using the following command:

```bash
sudo apt-get install hugo
```

On Mac OS X you can install it using the command **brew**:

```bash
brew install hugo
```

## Creating a new site

From the command line, type this command:

```bash
hugo new site my-amazing-blog
```

![Hugo new site](/images/build-a-custom-blog-with-hugo/hugo-new-site.png#center)

This will create a folder called `my-amazing-blog` which contains the files and folders that will generate your blog. Before you can see the blog though, you will need to add a theme.

## Add a theme

Hugo has a [great selection of themes](https://themes.gohugo.io/), we will use ... in this tutorial.


## References

* Hugo official page: https://gohugo.io/
* Installation guide: https://gohugo.io/getting-started/installing/
* tanis.codes source code: https://github.com/tanisperez/tanis.codes
