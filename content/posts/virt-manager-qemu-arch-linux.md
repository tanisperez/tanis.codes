---
title: "Virt-Manager with QEMU on Arch Linux"
date: 2025-03-30T06:23:00+01:00
draft: false
toc: false
image: "/images/virt-manager-qemu-arch-linux/logo.png"
description: "Qemu"
tags:
  - node
  - javascript
---

# Libvirt + qemu

## Install libvirt

```bash
sudo pacman -S libvirt virt-manager qemu-full dnsmasq dmidecode
sudo systemctl enable libvirtd.service virtlogd.service
sudo systemctl start libvirtd.service virtlogd.service
```

## Add user to libvirt group

```bash
sudo usermod -aG libvirt $USER
```

## Configure the default network to autostart

```bash
sudo virsh net-autostart default
```

This will avoid the error:
Error starting domain: Requested operation is not valid: network 'default' is not active.

## Guest

sudo pacman -S spice-vdagent
sudo systemctl enable spice-vdagentd
sudo systemctl start spice-vdagentd

- Change the `Video model from Cirrus` (the default) to `QXL`.
- Restart `virt-manager` and power on the virtual machine.

## quickemu


## References

