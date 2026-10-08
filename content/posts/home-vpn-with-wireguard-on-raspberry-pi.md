---
title: "Home VPN with WireGuard on Raspberry Pi"
date: 2026-06-29T00:00:00+02:00
draft: true
toc: true
image: "/images/home-vpn-with-wireguard-on-raspberry-pi/logo.png"
description: "Set up a home VPN server on a Raspberry Pi 4 using WireGuard and Duck DNS to access your home network securely from anywhere."
tags:
  - raspberry-pi
  - wireguard
  - vpn
  - security
  - linux-server
---

In this article we will turn a Raspberry Pi 4 into a home VPN server using [WireGuard](https://www.wireguard.com/), a modern and lightweight VPN protocol. Combined with [Duck DNS](https://www.duckdns.org/) for dynamic DNS, we will be able to access our home network securely from anywhere — including from an iPhone.

Here is an overview of what we will set up:

1. Assign a static local IP to the Raspberry Pi via the router.
2. Configure Duck DNS so our home IP always has a fixed domain name.
3. Harden the SSH server.
4. Install and configure WireGuard.
5. Forward the necessary ports on the router.
6. Connect from an iPhone using the WireGuard app.

## Assign a static IP to the Raspberry Pi

Home routers assign IP addresses dynamically via DHCP, which means our Raspberry Pi could get a different local IP after a reboot. To avoid this, we will create a DHCP reservation so the router always assigns the same IP to our Pi based on its MAC address.

First, find the MAC address of the Wi-Fi interface on the Raspberry Pi.

```bash
ip link show wlan0
```

The output will look similar to this. The MAC address is the value after `link/ether`.

```
2: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    link/ether b8:27:eb:xx:xx:xx brd ff:ff:ff:ff:ff:ff
```

Now log into your router's admin panel (usually at `192.168.1.1` or `192.168.0.1`) and find the DHCP reservation or static lease section. Add a new entry with the MAC address of the Pi and the IP you want to assign, for example `192.168.0.14`.

![DHCP static lease configuration in the router](/images/home-vpn-with-wireguard-on-raspberry-pi/dhcp-static-lease.png#center)

After saving and rebooting the Pi, it will always get the same local IP.

## Set up Duck DNS

[Duck DNS](https://www.duckdns.org/) is a free dynamic DNS service that gives you a subdomain like `yourname.duckdns.org` pointing to your home IP. Since most home internet connections have a dynamic public IP that can change at any time, Duck DNS solves this by letting us update the IP automatically via a simple script.

Sign in to Duck DNS with a GitHub, Google or Reddit account and create a subdomain. Take note of your **token**, which is shown at the top of the page.

Next, on the Raspberry Pi, create the script at `/opt/duckdns.sh`.

```bash
sudo nano /opt/duckdns.sh
```

Paste the following, replacing `YOUR_SUBDOMAIN` and `YOUR_TOKEN` with your values.

```bash
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=YOUR_SUBDOMAIN&token=YOUR_TOKEN&ip=" | curl -k -o /var/log/duckdns.log -K -
```

Set the correct permissions and create the log file.

```bash
sudo chmod 700 /opt/duckdns.sh
sudo touch /var/log/duckdns.log
```

Run it once to verify it works. The file `/var/log/duckdns.log` should contain `OK`.

```bash
sudo /opt/duckdns.sh
cat /var/log/duckdns.log
```

## Automate IP updates with a cron job

We will schedule the script to run every 5 minutes so our domain always points to the current home IP. Since the script lives in `/opt` and writes to `/var/log`, we add it to the root crontab.

```bash
sudo crontab -e
```

Add this line at the end of the file.

```
*/5 * * * * /opt/duckdns.sh >/dev/null 2>&1
```

## Secure the SSH server

Before exposing any port to the internet, it is important to harden the SSH server. We have a dedicated article covering all the steps: [How to secure a SSH server](/posts/how-to-secure-a-ssh-server/).

At minimum, make sure you have disabled password authentication and root login, and are using SSH keys only. Once configured correctly, `ssh user@host` will log you in silently without prompting for a password — that is the expected behaviour, as the client authenticates with your private key automatically. You can confirm password auth is truly disabled by forcing it:

```bash
ssh -o PreferredAuthentications=password user@host
```

You should get `Permission denied (publickey)`, which means the server rejects password logins.

## Install WireGuard

The easiest way to install WireGuard is using the [wireguard-install](https://github.com/Nyr/wireguard-install) script by Nyr, the same author as the popular [openvpn-install](https://github.com/Nyr/openvpn-install) script. It handles everything automatically: package installation, key generation, IP forwarding, firewall rules, and client configuration.

Download and run the installer.

```bash
wget https://git.io/wireguard -O wireguard-install.sh && sudo bash wireguard-install.sh
```

The script will ask a few questions:

- **Public IPv4 address or hostname** — enter your Duck DNS domain, e.g. `tanisperez.duckdns.org`.
- **Port** — leave the default `51820`.
- **Client name** — give it a descriptive name such as `iPhone-16-pro`.
- **DNS server** — choose whichever you prefer; the system default works fine.

![WireGuard installer configuration](/images/home-vpn-with-wireguard-on-raspberry-pi/wireguard-installer.png#center)

Once the installation completes, a QR code will be printed in the terminal and the client configuration file will be saved at `/home/rpi/iPhone-16-pro.conf`.

To add more clients in the future, simply run the script again.

```bash
sudo bash wireguard-install.sh
```

## Configure port forwarding on the router

Log into your router's admin panel and add two port forwarding rules pointing to the Raspberry Pi's static IP (`192.168.0.14`).

| Service | Protocol | External port | Internal port |
|---|---|---|---|
| SSH | TCP | 2222 | 22 |
| WireGuard | UDP | 51820 | 51820 |

> **Note:** some ISPs (including Movistar in Spain) block inbound port 22. Using a different external port such as 2222 works around this restriction — the router forwards external port 2222 to port 22 on the Raspberry Pi, so the SSH server configuration does not need to change.

![Port forwarding rules on the Movistar router](/images/home-vpn-with-wireguard-on-raspberry-pi/port-mapping-ssh.png#center)

To connect from outside the home network, specify the external port explicitly:

```bash
ssh -p 2222 -i ~/.ssh/your-key rpi@tanisperez.duckdns.org
```

> **Security note:** if you connect to the VPN first, you can reach the Pi over SSH through the WireGuard tunnel (`ssh user@10.0.0.1`) without exposing any SSH port to the internet at all.

## Connect from the iPhone

Open the WireGuard app and tap the **+** button to add a new tunnel. Select **Create from QR code** and scan the QR code printed in the terminal during installation. Give the tunnel a name and toggle it on.

<!-- TODO: add screenshot of the WireGuard app on iPhone showing the active tunnel -->

Once connected, all your traffic is routed through your home network. You can verify it by checking that your public IP matches your home IP, or by SSH-ing to the Raspberry Pi through the tunnel.

```bash
ssh rpi@10.8.0.1
```
