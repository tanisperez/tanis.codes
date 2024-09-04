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

Firstly, we need to buy or rent a DNS for our site. I strongly recommend you [namecheap](https://www.namecheap.com/) because of the low prices and great support (I do not have any kind of deal with them).

Then, we will create a free account on [Cloudflare](https://cloudflare.com/).

## Creating a website on Cloudflare

In the section `Websites` we will click on `+ Add domain` button.

![Add your website or application to Cloudflare](/images/deploy-hugo-website-to-cloudflare/add-site.png)

![Select free plan](/images/deploy-hugo-website-to-cloudflare/select-free-plan.png)

![Pending nameserver update](/images/deploy-hugo-website-to-cloudflare/pending-nameserver-update.png)

![Update your nameservers](/images/deploy-hugo-website-to-cloudflare/update-your-nameservers.png)

![Configure custom DNS on namecheap](/images/deploy-hugo-website-to-cloudflare/namecheap-custom-dns.png)

![Check nameservers now](/images/deploy-hugo-website-to-cloudflare/check-nameservers-now.png)

After clicking the button `Check nameservers now`, it will display the following message.

![Checking nameservers](/images/deploy-hugo-website-to-cloudflare/checking-nameservers.png)

According to Cloudflare, it could take a few hours for an update. In my experience, I did this process twice and it took 15 minutes.

While you wait for the nameserver update, you can check the default DNS records.

![Default DNS records](/images/deploy-hugo-website-to-cloudflare/default-dns-records.png)

After a few minutes, our DNS setup will be ready.

![DNS setup is ready](/images/deploy-hugo-website-to-cloudflare/dns-ready.png)

## Manage workers

After having our DNS setup complete, we will have to create our static Cloudflare Page. Under the section `Workers & Pages` we will click on the button `Manager workers`.

![Workers routes](/images/deploy-hugo-website-to-cloudflare/workers-routes.png)

![Add page worker](/images/deploy-hugo-website-to-cloudflare/add-page-worker.png)

![Select your repository](/images/deploy-hugo-website-to-cloudflare/select-your-repository.png)

![Build settings](/images/deploy-hugo-website-to-cloudflare/build-settings.png)

![Project successfully deployed](/images/deploy-hugo-website-to-cloudflare/project-deployed.png)

## Configure custom domain

Our project is successfully deployed globally, we could access our website through the Cloudflare Pages provided URL. In my case, the URL is `tanis-codes.pages.dev`.

![Configure custom domain](/images/deploy-hugo-website-to-cloudflare/configure-custom-domain.png)

![Confirm new DNS record](/images/deploy-hugo-website-to-cloudflare/confirm-new-dns-record.png)

![Verifying custom domain](/images/deploy-hugo-website-to-cloudflare/verifying-custom-domain.png)

![Custom DNS active](/images/deploy-hugo-website-to-cloudflare/custom-dns-active.png)

Our site is ready! We will need to flush our local DNS records to be able to reach our website.

On MacOS this could be done by typing the following command on the terminal.

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

## Add www DNS record

![Add www DNS record](/images/deploy-hugo-website-to-cloudflare/add-www-record.png)

![DNS management records](/images/deploy-hugo-website-to-cloudflare/dns-management-records.png)


## References
* Namecheap guide: https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-a-cloudflare-account/
* Cloudflare nameservers: https://developers.cloudflare.com/dns/nameservers