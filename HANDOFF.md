# HANDOFF / RUNBOOK — Ley Chilena · AbogaBot v2  (2026-06-17)

## ▶ CÓMO USAR ESTE ARCHIVO (ventana nueva)
1. Pega esto como primer mensaje:
   **"Lee `Leyes chilenas/HANDOFF.md` completo y empieza por la TAREA 1. Antes de cada cambio haz backup en `_backups/`. No cites artículos que no existan en la base."**
2. Sigue las TAREAS en orden (§B). Cada una es autocontenida: objetivo → archivos → datos ya verificados → pasos → verificación.
3. Al terminar cada tarea: `npx tsc --noEmit` → captura si es UI → `git add -A && commit && push` (Render auto-despliega).
4. Marca la tarea como hecha en §B y sigue con la próxima.

---

## A. CONTEXTO MÍNIMO (no re-explorar)
- **App:** `Leyes chilenas/3-aplicacion/` — Next.js 16 (App Router, standalone). Web de leyes chilenas
  (SQLite+FTS5) + chatbot **AbogaBot** (Gemini). Monetiza con AdSense + Premium.
- **Repo:** https://github.com/jonathanjosefuentesreyes-collab/prueba-app  (raíz repo = `Leyes chilenas/`, app en `3-aplicacion/`).
- **Producción:** https://leyes-de-chile.onrender.com  · Render `srv-d8oeegbeo5us73e5i9eg` · **auto-deploy al push a `main`**.
  - Render API key del usuario: `rnd_w9mXRFIvqAcRZqF7Cyc5W063sq3B` (pedirle que la REVOQUE al terminar).
- **Dev:** `http://localhost:3000` (suele estar corriendo, hot-reload). Si no: `cd 3-aplicacion && next dev`
  (usar `dev`, no `start`). Si node colgado: `powershell Get-Process node | Stop-Process -Force`.
- **Capturas:** `herramientas-captura/` (Playwright Pixel 7 → screenshot → leer PNG).
- **🔁 Cron semanal (auto-actualización):** GitHub Actions `.github/workflows/actualizar-valores.yml`
  corre `3-aplicacion/scripts/actualizar-valores.mjs` cada **lunes 12:00 UTC (~08:00 Chile)**:
  refresca **UF, UTM, dólar y euro** (mindicador.cl) en `src/lib/valores.json`, hace commit si
  cambian y Render auto-despliega. **Es EL cron donde va cualquier dato actualizable**: si se agrega
  un valor que cambia con el tiempo (nuevo indicador, tasa, tope), añadirlo a ese script (no crear
  otro cron). La retención de honorarios es por AÑO (tabla fija 2020-2028 en `lib/facturacion.ts`,
  el año actual se toma solo). El conversor además refresca en vivo al abrirse.

### Reglas duras (NO romper)
- **Nunca inventar/citar artículos inexistentes.** Enlaces siempre `/leyes/{norma_id}?art={articulo_id}` verificados contra la base.
- **GEMINI_API_KEY solo server-side.** Casos sensibles (suicidio→*4141, VIF→1455/133/149) los maneja el CÓDIGO y no se rate-limitean. El disclaimer lo pone el código.
- **Backup obligatorio** antes de cada cambio: copiar archivos a `Desktop/vs and claude/_backups/<timestamp>--desc/`.

### Datos verificados (úsalos directo)
- **norma_id:** Código del Trabajo **207436** · Código Civil **172986** · Ley 14.908 Pensiones **27977**
  (⚠️ refundido ANTIGUO: NO citar sus artículos; anclar alimentos en Código Civil) · Ley 19.628 DICOM **141599**.
- **IDs de artículo ya resueltos:**
  - Cód. Trabajo: 159→3293, 160→3294, 161→3295, 162→3297, 163→3298, 168→3304, 169→3305.
  - Cód. Civil (alimentos): 321→498, 323→500, 329→506, 332→509.
  - Ley 19.628 (DICOM): 12→10592, 18→10598, 19→10599.
- **Resolver IDs nuevos:**
  ```bash
  cd "Leyes chilenas/3-aplicacion" && node -e "const db=require('better-sqlite3')('data/leyes.db',{readonly:true});const a=(n,x)=>db.prepare(\"SELECT id,encabezado FROM articulos WHERE norma_id=? AND encabezado LIKE ? ORDER BY LENGTH(encabezado) LIMIT 4\").all(n,'Artículo '+x+'%');console.log(a(207436,162));"
  ```
- **Buscar norma_id por nombre:** mismo patrón sobre tabla `normas` (cols: id, nombre_corto, titulo). Duplicados refundidos excluidos en db.ts: 3471, 3551, 176925, 1160403.
- **Assets mascota (`3-aplicacion/public/`):** `abogabot.png` (fondo blanco, círculo en pestañas) ·
  `abogabot-personaje.png` (transparente, /chat) · `abogabot-premium.png` (dorado, solo /premium hero).
  ffmpeg disponible. Muestrear color: `ffmpeg -i x.png -vf "crop=1:1:X:Y" -f rawvideo -pix_fmt rgba - | od -An -tu1`.

### Estado actual
- Nav 5 pestañas: Leyes 📚 · Guías 💡 · Inicio 🏠 · Guardados ❤️ · Premium 👑 (`components/BottomNav.tsx`).
- ChatBar (mascota fija + input→/chat) en TODAS las pestañas. Chat persistente PERMANENTE.
- Guías en `src/lib/guias.ts`: **75 ÚNICAS — ✅ 15 por grupo** (Laboral·Vivienda·Familia·Consumidor·👑Deudas).
  (2026-06-21: se detectaron y ELIMINARON 7 pares duplicados, y se repusieron con temas nuevos
  distintos hasta dejar 15 únicas por grupo. Todas con citas verificadas contra la base.)
  norma_id verificados (para futuras guías): Ley 19.496 (1160403) 16→138537 (cláusulas abusivas),
  20→138557 (garantía triple opción), 21→138558 (6 meses), 28→138568 (publicidad engañosa),
  3bis→138512 (retracto); Ley 18.101 Arriendo **29526** (3→9607 desahucio, 4→9608 restitución);
  Ley 21.442 Copropiedad **1174663** (36→10644 corte servicios); Ley 20.830 AUC **1075210**
  (1→11140,15→11154,16→11155); Cód.Civil: filiación 186→360,195→369,199→373; relación directa
  229→405; patria potestad 243→420,244→421,245→422; régimen 1718→1904; reparaciones 1927→2140,
  1940→2153; subarriendo 1946→2159; consignación 1599→1785; cesión crédito 1901→2114,1902→2115;
  fianza 2335→2548; benef.inventario 1247→1433; sociedad conyugal 1740→1926,1750→1936.
  ⚠️ NO existen en la BD curada: Ley 18.010, Ley 20.009, Código de Procedimiento Civil (no citarlos).
- ✅ SEO afinado: páginas de ley con JSON-LD Legislation+BreadcrumbList+canonical+H1+migas; guías con
  migas + breadcrumb completo; home con WebSite(SearchAction)+Organization; OpenGraph/Twitter global;
  sitemap cubre las 20.088 leyes + páginas fijas (facturacion/premium/legales). Fix: disclaimer de guías
  ya no dice "Código del Trabajo" (era erróneo para familia/deudas) → "legislación chilena vigente (BCN)".
- ⏳ PENDIENTE: **bloquear las guías de DEUDAS para Premium** con un **cuadro dorado** que las
  destaque en el carrusel/listado de Guías (candado + CTA a /premium; mantener el slug/SEO pero
  mostrar resumen y gate). Va con la categoría dorada Deudas ya existente.
- ⏳ PENDIENTE DISEÑO: el usuario pidió alinear la web al **diseño institucional gob.cl**
  (framework.digital.gob.cl): header/barra de gobierno, azul institucional, tipografía y
  accesibilidad oficiales, footer. Ya hay layout desktop con sidebar (≥1024px). Usar skill `abogabot-diseno`
  + loop visual (capturar.mjs) antes de desplegar. "Confío en ti, déjala bien."
- Desktop: layout con **barra lateral** (≥1024px) ya implementado (nav izq + contenido ~760px). Riel de anuncios pendiente para cuando AdSense apruebe.
- Chat: se quitaron las Q&A precomputadas; TODO va a Gemini (salvo SENSIBLES). Cuota gratis se agota → recomendar Gemini de pago.
- Lenguaje Simple: 3.695 explicaciones pre-generadas en `src/data/simplificaciones.json` (servidas por /api/simplificar sin Gemini).
  norma_id extra verificados: Ley 20.066 VIF **242648** (5→11580,7→11582,9→11584,15→11594); subarriendo Cód.Civil 1946→2159; compensación Ley 19.947 61→11091,62→11092.
  ### norma_id VERIFICADOS para guías (úsalos directo, evita re-buscar):
  - Código del Trabajo 207436 · Código Civil 172986 · Constitución 242302
  - Ley 18.101 Arrendamiento **29526** · Ley 19.947 Matrimonio Civil **225128**
  - Ley 19.496 Consumidor **1160403** (arts 3→138511, 3bis→138512, 19→138556, 20→138557, 21→138558, 23→138560, 37→138579)
  - Ley 20.720 Insolvencia **1058072** (260→10390, 261→10391) · Ley 19.628 DICOM 141599 · Ley 14.908 27977 (refundido VIEJO, no citar arts)
  - Arrendamiento Cód.Civil: 1924→2137, 1927→2140, 1947→2160, 1950→2163 · Matrimonio: 42→11072, 53→11083, 54→11084, 55→11085
  ### Temas que faltan (alto SEO): Vivienda (garantía de arriendo, subarriendo, gastos comunes, aumento de renta, contrato de arriendo, ruidos/copropiedad, no pago); Familia (pensión alimentos[ya], VIF Ley 20.066 con *1455*, compensación económica, relación directa y regular, reconocimiento de paternidad, acuerdo unión civil); Consumidor (cobros indebidos, publicidad engañosa, garantía autos, repactación, servicios básicos); Deudas (tarjetas/CAE, prescripción[ya], embargo[ya], aval/codeudor, quiebra/liquidación).
- Explorador `components/GuiasExplorer.tsx`: carrusel destacadas + chips de categorías + listado.
- Categorías en guias.ts (`CATEGORIAS`): laboral, vivienda, familia, consumidor. Cada guía: slug, titulo(H1 pregunta),
  descripcion(meta≤155), categoria, destacada, metaTitle, respuestaCorta(snippet), contenido(markdown con enlaces), faq, fecha.

---

## B. TAREAS — SEGUIR EN ORDEN

### ☐ TAREA 1 — Ícono de cabecera (Leyes y Guías)  *(rápida; necesita imagen del usuario)*
Pedido textual: *"agrega esta imagen... el icono de la balanza cambialo por este, haz el icono más grande para que resalte respecto al texto de junto."*
- **PRIMERO pregunta al usuario dónde dejó la imagen** (suele ir al Escritorio o `Desktop/diseño leyes de chile/`). Si no la da, salta a TAREA 2.
- Copiar la imagen a `3-aplicacion/public/` (ej. `escudo-leyes.png`).
- En `components/BibliotecaHeader.tsx`: reemplazar el `<svg className="icono-balanza-header">` por `<img src="/escudo-leyes.png" ...>` más grande que el texto del título.
- **Verif:** captura `/leyes` y `/guias` — el ícono resalta junto a "Biblioteca de Leyes".

### ✅ TAREA 2 — Categoría dorada "Deudas" (Premium) al centro del carrusel  [HECHA]
Pedido: *"agrega una dorada en explorar tema donde recaudarás las guías más polémicas y mejor SEO de deudas; ese botón será premium; déjalo en MEDIO del carrusel de los temas de guía."*
- En `guias.ts`: agregar categoría `deudas` a `CategoriaGuia` y a `CATEGORIAS` (emoji 💰 o 👑, etiqueta "Deudas"). Reasignar la guía `como-salir-de-dicom` a `categoria: "deudas"`.
- En `GuiasExplorer.tsx`: ordenar los chips para que **Deudas quede al CENTRO** del carrusel y con **estilo dorado** (fondo/borde oro, ej. `linear-gradient(135deg,#E6C15A,#C9A227)`), badge "Premium".
- Las guías quedan PÚBLICAS (SEO + AdSense); el oro es solo branding Premium.
- **Verif:** `/guias` muestra el chip dorado "Deudas" centrado; al tocarlo lista las guías de deudas.

### ✅ TAREA 3 — Destacadas = lo más buscado en Google  [HECHA: 8 destacadas curadas]
Pedido: *"las guías destacadas serán las más consultadas en Google."*
- En `guias.ts`, poner `destacada: true` solo en las de mayor volumen de búsqueda (ej.: finiquito, despido por necesidades, pensión de alimentos, salir de DICOM, vacaciones, sueldo/horas extra). Quitar `destacada` a las de cola larga.
- (Opcional) usar la skill `abogabot-seo` para validar el ranking de búsquedas.
- **Verif:** carrusel "Guías destacadas" en `/guias` muestra esas.

### ☐ TAREA 4 — Llegar a 10 guías por macro grupo
Pedido: *"haz 10 guías por cada macro grupo."* Faltan: **Vivienda +9, Familia +9, Consumidor +9, y armar el set Deudas.**
- Producir en TANDAS por grupo. Para CADA guía: 1) elegir tema de alto SEO, 2) resolver IDs de artículos con el script (§A), 3) escribir contenido + respuestaCorta + 4-5 FAQ, 4) enlaces verificados.
- ⚠️ Si la norma en la base es un refundido viejo (caso Ley 14.908), anclar en el código vigente y mencionar la ley por nombre sin enlazar artículos imprecisos.
- Candidatos: **Vivienda**: garantía de arriendo, no pago de renta, término de contrato, reparaciones, subarriendo, gastos comunes, ruidos molestos, contrato de arriendo, desalojo. **Familia**: divorcio, VIF, cuidado personal, relación directa y regular, compensación económica, declarar paternidad, acuerdo de unión civil. **Consumidor**: garantía SERNAC, derecho a retracto, cobros indebidos, publicidad engañosa, garantía de autos, retención de productos. **Deudas**: prescripción de deudas (Cód. Civil 2515/2514), embargo de sueldo (inembargabilidad CdT 57), cobranza extrajudicial (Ley 19.496 art 37), repactación, Ley 20.720 (insolvencia/quiebra persona deudora), tarjetas/CAE.
- **Verif:** chips muestran cada grupo con (10). `npx tsc` ok. Probar 2-3 slugs nuevos (HTTP 200) y que los enlaces de artículos abran.

### ✅ TAREA 5 — Calculadora de finiquito "la mejor para Chile"  [HECHA]
El motor `lib/finiquito.ts` ya era completo (topes 90 UF/11 años, feriado, recargos art 168, Ley Bustos);
se agregó que cada fundamento legal sea CLICABLE a la Biblioteca. Si quieres más: descontar festivos del feriado.

<!-- referencia original -->
### (ref) TAREA 5 original
Pedido: *"la mejor calculadora de finiquito para los chilenos."* Ya existe `/calculadora` (revisar `app/calculadora/page.tsx` y skill `abogabot-finiquito`).
- Asegurar: indemnización por años de servicio (1 mes/año + fracción >6m; **tope 11 años**; **tope 90 UF** en la base de cálculo); indemnización sustitutiva del aviso (art 162); feriado proporcional; recargos art 168 (30% necesidades, 50% sin causal, 80/100% art 160); causales 159/160/161; mostrar la fórmula y el fundamento legal con enlaces a artículos (CdT 161→3295, 162→3297, 163→3298, 168→3304).
- **Verif:** casos de prueba (2 años, sueldo X) dan montos correctos; UI muestra desglose y fundamento.

### ✅ TAREA 6 — Herramienta de facturación + en Premium  [HECHA]
`/facturacion` (lib/facturacion.ts): boleta de honorarios bruto↔líquido (retención editable por año,
2026=15,25%) + IVA 19% neto↔total. Card agregada en /premium. Verificar la tasa de retención del año en sii.cl.

<!-- referencia original -->
### (ref) TAREA 6 original
Pedido: *"agrega la herramienta de facturación también en la pestaña Premium"* + *"haz la mejor herramienta de facturación para Chile."*
- Crear `app/facturacion/page.tsx`: calculadora de **boleta de honorarios** (bruto↔líquido con la **retención vigente del año**; verificar % actual antes de hardcodear) y de **factura/IVA 19%** (neto↔bruto). Mostrar fórmulas y notas SII.
- Enlazarla en `/premium` dentro de "Herramientas Premium" (junto a la calculadora de finiquito).
- **Verif:** `/facturacion` calcula correcto; card visible en `/premium`.

---

## C. HECHO EN LA SESIÓN ANTERIOR (no repetir)
Prompt del chat validado + citas visibles + enlace de artículos exactos · 3 guías SEO (despido necesidades, pensión alimentos [abrió Familia], salir de DICOM [abrió Consumidor]) · nav de 5 pestañas con íconos line-art · mascota AbogaBot (círculo fijo en pestañas; **personaje sin fondo** flotando en /chat; loader = personaje corriendo) · **chat permanente** · ChatBar en todas las pestañas · avatar **dorado** en Premium · service worker cache v2.

## D. UX ABIERTO (revisar si molesta)
- /premium: ChatBar fija puede solaparse con "Suscribirme" al hacer scroll arriba (paddingBottom:196 deja espacio al final).
- /chat vacío: se ven 2 personajes (saludo grande + flotante sobre input). Si se quiere, dejar solo uno.

## E. GOOGLE PLAY (TWA) — listo a medias; faltan pasos de la cuenta del usuario
Ya HECHO en código (no repetir): manifest completo (id/scope/orientation/categories/shortcuts),
íconos reales `icon-192/icon-512/icon-maskable-512.png`, botón **Reportar** en cada respuesta del
bot (política IA de Play). Falta lo que depende de la cuenta de Jonathan:
1. **Cuenta Google Play Developer**: US$25 (una vez) + verificación de identidad (cédula). NO marcar
   como "servicio de gobierno". (Solo Jonathan; Claude no puede pagar/verificar.)
2. **Generar el TWA** con Bubblewrap: `npx @bwa/cli init --manifest https://www.leyesdechile.com/manifest.webmanifest`
   → genera el `.aab` y un **keystore** (guardarlo, da la huella SHA-256).
3. **Digital Asset Links**: crear `3-aplicacion/public/.well-known/assetlinks.json` con la huella del
   keystore y el package name (ej. `com.leyesdechile.app`), luego desplegar:
   ```json
   [{"relation":["delegate_permission/common.handle_all_urls"],
     "target":{"namespace":"android_app","package_name":"com.leyesdechile.app",
       "sha256_cert_fingerprints":["<SHA256 DEL KEYSTORE>"]}}]
   ```
   Verificar que sirva en `https://www.leyesdechile.com/.well-known/assetlinks.json`.
4. **Ficha de Play**: ícono 512, capturas (sacar con Playwright), descripción honesta (sin "oficial
   del Estado"), enlace a /privacidad, **Data safety form** veraz y coherente con /privacidad,
   clasificación IARC. **Anuncios en la app: AdMob o ninguno** (NO AdSense web dentro del TWA).
5. Subir `.aab` → revisión → publicar. (Prioridad: DESPUÉS de que la web tenga AdSense + tráfico.)

## F. AUDITORÍA 2026-06-21 — pendientes de cuenta (lo codeable ya se aplicó)
Ya HECHO en código (no repetir): Consent Mode v2 (`ConsentMode.tsx`, niega ads/analytics
por defecto, lo concede el banner), página `/estandar-editorial` (E-E-A-T) enlazada en el
pie, scaffold de GA4 (`lib/analitica.ts` + `Analitica.tsx`, se activa pegando el Measurement
ID), enlazado interno calculadoras→guías (`GuiasRelacionadas.tsx`).
Falta, y depende de TUS cuentas:
1. **Gemini PAGADO** (Jonathan): en el plan gratis Google ENTRENA con los prompts → por datos
   (no solo cuota) hay que pasar a pagado antes del público real. Es la misma API key, solo se
   activa facturación en Google AI Studio. No requiere cambio de código.
2. **CMP certificada de Google** (Jonathan, panel AdSense → "Privacidad y mensajes" → crear
   mensaje GDPR). Complementa el Consent Mode v2 ya implementado; necesario para servir anuncios
   a la UE de forma conforme.
3. **Google Search Console + GA4** (Jonathan): crear la propiedad GA4 y pegar el Measurement ID
   en `src/lib/analitica.ts`; registrar el sitio en Search Console (verificación por DNS de
   Cloudflare). Con sus queries reales se deciden próximas guías y reescritura de títulos.
4. **Verificar anualmente** la tabla del impuesto único 2ª categoría (`lib/sueldo.ts`, tramos en
   UTM) contra sii.cl; la UTM ya se auto-actualiza por el cron semanal.
5. **Rendimiento (cuando escale):** cachear páginas de ley populares (ISR) e imágenes con
   next/image (hero/mascota) para mejorar LCP. Rellenar ~32 simplificaciones excluidas (necesita
   cuota Gemini).
