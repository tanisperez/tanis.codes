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

Before generating SSH keys for GitHub, it is essential to verify that the email address matches the one associated with the GitHub account. This practice ensures proper key management and maintains consistency.

### Using Ed25519 (Recommended)
The Ed25519 algorithm represents the recommended choice for new SSH keys, offering enhanced security characteristics and superior performance:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Using RSA (Alternative)
For systems lacking Ed25519 support, RSA with 4096 bits provides a robust alternative:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### Key Generation Process
The key generation procedure involves the following steps:
1. Accept the default file location (`~/.ssh/id_ed25519` or `~/.ssh/id_rsa`). The standard path enables automatic key detection by SSH and Git systems. Custom locations require additional configuration in `~/.ssh/config`.
2. Enter a secure passphrase (strongly recommended).
3. Confirm the passphrase entry.

The process generates two distinct files:
- Private key: `~/.ssh/id_ed25519` (or `id_rsa`)
- Public key: `~/.ssh/id_ed25519.pub` (or `id_rsa.pub`)

> 🔒 **Security Note**: Never share the private key and always protect it with a strong passphrase.

![Generated SSH keys](/images/using-ssh-keys-with-git/generated-ssh-keys.png#center)


## Configure SSH Agent

The SSH agent functionality requires proper installation and configuration. To verify the installation status and operational state:

```bash
eval "$(ssh-agent -s)"
```

A successful execution will display: `Agent pid XXXX`, where XXXX represents the process identifier.

### Systemd Configuration

On systemd-based distributions, the SSH agent can be configured as a persistent service:

```bash
systemctl enable --now --user ssh-agent.service
```

### Alternative Configuration

For non-systemd environments, the SSH agent can be initialized through shell configuration files. Add the following command to `.zprofile` or the appropriate shell startup script:

```bash
eval "$(ssh-agent -s)"
```

### Key Registration

After configuring the SSH agent, register the private key:

```bash
ssh-add ~/.ssh/id_ed25519
```

To verify the registered keys:

```bash
ssh-add -l
```

## Add the public SSH key to GitHub

The registration of the public key in the GitHub account is required. This option is accessible through the following path: `Settings` > `SSH and GPG keys` in the GitHub profile interface.

![Add new SSH key to GitHub](/images/using-ssh-keys-with-git/add-new-ssh-key-to-github.png#center)

Select the `New SSH key` button and proceed to enter an identifiable label for the key along with the corresponding public key content.

![SSH key added](/images/using-ssh-keys-with-git/ssh-key-added.png#center)

Upon successful key registration, repository access can be configured either by modifying existing remotes or by performing a new clone operation using the SSH URL format.

![Git clone using SSH](/images/using-ssh-keys-with-git/git-clone-ssh.png#center)

```bash
git clone git@github.com:tanisperez/dotfiles.git
```

The implementation of this SSH URL format enables automatic authentication through the configured SSH key during repository operations.

## Configure different keys for hosts

`~/.ssh/config`

```txt
Host github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

# Enable the ssh-agent on Linux

```bash
systemctl enable --now --user ssh-agent.service
```

zshrc or bashrc

```bash
export SSH_AUTH_SOCK=$XDG_RUNTIME_DIR/ssh-agent.socket
```


## References

- [GitHub Docs: Generating a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [ArchWiki: SSH Keys](https://wiki.archlinux.org/title/SSH_keys#SSH_agents)
- [ArchWiki: KDE Wallet SSH Integration](https://wiki.archlinux.org/title/KDE_Wallet#Using_the_KDE_Wallet_to_store_ssh_key_passphrases)