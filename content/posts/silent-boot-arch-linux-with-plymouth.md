---
title: "Silent boot in Arch Linux with Plymouth"
date: 2025-03-10T18:08:00+01:00
draft: false
toc: false
image: "/images/git-cheat-sheet/logo.png"
description: ""
tags:
  - arch linux
---

Add disclaimer: I'm not responsible if you break your system....

By default, Arch Linux shows a console while the kernel is loading. This guide only applies to systems which uses GRUB as the bootloader.

## Make GRUB silent

The installation of GRUB using the main packages of Arch Linux does not have any option to completely hide boot messages. But, we will use the unofficial `grub-silent` (AUR) package.

```bash
yay -S grub-silent
```

Attach picture 1. This process will take a few minutes, dependening on the machine, because it has to compile `grub-silent`.


## Reinstall GRUB with grub-silent

After the installation, it is required to reinstall GRUB to necessary partition first.

```bash
sudo grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

Using BIOS, the `grub-install` command is a bit different, where you have to specify the target hard disk:
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
