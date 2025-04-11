---
title: "Using SSH keys with Git"
date: 2025-04-11T00:00:00+01:00
draft: false
toc: true
image: "/images/common/git.png"
description: "Learn how to set up and use SSH keys with Git for secure and convenient repository access. Step-by-step guide for key generation, configuration and best practices."
tags:
  - git
  - ssh
---

SSH (Secure Shell) keys are cryptographic credentials that enable secure authentication between systems. They consist of two components: a public key that can be shared freely, and a private key that must be kept secure. When using Git with remote repositories, SSH keys provide a robust alternative to password-based authentication.

The authentication process works through public-key cryptography: your private key remains on your local machine, while the public key is stored on the remote Git server. When establishing a connection, the server uses the public key to create an encrypted message that only your private key can decrypt, thus verifying your identity without transmitting sensitive information.

This approach offers several advantages over traditional passwords:
- Enhanced security through cryptographic verification.
- No need to manually enter credentials.
- Protection against brute force attacks.
- Ability to revoke access by removing public keys.

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


# Enable the ssh-agent on Linux

```bash
systemctl enable --now --user ssh-agent.service
```

zshrc or bashrc

```
export SSH_AUTH_SOCK=$XDG_RUNTIME_DIR/ssh-agent.socket
```


## Troubleshooting Common Issues
* Permission denied errors
* Agent forwarding problems
* Key format issues


## References

- https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
- https://wiki.archlinux.org/title/SSH_keys#SSH_agents
- https://wiki.archlinux.org/title/KDE_Wallet#Using_the_KDE_Wallet_to_store_ssh_key_passphrases