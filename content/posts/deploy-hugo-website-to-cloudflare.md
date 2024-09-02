---
title: "Deploy Hugo website to Cloudflare"
date: 2024-08-27T14:09:14+01:00
draft: true
toc: false
image: "/images/deploy-hugo-website-to-cloudflare/logo.png"
description: "Cloudflare allow us to deploy and serve static websites for free using a GitHub repository. Each commit will trigger an automatic build process on Cloudflare."
tags:
  - git
  - cloudflare
  - hugo
---

Cloudflare allows us to deploy and serve static websites for free. We need to configure our GitHub or GitLab project in Cloudflare Pages.

Firstly, we need to buy or rent a DNS for our site. I strongly recommend you [namecheap](https://www.namecheap.com/) because of the low prices and support (I do not have any kind of deal with them).

Then, we will create a free account on [Cloudflare](https://cloudflare.com/).

## Creating a website on Cloudflare

![Add your website or application to Cloudflare](/images/deploy-hugo-website-to-cloudflare/add-site.png)


## References
* Namecheap guide: https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-a-cloudflare-account/
* Cloudflare nameservers: https://developers.cloudflare.com/dns/nameservers