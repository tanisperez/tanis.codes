---
title: "MacBook 12 lid close on Arch Linux"
date: 2026-03-27T21:45:20+02:00
draft: false
toc: true
image: "/images/common/apple.png"
description: "How to fix the lid close on MacBook 12 2017 running Arch Linux"
tags:
  - arch linux
  - linux
  - macbook-12
---

Running Arch Linux on the MacBook (Retina, 12-inch, 2017) works surprisingly well, but the lid close causes the system to not wake up again when the lid opens.

This article documents how I fixed the lid close on my 2017 model. The same procedure may work for the 2016 model, but I can not guarantee.

## Verify the MacBook model

Before attempting to install any driver, verify the MacBook model:

```bash
$ sudo dmidecode | grep -A5 "System Information"
System Information
	Manufacturer: Apple Inc.
	Product Name: MacBook10,1
	Version: 1.0
	Serial Number: C02V11KHHH25
	UUID: e903d1a5-8519-5dc4-bfb3-0990d2833e15
```

The **MacBook 10,1** is the 12-inch 2017 version.


## References

- [MacBook 12 Audio Driver fork as backup on my GitHub account](https://github.com/tanisperez/macbook12-audio-driver)


## Related articles

* [MacBook 12 Audio on Arch Linux](/posts/macbook-12-audio-on-arch-linux/)
