---
title: "MacBook 12 Audio on Arch Linux"
date: 2026-03-03T23:08:00+02:00
draft: false
toc: true
image: "/images/macbook-12-audio-on-arch-linux/logo.png"
description: "TBD"
tags:
  - arch linux
  - linux
  - macbook-12
---

Running Arch Linux on the MacBook (Retina, 12-inch, 2017) is surprisingly viable, but audio is one of the most problematic subsystems.

The root cause is the Cirrus Logic CS4208 audio codec used in both the 2016 and 2017 models. The upstream Linux kernel driver does not properly initialize the codec on cold boot, which results in:

- No internal speakers  
- No headphone output  
- No sound devices appearing correctly in ALSA/PipeWire  

This article documents how I fixed audio on my 2017 model running Arch Linux. The same procedure should also work for the 2016 model, as both share the same CS4208 audio hardware.

## The Cirrus Logic CS4208 Problem

The MacBook 12" (2016/2017) uses a Cirrus Logic CS4208 codec behind Apple’s custom initialization sequence.

On macOS, the firmware and Apple’s driver stack initialize the codec very early during boot. On Linux, that initialization step is missing or incomplete in the stock kernel.

The result is simple:

> If the codec is not initialized properly at boot, the sound hardware remains in a non-functional state.

Even worse, after suspend/resume cycles, audio may disappear again.

---

## The Correct Driver: macbook12-audio-driver (DKMS)

The correct solution is to use the community-maintained driver:

https://github.com/juicecultus/macbook12-audio-driver

This driver specifically targets the CS4208 implementation found in the MacBook 12.

It must be installed as a **DKMS module**.

### What is DKMS and Why It Matters

DKMS stands for *Dynamic Kernel Module Support*.

It allows external kernel modules to:

- Automatically rebuild when the kernel is upgraded  
- Stay compatible across kernel updates  
- Avoid manual recompilation after every `pacman -Syu`  

For rolling distributions like Arch Linux, this is critical. Without DKMS, every kernel update would break audio until you manually rebuilt the module.

Install it following the repository instructions, ensure it builds successfully, and verify that the module loads correctly after reboot.

---

## The Critical Requirement: The Boot Chime

This is the part that most guides miss.

On these MacBooks:

> If there is no boot chime, there will be no sound in Linux.

The firmware must initialize the audio hardware before Linux takes over. If the codec is not powered and configured by the firmware, the Linux driver cannot recover it.

So the first test is simple:

- Power on the machine.  
- Do you hear the Apple boot chime?  

If not, audio will not work in Linux.

---

## Enabling the Boot Chime

On macOS, the chime can be enabled by setting the appropriate NVRAM variable:

```bash
sudo nvram StartupMute=%00
```

Alternatively:

* Boot into macOS Recovery (Command + R at boot).
* Open Terminal.
* Set the same NVRAM variable.

After enabling it, shut down completely and power on again. You must hear the chime.

## When That Is Not Enough (My Case)

In my case, enabling the NVRAM variable was not sufficient.

There was likely outdated firmware on the machine. The only reliable fix was:

1. Download a macOS installer image.
2. Create a bootable external USB.
3. Install macOS on an external drive (I used two USB sticks).
4. Boot it fully at least once.

During that process, the firmware was silently updated.

After that:

* The boot chime worked consistently.
* The Linux driver could properly initialize the CS4208.
* Audio became stable.

## Side Effect: Slightly Slower Boot

Since enabling the chime and firmware initialization:

* Boot time increased by ~10–15 seconds.

This is likely due to additional firmware initialization phases. However, audio now works reliably on every cold boot.

For me, that tradeoff is acceptable.

## References

- [MacBook 12 Audio Driver](https://github.com/juicecultus/macbook12-audio-driver)
- [Arch Wiki](https://wiki.archlinux.org/)

