---
title: "Foliato – Soporte"
description: "Soporte y preguntas frecuentes sobre la aplicación móvil Foliato"
draft: false
---

*[Read in English](/projects/foliato/support/)*

Foliato es un visor y un conjunto de herramientas de PDF para iOS y Android. Abre, lee y transforma PDFs íntegramente en tu dispositivo: tus PDFs nunca se suben a ningún servidor. Consulta la [política de privacidad de Foliato](/projects/foliato/privacidad/) para saber cómo trata los ficheros y los datos.

## Qué hace cada herramienta

- **Visor** — abre un PDF para desplazarte por él de forma continua, hacer zoom con dos dedos y seleccionar texto. También puedes abrir un PDF desde otra app directamente en Foliato usando "Abrir con".
- **Unir** — elige varios PDFs y combínalos en uno solo, en el orden que quieras.
- **Dividir** — selecciona las páginas que te interesan y extráelas a un nuevo PDF.
- **Reordenar** — arrastra la miniatura de una página para moverla a otra posición.
- **Rotar** — toca una página (o todas) para girarla 90° cada vez.
- **Comprimir**: elige un nivel de compresión y ve el tamaño resultante antes de guardar. Las páginas se reconstruyen como imágenes, así que el texto deja de poder seleccionarse en la copia comprimida; si el fichero no fuera a reducirse, Foliato te devuelve el original.
- **Firmar** — dibuja tu firma con el dedo y arrástrala a una página, o a varias, con el tamaño y la posición que quieras.
- **Firmar con certificado**: firma con tu propio certificado digital (`.p12` o `.pfx`), coloca un sello visible en una, varias o todas las páginas y, si quieres reutilizarlo, guarda el certificado cifrado en tu dispositivo. La contraseña del certificado se pide en cada firma y no se guarda nunca.
- **Inspector de firmas**: desde el menú «…» del visor, consulta las firmas que lleva un PDF, si se modificó después de firmarlo y el certificado de cada una.
- **Imagen a PDF** — elige fotos de tu fototeca y conviértelas en un PDF, una foto por página.
- **Marca de agua** — escribe un texto y colócalo arrastrándolo, ajustando su tamaño, rotación y opacidad.
- **Numerar páginas** — elige un formato, una posición y un número inicial, y Foliato numera todas las páginas.

## Preguntas frecuentes

**¿Foliato comprime PDFs?**
Sí. Comprimir reconstruye cada página como una imagen con la calidad que elijas, lo que puede reducir mucho los PDFs escaneados o con muchas imágenes. El texto de la copia comprimida deja de poder seleccionarse, y un PDF que ya es pequeño puede no reducirse; en ese caso Foliato conserva el original.

**¿Puede hacer OCR o convertir texto escaneado en texto seleccionable?**
No, Foliato no tiene función de OCR.

**¿Puedo editar el texto o el contenido de un PDF?**
No. Foliato trabaja con páginas completas —reordenarlas, rotarlas, extraerlas, combinarlas— pero no permite editar el texto o las imágenes que ya hay dentro de un PDF.

**¿Puedo escanear un documento con la cámara?**
No, Foliato no usa la cámara. Trabaja con PDFs y fotos que ya tienes.

**¿Puede convertir un PDF a Word, Excel o PowerPoint (o al revés)?**
No, Foliato no hace ninguna conversión de formato más allá de convertir tus propias fotos en un PDF.

**¿Puedo añadir o quitar una contraseña a un PDF?**
No, Foliato no permite proteger ni quitar contraseñas de un PDF.

**¿Puedo rellenar un formulario, o resaltar y anotar un PDF?**
Todavía no. El resaltado, las notas y las formas están previstos para una versión futura; la 1.0 incluye el visor solo como lector. Rellenar formularios no está por ahora en el plan.

**¿Foliato usa Internet?**
Tus PDFs nunca salen de tu dispositivo y casi todo funciona sin conexión. Dos funciones contactan con servidores de terceros cuando las usas: firmar con certificado (pide un sello de tiempo a una autoridad pública y pregunta al emisor del certificado si fue revocado) y la comprobación de revocación al abrir el certificado de una firma, que puedes desactivar en Ajustes. Ninguna envía tu documento ni tu certificado. Consulta la [política de privacidad](/projects/foliato/privacidad/).

**¿La firma tiene validez legal?**
Firmar con certificado produce una firma criptográfica real en el formato estándar PAdES, una firma electrónica avanzada. No es una firma electrónica cualificada, porque la firma se hace en la app y no dentro de un dispositivo de firma certificado. El peso que tenga una firma concreta depende de la persona o autoridad a quien se la envíes.

**¿Foliato sincroniza entre dispositivos o hace copia en la nube?**
No. Foliato no tiene cuenta ni ningún componente en la nube: todo ocurre de forma local en el dispositivo que estés usando.

**¿Hay una versión de pago o compras integradas?**
Foliato es totalmente gratuita, sin compras integradas.

## Requisitos

- **iOS**: iOS 16.4 o posterior.
- **Android**: Android 7.0 o posterior.

## Contacto

Si Foliato no funciona como esperas, o tienes una pregunta o una sugerencia, escribe a través de la página de [contacto de tanis.codes](/posts/) o abre un issue en el [repositorio de GitHub](https://github.com/tanisperez).
