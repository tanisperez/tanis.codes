---
title: "Node Version Manager (NVM)"
date: 2025-03-20T11:37:00+01:00
draft: true
toc: false
image: "/images/node-version-manager-nvm/logo.png"
description: "A comprehensive guide to installing and using Node Version Manager (NVM) for managing multiple Node.js versions"
tags:
  - node
  - javascript
---

Node Version Manager (NVM) is a specialized command-line utility for managing multiple [node.js](https://nodejs.org/en/) versions. This tool operates on a per-user basis and integrates with POSIX-compliant shells (including bash, zsh, sh, dash, and ksh). NVM provides comprehensive support across Unix-based systems, macOS, and Windows Subsystem for Linux (WSL).

## Common Use Cases

NVM is particularly useful in scenarios such as:

- **Project Compatibility**: Working with projects that require different Node.js versions
- **Testing**: Verifying application compatibility across Node.js versions
- **Development**: Testing new Node.js features while maintaining stable versions
- **Production**: Ensuring development and production environments use identical Node.js versions

### Example: Project-Specific Version

Create a `.nvmrc` file in your project root:

```bash
node -v > .nvmrc
```

Automatically use the project's Node.js version:

```bash
nvm use
```

## Installation

### Basic Installation Methods

Using cURL:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

Using wget:
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

### Environment Configuration

The installation script will do the following actions:
1. Clones the NVM repository to `~/.nvm`
2. Adds initialization code to your shell profile:
   - `~/.bashrc`
   - `~/.bash_profile`
   - `~/.zshrc`
   - `~/.profile`

The following configuration is added automatically:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Advanced Configuration

You can customize the installation using environment variables:
- `NVM_SOURCE`: Custom installation source.
- `NVM_DIR`: Alternative installation directory.
- `PROFILE`: Specific profile file location.
- `NODE_VERSION`: Default Node.js version.

For delayed loading, modify your shell configuration:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use # Loads NVM without activating default version
```

### Verifying Installation

After installation, verify NVM is properly configured by closing and reopening your terminal, then running:

```bash
command -v nvm
```

The command should output `nvm` if the installation was successful.

## Basic Usage

NVM provides a comprehensive set of commands for managing Node.js versions. Here are some fundamental operations:

### Version Information
Check the installed NVM version:
```bash
$ nvm -v
0.40.2
```

View the active Node.js version:
```bash
$ node -v
v22.14.0
```

### Managing Node.js Versions

To install a specific Node.js version:
```bash
$ nvm install 21      
Downloading and installing node v21.7.3...
Downloading https://nodejs.org/dist/v21.7.3/node-v21.7.3-linux-x64.tar.xz...
################################################################################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v21.7.3 (npm v10.5.0)
```

Switch to a different installed version:
```bash
$ nvm use 22    
Now using node v22.14.0 (npm v10.9.2)
```

Verify the active version after switching:
```bash
$ node -v
v22.14.0
```

![NVM version management demonstration](/images/node-version-manager-nvm/nvm.jpg#center)

> **Note**: If you attempt to switch to a non-installed version, NVM will prompt you to install it first.

For a comprehensive overview of all available commands and advanced usage patterns, refer to the [official NVM documentation](https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage).

## Troubleshooting

### Command Not Found
If the `nvm` command is not recognized after installation:
1. Verify the installation:
```bash
command -v nvm
```
2. Source your shell configuration:
```bash
source ~/.bashrc  # Or your shell's configuration file
```

### Persistence Issues
To ensure your Node.js version persists between terminal sessions:
```bash
nvm alias default <version>  # Example: nvm alias default 21
```

### Permission Errors
If experiencing permission issues:
1. Ensure NVM was installed without sudo
2. Verify directory ownership:
```bash
ls -la ~/.nvm
```
3. Fix permissions if necessary:
```bash
sudo chown -R $USER:$USER ~/.nvm
```

## Uninstallation

To remove NVM from your system:

```bash
rm -rf "$NVM_DIR"
```

Then remove the NVM initialization lines from your shell's configuration file (~/.bashrc, ~/.zshrc, or ~/.profile).

## References

- [NVM GitHub Repository](https://github.com/nvm-sh/nvm) - Official source code and documentation
- [Node.js Release Schedule](https://nodejs.org/en/about/releases/) - Information about Node.js version lifecycle
