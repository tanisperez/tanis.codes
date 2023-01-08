---
title: "How to boot a Raspberry Pi 4 from SSD"
date: 2022-12-29T18:08:00+01:00
draft: true
toc: false
image: "/images/how-to-boot-raspberry-pi-4-from-ssd/logo.png"
description: ""
tags:
  - raspberry-pi
  - arm
  - ubuntu
  - linux-server
---

Booting a Raspberry Pi 4 from an USB SSD is a great idea to improve performance and the reliability of our little desktop or server. In this article we will see how to install **Ubuntu Server LTS 22.04** on a Raspberry Pi 4 with 4 GB of RAM. This also applies to the 8 GB version because we will be installing the [ARM64](https://en.wikipedia.org/wiki/AArch64) version.

First of all, we will need an 2.5" SSD and an USB to SATA cable adapter. You can find cheap options on Amazon, we should not use a top tier SSD because the Raspberry Pi will not be able to use all its performance.

![Raspberry Pi 4 with SSD connected on USB port](/images/how-to-boot-raspberry-pi-4-from-ssd/raspberry-pi-4-ssd.png#center)


## Install Raspberry Pi Imager

Raspberry Pi Imager is the official tool from the Raspberry Pi Foundation to install a compatible Operating System into a MicroSD or an USB drive. 

The latest version can be download from their [official website](https://www.raspberrypi.com/software/) with versions for Windows, Linux and MacOS.

On MacOS, you can use `brew` to install quickly the Raspberry Pi Imager.

```bash
brew install raspberry-pi-imager
```

![Raspberry Pi Imager installation](/images/how-to-boot-raspberry-pi-4-from-ssd/install-raspberry-pi-imager.png#center)

The Raspberry Pi Imager installation will not take long.

## Installation steps

First of all, you will be asked to select the target drive to write the Operating System image.

![Raspberry Pi Imager installation](/images/how-to-boot-raspberry-pi-4-from-ssd/choose-target-drive.png#center)

Then, the Raspberry Pi Imager will download the latest list of available Operating Systems. In our case, we will select **Ubuntu Server 22.04.1 LTS (64 bit)**. If you have a Raspberry Pi 4 with 4 or 8 GB of RAM, you should always use 64 bit systems.

![Raspberry Pi Imager installation](/images/how-to-boot-raspberry-pi-4-from-ssd/operating-system-selection.png#center)

Finally, the installation will start.

![Raspberry Pi Imager installation](/images/how-to-boot-raspberry-pi-4-from-ssd/installing-ubuntu-22.04.png#center)

After a few minutes, our SSD will have the Ubuntu Server 22.04 image ready to use.

## Boot our Raspberry Pi 4

Now, you can connect the SSD to your Raspberry Pi 4 using an USB to SATA adapter and boot the Pi from it. After a few minutes, Ubuntu 22.04 will be up and running. 

![Raspberry Pi Imager installation](/images/how-to-boot-raspberry-pi-4-from-ssd/raspberry-pi-4-ubuntu-22.04.png#center)

## Update the Raspberry Pi firmware to boot from USB

New Raspberries 4 come with the firmware updated to be able to boot from an USB drive. If you followed all the steps described in this article and your Raspberry Pi 4 is not able to boot from an USB drive, you will need to upgrade the firmware.

You will need a MicroSD card and take a few more steps. First of all, we will install a compatible Operating System into the MicroSD. The easy choice is **Raspberry Pi OS** or **Ubuntu**.

Then, when the installation is done and the Raspberry Pi 4 boots from the MicroSD card, we will use a tool called **rpi-eeprom-update**.

If you chose Ubuntu, it is possible that you need to install a package called `rpi-eeprom`.

```bash
sudo apt-get update
sudo apt-get install rpi-eeprom
```

Finally, we will be able to upgrade the firmware of our Raspberry Pi 4.

```bash
sudo rpi-eeprom-update -a
sudo reboot
```

After rebooting our Raspberry Pi 4, we can shut it down and try to boot an Operating System from an USB drive. Be sure to remove the MicroSD card, because it is the default boot order.

## Change the boot order

With the package `rpi-eeprom` we are able to change the boot order of our Rapsberry Pi 4. We will use the command `rpi-eeprom-config`.

```bash
sudo rpi-eeprom-config
```

Take a look at the **BOOT_ORDER** value. The default code is `0xf41` and it is read from right to left to determine the boot order.
* 1. Check if there is a MicroSD card connected and boot from it.
* 2. Check if there is an USB drive connected and boot from it.
* 3. Start again.

If you want to modify the boot order, you can change the boot configuration using this command.

```bash
sudo -E rpi-eeprom-config --edit
```

## References

* Raspberry Pi Software: https://www.raspberrypi.com/software/
* AArch64 or ARM64: https://en.wikipedia.org/wiki/AArch64
* Raspberry Pi Imager project on GitHub: https://github.com/raspberrypi/rpi-imager
* Raspberry Pi 4 Ubuntu USB Boot: https://www.instructables.com/Raspberry-Pi-4-USB-Boot-No-SD-Card/
* Upgrade Raspberry Pi 4 firmware: https://askubuntu.com/questions/1253070/raspberry-pi-4-firmware-upgrade-eeprom-over-ubuntu-20-04/1288438#1288438

## Related articles

* [How to secure a ssh server](/posts/how-to-secure-a-ssh-server/)
* [Set up OpenVPN server](/posts/set-up-openvpn-server/)
