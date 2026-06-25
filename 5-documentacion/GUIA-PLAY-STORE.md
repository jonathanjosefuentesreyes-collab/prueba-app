# Guía para publicar en Google Play (TWA)

La app es una PWA; a Play se entra empaquetándola como **TWA (Trusted Web Activity)** sin
reescribir código. Esta guía es para Jonathan: sigue los pasos en orden.

> Estado al 2026-06-24: el **lado de código está listo** (ver §1). Lo que falta son pasos
> tuyos en herramientas externas (§2–§5).

## 1. Lo que ya está hecho en el código ✅
- **Manifest** completo y válido (`/manifest.webmanifest`): name, short_name, icons 192/512/
  maskable, start_url, display standalone, theme/background color, shortcuts.
- **Iconos** en `public/` (192, 512, maskable) y favicon copihue.
- **Service worker** registrado (instalable como PWA).
- **assetlinks.json** servido en `/.well-known/assetlinks.json` (configurable por variables
  de entorno — ver §3).
- **Canal de reporte de contenido IA** (requisito de Play para apps con IA): botón
  "Reportar" en cada respuesta del chat → abre un correo al contacto. Ya está en producción.
- **Seguridad**: CSP estricta, headers, sin secretos en el bundle, SQL parametrizado,
  JSON-LD escapado, `npm audit` en 0. Dominio propio con HTTPS (leyesdechile.com).

## 2. Empaquetar la TWA (elige una)
**Opción fácil — PWABuilder (web, sin instalar nada):**
1. Entra a https://www.pwabuilder.com e ingresa `https://leyesdechile.com`.
2. Revisa que detecte el manifest y el service worker (deberían salir en verde).
3. "Package for stores" → **Android** → genera el paquete. Descarga el `.aab` (para subir) y
   el archivo `assetlinks.json` que te da (trae el **fingerprint SHA-256** de la firma).
4. Anota el **package name** (ej. `com.leyesdechile.twa`) y el **SHA-256 fingerprint**.

**Opción CLI — Bubblewrap:** `npm i -g @bubblewrap/cli` → `bubblewrap init --manifest
https://leyesdechile.com/manifest.webmanifest` → `bubblewrap build`. Guarda el keystore.

## 3. Activar assetlinks (vincula la web con la app)
En **Render → tu servicio → Environment**, agrega:
```
ANDROID_PACKAGE            = com.leyesdechile.twa     (el package real que usaste)
ANDROID_SHA256_FINGERPRINT = AA:BB:CC:...:ZZ          (el fingerprint SHA-256)
```
Guarda → Render redepliega. Verifica en el navegador que
`https://leyesdechile.com/.well-known/assetlinks.json` muestre tu package y fingerprint.
(Sin esto, la TWA muestra la barra del navegador y no pasa como app.)

## 4. Play Console — crear la ficha
1. Cuenta de desarrollador: **US$25 una vez** + verificación de identidad (cédula).
   ⚠️ Cuenta **personal**, NO la registres como "servicio de gobierno" ni te hagas pasar
   por oficial (rechazo seguro). Somos información ciudadana, atribuida a la BCN.
2. Crear app → idioma español (Chile), app gratuita.
3. **Ficha**: título "Leyes de Chile", descripción honesta (biblioteca legal + AbogaBot con
   IA + calculadora), capturas, icono. Sin promesas ni "servicio oficial del Estado".
4. **Política de privacidad**: enlaza `https://leyesdechile.com/privacidad`.

## 5. Formularios obligatorios de Play (los más delicados)
### Seguridad de los datos (Data Safety) — declarar EXACTO esto:
- **Datos que se COMPARTEN con terceros**: SÍ.
  - *Mensajes/actividad in-app* → se envían a **Google (Gemini)** para responder el chat.
  - *Identificadores del dispositivo / cookies* → **Google AdSense** (publicidad), cuando
    los anuncios estén activos.
- **Datos que se RECOPILAN (se almacenan)**: prácticamente ninguno en servidor propio. La
  app guarda preferencias y consultas **en el dispositivo** (localStorage), sin cuentas.
- **Cifrado en tránsito**: SÍ (HTTPS). **Forma de pedir borrado**: el contacto de privacidad.
- ⚠️ Debe ser **coherente con la Política de Privacidad** (§4) — si difieren, suspenden.

### Contenido generado por IA
- Declarar que la app usa IA (AbogaBot/Gemini). Ya cumplimos los dos requisitos: **disclaimer
  visible** en cada respuesta y **botón de reportar** contenido problemático.

### Clasificación de contenido (IARC) y público objetivo
- Responder el cuestionario con honestidad (app informativa, sin contenido sensible). Público
  general (no dirigida a menores).

## 6. Subir y publicar
1. Sube el `.aab` en **Testing interno** primero. Instálala en tu teléfono desde el enlace de
   prueba y revisa: abre sin barra de navegador (assetlinks OK), chat, calculadora, biblioteca,
   botón de reporte. Móvil real.
2. Cuando esté ok → promover a **Producción** y enviar a revisión.

## 7. Notas y pendientes menores
- **Icono maskable**: hoy `icon-maskable-512.png` es igual al normal; idealmente debe tener
  ~20% de margen de seguridad. PWABuilder puede generarlo bien desde un PNG cuadrado.
- **Correo de contacto**: hoy es el Gmail personal; cuando exista correo del dominio,
  cambiarlo (mejor imagen y requisito de algunas tiendas).
- **Anuncios en la app**: AdSense es para web. Dentro del TWA, lo limpio es **AdMob** o
  desactivar anuncios en el contexto app (ver skill `abogabot-cumplimiento`).
- **Apple App Store** es aparte y más difícil (no soporta TWA; riesgo de rechazo por wrapper).
  Esta guía es solo para **Google Play**.
