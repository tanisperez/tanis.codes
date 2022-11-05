---
title: "Set up OpenVPN server"
date: 2022-11-05T18:02:00+02:00
draft: true
toc: false
image: "/images/setup-oh-my-zsh/logo.png"
tags:
  - vpn
  - openvpn
  - security
---
OpenVPN is a [virtual private network (VPN)](https://en.wikipedia.org/wiki/Virtual_private_network) system that implements techniques to create secure point-to-point or site-to-site connections in routed or bridged configurations and remote access facilities. A VPN is often used to browser with a different IP address or to access securely to remote network resources.

It's cheaper and safer to set up your own VPN server on a VPS (Virtual Private Server), rather than using a VPN service such as NordVPN. [Here](https://www.cheapvpslist.com/) is a list of the cheapest VPS on the world.

The OpenVPN server installation can be very tricky, so we will use this [openvpn-install](https://github.com/Nyr/openvpn-install) script from Nyr.

## Installation

We will download the latest version of Nyr OpenVPN [road warrior](https://en.wikipedia.org/wiki/Road_warrior_%28computing%29) installer and we will run the installer.

```bash
wget https://git.io/vpn -O openvpn-install.sh && sudo bash openvpn-install.sh
```

Firstly, it will ask us to select the IPv4 address. In my case, I will use my public ip address 82.X.X.X.

![Select the network](/images/set-up-openvpn-server/select-network.png#center)

Then, we will configure the following options:
* **OpenVPN protocol**. It's recommended to use the default UDP protocol.
* **Port**. It's up to you, I have used the default 1194, but it's a good idea to change it.
* **DNS server**. I recommend using the current system resolvers.
* **A client name**.

![Select the protocol and DNS server](/images/set-up-openvpn-server/select-protocol-and-dns.png#center)

Finally, the installation will be completed!

![Installation completed](/images/set-up-openvpn-server/installation-completed.png#center)

As you can see in the terminal, the output client configuration certificate is located in `/root/tanis.ovpn`. We will transfer this file to our client computer and we will use it to establish the connection with the OpenVPN server.

## Connect to the OpenVPN server

To connect to our OpenVPN server we will download and install the client app from the [official web page](https://openvpn.net/vpn-client/). We have installation options for Windows, MacOS, Linux, Android and iOS.

![Import the OpenVPN profile](/images/set-up-openvpn-server/import-openvpn-profile.png#center)

We will drag the generated `ovpn` file in our OpenVPN server to the client app. Then, we will be able to connect to our server.

![Connect to OpenVPN server](/images/set-up-openvpn-server/connect-to-openvpn-server.png#center)

## Add more clients

We can add more client from our OpenVPN server if we run the script again. It will give us some options such as:
* Add a new client.
* Revoke an existing client.
* Uninstall OpenVPN.

![Add more clients](/images/set-up-openvpn-server/add-more-clients.png#center)

## Remove traffic routing

Once connected to our OpenVPN server, all the Internet traffic will go through our server. Sometimes this can be undesired, so we can disable this feature by editing the file `/etc/openvpn/server/server.conf`. We will comment with `#` the lines starting with the `push` keyword.

```bash
local 82.223.83.62
port 1194
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
auth SHA512
tls-crypt tc.key
topology subnet
server 10.8.0.0 255.255.255.0
#push "redirect-gateway def1 bypass-dhcp"
ifconfig-pool-persist ipp.txt
#push "dhcp-option DNS 212.227.123.16"
#push "dhcp-option DNS 212.227.123.17"
#push "block-outside-dns"
keepalive 10 120
cipher AES-256-CBC
user nobody
group nogroup
persist-key
persist-tun
verb 3
crl-verify crl.pem
explicit-exit-notify
```

Then, we will have to restart our OpenVPN server with the command:

```bash
sudo systemctl restart openvpn-server@server.service
```

## References

* OpenVPN github project: https://github.com/OpenVPN/openvpn
* OpenVPN Nyr installation script: https://github.com/Nyr/openvpn-install
* OpenVPN client: https://openvpn.net/vpn-client/
* Cheap VPS list: https://www.cheapvpslist.com/