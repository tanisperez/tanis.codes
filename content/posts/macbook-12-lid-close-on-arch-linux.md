---
title: "MacBook 12 lid close on Arch Linux"
date: 2026-03-27T23:51:20+02:00
draft: false
toc: true
image: "/images/common/apple.png"
description: "How to fix the lid close on MacBook 12 2017 running Arch Linux"
tags:
  - arch linux
  - linux
  - macbook-12
---

Running Arch Linux on the MacBook (Retina, 12-inch, 2017) works surprisingly well. However, there is a known issue where the system fails to wake up properly when the lid opens after being closed (sleep mode).

This article documents how the lid close/wake issue could be fixed on the MacBook 12-inch 2017 by using two key solutions:

1. **Disabling D3cold on the NVMe device** - prevents the storage from entering a deep power-off state
2. **Configuring S2idle sleep mode** - ensures proper wake behavior and prevents audio issues

The same procedure may work for the 2016 model, but I cannot guarantee compatibility.

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

## Fix sleep issues with NVMe hardware

The MacBook 12 has an issue where the NVMe storage enters a deep power-off state (D3cold) during sleep, preventing the system from waking up properly when the lid opens. To fix this, we need to create a systemd service that disables D3cold for the NVMe device.

### Create the systemd service

Create the service file:

```bash
sudo nano /etc/systemd/system/fix_sleep.service
```

Add the following content:

```ini
[Unit]
Description=Disable D3cold for NVMe on MacBook 12

[Service]
Type=oneshot
ExecStart=/bin/sh -c 'echo 0 > /sys/bus/pci/devices/0000:01:00.0/d3cold_allowed'
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

### Enable the service

Enable and start the service:

```bash
sudo systemctl enable --now fix_sleep.service
```

## Configure proper sleep mode in the bootloader

The second part of the fix is to configure the kernel to use the `S2idle sleep` state instead of `deep sleep`. This will consume more energy when the lid is closed but it ensures proper wake behavior and prevents audio issues when the lid opens.

### Edit the bootloader configuration

Add `mem_sleep_default=s2idle` to the kernel options. With `systemd-boot` the configuration files should be located at `/boot/loader/entries`.

For CachyOS, this is the file to modify:

```bash
sudo nano /boot/loader/entries/linux-cachyos.conf
```

Append `mem_sleep_default=s2idle` at the end of the `options` line.

```ini
title Linux Cachyos
options root=UUID=24581664-8c42-4aab-8468-4f0d7bd2b78b rw zswap.enabled=0 nowatchdog quiet splash mem_sleep_default=s2idle
linux /vmlinuz-linux-cachyos
initrd /initramfs-linux-cachyos.img
```

### Verify the configuration

After rebooting, verify that the correct sleep mode is active:

```bash
cat /sys/power/mem_sleep
```

You should see:

```
[s2idle] deep
```

The `[s2idle]` indicates that S2idle is currently active.

## Testing the fix

After implementing both fixes and rebooting your system, test the wake functionality:
1. Close the MacBook lid.
2. Wait a few seconds.
3. Open the lid.
4. The system should wake up and respond immediately.

If you experience any issues, check the `fix_sleep` systemd service status and verify the bootloader configuration as described above.

## References

- [MacBook 12 Audio Driver](https://github.com/juicecultus/macbook12-audio-driver)
- [D3cold and NVMe discussions](https://gist.github.com/janl/9afd5f06cf5f144a2cf9afbd79bfc3bb)
- [MacBook keyboard fixes on Linux](https://kerpanic.wordpress.com/2018/03/13/apple-keyboard-get-function-keys-working-properly-in-ubuntu/)

## Related articles

* [MacBook 12 Audio on Arch Linux](/posts/macbook-12-audio-on-arch-linux/)
