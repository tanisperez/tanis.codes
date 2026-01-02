---
title: "Smart Card Reader on Arch Linux"
date: 2026-01-02T18:52:00+02:00
draft: false
toc: true
image: "/images/smart-card-reader-arch-linux/logo.png"
description: "Complete guide to set up smart card reader support on Arch Linux for certificate-based authentication"
tags:
  - arch linux
  - linux
  - smart card
  - security
---

## Introduction

Smart card readers enable certificate-based authentication on Linux systems. Whether you're using a Spanish electronic DNI (DNIe), a digital signature card, or any other smart card, this guide covers the essential setup steps to get your card reader working on Arch Linux.

## Prerequisites

- Arch Linux system
- A compatible smart card reader (e.g., Trust Primo Lector USB-C)
- Your smart card (e.g., Spanish DNIe)
- Administrative access (sudo)

## Installing Smart Card Support

The first step is to install the necessary packages for smart card reader support:

```bash
sudo pacman -S pcsclite pcsc-tools ccid
sudo systemctl enable --now pcscd.service
```

This installs:
- **pcsclite**: The PC/SC Lite daemon and libraries
- **pcsc-tools**: Utilities to interact with smart card readers
- **ccid**: Chip Card Interface Device driver

After installation, the smart card daemon will start automatically. You can verify your card reader is detected by running:

```bash
pcsc_scan
```

## Configuring Your Browser for Certificate Authentication

Most modern browsers require additional configuration to use smart cards. LibreWolf (a privacy-focused Firefox fork) is an excellent choice for this purpose.

### Installing LibreWolf

```bash
yay -S librewolf
```

### Registering the Smart Card Module

To enable smart card authentication in your browser, register the OpenSC PKCS#11 module:

1. Open LibreWolf and navigate to `about:preferences#privacy`
2. Scroll to the **Certificates** section
3. Click on **Security Devices**
4. Click **Load** and add the OpenSC module located at:
   ```
   /usr/lib/pkcs11/opensc-pkcs11.so
   ```
5. Give it a descriptive name (e.g., `Smart Card` or `DNIe`)

### Browser Security Settings

LibreWolf enforces strict security policies that may need adjustment for compatibility with some websites (particularly older government portals):

1. Open `about:config` in LibreWolf
2. Verify or modify these settings:
   - `security.osclientcerts.autoload` = `false`
   - `security.smartcard.enabled` = `true`

The second setting is usually enabled by default, but it's worth confirming.

## Troubleshooting

If you encounter issues:
- Ensure the `pcscd` service is running: `systemctl status pcscd.service`
- Test the card reader with `pcsc_scan` to verify it detects your smart card
- Check your browser's permissions and certificate settings if authentication dialogs don't appear

## References

- [Smartcards - Arch Linux Wiki](https://wiki.archlinux.org/title/Smartcards)

---

## Notes

```bash
sudo pacman -S pcsclite pcsc-tools ccid
sudo systemctl enable --now pcscd.service
```

Then, we can try `pcsc_scan`. (TODO: paste the output of the DNIe from Spain).

También podemos poner una foto de un DNIe de España como ejemplo.

## LibreWolf

En lugar de usar Firefox, usaremos Librewolf, que es un fork de Firefox sin las nuevas políticas sobre la IA y los cambios de policies internos. Explicar esto en una línea e igual con una referencia externa.


yay -S librewolf

about:preferences#privacy


→ Certificados
→ Dispositivos de seguridad
→ Cargar

Ruta:

/usr/lib/pkcs11/opensc-pkcs11.so


Nombre:

DNIe



4. Ajustes de LibreWolf que conviene revisar

LibreWolf endurece algunas políticas que pueden bloquear PIN dialogs si el sitio es muy antiguo.

Revisa:

about:config


Verifica que estén en estos valores:

security.osclientcerts.autoload = false
security.smartcard.enabled = true


(El segundo suele venir bien, pero conviene comprobarlo).




## References

- [Smartcards](https://wiki.archlinux.org/title/Smartcards)

