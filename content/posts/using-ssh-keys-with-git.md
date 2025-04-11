---
title: "Using SSH Keys with Git"
date: 2025-04-11T00:00:00+01:00
draft: false
toc: true
image: "/images/common/git.png"
description: "Learn how to set up and use SSH keys with Git for secure and convenient repository access. Step-by-step guide for key generation, configuration and best practices."
tags:
  - git
  - ssh
---

## What are SSH Keys?
Brief explanation of public-private key pairs and why they're more secure than passwords.

## Generating SSH Keys
* How to generate a new SSH key pair
* Choosing the right key type (ED25519 vs RSA)
* Setting a passphrase

## Adding SSH Keys to Your Git Provider
* How to copy your public key
* Adding keys to GitHub/GitLab/Bitbucket
* Testing your connection

## Configuring Git to Use SSH
* Changing remote URLs from HTTPS to SSH
* Setting up the SSH config file
* Handling multiple keys for different services

## Best Practices
* Key security tips
* Backing up your keys
* When to create new keys

## Troubleshooting Common Issues
* Permission denied errors
* Agent forwarding problems
* Key format issues


## References

- https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
- https://wiki.archlinux.org/title/SSH_keys#SSH_agents
- https://wiki.archlinux.org/title/KDE_Wallet#Using_the_KDE_Wallet_to_store_ssh_key_passphrases