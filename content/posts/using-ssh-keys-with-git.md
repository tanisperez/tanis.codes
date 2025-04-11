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

## Generate a new SSH key for GitHub

Before generating SSH keys for GitHub, ensure you use the same email address associated with your GitHub account. This maintains consistency and helps with key management.

### Using Ed25519 (Recommended)
The Ed25519 algorithm is the recommended choice for new SSH keys due to its enhanced security and performance:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Using RSA (Alternative)
For systems that don't support Ed25519, use RSA with 4096 bits:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

During the key generation process:
1. Accept the default file location (`~/.ssh/id_ed25519` or `~/.ssh/id_rsa`). Using the default file location allows SSH and Git to automatically detect and use your keys. If you specify a custom location, additional configuration will be required in `~/.ssh/config` to explicitly map each host to its corresponding key file.
2. Enter a secure passphrase (highly recommended).
3. Verify your passphrase.

The process will generate two files:
- Private key: `~/.ssh/id_ed25519` (or `id_rsa`)
- Public key: `~/.ssh/id_ed25519.pub` (or `id_rsa.pub`)

> 🔒 **Security Note**: Never share your private key and always protect it with a strong passphrase.

![Generated SSH keys](/images/using-ssh-keys-with-git/generated-ssh-keys.png#center)


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


## Configure different keys for hosts

`~/.ssh/config`

```
Host github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

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