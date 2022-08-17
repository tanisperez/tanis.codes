---
title: "Build a custom blog with Hugo"
date: 2022-08-17T16:46:00+02:00
draft: false
toc: false
image: "/images/build-a-custom-blog-with-hugo/logo.png"
tags:
  - hugo
  - markdown
  - blog
---
[Hugo](https://gohugo.io/) is one of the fastest *static site generator* for building websites writen in [Go](https://en.wikipedia.org/wiki/Go_(programming_language)). It is a tool which combines a bunch of files and turns them into HTML, CSS and JavaScript files.

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

This will create a folder called `my-amazing-blog` which will contain the files and folders to generate your blog.

```bash
~/Dev/my-amazing-blog ❯ tree -L 1
.
├── archetypes
├── config.toml
├── content
├── data
├── layouts
├── public
├── resources
├── static
└── themes

8 directories, 1 file
```

Before you can see the blog though, you will need to add a theme.

## Add a theme

Hugo has a [great selection of themes](https://themes.gohugo.io/), we will use [paper](https://themes.gohugo.io/themes/hugo-paper/) in this tutorial. There are two ways to install a theme:
* Using git modules.
* Downloading the theme and unzip it.

I do not recommend using the git module way because every change made in the original theme, can break your working site. So, in this case, we will download the theme from [this url](https://github.com/nanxiaobei/hugo-paper/archive/refs/heads/main.zip) and we will unzip it in the folder `themes` of our project.

Here is what `my-amazing-blog` folder should look like:
```bash
~/Dev/my-amazing-blog ❯ tree -L 2
.
├── archetypes
│   └── default.md
├── config.toml
├── content
├── data
├── layouts
├── public
├── static
└── themes
    └── hugo-paper-main

8 directories, 2 files
```

We will rename the folder `hugo-paper-main` to just `paper`. Then, we have to edit the file `config.toml` to add the line `theme = 'paper'`. The file will look like this:

```text
baseURL = 'http://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = 'paper'
```

Now, we are ready to start our Hugo site with the command `hugo server -D`.

```bash
~/Dev/my-amazing-blog ❯ hugo server -D
Start building sites … 
hugo v0.101.0+extended darwin/amd64 BuildDate=unknown

                   | EN  
-------------------+-----
  Pages            |  7  
  Paginator pages  |  0  
  Non-page files   |  0  
  Static files     |  9  
  Processed images |  0  
  Aliases          |  3  
  Sitemaps         |  1  
  Cleaned          |  0  

Built in 9 ms
Watching for changes in /Users/tanis/Dev/my-amazing-blog/{archetypes,content,data,layouts,static,themes}
Watching for config changes in /Users/tanis/Dev/my-amazing-blog/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

The development server will be started with automatic reloading at the URL [http://localhost:1313/](http://localhost:1313/).

![Paper dark theme](/images/build-a-custom-blog-with-hugo/dark-paper-theme.png#center)

This is what will look like if you have the dark mode enabled in your computer.

## Add a page

You can create a new page from the command line or creating a new markdown file inside the folder `content/posts`.

```bash
hugo new posts/my-first-post.md   
```

![My first post](/images/build-a-custom-blog-with-hugo/my-first-post.png#center)

If we click the title `My First Post` it will redirect us to the URL `/posts/my-first-post/` with an empty post. 

We can edit the file `content/posts/my-first-post.md` to see the changes instantly.

![My first post with content](/images/build-a-custom-blog-with-hugo/my-first-post-with-content.png#center)

## What is next?
Here are some tips and recommendations.

### Build the production site
When your site is ready, you should build the optimized static files using the command:
```
hugo --minify
```

It will generate the folder `public/` with all the HTML, CSS and JavaScript files. These files can be deployed in a web server.

### Draft posts
Every post has a tag `draft: true` at the begining of the markdown files. If you build the production site, the posts will not be shown unless you change this parameter to `false`.

## References

* Hugo official page: https://gohugo.io/
* Installation guide: https://gohugo.io/getting-started/installing/
* Configure Hugo: https://gohugo.io/getting-started/configuration/
* tanis.codes source code: https://github.com/tanisperez/tanis.codes
* Paper theme: https://github.com/nanxiaobei/hugo-paper