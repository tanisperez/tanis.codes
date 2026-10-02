---
title: "Foliato – Support"
description: "Support and frequently asked questions for the Foliato mobile application"
draft: false
---

*[Leer en español](/projects/foliato/soporte/)*

Foliato is a PDF viewer and toolkit for iOS and Android. It opens, reads and reworks PDFs entirely on your device — nothing is ever uploaded. See the [Foliato Privacy Policy](/projects/foliato/privacy-policy/) for details on how it handles files and data.

## What each tool does

- **Viewer** — open a PDF to scroll through it continuously, pinch to zoom, and select text. You can also open a PDF from another app directly into Foliato using "Open with".
- **Merge** — pick several PDFs and combine them into one, in the order you choose.
- **Split** — select the pages you want and extract them into a new PDF.
- **Reorder** — drag a page's thumbnail to move it to a new position.
- **Rotate** — tap a page (or all of them) to rotate it 90° at a time.
- **Compress**: pick a compression level and see the resulting size before you save. Pages are rebuilt as images, so text stops being selectable in the compressed copy; if the file would not get smaller, Foliato hands back the original.
- **Sign** — draw your signature with your finger and drag it onto any page, or several pages, at the size and position you want.
- **Sign with certificate**: sign with your own digital certificate (`.p12` or `.pfx`), place a visible stamp on one, several or all pages, and save the certificate encrypted on your device if you want to reuse it. The certificate's password is asked for on every signature and never stored.
- **Signature inspector**: from the viewer's "…" menu, see the signatures a PDF carries, whether it was modified after signing, and the certificate behind each one.
- **Image to PDF** — pick photos from your library and turn them into a PDF, one photo per page.
- **Watermark** — type a text watermark and drag it into place, resizing, rotating and adjusting its opacity.
- **Page numbers** — choose a format, a position and a starting number, and Foliato stamps every page.

## Frequently asked questions

**Does Foliato compress PDFs?**
Yes. Compress rebuilds each page as an image at the quality you choose, which can shrink scanned or image-heavy PDFs a lot. The text in the compressed copy is no longer selectable, and a PDF that is already small may not get smaller; in that case Foliato keeps the original.

**Can it run OCR or make scanned text searchable?**
No, Foliato has no OCR feature.

**Can I edit the text or content of a PDF?**
No. Foliato works with whole pages — reordering, rotating, extracting, combining — but it doesn't let you edit the text or images already inside a PDF.

**Can I scan a document with my camera?**
No, Foliato doesn't use the camera. It works with PDFs and photos you already have.

**Can it convert a PDF to Word, Excel or PowerPoint (or the other way around)?**
No, Foliato doesn't do any file-format conversion beyond turning your own photos into a PDF.

**Can I add or remove a password on a PDF?**
No, Foliato doesn't support protecting or removing passwords from a PDF.

**Can I fill in a form, or highlight and annotate a PDF?**
Not yet. Highlighting, notes and shape annotations are planned for a future version — 1.0 ships the viewer as a reader only. Form filling isn't currently on the roadmap.

**Does Foliato use the Internet?**
Your PDFs never leave your device, and almost everything works with no connection. Two features contact third-party servers when you use them: signing with a certificate (it asks a public timestamping authority for a timestamp and the certificate's issuer whether it was revoked) and the revocation check when you open a signature's certificate, which you can turn off in Settings. Neither sends your document or your certificate. See the [privacy policy](/projects/foliato/privacy-policy/).

**Is the signature legally valid?**
Sign with certificate produces a real cryptographic signature in the standard PAdES format, an advanced electronic signature. It is not a qualified electronic signature, because the signing happens in the app and not inside a certified signature device. How much weight a given signature has depends on the person or authority you are sending it to.

**Does Foliato sync across devices or back up to the cloud?**
No. Foliato has no account and no cloud component — everything happens locally on the device you're using.

**Is there a paid version or in-app purchase?**
Foliato is entirely free, with no in-app purchases.

## Requirements

- **iOS**: iOS 16.4 or later.
- **Android**: Android 7.0 or later.

## Contact

If Foliato isn't working as expected, or you have a question or a feature request, reach out via the [tanis.codes contact](/posts/) page or open an issue on the [GitHub repository](https://github.com/tanisperez).
