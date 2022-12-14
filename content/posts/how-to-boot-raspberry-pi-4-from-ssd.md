---
title: "How to boot a Raspberry Pi 4 from a SSD"
date: 2023-01-09T08:29:00+01:00
draft: false
toc: false
image: "/images/how-to-boot-raspberry-pi-4-from-ssd/logo.png"
description: "Booting a Raspberry Pi 4 from an USB SSD is a great idea to improve the performance and reliability of our little Pi computer."
tags:
  - raspberry-pi
  - arm
  - ubuntu
  - linux-server
---

Booting a Raspberry Pi 4 from an USB SSD is a great idea to improve the performance and reliability of our small desktop or server. In this article we will see how to install **Ubuntu Server LTS 22.04** on a Raspberry Pi 4 with 4 GB of RAM. This also applies to the 8 GB version because we will be installing the [ARM64](https://en.wikipedia.org/wiki/AArch64) version.

First of all, we will need a 2.5" SSD and an USB to SATA cable adapter. You can find cheap options on Amazon, we should not use a high-end SSD because the Raspberry Pi will not be able to take advantage of its full performance.

![Raspberry Pi 4 with SSD connected on USB port](/images/how-to-boot-raspberry-pi-4-from-ssd/raspberry-pi-4-ssd.png#center)


## Install Raspberry Pi Imager

Raspberry Pi Imager is the official tool from the Raspberry Pi Foundation for installing a compatible operating system onto a MicroSD or USB drive.

The latest version can be download from its [official website](https://www.raspberrypi.com/software/) with versions for Windows, Linux and MacOS.

On MacOS, you can use `brew` to quickly install the Raspberry Pi Imager.

```bash
brew install raspberry-pi-imager
```

![Raspberry Pi Imager installation](/images/how-to-boot-raspberry-pi-4-from-ssd/install-raspberry-pi-imager.png#center)

The Raspberry Pi Imager installation will not take long.

## Installation steps

Firstly, you will be prompted to select the destination drive to write the operating system image to.

![Target drive selection](/images/how-to-boot-raspberry-pi-4-from-ssd/choose-target-drive.png#center)

The Raspberry Pi Imager will then download the latest list of available operating system. In our case, we will select **Ubuntu Server 22.04.1 LTS (64-bit)**. If you have a Raspberry Pi 4 with 4 or 8 GB of RAM, you should always use 64-bit systems.

![Operating System selection](/images/how-to-boot-raspberry-pi-4-from-ssd/operating-system-selection.png#center)

Finally, the installation will begin.

![Ubuntu 22.04 installation](/images/how-to-boot-raspberry-pi-4-from-ssd/installing-ubuntu-22.04.png#center)

After a few minutes, our SSD will have the Ubuntu Server 22.04 image ready to use.

## Boot our Raspberry Pi 4

Now, you can connect the SSD to your Raspberry Pi 4 using an USB to SATA adapter and boot the Pi from there. After a few minutes, Ubuntu 22.04 will be up and running. 

![Ubuntu 22.04 running on a Raspberry Pi 4](/images/how-to-boot-raspberry-pi-4-from-ssd/raspberry-pi-4-ubuntu-22.04.png#center)

## Update the Raspberry Pi firmware to boot from USB

New Raspberries 4 come with updated firmware to be able to boot from an USB drive. If you have followed all the steps in this article and your Raspberry Pi 4 cannot boot from a USB drive, you will need to update the firmware.

You will need a MicroSD card and take a few more steps. First of all, we will install a compatible operating system on the MicroSD. The easy choice is **Raspberry Pi OS** or **Ubuntu**.

Then, when the installation is done and the Raspberry Pi 4 boots from the MicroSD card, we will use a tool called **rpi-eeprom-update**.

If you chose Ubuntu, you may need to install a package called `rpi-eeprom`.

```bash
sudo apt-get update
sudo apt-get install rpi-eeprom
```

Finally, we will be able to upgrade the firmware of our Raspberry Pi 4.

```bash
sudo rpi-eeprom-update -a
sudo reboot
```

After rebooting the Raspberry Pi 4, we can turn it off and try to boot an operating system from an USB drive. Be sure to remove the MicroSD card as it is the default boot order.

## Change the boot order

With the `rpi-eeprom` package it is possible to change the boot order of our Raspberry Pi 4. We will use the command `rpi-eeprom-config`.

```bash
sudo rpi-eeprom-config
```

Take a look at the **BOOT_ORDER** value. The default code is `0xf41` and it is read from right to left to determine the boot order.
1. Check if there is a MicroSD card connected and boot from it.
2. Check if there is an USB drive connected and boot from it.
3. Start checking again.

If you want to modify the boot order, you can change the boot configuration using the following command.

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
