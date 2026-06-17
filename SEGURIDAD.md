# SEGURIDAD & PRODUCCIÓN — Ley Chilena / AbogaBot v1.0  (2026-06-17)

Checklist completo para que la app sea segura y de calidad. ✅ = hecho · ⚠️ = lo hace el usuario · ⏳ = a futuro.

## A. Implementado en el código (✅)
- **Cabeceras de seguridad** en TODAS las respuestas (`next.config.ts`):
  - **CSP** estricta (`default-src 'self'`; sin recursos externos; fuentes autohospedadas con next/font).
    `script-src/style-src` con `'unsafe-inline'` (lo necesita Next); en dev se relaja para el HMR.
  - **HSTS** (fuerza HTTPS), **X-Frame-Options: DENY** + `frame-ancestors 'none'` (anti-clickjacking),
    **X-Content-Type-Options: nosniff**, **Referrer-Policy**, **Permissions-Policy** (mic solo para la voz),
    y se elimina **X-Powered-By**.
- **Anti-abuso de las APIs** (`lib/seguridad.ts`):
  - **Mismo origen**: chat, simplificar y checkout rechazan (403) peticiones con Origin de otro sitio
    → nadie puede usar TU Gemini desde su web.
  - **Rate-limit por IP**: chat 3/24h (gancho Premium), `simplificar` 40/10min (antes era un proxy Gemini
    SIN límite = quema de cuota), checkout 20/h. IP tomada del último valor de `x-forwarded-for` (la que ve
    el proxy de Render), resistente a spoofing.
  - **Guard de tamaño**: el chat corta cuerpos > 10 KB (413) antes de parsear.
- **Secretos solo en el servidor**: `GEMINI_API_KEY` nunca en el bundle/repo/imagen (`.env*` en
  `.gitignore` y `.dockerignore`).
- **Sin XSS**: la respuesta del bot se escapa (`&`,`<`,`>`) antes de renderizar; el contenido de guías
  también se escapa. El disclaimer y los casos sensibles los pone el CÓDIGO, no el modelo.
- **Citas verificadas**: los enlaces a artículos se resuelven contra la base (no se inventa nada).
- **DB de solo lectura**; dependencias de producción mínimas (next, react, better-sqlite3).
- **NEXT_PUBLIC_SITE_URL** corregida en Render (antes sitemap/robots apuntaban a localhost → mataba el SEO).

## B. Acciones del USUARIO ahora — IMPORTANTES (⚠️)
1. **REVOCAR la Render API key** que compartiste en el chat (`rnd_...`): está expuesta. Render → Account
   Settings → API Keys → revoca y crea otra si la necesitas.
2. **Restringir la GEMINI_API_KEY** en Google AI Studio / Google Cloud:
   - Límite de cuota diaria y **alerta de presupuesto** (Billing → Budgets & alerts) para que un abuso no
     te genere un cobro sorpresa.
   - Si usas Google Cloud: restringir la key a la API "Generative Language" y por referer/IP del servidor.
3. **2FA** en GitHub, Render y Google (las 3 cuentas que tocan el proyecto).
4. **Variables en Render** (Settings → Environment), nunca en el repo: `GEMINI_API_KEY`,
   `NEXT_PUBLIC_SITE_URL` (ya seteada), opcional `LIMITE_CHAT_CONSULTAS` / `LIMITE_CHAT_HORAS`.
5. **Banner de consentimiento de cookies (CMP)** antes de activar AdSense: obligatorio para visitantes de
   la UE; Google exige un CMP certificado. (Hoy la app no guarda PII en servidor: el historial del chat y
   los guardados viven en el `localStorage` del usuario — bueno para privacidad.)
6. Revisar que `/privacidad`, `/aviso-legal` y `/quienes-somos` reflejen: que es orientación general (no
   asesoría), de dónde salen los datos (BCN), y que el chat usa IA (Gemini).

## C. Para AdSense y escala (⏳)
- **Al integrar AdSense**: agregar a la CSP los dominios de Google
  (`script-src https://pagead2.googlesyndication.com https://partner.googleadservices.com`;
  `frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com`;
  `img-src ... https:`). Sin esto, los anuncios no cargan.
- **Rate-limit distribuido** (Upstash/Redis) si algún día hay más de una instancia (hoy free = 1 instancia,
  el límite en memoria basta). Misma interfaz en `lib/seguridad.ts`.
- **Cloudflare gratis delante** del dominio: WAF, protección anti-bots y rate-limit de red.
- **Captcha invisible** (Cloudflare Turnstile) en el chat solo si aparece abuso real.
- **npm audit**: queda 1 moderada (postcss vía Next) — riesgo práctico bajo (no procesamos CSS de terceros);
  resolver subiendo Next cuando haya patch. NO usar `npm audit fix --force` (degrada Next a v9).

## D. "La mejor app" — calidad y producción
- **SEO**: `robots.ts` + `sitemap.ts` ok (con la URL ya corregida); títulos/meta/schema (Article, FAQPage,
  Breadcrumb) en guías; enlazado interno. Dar de alta el sitio en **Google Search Console** y enviar el sitemap.
- **Rendimiento**: build standalone, DB cacheada en memoria, imágenes optimizadas. Render free DUERME a los
  15 min (primer acceso ~30-50s); si el tráfico lo justifica, subir de plan o usar un ping/cron.
- **PWA**: manifest + service worker (cache v2, network-first).
- **Accesibilidad**: barra de tamaño de letra + "lenguaje simple", `lang="es"`, labels ARIA.
- **YMYL/Legal**: disclaimers por código, fuente oficial BCN, casos sensibles (suicidio *4141, VIF 1455/133)
  manejados sin rate-limit.
- **Analítica**: integrar GA4 + Search Console + AdSense y revisar con la skill `abogabot-analitica`.
- **Dominio propio** (ej. leydechile.cl) mejora marca y SEO; apuntar a Render y actualizar `NEXT_PUBLIC_SITE_URL`.

## Verificación hecha (build de producción)
Headers presentes · 0 violaciones CSP · hidratación OK · 403 ante origen ajeno (chat/simplificar/checkout)
· 413 ante body > 10 KB · 200 en uso normal.
