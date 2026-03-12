---
title: "MacBook 12 Audio on Arch Linux"
date: 2026-03-03T23:08:00+02:00
draft: false
toc: true
image: "/images/macbook-12-audio-on-arch-linux/logo.png"
description: "How to fix audio on MacBook 12 running Arch Linux by enabling the boot chime and installing the custom DKMS audio driver"
tags:
  - arch linux
  - linux
  - macbook-12
---

Running Arch Linux on the MacBook (Retina, 12-inch, 2017) works surprisingly well, but audio has been historically problematic. The MacBook 12" (2016/2017) uses a Cirrus Logic CS4208 audio codec that the Linux kernel driver does not properly initialize on cold boot.

This article documents how I fixed audio on my 2017 model. The same procedure should work for the 2016 model, since both use the same CS4208 hardware.

## The Boot Chime is Critical

Before installing any driver, understand this requirement:

> If there is no boot chime, there will be no sound in Linux.

When the MacBook is powered on, the firmware must initialize the audio hardware. If the codec is not powered and configured by the firmware, the Linux driver cannot recover it.

On macOS, the boot chime can be enabled by setting an NVRAM variable:

```bash
sudo nvram StartupMute=%00
```

If there is not dual boot with macOS, alternatively, boot into macOS Recovery (Command + R at startup), open Terminal, and run the same command. After setting it, shut down completely and power on again. Now, the chime must sound.

If the chime still does not appear, your firmware is likely outdated. The only reliable fix is to install macOS on an external USB drive, boot it fully at least once (allowing the firmware to update silently), then return to Linux. This is the step that made the difference for me.

## Installing the Audio Driver

Once the boot chime works reliably, install the community-maintained driver:

https://github.com/juicecultus/macbook12-audio-driver

This driver specifically targets the CS4208 implementation and must be installed as a DKMS module. DKMS (Dynamic Kernel Module Support) means the driver automatically rebuilds when the kernel upgrades—essential for rolling distributions like Arch Linux. Without it, every kernel update would break audio.

Follow the repository instructions to install, ensure it builds successfully, and verify the module loads correctly after reboot.

## The Tradeoff

Since enabling the chime and firmware initialization, boot time increased by roughly 10–15 seconds. The firmware now performs additional initialization phases. However, audio now works consistently on every cold boot, which makes the tradeoff worthwhile.



## References

- [MacBook 12 Audio Driver](https://github.com/juicecultus/macbook12-audio-driver)
- [Arch Wiki](https://wiki.archlinux.org/)

