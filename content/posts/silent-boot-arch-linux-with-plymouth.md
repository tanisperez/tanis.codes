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

By default, Arch Linux displays a console output and kernel messages during the boot process. This guide will demonstrate how to suppress these messages and implement a `Plymouth` splash screen during system startup.

> **Important**: This guide is specifically intended for systems using `GRUB` bootloader. Please note that following these instructions is at your own risk.

## Install GRUB Silent

The default GRUB package in Arch Linux repositories does not provide options to fully suppress boot messages. To achieve a completely silent boot, we'll use the `grub-silent` package from the Arch User Repository (AUR).

First, ensure you have an AUR helper installed (like `yay`). Then, install the package:

```bash
yay -S grub-silent
```

![Installation of grub-silent using AUR packages](/images/silent-boot-arch-linux-with-plymouth/install-grub-silent.jpg#center)

> **Note**: The installation process may take several minutes as `grub-silent` needs to be compiled from source code. The compilation time varies depending on your system's specifications.

Once the compilation is complete, the package will automatically replace your existing GRUB installation:

![Replace GRUB with grub-silent](/images/silent-boot-arch-linux-with-plymouth/replace-grub-with-grub-silent.jpg#center)

> **Important**: After installing `grub-silent`, you must complete the following configuration steps to properly replace the standard GRUB installation.

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

After installation, regenerate the GRUB configuration file:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

![Generating GRUB configuration](/images/silent-boot-arch-linux-with-plymouth/grub-mkconfig.jpg#center)

### Apply Changes

Restart your system to apply the new GRUB configuration:

```bash
sudo reboot
```

> **Note**: After rebooting, your system should start with a silent boot process. If you encounter any issues, you can still access the GRUB menu by pressing the Shift key during boot.


## Edit hooks in mkinitcpio

`mkinitcpio` is a Bash script used to create an initial ramdisk environment in Arch Linux. The configuration of this script can be edited in the `/etc/mkinitcpio.conf` file.

The `HOOKS` array is the most important setting in the file. Hooks are small scripts which describe what will be added to the image. For some hooks, they will also contain a runtime component which provides additional behavior, such as starting a daemon, or assembling a stacked block device. Hooks are referred to by their name, and executed in the order they exist in the `HOOKS` array of the configuration file.

This is the Arch Linux default `HOOKS` array:

```
HOOKS=(base udev autodetect microcode modconf kms keyboard keymap consolefont block filesystems fsck)
```

[This guide](https://wiki.archlinux.org/title/Mkinitcpio#Common_hooks) from the Arch Linux wiki describes common hooks and when to use it. In our case, to hide [`fsck`](https://wiki.archlinux.org/title/Silent_boot#fsck) messages during boot, we will let `systemd` check the root filesystem.

This will be the new HOOKS configuration using `systemd`:

```
HOOKS=(systemd autodetect microcode modconf kms keyboard sd-vconsole block filesystems)
```

Then, regenerate the `initramfs`.

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

