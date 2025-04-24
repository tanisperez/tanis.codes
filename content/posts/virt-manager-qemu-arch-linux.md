---
title: "Virt-Manager with QEMU on Arch Linux"
date: 2025-03-30T06:23:00+01:00
draft: false
toc: true
image: "/images/virt-manager-qemu-arch-linux/logo.png"
description: "A comprehensive guide to installing and configuring QEMU with Virt-Manager for virtualization on Arch Linux"
tags:
  - qemu
  - arch linux
  - virtualization
  - libvirt
---

[Virt-Manager](https://virt-manager.org/) is a graphical user interface for managing virtual machines through the [Libvirt](https://wiki.archlinux.org/title/Libvirt) virtualization API. This tool simplifies the process of creating and managing virtual machines without requiring direct command-line interaction.

This guide focuses on implementing KVM (Kernel-based Virtual Machine) to achieve high-performance virtualization using Linux's native hypervisor. While other solutions like [VirtualBox](https://www.virtualbox.org/) or [VMware](https://www.vmware.com/) are available, KVM offers superior performance and native Linux integration.

## Prerequisites

Before proceeding with the installation, verify that your system supports hardware virtualization. This capability is essential for KVM performance:

### Hardware Requirements

Verify virtualization support in your system:
```bash
LC_ALL=C lscpu | grep Virtualization
```

![Hardware virtualization check output](/images/virt-manager-qemu-arch-linux/virtualization-enabled.png#center)

> **Note**: For Intel processors, look for `VT-x` in the output. AMD processors will show `AMD-V` instead.

Ensure KVM modules are properly loaded:
```bash
lsmod | grep kvm
```

The output should display `kvm_intel` for Intel processors or `kvm_amd` for AMD processors, along with the base `kvm` module.

### BIOS/UEFI Configuration

Ensure virtualization is enabled in your system's BIOS/UEFI settings:
- Intel systems: Enable `Intel VT-x` and `Intel VT-d`
- AMD systems: Enable `AMD-V` and `AMD IOMMU`

> **Important**: If you need to enable these settings, a system restart will be required.

## Install dependencies

Install the required packages:

```bash
sudo pacman -S libvirt virt-manager qemu-full dnsmasq dmidecode
```

Enable and start the required system services:

```bash
sudo systemctl enable --now libvirtd.service virtlogd.service
```

## Configuration

### User Permissions

Add your user to the `libvirt` group to enable management of virtual machines without root privileges:

```bash
sudo usermod -aG libvirt $USER
```

> **Note**: Log out and back in for the group changes to take effect.

### Network Configuration

Enable automatic start of the default virtual network:

```bash
sudo virsh net-autostart default
sudo virsh net-start default
```

This configuration prevents the common error:

```txt
"Error starting domain: Requested operation is not valid: network 'default' is not active"
```

## Verification

Verify the installation by launching Virt-Manager:

```bash
virt-manager
```

The application should start without requiring root privileges and display no network connection errors.

![Virt-Manager running](/images/virt-manager-qemu-arch-linux/virt-manager.jpg#center)

## References

- [Libvirt Documentation](https://wiki.archlinux.org/title/Libvirt) - Comprehensive guide to libvirt
- [Virt-Manager Wiki](https://wiki.archlinux.org/title/Virt-manager) - Official Arch Linux documentation
- [QEMU](https://wiki.archlinux.org/title/QEMU) - QEMU configuration and usage guide
