---
title: "Getting started with SDKMAN!"
date: 2025-04-20T18:18:00+02:00
draft: false
toc: true
image: "/images/getting-started-with-sdkman/logo.png"
description: "Learn how to install and use SDKMAN! to manage multiple versions of Java and other JVM-based development kits. A comprehensive guide for developers."
tags:
  - java
---

SDKMAN! is a tool for managing parallel versions of multiple Software Development Kits on Unix-based systems. It provides a convenient command-line interface for installing, switching between, and removing different versions of Java, Gradle, Maven, and other JVM-based development kits.

## System requirements

SDKMAN! requires a Unix-like environment and is compatible with:
- Linux distributions.
- macOS.
- Windows (via WSL or Git Bash).
- Bash and ZSH shells.

### Required components
- `curl` or `wget` for downloads.
- `zip` and `unzip` for package management.
- `sed` and `awk` for text processing.
- POSIX-compliant shell (bash or zsh).

### Windows setup options

WSL Installation (Recommended):
- Install Windows Subsystem for Linux
- Install required tools via package manager
- Follow standard Unix installation steps

Git Bash Alternative:
- Install Git Bash for Windows.
- Add MinGW tools for Unix utilities.
- Configure system PATH as needed.

> **Note**: Native Windows installation is not supported. WSL provides the best experience for Windows users.

## Installation

The installation process consists of downloading and executing the SDKMAN! installation script. Open a terminal and execute:

```bash
curl -s "https://get.sdkman.io" | bash
```

For systems where curl is not available, wget can be used as an alternative:

```bash
wget -qO- "https://get.sdkman.io" | bash
```

![SDKMAN! installation](/images/getting-started-with-sdkman/sdkman-installation.png#center)


Afterward, open a new terminal or initialize SDKMAN! in the current shell:

```bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

To verify the installation:

```bash
sdk version
```

## Basic Usage

### List Available Versions
[Commands and examples]

### Install Specific Versions
[Installation commands]

### Switch Between Versions
[Version switching]

### Set Default Version
[Default version configuration]

## Advanced Features

### Auto-Answer Yes
[Configuration options]

### Offline Mode
[Working offline]

### Update SDKMAN!
[Update commands]

## Common Issues and Solutions
[Troubleshooting section]

## References
- [Official SDKMAN! Documentation](https://sdkman.io/usage)
- [GitHub Repository](https://github.com/sdkman/sdkman-cli)