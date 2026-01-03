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

Smart card readers enable certificate-based authentication and cryptographic signing operations. While some desktops and laptops include an integrated smart card reader, the most common setup relies on an external USB smart card reader.

On Windows and macOS, smart card readers typically work out of the box with minimal user intervention. Linux distributions, however, often require explicit configuration of middleware and cryptographic providers, and Arch Linux is no exception.

This guide covers the configuration of a smart card reader named "Trust Primo Lector DNI Electrónico" used for the Spanish electronic national identity card (DNIe). Although the examples focus on this particular device and ID system, the same principles apply to most USB smart card readers and government-issued cryptographic smart cards.

![Trust Smart Card Reader](/images/smart-card-reader-arch-linux/trust-smart-card-reader.png)

The Spanish DNIe is a cryptographic smart card compliant with PKCS#15, containing hardware-protected private keys that never leave the card. Authentication and digital signatures are performed internally by the chip after successful PIN verification. Depending on the generation, the DNIe uses [RSA-based certificates](https://en.wikipedia.org/wiki/RSA_cryptosystem) (typically 2048-bit keys) and, in more recent versions, introduces [elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) (ECC) for improved performance and security. Certificates are issued under a public key infrastructure operated by the Spanish authorities and exposed to applications using standard interfaces.

![Trust Smart Card Reader](/images/smart-card-reader-arch-linux/dni.png)

On Linux systems, access to these cryptographic capabilities is provided through [PKCS#11](https://en.wikipedia.org/wiki/PKCS_11), a standardized API that allows user-space applications, including web browsers, to interact with smart cards via a compatible middleware such as [OpenSC](https://github.com/OpenSC/OpenSC). Correct `PKCS#11` integration is therefore a prerequisite for using the DNIe in browsers, and differences in `PKCS#11` support explain why some browsers behave differently in this context.

## Installing necessary packages

The first step is to install the necessary packages for smart card reader support:
- **pcsclite**: The PC/SC Lite daemon and libraries.
- **pcsc-tools**: Utilities to interact with smart card readers.
- **ccid**: Chip Card Interface Device driver.

```bash
sudo pacman -S pcsclite pcsc-tools ccid
```

Next, enable and start the `pcscd` daemon service:

```bash
sudo systemctl enable --now pcscd.service
```

Once the USB smart card reader is connected, run the following command:

```bash
pcsc_scan
```

![pcsc_scan](/images/smart-card-reader-arch-linux/pcsc_scan.png)

The output displays information about the detected smart card, identifying it as `DNI electrónico (Spanish electronic ID card)`.

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
- [RSA cryptosystem](https://en.wikipedia.org/wiki/RSA_cryptosystem)
- [Elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)
- [PKCS#11](https://en.wikipedia.org/wiki/PKCS_11)
- [OpenSC](https://github.com/OpenSC/OpenSC)


