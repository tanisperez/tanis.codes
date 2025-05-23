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
- Install Windows Subsystem for Linux.
- Install required tools via package manager.
- Follow standard Unix installation steps.

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

## Usage

- `sdk list`: Display all available candidates (SDKs).
- `sdk list java`: List available versions for Java.
- `sdk list maven`: List available versions for Maven.
- `sdk current`: Show current installed versions.
- `sdk current java`: Show current installed versions of Java.
- `sdk install java`: Install the latest stable version of Java.
- `sdk install java 21.0.7-zulu`: Install a specific version of Java.
- `sdk install maven 3.9.9`: Install the version 3.9.9 of Maven.
- `sdk uninstall java 24.0.1-graal`: Remove an installed version of Java.

![Install Java 21](/images/getting-started-with-sdkman/install-java-21.png#center)

### Switch between versions

Switch the current terminal to a specific version:

```bash
sdk use java 21.0.7-zulu
```

Set the default version for all terminals:
```bash
sdk default java 21.0.7-zulu
```

![Switch between versions](/images/getting-started-with-sdkman/switch-between-versions.png#center)

### Project-specific environment

SDKMAN! provides environment management through the `.sdkmanrc` file, which allows defining project-specific SDK versions:

```bash
# Create .sdkmanrc in project root
sdk env init
```

Example of `.sdkmanrc` file:
```txt
java=21.0.7-zulu
maven=3.9.9
```

Apply the environment configuration:

```bash
sdk env
```

Install current environment dependencies:

```bash
sdk env install
```

Verify the environment configuration:

```bash
sdk env current
```

Temporarily disable environment:

```bash
sdk env clear
```

This configuration ensures consistent SDK versions across development teams and environments. To enable automatic switching when entering directories with `.sdkmanrc`, configure:

```bash
echo "sdkman_auto_env=true" >> "$HOME/.sdkman/etc/config"
```

After enabling this feature, SDKMAN! will automatically switch to the specified versions when entering a directory containing `.sdkmanrc`.

> **Note**: Add `.sdkmanrc` to version control to share the configuration with team members.

## Advanced Features

### Offline mode

Enable offline mode:
```bash
sdk offline enable
```

### Auto-Answer mode

Skip confirmation prompts:
```bash
sdk install java 21.0.7-zulu -y
```

### Update SDKMAN!

Keep the tool up to date:
```bash
sdk selfupdate
sdk update
```

## Conclusion

SDKMAN! streamlines the management of multiple JVM development kits through an intuitive command-line interface. Its capabilities include:
- Simple installation and version management.
- Support for multiple JDK distributions.
- Offline operation capabilities.
- Automated updates and maintenance.

## References
- [Official SDKMAN! Documentation](https://sdkman.io/usage)
- [GitHub Repository](https://github.com/sdkman/sdkman-cli)
