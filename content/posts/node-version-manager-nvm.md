---
title: "Node Version Manager (NVM)"
date: 2025-03-20T11:37:00+01:00
draft: true
toc: false
image: "/images/node-version-manager-nvm/logo.png"
description: "A comprehensive guide to implementing a silent and elegant boot process in Arch Linux using Plymouth and GRUB silent"
tags:
  - node
  - javascript
---

Node Version Manager (NVM) is a specialized command-line utility for managing multiple [node.js](https://nodejs.org/en/) versions. This tool operates on a per-user basis and integrates with POSIX-compliant shells (including bash, zsh, sh, dash, and ksh). NVM provides comprehensive support across Unix-based systems, macOS, and Windows Subsystem for Linux (WSL).

## Installation

NVM can be installed or updated using an installation script. There are two recommended methods for downloading and executing this script:

### Using cURL
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

### Using wget
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

> **Important**: Since the NVM GitHub repository does not maintain a `latest` tag, it is recommended to visit the [releases page](https://github.com/nvm-sh/nvm/releases) to verify the most recent version before executing the installation commands. Replace `v0.40.2` in the commands with the current version number.

The installation script performs the following operations:
1. Clones the NVM repository to `~/.nvm`
2. Configures the shell environment by adding initialization code to the appropriate profile file:
   - `~/.bashrc`
   - `~/.bash_profile`
   - `~/.zshrc`
   - `~/.profile`

### Environment configuration

The following configuration is added to your shell profile:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Advanced configuration options

#### Custom installation parameters
The installation process can be customized using environment variables:
- `NVM_SOURCE`: Custom installation source.
- `NVM_DIR`: Alternative installation directory.
- `PROFILE`: Specific profile file location.
- `NODE_VERSION`: Default Node.js version.

#### Delayed Loading
To postpone NVM initialization until manual activation:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use # Loads NVM without activating default version
```

#### XDG Base Directory Support
If `$XDG_CONFIG_HOME` is defined, NVM will store its files in this location instead of the default directory.

#### Installation Without Profile Modification
To install NVM without modifying shell configuration:

```bash
PROFILE=/dev/null bash -c 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash'
```

> **Note**: Ensure that `NVM_DIR` does not contain a trailing slash when customizing the installation directory.


## Usage



## References

- NVM GitHub project: https://github.com/nvm-sh/nvm
