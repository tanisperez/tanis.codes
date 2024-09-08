---
title: "Deploy a Hugo website to Cloudflare"
date: 2024-09-08T14:51:14+01:00
draft: false
toc: false
image: "/images/deploy-hugo-website-to-cloudflare/logo.png"
description: "Cloudflare allow us to deploy and serve static websites for free using a GitHub or GitLab repository. Each commit will trigger an automatic build process on Cloudflare."
tags:
  - git
  - cloudflare
  - hugo
---

Cloudflare is one of the leading [Content Delivery Network (CDN)](https://en.wikipedia.org/wiki/Content_delivery_network) providers on the Internet. In addition to its CDN services, Cloudflare offers a comprehensive suite of solutions, including cloud cybersecurity, DDoS mitigation, Wide Area Network (WAN) services, and Domain Name System (DNS) management.

Their [free plan](https://www.cloudflare.com/plans/) offers the following features:
* **Unlimited bandwidth for static files with low latency**.
* **Unlimited DDoS protection**.
* **Universal SSL Certificate**. 
* Intuitive dashboard with detailed insights and analytics.
* 500 build minutes per month, with a maximum timeout of 20 minutes per build.
* Support for up to 100 custom domains.
* Projects can contain up to 20,000 files.
* A maximum file size of 25 MiB per asset for Cloudflare Pages sites.

Review the **latest limits for Cloudflare Pages** [here](https://developers.cloudflare.com/pages/platform/limits/).

First, we need to purchase or rent a domain name for our site. I highly recommend using [Namecheap](https://www.namecheap.com/) due to their affordable prices and excellent customer support (note: I have no affiliation with them).

Next, we will create a free account on [Cloudflare](https://cloudflare.com/).

## Creating a website on Cloudflare

In the `Websites` section, click the `+ Add domain` button. Enter your domain name, then click `Continue`.

![Add your website or application to Cloudflare](/images/deploy-hugo-website-to-cloudflare/add-site.png)

Next, select the free plan and click `Continue`.

![Select free plan](/images/deploy-hugo-website-to-cloudflare/select-free-plan.png)

Your website will now be in the `Pending Nameserver Update` state.

![Pending nameserver update](/images/deploy-hugo-website-to-cloudflare/pending-nameserver-update.png)

Cloudflare assigns unique nameservers to each website. In my case, the nameservers are `coraline.ns.cloudflare.com` and `kareem.ns.cloudflare.com`.

The next step is to configure these nameservers with your DNS provider, where you purchased or rented your domain name.

![Update your nameservers](/images/deploy-hugo-website-to-cloudflare/update-your-nameservers.png)

If you purchased your domain through a different DNS provider, refer to the instructions from both your provider and Cloudflare. In this guide, we'll be following the steps for Namecheap.

In the `Domain List` section, select your domain and navigate to `Nameservers`. Change the setting to `Custom DNS`, then enter the Cloudflare nameservers assigned to you. 

Do not forget to click on the ✅ button to save the changes.

![Configure custom DNS on namecheap](/images/deploy-hugo-website-to-cloudflare/namecheap-custom-dns.png)

Cloudflare will periodically check for nameserver updates, but it may be forced by clicking `Check nameservers now`.

![Check nameservers now](/images/deploy-hugo-website-to-cloudflare/check-nameservers-now.png)

Once triggered, the following message will be displayed:

![Checking nameservers](/images/deploy-hugo-website-to-cloudflare/checking-nameservers.png)

According to Cloudflare, it may take a few hours for the update to complete. However, based on my experience, it usually takes around 15 minutes.

While waiting for the nameserver update, you can review the default DNS records, though no action is required at this point.

![Default DNS records](/images/deploy-hugo-website-to-cloudflare/default-dns-records.png)

After a short while, your website and DNS configuration will be ready.

![DNS setup is ready](/images/deploy-hugo-website-to-cloudflare/dns-ready.png)

## Configuring the pipeline and building the project

Once the DNS configuration complete, the next step is to create your static Cloudflare Page. In the `Workers & Pages` section, click the `Manager workers` button.

![Workers routes](/images/deploy-hugo-website-to-cloudflare/workers-routes.png)

Next, click `Connect to Git` button to import an existing Git repository from GitHub or GitLab.

![Add page worker](/images/deploy-hugo-website-to-cloudflare/add-page-worker.png)

Select the account and the repository to be built and deployed on Cloudflare Pages.

![Select your repository](/images/deploy-hugo-website-to-cloudflare/select-your-repository.png)

Finally, choose the Framework preset and enter the build command. In my case, this blog is made with Hugo and this is the build command for production.

```bash
hugo --minify --config config-pro.toml
```

![Build settings](/images/deploy-hugo-website-to-cloudflare/build-settings.png)

Once completed, your website will be deployed globally!

At this point, Cloudflare will provide a Cloudflare Pages URL to access your project. In my case, the URL will be `tanis-codes.pages.dev`. 

Each commit will trigger an automatic build process on Cloudflare.

![Project successfully deployed](/images/deploy-hugo-website-to-cloudflare/project-deployed.png)

## Configure a custom domain for your website

After completing the previous steps, we will configure the purchased DNS to access our website. To do this, navigate to the `Workers & Pages` section, select your page, and go to the `Custom Domains` tab.

Next, we will add our custom domain. In this instance, the domain is `tanis.codes`. Once the domain is entered, click the `Continue` button to proceed.

![Configure custom domain](/images/deploy-hugo-website-to-cloudflare/configure-custom-domain.png)

Cloudflare will add a new `CNAME` DNS record, ensuring that the `tanis.codes` domain resolves to `tanis-codes.pages.dev`. Next, click the `Activate domain` button.

Once the update is complete, visitors will be able to access the website by navigating to `https://tanis.codes`.

![Confirm new DNS record](/images/deploy-hugo-website-to-cloudflare/confirm-new-dns-record.png)

The new `CNAME` DNS record is being set, and this process may take some time. According to Cloudflare, it can take up to 48 hours for DNS records to fully update. However, in my experience, it typically completes within a few minutes.

![Verifying custom domain](/images/deploy-hugo-website-to-cloudflare/verifying-custom-domain.png)

Our site is now ready! To ensure you can access the website, you may need to flush your local DNS cache.

On macOS, this can be done by entering the following command in the terminal.

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

![Custom DNS active](/images/deploy-hugo-website-to-cloudflare/custom-dns-active.png)

## Add the www DNS record

For SEO purposes, it's beneficial to make the website accessible with `www.` before the domain. This can be configured in the `DNS > Records` section.

In this section, add a new `CNAME` record with `www` as the name and `tanis-codes.pages.dev` as the target. Set the proxy status to **DNS only**. This ensures that requests are routed to Render, allowing them to verify the domain and issue a certificate.

Finally, click the `Save` button.

![Add www DNS record](/images/deploy-hugo-website-to-cloudflare/add-www-record.png)

The DNS record will be added, but it may take some time for the changes to propagate globally. You might need to flush your local DNS cache to see the updates.

![DNS management records](/images/deploy-hugo-website-to-cloudflare/dns-management-records.png)

## References

* Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
* Namecheap guide: https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-a-cloudflare-account/
* Cloudflare nameservers: https://developers.cloudflare.com/dns/nameservers