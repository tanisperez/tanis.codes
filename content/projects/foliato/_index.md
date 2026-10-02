---
title: "Foliato"
description: "An on-device PDF toolkit for iOS and Android, so your PDF never leaves your device"
draft: false
layout: "single"
icon: "/images/projects/foliato.svg"
links:
  - label: "App Store"
    url: "https://apps.apple.com/us/app/foliato-offline-pdf-tools/id6795265777"
  - label: "Google Play"
    url: "https://play.google.com/store/apps/details?id=codes.tanis.foliato&hl=en"
---

Foliato is a PDF viewer and toolkit that runs on your device. Every operation, from opening a file to signing, merging or watermarking it, happens locally, using your phone's or tablet's own processing. Your PDF is never uploaded anywhere.

Foliato includes:

- **Viewer**: continuous scroll, pinch zoom, selectable text. Foliato can also register itself as a PDF handler, so you can open a PDF from any app straight into it.
- **Merge**: combine several PDFs into one.
- **Split**: extract specific pages into a new PDF.
- **Compress**: shrink a PDF's file size for easier sharing and storage, entirely on-device.
- **Reorder**: drag pages into a new order.
- **Rotate**: rotate individual pages or the whole document.
- **Sign**: draw a signature by hand and place it on one or more pages.
- **Sign with certificate**: sign a PDF with your own digital certificate (`.p12` or `.pfx`, for example from the Spanish FNMT) in the standard PAdES format, with an optional visible stamp. When you are online the signature also gets a timestamp and a revocation check. You can save your certificates encrypted on the device; the password is never saved. It is an advanced electronic signature, not a qualified one.
- **Signature inspector**: see who signed a PDF, whether the document was modified afterwards and the certificate chain behind each signature.
- **Image to PDF**: turn photos from your library into a PDF.
- **Watermark**: stamp text with the position, size, rotation and opacity you choose.
- **Page numbers**: number pages with the format, position and starting number you choose.

## Your PDF never leaves your device

Foliato has no account, no cloud and no server component. There's no analytics, no advertising and no third-party SDK collecting anything in the background. The PDF you open, sign or watermark is processed on your phone or tablet and stays there unless you explicitly share or save it yourself.

Two features do look things up online, and only when you use them: signing with a certificate (a timestamp and a revocation check) and the revocation check when you open a signature's certificate, which you can turn off in Settings. They never send your document or your certificate, only a fingerprint of the signature or the certificate's serial number. The [privacy policy](/projects/foliato/privacy-policy/) explains exactly what is sent and to whom.

Foliato is free, with no in-app purchases.

## Watch it in action

{{< youtube irv1dqHynoA >}}


## Download

Get Foliato on your phone:

[![Download on the App Store](/images/common/app-store-badge.png#badge)](https://apps.apple.com/us/app/foliato-offline-pdf-tools/id6795265777) [![Get it on Google Play](/images/common/google-play-badge.png#badge)](https://play.google.com/store/apps/details?id=codes.tanis.foliato&hl=en)
{.store-badges}

## Privacy Policy

[Foliato Privacy Policy](/projects/foliato/privacy-policy/) - [en español](/projects/foliato/privacidad/)

## Support

[Foliato Support](/projects/foliato/support/) - [en español](/projects/foliato/soporte/)
