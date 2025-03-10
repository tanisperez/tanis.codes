---
title: "Silent boot in Arch Linux with Plymouth"
date: 2025-03-10T18:08:00+01:00
draft: false
toc: false
image: "/images/silent-boot-arch-linux-with-plymouth/git-cheat-sheet/logo.png"
description: ""
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


----------------------------------------------------------------------


## Edit Kernel parameters

If you are using GRUB, edit the file `/etc/default/grub` to add the following parameters:

```
quiet loglevel=3
```

## fsck

To hide fsck messages during boot, let systemd check the root filesystem. For this, replace udev hook with systemd and remove the fsck hook:

```
HOOKS=(base systemd autodetect microcode modconf kms keyboard sd-vconsole block filesystems)
```

in `/etc/mkinitcpio.conf` and regenerate the initramfs.

```bash
sudo mkinitcpio -P
```

## Make GRUB silent

To hide GRUB welcome and boot messages, you may install unofficial `grub-silent` (AUR) package.

```bash
yay -S grub-silent
```

### Reinstall GRUB with grub-silent

After the installation, it is required to reinstall GRUB to necessary partition first.

```bash
sudo grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

En BIOS sería así:
```bash
sudo grub-install --target=i386-pc /dev/sdX
```

Then, take an example as `/etc/default/grub.silent`, and make necessary changes to `/etc/default/grub`.

```
GRUB_DEFAULT=0
GRUB_TIMEOUT=0
GRUB_RECORDFAIL_TIMEOUT=$GRUB_TIMEOUT
```

### Regenerate GRUB config

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

### Reboot

```bash
sudo reboot
```



## References
* GRUB: https://wiki.archlinux.org/title/GRUB