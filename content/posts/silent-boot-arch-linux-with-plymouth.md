---
title: "Silent boot in Arch Linux with Plymouth"
date: 2025-03-12T16:28:00+01:00
draft: false
toc: false
image: "/images/silent-boot-arch-linux-with-plymouth/logo.png"
description: "A comprehensive guide to implementing a silent and elegant boot process in Arch Linux using Plymouth and GRUB silent"
tags:
  - arch linux
---

The default boot process in Arch Linux displays verbose console output and kernel messages, which may detract from a polished system experience. This technical guide demonstrates how to:

- Implement a clean, message-free boot process
- Configure Plymouth for graphical splash screen support
- Set up GRUB for silent operation
- Maintain system diagnostics accessibility when required

> **Important**: This guide is specifically designed for systems using the GRUB bootloader. While these modifications are safe when properly implemented, ensure you have a system backup before proceeding. Users should be comfortable with command-line operations and basic system configuration.

## Prerequisites

Before proceeding with the implementation, ensure your system meets these requirements:

- A functioning Arch Linux installation with GRUB
- Root or sudo privileges
- An AUR helper installed (e.g., `yay`)
- A system backup
- A systemd-compatible root filesystem


## Install GRUB Silent

The standard GRUB package available in the official Arch Linux repositories lacks options for complete boot message suppression. To achieve a silent boot experience, we'll implement `grub-silent` from the Arch User Repository (AUR).

Before proceeding, ensure you have an AUR helper like `yay` installed on your system. Then run:

```bash
yay -S grub-silent
```

![Installation of grub-silent using AUR packages](/images/silent-boot-arch-linux-with-plymouth/install-grub-silent.jpg#center)

> **Note**: Package compilation may take several minutes, as `grub-silent` is built from source. Build time depends on your system's hardware capabilities.

Upon successful compilation, the package will replace your current GRUB installation:

![Replace GRUB with grub-silent](/images/silent-boot-arch-linux-with-plymouth/replace-grub-with-grub-silent.jpg#center)

> **Important**: After installing `grub-silent`, follow these configuration steps to ensure proper GRUB replacement.

### UEFI Systems Configuration

For systems using UEFI, execute the following command to install `grub-silent`:

```bash
sudo grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

### BIOS Systems Configuration

For BIOS-based systems, the installation command requires specifying the target disk device. Replace `sdX` with your system's boot disk (e.g., `sda`, `sdb`, `vda`):

```bash
sudo grub-install --target=i386-pc /dev/sdX
```

### Generate GRUB Configuration

After installing GRUB Silent, generate the configuration file:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

![Generating GRUB configuration](/images/silent-boot-arch-linux-with-plymouth/grub-mkconfig.jpg#center)

### Apply Changes

Restart your system to implement the new configuration:

```bash
sudo reboot
```

> **Note**: Your system should now boot silently. To access the GRUB menu when needed, hold the Shift key during boot. For UEFI systems, use the Esc key instead.


## Configuring mkinitcpio Hooks

`mkinitcpio` is a Bash script used to create an initial ramdisk environment in Arch Linux. The configuration of this script can be edited in the `/etc/mkinitcpio.conf` file.

The `HOOKS` array is the most important setting in the file. Hooks are small scripts which describe what will be added to the image. They are executed in the order they exist in the `HOOKS` array of the configuration file.

The default Arch Linux `HOOKS` configuration is:

```conf
HOOKS=(base udev autodetect microcode modconf kms keyboard keymap consolefont block filesystems fsck)
```

The [mkinitcpio documentation](https://wiki.archlinux.org/title/Mkinitcpio#Common_hooks) provides detailed information about common hooks and their usage. To suppress [`fsck`](https://wiki.archlinux.org/title/Silent_boot#fsck) messages during boot, the system can be configured to use `systemd` for root filesystem checking instead of the traditional `fsck` hook.

This will be the new HOOKS configuration using `systemd`:

```conf
HOOKS=(systemd autodetect microcode modconf kms keyboard sd-vconsole block filesystems)
```

After modifying the configuration, regenerate the `initramfs` with:

```bash
sudo mkinitcpio -P
```

> **Note**: The `-P` flag rebuilds all preset configurations, ensuring complete system integration.

![Regenerate initramfs](/images/silent-boot-arch-linux-with-plymouth/mkinitcpio.jpg#center)

## Install Plymouth

Plymouth is an independent boot splash system developed by Fedora that provides a flicker-free graphical boot experience. It handles the initialization process from kernel load to user space.

```bash
sudo pacman -S plymouth
```

![Install Plymouth](/images/silent-boot-arch-linux-with-plymouth/install-plymouth.jpg#center)


Plymouth requires specific hook configuration in the `initramfs` generation process. Modify `/etc/mkinitcpio.conf` to integrate Plymouth with systemd:

```conf
HOOKS=(systemd plymouth autodetect microcode modconf kms keyboard sd-vconsole block filesystems)
```

> **Important**: The hook order is crucial. The `systemd` hook must precede `plymouth` to ensure proper initialization sequence.

After modifying the hook configuration, regenerate the initramfs:

```bash
sudo mkinitcpio -P
```

### Plymouth Theme Configuration

By default, Arch Linux configures Plymouth to use the `bgrt` theme. To verify the current theme setting:

```bash
plymouth-set-default-theme
```

Plymouth provides several built-in themes, each offering different visual experiences during boot:

* **BGRT**: Advanced Spinner variant that preserves OEM logo functionality (Boot Graphics Resource Table).
* **Fade-in**: Minimalist theme featuring a fade transition with animated star effects.
* **Glow**: Enterprise-grade theme displaying boot progress via pie chart and illuminated logo.
* **Script**: Custom theme showcasing the Arch Linux logo with professional animations.
* **Solar**: Dynamic space-themed interface with animated blue star effects.
* **Spinner**: Lightweight theme implementing a basic loading indicator.
* **Spinfinity**: Modern theme featuring an animated infinity symbol.
* **Tribar**: Terminal-based theme with tri-colored progress indication.
* **Text**: Console-oriented theme with tri-colored progress tracking.
* **Details**: Verbose mode theme for diagnostic purposes.

The theme can be changed by running the following command as `root`:

```bash
sudo plymouth-set-default-theme -R theme
```

> **Note**: The `-R` flag automatically regenerates the initramfs after theme selection.

For additional theme customization options, refer to the [Plymouth Theme Documentation](https://wiki.archlinux.org/title/Plymouth#Changing_the_theme).

## References
* Silent Boot: https://wiki.archlinux.org/title/Silent_boot
* GRUB: https://wiki.archlinux.org/title/GRUB
* mkinitcpio: https://wiki.archlinux.org/title/Mkinitcpio
* Plymouth: https://wiki.archlinux.org/title/Plymouth
* Plymouth theme: https://wiki.archlinux.org/title/Plymouth#Changing_the_theme
