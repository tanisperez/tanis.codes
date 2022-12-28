---
title: "How to secure a ssh server"
date: 2022-12-28T07:49:00+01:00
draft: true
toc: false
image: "/images/how-to-secure-a-ssh-server/logo.png"
tags:
  - ssh
  - linux-server
  - security
  - ubuntu
---
The Secure Shell Protocol (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network. Its most common uses are for secure remote login and command-line execution. SSH applications are based on a client–server architecture, connecting an SSH client instance with an SSH server.

SSH it's the perfect tool to manage remote [Unix-like](https://en.wikipedia.org/wiki/Unix-like) servers, so in this article we will take a look at the best options to secure an ssh server.

Here are some advices after a fresh installation of Ubuntu 22.04 LTS Server.

## Change the default root password

This is one of the very first things you should do after the installation. Here, you should be logged as `root`.

```bash
passwd
```

You will be asked to enter the same password twice.

## Update the system

We should update our system regularly to fix known vulnerabilities in the installed software.

```bash
apt-get update && apt-get upgrade
```

## Create a non root user

New users can be added using the `adduser username` command.

![Add a new user](/images/how-to-secure-a-ssh-server/adduser.png#center)

## Install sudo

The program sudo allows a non root user to elevate its privileges to do some restricted tasks.
Some Linux distributions come with `sudo` installed by default, altough in some server editions, it isn't installed by default.

```bash
apt-get install sudo
```

After installing `sudo` we should check the config file `/etc/sudoers`.

![Sudoers config file](/images/how-to-secure-a-ssh-server/sudoers.png#center)

Here, we can see the line `%sudo    ALL=(ALL:ALL) ALL`, which means that every user present in the group `sudo` will have root privileges.

## Add the new user to the sudo group

Then, we have to add our user to the sudo group. To do this, we will use the `usermod` command like this:

```bash
usermod -a -G sudo username
```

## Log in as the new user and check its privileges

We will log in with the new user using the `su username` command. Then, we will use the `groups` command to check the user groups and we will try to update the system with `sudo`.

```bash
su rekomind
groups
sudo apt-get update && sudo apt-get ugprade
```

![Log in and update the system](/images/how-to-secure-a-ssh-server/check-user-groups.png#center)

## Generate a ssh pair key for the new user

The recommended way to connect to a ssh server is by using a ssh pair key. The motivation for using public key authentication over simple passwords is security. Public key authentication provides cryptographic strength that even extremely long passwords can not offer. With SSH, public key authentication improves security considerably as it frees the users from remembering complicated passwords.

```bash
ssh-keygen -t rsa -b 4096
```

This command will generate 2 files inside the folder `$HOME/.ssh`:
* The **private key** `rekomind_rsa`. The possession of this key is proof of the user's identity. Only a user in possession of a private key that corresponds to the public key at the server will be able to authenticate successfully. The private keys need to be stored and handled carefully, and no copies of the private key should be distributed. The private keys used for user authentication are called identity keys.
* The **public key** `rekomind_rsa.pub` that will be copied to the SSH server(s). Anyone with a copy of the public key can encrypt data which can then only be read by the person who holds the corresponding private key. Once an SSH server receives a public key from a user and considers the key trustworthy, the server marks the key as authorized in its `authorized_keys` file. Such keys are called authorized keys.

![Generate a ssh pair key](/images/how-to-secure-a-ssh-server/ssh-keygen.png#center)

## Copy the public key to the server

We can do it manually by copying the public key content into the file `~/.ssh/authorized_keys` in our server.

Otherwise, we can use the `ssh-copy-id` command to connect to our server using ssh and to copy the public key.

```bash
ssh-copy-id -i ~/.ssh/rekomind_rsa.pub rekomind@82.X.X.X
```

![ssh-copy-id command example](/images/how-to-secure-a-ssh-server/ssh-copy-id.png#center)

## Log in into the server with the private key

Now, we should be able to connect to our server without password, we will just use our private key.

```bash
ssh -i ~/.ssh/rekomind_rsa4096 rekomind@82.X.X.X
```

## Secure the ssh server

Here are some advices to improve the server sshd (ssh daemon) security. Edit the file `/etc/ssh/sshd_config`:

* Change the default port 22. This is recommended to avoid some scan tools that searchs vulnerable ssh servers. If we change the default port, we will use the parameter `-p SOME_PORT` with the `ssh` command.
* `PermitRootLogin no`. This will forbid the root login using ssh.
* `PasswordAuthentication no`. This parameter will forbid the ssh connection using a password. We will only be able to connect using a private key.

After saving the changes, we must restart the **sshd** service using the command: 

```bash
sudo systemctl restart sshd
```

**IMPORTANT**: We must stay connected after every change in the sshd daemon. In another terminal, we will try to connect to the server. If its not working, we will have a missconfiguration in the `/etc/ssh/sshd` file and we must fix it. Otherwise, we will be locked out from our server and we will not be able to connect again.

## References

* Secure Shell: https://en.wikipedia.org/wiki/Secure_Shell
* What is SSH Public Key Authentication?: https://www.ssh.com/academy/ssh/public-key-authentication
* SSH Keys and Public Key Authentication: https://www.ssh.com/academy/ssh/keygen#ssh-keys-and-public-key-authentication