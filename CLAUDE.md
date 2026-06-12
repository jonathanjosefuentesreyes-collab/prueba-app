# Ley Chilena (AbogaBot v2) — leyes chilenas + chatbot legal con Gemini, monetizado con anuncios

Sucesor de Harvey/AbogaBot v1 (borrada a propósito el 2026-06-11). Este archivo guarda
lo **estable**: arquitectura, reglas y lecciones. El estado vivo está en `CONTINUAR.md`.
Marca visible en el diseño del usuario: **"Ley Chilena"** (azul #0039A6 / rojo #CE1126,
huasito asistente). Nombre definitivo/dominio: pendiente de decisión del usuario.

## Estructura de carpetas (mapa completo en `LEEME.md`)

- `1-diseno-web/` — diseño de la página (`pagina-principal.html` mejorada,
  `original-stitch.html` intacto, `assets/` con logo y huasito locales)
- `2-archivo-maestro-leyes/` — `FORMATO-LEYES.md` (spec) y `leyes.jsonl` (fuente de verdad)
- `3-aplicacion/` — código Next.js
- `4-guias/` — guías ciudadanas (SEO/AdSense)
- `5-documentacion/` — decisiones, QA, notas

## Qué es

Sitio web público donde cualquier ciudadano chileno (a) navega y busca las leyes más
consultadas y (b) chatea con un asesor legal IA que responde simple, cita artículos
reales y dice qué hacer ahora. Modelo de negocio: tráfico orgánico (SEO de la
biblioteca de leyes y guías) monetizado con Google AdSense.

## Stack (decidido 2026-06-11)

- **Next.js (App Router, TypeScript)** — un solo framework para todo: páginas
  estáticas por ley/artículo/guía (SSG → SEO, que ES el modelo de negocio) y API
  routes para el chat. *Por qué se cambió respecto de v1 (Express + SPA vanilla):
  una SPA no rankea en Google; sin SEO no hay tráfico y sin tráfico no hay anuncios.*
- **SQLite + FTS5** (`better-sqlite3` v12+ — la v11 no compila en Node 24). Sin
  embeddings ni vector DB. *Por qué: FTS5 demostró ser suficiente en v1.*
- **Gemini** (`gemini-2.5-flash-lite` por defecto; modelo configurable por env var,
  nunca hardcodeado). Free tier para desarrollo; en producción, límite de mensajes
  por visitante/día antes de pagar. *Por qué flash-lite: es el más barato y el caso
  de uso es RAG simple con contexto corto.*
- **Hosting**: Railway o Fly.io con volumen persistente para el archivo SQLite
  (la DB es de solo lectura en runtime, las leyes no cambian a diario).

## Reglas duras

1. **La API key de Gemini JAMÁS toca el navegador** — solo server-side (en v1 un
   prototipo la exponía en el cliente; no repetir).
2. **Disclaimer legal forzado por código** en cada respuesta del chat, no por prompt
   ("orientación general, no asesoría legal; para tu caso consulta a un abogado").
3. **Toda respuesta cita fuentes reales de la DB** (`fuentes[]` con id de artículo).
   Cero artículos inventados. QA con la skill `abogabot-qa` tras tocar scraper, DB,
   prompt o personalidad, y antes de toda demo o deploy.
4. **Navegación por `id` de fila; el número de artículo se deriva del encabezado en
   lectura** (`numeroReal()`). Nunca confiar en contadores posicionales ni usar
   `UNIQUE(ley_id, numero_real)`: los textos refundidos reutilizan numeración
   (Código Civil + leyes anexas) y colisionarían.
5. **Tono para ciudadanos comunes**: respuestas ≤120 palabras, lenguaje simple, una
   cita legal, "qué hacer ahora" con plazos.
6. Anuncios en biblioteca y guías; **no dentro de la conversación del chat**.

## Scraper BCN (lecciones de v1 — no re-aprender)

- XML público sin Playwright: `https://www.leychile.cl/Consulta/obtxml?opt=7&idNorma=N`
- La BCN responde **429 agresivamente** y bloquea la IP ~20+ min: backoff 30/60/120 s,
  pausa de 15 s entre normas, scraper idempotente (omite normas ya cargadas) para
  reintentar por tandas.
- Validar el título oficial devuelto contra una palabra clave esperada para descartar
  `idNorma` erróneos.
- Los encabezados vienen como "Artículo N" **y** "Art. N" — parsear ambos.
- idNorma que fallaron en v1 y hay que verificar a mano: 1974, 1984, 242302.

## Ingesta y actualización de leyes (diseño 2026-06-11)

- **Fuente de verdad**: `2-archivo-maestro-leyes/leyes.jsonl` generado por el usuario
  (vía Antigravity CLI) según la spec de `2-archivo-maestro-leyes/FORMATO-LEYES.md`,
  con texto descargado de la BCN — nunca
  generado por un LLM. Vive en el repo, NO en Google Docs (los docs no se parsean
  confiablemente ni versionan por artículo; la vista humana de las leyes es la
  propia Biblioteca de la app).
- **Importador** (`npm run import:leyes`): valida el JSONL (parseo, normas con
  artículos, títulos esperados, muestreo contra BCN) y carga a SQLite. Idempotente:
  re-importar actualiza, no duplica.
- **Actualizador automático** (`npm run update:bcn`): job programado que por cada
  norma cargada consulta el XML de la BCN (pausado: 15 s entre normas, backoff ante
  429), compara `fecha_version` del XML — y como respaldo un hash del contenido —
  contra lo guardado. Si cambió: actualiza los artículos en la DB, registra el
  cambio en un log de cambios (tabla `cambios_normas`), y dispara la regeneración
  de las páginas estáticas afectadas (revalidate de Next.js o rebuild).
  Frecuencia: **semanal** (las leyes cambian poco y así la BCN no nos bloquea);
  en local Task Scheduler de Windows, en producción cron del hosting o GitHub Action.
- Cada ley muestra en el sitio su "última actualización BCN" — confianza para el
  usuario y señal de frescura para SEO.

## Comandos

(Se documentan aquí a medida que existan: `npm run scrape:bcn`, `npm run dev`, etc.)

## Estado y pendientes

Ver `CONTINUAR.md` — leerlo SIEMPRE al retomar; actualizarlo SIEMPRE antes de cerrar
la sesión.
