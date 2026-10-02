---
title: "Foliato – Política de privacidad"
description: "Política de privacidad de la aplicación móvil Foliato"
draft: false
---

*[Read in English](/projects/foliato/privacy-policy/)*

*Última actualización: 2 de octubre de 2026*

Esta política de privacidad explica cómo trata Foliato ("la App") la información cuando la usas en iOS o Android.

## Tus ficheros nunca salen de tu dispositivo

Foliato es un visor y un conjunto de herramientas para PDF que funciona íntegramente en tu dispositivo. Abrir, ver, unir, dividir, reordenar, rotar, firmar, marcar con agua, numerar o convertir imágenes en un PDF: cada una de estas operaciones la realiza la App de forma local. Foliato no tiene ningún componente de servidor: nunca sube un PDF, una imagen ni ninguna parte de su contenido a ningún sitio, y no tiene forma de hacerlo.

Hay dos funciones que se conectan a Internet, descritas por completo en "Las dos funciones que se conectan a Internet" más abajo. Ninguna envía tu documento.

## Copias temporales que crea el sistema operativo

Cuando eliges un PDF o una imagen a través del selector de ficheros o de fotos del sistema, es el sistema operativo —no Foliato— quien copia ese fichero a la caché privada de la App para que pueda leerlo. Esa copia es local a tu dispositivo, no es accesible para nadie más, y el propio sistema operativo la elimina periódicamente.

En iOS en concreto, abrir un PDF desde otra app mediante "Abrir con" puede dejar una copia en la carpeta `Documents/Inbox` de la App, que es como iOS entrega los ficheros entrantes a una aplicación. Esa copia también es local a tu dispositivo y se rige por las propias reglas de almacenamiento de iOS.

## Acceso a la fototeca

Foliato solo solicita acceso a tu fototeca para la herramienta Imagen a PDF, y únicamente para leer las fotos concretas que selecciones para esa conversión. La App no explora tu fototeca más allá de lo que eliges, y no accede a la cámara, al micrófono, a los contactos ni a la ubicación.

## Las dos funciones que se conectan a Internet

Todo lo demás en Foliato funciona sin ninguna conexión. Dos funciones, y solo esas dos, hacen una petición a un servidor de terceros cuando las usas.

**1. Firmar con certificado.** Cuando firmas un PDF con tu propio certificado digital, Foliato hace dos peticiones:

- **Una petición de sello de tiempo** a una autoridad de sellado pública (DigiCert, después Sectigo y, como último recurso, FreeTSA, en ese orden y deteniéndose en la primera que responda). Recibe un hash SHA-256 del valor de la firma: una huella de longitud fija que no se puede convertir de nuevo en tu documento ni en tu firma.
- **Una comprobación de revocación** al servidor OCSP que figura dentro de tu certificado, que normalmente es la autoridad que lo emitió. Recibe el número de serie del certificado, hashes del nombre y de la clave pública del emisor, y un valor aleatorio.

**2. Comprobar el certificado de una firma.** Cuando abres una firma que lleva un PDF y consultas su certificado, Foliato pregunta a la autoridad emisora del firmante, con el mismo tipo de petición, si ese certificado ha sido revocado. Esta comprobación está **activada por defecto** y puedes desactivarla en cualquier momento en Ajustes, en "Comprobar revocación en línea". No se ejecuta para los certificados que tienes guardados en Foliato.

**Lo que nunca se envía:** tu PDF ni ninguna parte de su contenido, el certificado en sí, tu clave privada, tu contraseña, tu nombre, ni ningún identificador de cuenta o de dispositivo (Foliato no tiene ninguno).

**Lo que pueden ver los servidores que reciben la petición:** como en cualquier petición por Internet, tu dirección IP y la hora de la petición. Además, el número de serie identifica un certificado que su emisor sabe a quién emitió, así que conviene tratarlo como información sobre ese certificado. Esos servidores son de terceros, no de Foliato, y tratan esa información según sus propias políticas, incluido el tiempo que la conservan. Foliato no recibe nada de eso.

**HTTP sin cifrar.** Muchos de estos servicios públicos solo ofrecen HTTP sin cifrar, así que quien controle la red a la que estás conectado podría ver la petición. No contiene ningún documento ni nada secreto, y Foliato comprueba la firma criptográfica de las respuestas antes de fiarse de ellas.

**Sin conexión, sin problema.** Si no tienes conexión o un servidor no responde, la firma funciona igualmente (sin el sello de tiempo) y la pantalla del certificado indica simplemente que no se pudo hacer la comprobación.

## Qué se guarda en tu dispositivo

Foliato guarda lo siguiente de forma local, usando el almacenamiento estándar de aplicaciones del sistema operativo:

- **Tus preferencias**: idioma, tema claro/oscuro, si se comprueba la revocación en línea y si el sello visible de la firma muestra tu número de documento.
- **Un contador de exportaciones completadas**, que se usa únicamente para decidir cuándo es razonable mostrar el diálogo nativo del sistema para "valorar esta app" (a través de las APIs de valoración propias de Apple y Google). Foliato no sabe si realmente has dejado una valoración; eso lo gestiona por completo la App Store o Google Play.
- **Certificados guardados, solo si decides guardarlos.** El fichero de certificado (`.p12` o `.pfx`) que guardas se almacena cifrado en el dispositivo (AES-256-GCM). La clave de cifrado se guarda en el Llavero de iOS o en el Keystore de Android, ligada a este dispositivo y sin pasar a otro dispositivo mediante una copia de seguridad. **La contraseña de tu certificado no se guarda nunca**: Foliato te la pide cada vez que firmas. Puedes borrar un certificado guardado en cualquier momento en Ajustes (deslízalo hacia la izquierda), y si desinstalas la app, Foliato elimina cualquier clave que haya quedado la próxima vez que se instale.

Nada de esto sale nunca de tu dispositivo.

## Ninguna recogida de datos

Foliato no tiene cuentas, ni servidor, ni analítica, y no recoge información personal. Las únicas peticiones que hace la app son las descritas arriba, que van directamente desde tu dispositivo al servidor de sellado de tiempo o de la autoridad de certificación; Foliato nunca las recibe. En concreto:

- **Sin cuenta ni registro**: no se requiere ni se solicita nombre, correo electrónico ni ningún otro identificador personal.
- **Sin analítica ni seguimiento**: no se usa ningún SDK de analítica, red publicitaria ni servicio de seguimiento de terceros.
- **Sin datos de ubicación**: la App no accede a la ubicación de tu dispositivo.
- **Sin cámara ni micrófono**: la App no accede a la cámara ni al micrófono.
- **Sin compras**: Foliato no tiene compras integradas ni suscripciones.

## Privacidad de menores

Foliato no recoge conscientemente ninguna información de nadie, incluidos los menores de 13 años.

## Cambios en esta política

Si esta política cambia en el futuro, la versión actualizada se publicará en esta misma URL con una nueva fecha de "Última actualización".

## Contacto

Si tienes alguna pregunta sobre esta política de privacidad, puedes escribir a través de la página de [contacto de tanis.codes](/posts/) o abrir un issue en el [repositorio de GitHub](https://github.com/tanisperez).
