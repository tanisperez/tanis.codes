---
title: "Silent boot in Arch Linux with Plymouth"
date: 2025-03-10T18:08:00+01:00
draft: false
toc: false
image: "/images/silent-boot-arch-linux-with-plymouth/git-cheat-sheet/logo.png"
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

![GRUB silent installation on UEFI systems](/images/silent-boot-arch-linux-with-plymouth/install-grub-silent.jpg#center)

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

The `HOOKS` array is the most important setting in the file. Hooks are small scripts which describe what will be added to the image. For some hooks, they will also contain a runtime component which provides additional behavior, such as starting a daemon, or assembling a stacked block device. Hooks are referred to by their name, and executed in the order they exist in the `HOOKS` array of the configuration file.

The default Arch Linux `HOOKS` configuration is:

```
HOOKS=(base udev autodetect microcode modconf kms keyboard keymap consolefont block filesystems fsck)
```

[This guide](https://wiki.archlinux.org/title/Mkinitcpio#Common_hooks) from the Arch Linux wiki describes common hooks and when to use it. In this case, to hide [`fsck`](https://wiki.archlinux.org/title/Silent_boot#fsck) messages during boot, we will let `systemd` check the root filesystem.

This will be the new HOOKS configuration using `systemd`:

```
HOOKS=(systemd autodetect microcode modconf kms keyboard sd-vconsole block filesystems)
```

After modifying the configuration, regenerate the `initramfs` with:

```bash
sudo mkinitcpio -P
```

![Regenerate initramfs](/images/silent-boot-arch-linux-with-plymouth/mkinitcpio.jpg#center)

## Install Plymouth


Plymouth is a project from Fedora which provides a flicker-free graphical boot process.

```bash
sudo pacman -S plymouth
```

![Install Plymouth](/images/silent-boot-arch-linux-with-plymouth/install-plymouth.jpg#center)


Then, it is needed to add the hook `plymouth` right after `systemd`.


Edit `/etc/mkinitcpio.conf` to add the `plymouth` hook just right after `systemtd`.

```
HOOKS=(systemd plymouth autodetect microcode modconf kms keyboard sd-vconsole block filesystems)
```

> Note: It's super important to have `systemd` before `plymouth`.


Finally, regenerate the `initramfs`.

```bash
sudo mkinitcpio -P
```

## References
* GRUB: https://wiki.archlinux.org/title/GRUB
* mkinitcpio: https://wiki.archlinux.org/title/Mkinitcpio
* Plymouth: https://wiki.archlinux.org/title/Plymouth

