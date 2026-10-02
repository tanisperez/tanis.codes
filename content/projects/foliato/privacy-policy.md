---
title: "Foliato – Privacy Policy"
description: "Privacy policy for the Foliato mobile application"
draft: false
---

*[Leer en español](/projects/foliato/privacidad/)*

*Last updated: October 2, 2026*

This Privacy Policy describes how Foliato ("the App") handles information when you use it on iOS or Android.

## Your files never leave your device

Foliato is a PDF viewer and toolkit that runs entirely on your device. Opening, viewing, merging, splitting, reordering, rotating, signing, watermarking, numbering, or turning images into a PDF — every one of these operations is performed locally by the App. Foliato has no server component: it never uploads a PDF, an image, or any part of their content anywhere, and it has no way to do so.

There are two features that contact the Internet, described in full under "The two features that go online" below. Neither sends your document.

## Temporary copies made by the operating system

When you choose a PDF or an image through the system file or photo picker, the operating system — not Foliato — copies that file into the App's private cache so the App can read it. That copy is local to your device, is not accessible to anyone else, and is periodically cleared by the operating system itself.

On iOS specifically, opening a PDF from another app via "Open with" can leave a copy in the App's `Documents/Inbox` folder, which is how iOS delivers incoming files to an app. That copy is also local to your device and governed by iOS's own storage rules.

## Photo library access

Foliato only requests access to your photo library for the Image to PDF tool, and only to read the specific photos you select for that conversion. The App does not browse your library beyond what you pick, and does not access your camera, microphone, contacts, or location.

## The two features that go online

Everything else in Foliato works with no connection at all. Two features, and only these two, make a request to a third-party server when you use them.

**1. Sign with certificate.** When you sign a PDF with your own digital certificate, Foliato makes two requests:

- **A timestamp request** to a public timestamping authority (DigiCert, then Sectigo, then FreeTSA as a last resort, in that order, stopping at the first that answers). It receives a SHA-256 hash of the signature value: a fixed-length fingerprint that cannot be turned back into your document or your signature.
- **A revocation check** to the OCSP server named inside your certificate, which is normally the authority that issued it. It receives the certificate's serial number, hashes of the issuer's name and public key, and a random value.

**2. Checking a signature's certificate.** When you open a signature found in a PDF and look at its certificate, Foliato asks the signer's issuing authority, with the same kind of request, whether that certificate has been revoked. This check is **on by default** and you can turn it off at any time in Settings, under "Check revocation online". It does not run for the certificates you have saved in Foliato.

**What is never sent:** your PDF or any part of its content, your certificate itself, your private key, your password, your name, or any account or device identifier (Foliato has none).

**What the receiving servers can see:** like any request over the Internet, your IP address and the time of the request. A certificate's serial number also identifies a certificate that its issuer knows it issued to someone, so you should treat it as information about that certificate. These servers belong to third parties, not to Foliato, and they handle that information under their own policies, including how long they keep it. Foliato does not receive any of it.

**Plain HTTP.** Many of these public services only offer unencrypted HTTP, so whoever controls the network you are on could see the request. It contains no document and nothing secret, and Foliato checks the cryptographic signature on the answers before trusting them.

**No connection, no problem.** If you are offline or a server does not answer, signing still works (without the timestamp) and the certificate screen simply says the check could not be made.

## What is stored on your device

Foliato stores the following locally, using the operating system's standard app storage:

- **Your preferences**: language, light/dark theme, whether to check revocation online, and whether the visible signature stamp shows your ID number.
- **A counter of completed exports**, used only to decide when it's reasonable to show the operating system's own "rate this app" prompt (via Apple's and Google's native review APIs). Foliato does not see whether you actually left a rating; that's handled entirely by the App Store or Google Play.
- **Saved certificates, only if you choose to save them.** A certificate file (`.p12` or `.pfx`) you save is stored encrypted on the device (AES-256-GCM). The encryption key is kept in the iOS Keychain or the Android Keystore, tied to this device and not carried over to another device through a backup. **Your certificate's password is never stored**: Foliato asks for it every time you sign. You can delete a saved certificate at any time in Settings (swipe it to the left), and if you uninstall the app Foliato removes any leftover key the next time it is installed.

None of this ever leaves your device.

## No data collection

Foliato has no accounts, no server and no analytics, and does not collect personal information. The only requests the app makes are the ones described above, which go straight from your device to the timestamp or certificate-authority server; Foliato never receives them. Specifically:

- **No account or registration**: no name, email address or any other personal identifier is required or requested.
- **No analytics or tracking**: no analytics SDK, advertising network or third-party tracking service is used.
- **No location data**: the App does not access your device's location.
- **No camera or microphone**: the App does not access your camera or microphone.
- **No purchases**: Foliato has no in-app purchases or subscriptions.

## Children's Privacy

Foliato does not knowingly collect any information from anyone, including children under the age of 13.

## Changes to This Policy

If this policy changes in the future, the updated version will be published at this URL with a new "Last updated" date.

## Contact

If you have any questions about this Privacy Policy, you can reach out via the [tanis.codes contact](/posts/) page or open an issue on the [GitHub repository](https://github.com/tanisperez).
