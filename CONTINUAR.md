# Ley Chilena (AbogaBot v2) — CONTINUAR.md

Última actualización: **2026-06-22**. **EN VIVO: https://leyesdechile.com** (dominio propio,
Render + Cloudflare; el subdominio `leyes-de-chile.onrender.com` es solo el origen técnico).

## 🔥 Calidad de ingeniería + SEO + marca + escala (2026-06-21/22)

**Red de calidad (respuesta a crítica de mantenibilidad):**
- **Vitest + 91 tests**, ESLint (flat Next 16), Prettier, **CI GitHub Actions**
  (typecheck+lint+test+build por push/PR; `.github/workflows/ci.yml` con `gunzip leyes.db.gz`),
  **Dependabot** + `npm audit`. **DRY**: `lib/limiteDiario.ts`, `lib/clp.ts`,
  `components/FilaResultado.tsx`, `components/LimitePremium.tsx`.
- Los 91 tests cubren lo crítico antes sin tests: `db.ts` (numeroReal/normaPorReferencia/
  articuloPorNumero, anti-invención contra la base), casos sensibles extraídos a
  `lib/casos-sensibles.ts` (suicidio→*4141 / VIF→1455, con tests), anti-XSS (`formato-chat`),
  anti-spoofing de IP (`seguridad`), e integridad + citas de las 75 guías (`guias.test.ts`:
  cada `/leyes/N?art=M` existe y pertenece a la ley citada).

**SEO + marca (target de búsqueda: "leyes de chile"; competidor a superar: leyesdechile.cl,
NO la BCN oficial):**
- **Marca unificada de "Ley Chilena" → "Leyes de Chile"** en TODO (títulos, schema/siteName,
  las 75 guías metaTitle, logo de texto). Coincide con el dominio = señal fuerte.
- **Canónico = `leyesdechile.com` (SIN www)**. Fallback en código sin-www; en **Render,
  `NEXT_PUBLIC_SITE_URL` DEBE ser `https://leyesdechile.com`** (estaba mal en el `.onrender.com`).
- Título de portada lidera con "Leyes de Chile".

**🚨 INCIDENTE Cloudflare (caída breve + lección):** una redirección de host www→no-www en
`next.config` causó bucle **"too many redirects"** (chocaba con la del proxy). Removida. Reglas:
**Cloudflare SSL/TLS = "Full (strict)", NUNCA "Flexible"**; **NO redirecciones de host en
`next.config`** (la canonicalización de host va en Cloudflare/Render; el SEO con `<link canonical>`).

**Seguridad (frontend + backend): sin fugas.** GEMINI_API_KEY = 0 en el bundle del navegador
(probado), solo server-side; `.env*` gitignored; sin secretos hardcodeados; errores genéricos.

**AdSense: EN REVISIÓN sobre leyesdechile.com.** `ads.txt` con `pub-2385748205470679`, dominio
propio, privacidad/consentimiento/Consent Mode v2 OK, contenido real. Nada crítico falta; lo
demás (Gemini pagado, GA4/Search Console, CMP certificada) espera a la aprobación.

**Escala:** 20.088 normas · 139.876 artículos (FTS5) · 99 páginas estáticas · Cloudflare CDN · ~$0/mes.

**Pendiente al retomar:** cacheo de borde en Cloudflare (próxima palanca); Sentry (necesita
cuenta); post-AdSense → `next/image`, partir `guias.ts`, Search Console.

> ⚠️ **Privacidad del repo:** `prueba-app` es PÚBLICO y versiona docs internos (este
> CONTINUAR.md, CLAUDE.md, SEGURIDAD.md, etc.) → estrategia visible. Evaluar pasarlo a
> **privado** (Render despliega igual desde repo privado). No hay credenciales expuestas
> (la key vive en `.env*`, gitignored).

---

### (histórico) MVP LIVE EN RENDER — 2026-06-16
🚀 **https://leyes-de-chile.onrender.com** (plan Free). Chat (3/día), calculadora (1/día),
biblioteca DB, guías y PWA — todo verificado funcionando en producción.

> **Hosting = Render** (service `srv-d8oeegbeo5us73e5i9eg`, repo público `prueba-app`, root
> `3-aplicacion`, Docker, auto-deploy ON). Fly abandonado (trial terminado). La DB va comprimida
> en git (`data/leyes.db.gz`, 79MB) y el Dockerfile la descomprime. Render free duerme tras
> 15 min (cold start ~30-60s). Gemini sigue free (tope diario global) → pagar para público real.

## 🛡️ Cumplimiento + QA de las 52 guías (2026-06-20)

Sesión en paralelo con Jonathan. Foco: dejar todo listo para lanzar, lado legal/cumplimiento.

- **Nueva skill `abogabot-cumplimiento`** (rulebook de TODOS los términos y condiciones:
  Gemini, AdSense, Búsqueda, Google Play/TWA, ley chilena de datos/consumidor/IP/ejercicio
  profesional). Prevalece sobre las demás. Registrada en `MEJORAS-SKILLS.md`.
- **Mejoras de cumplimiento en la app** (build OK, 71 rutas): Privacidad ahora declara
  derechos ARCO + portabilidad, Ley 21.719 y que el free tier de Gemini entrena con los
  prompts; Aviso legal agrega "no crea relación abogado-cliente" + "el chat es IA falible,
  verifica la fuente"; el chat muestra aviso de no escribir datos sensibles. (Alguien ya
  agregó `reportarRespuesta()` en `ChatClient.tsx` → cubre la política de IA de Play.)
- **Scorecard de lanzamiento**: `5-documentacion/CHECKLIST-LANZAMIENTO.md` (checklist de
  cumplimiento vs. estado real + lo que depende de decisiones del usuario).
- **🔢 CORRECCIÓN: hay 52 guías, no 6** (alguien las produjo en paralelo). Categorías:
  laboral, vivienda, familia, deudas, consumidor. → requisito de cantidad para AdSense YA
  cumplido.
- **✅ QA Nivel 2 de las 52 guías = APTO** (`node scripts/qa-citas-guias.mjs`, nuevo, regresión):
  **100/100 citas únicas existen en la DB y su norma coincide; cero inventadas.**
- **🎉 El bloqueante de datos de familia/consumidor quedó RESUELTO**: la DB ya tiene la
  **Ley 19.496 versión 2021** (norma 1160403, v.2021-05-31) — el art. 21 dice textual
  "dentro de los **seis** meses" (no los 3 viejos). La guía de garantía cita 6 meses y la DB
  lo respalda. La guía de pensión cita el Código Civil (vigente) y enuncia los mínimos
  40/30% + Registro de Deudores en prosa (correcto). **Ya no aplica la advertencia de
  "guías de familia/consumidor diferidas".**
- **Pendiente menor a futuro**: la Ley 19.628 (datos, norma 141599) está en v.1999; cuando
  la **Ley 21.719 entre en vigencia (1-dic-2026)** revisar la guía de DICOM y sus citas.

## ✅ MVP freemium + auditoría (2026-06-16)

Modelo definido con el usuario y aplicado:
- **Biblioteca de leyes** = la base de datos (SQLite/FTS5): **sin Gemini, ilimitada y gratis**.
- **Calculadora de finiquito**: **1 cálculo gratis/día por persona** (localStorage, gancho
  Premium). Indicador "Tienes 1 cálculo gratis hoy"; al 2º intento → caja Premium (placeholder).
  Motor determinista intacto (`probar-finiquito.ts` pasa).
- **Chatbot**: **3 consultas gratis/día** (ventana 24h; antes 12h). Cita solo del contexto;
  al agotarse → gancho Premium. Descuenta solo si la respuesta sale bien.
- **PWA instalable**: agregado `public/sw.js` (service worker network-first, no toca /api) +
  `RegistrarSW` en el layout. Manifest ya estaba (standalone, theme, maskable).

**Auditoría (abogabot-qa)**: build limpio; **14/14 rutas 200, cero 404**; key solo
server-side (no en bundle); citas del chat ancladas al contexto (anti-invención). Verificado
visualmente con Playwright (home, guías, calculadora, chat, biblioteca, splash).
**Veredicto: APTO CON PENDIENTES** (los pendientes no son bugs; son datos + infra + contenido).

### Falencias / pendientes propuestos (NO bloquean que el MVP funcione)
1. **Datos viejos en 2 leyes** (ya conocido): Ley 14.908 (1962, sin mínimos 40/30% ni Registro
   de Deudores) y Ley 19.496 (art. 21 dice 3 meses; la reforma 2021 son 6). El chat puede citar
   texto desactualizado → re-bajar de BCN antes de promocionar guías de pensión/consumidor.
2. **Infra (decisión del usuario, cuesta plata)**: Gemini free topa cuota diaria global → el
   chat cae a "problema técnico"; Render free duerme (cold start ~30-60s). Para público real:
   Gemini pagado; hosting con tarjeta o aceptar el sleep de Render.
3. **Premium es placeholder** (sin pasarela). Cuando haya tráfico: Webpay/Flow/Mercado Pago o
   membresía. La calculadora 1/día es barrera suave (localStorage, bypasseable en incógnito).
4. **AdSense aún no**: faltan dominio propio + 12-15 guías + analítica (GA4/Search Console).
   El ingreso inicial real es tráfico SEO (más guías), no anuncios todavía.
5. **Menor**: `logo.png` es JPEG etiquetado .png (funciona, Chrome lo sniffa); ideal un PNG
   real con zona segura para el ícono maskable.

## 🎨 Pulido de interfaz + pestaña Guías + skills (2026-06-15, sesión noche 2)

Revisión visual con Playwright (capturas en `herramientas-captura/`) y pulido guiado por la
**nueva skill `abogabot-diseno`** (sistema de diseño móvil + loop visual). Cambios verificados
en capturas locales (la app no se pudo capturar en prod, ver bloqueante Fly):

- **Pestaña "Guías" en el menú inferior** (`BottomNav.tsx`): ahora 4 tabs —
  **Inicio · Guías · Leyes · Calculadora**. "Guías" → `/guias` (carrusel de destacadas +
  "qué hacer" + ChatBar para más dudas; ese contenido lo armó el chat paralelo f27cd7e6).
- **Quitada la burbuja `.globo`** del ChatBar (se encimaba al contenido en home y guías) +
  `paddingBottom` subido a 132 en home y `/guias` para que nada quede tapado por la barra flotante.
- **Chips de fuente con afordancia de enlace verificable** (`.chip`): icono de documento +
  chevron + borde → se ven clicables. Es el foso (cita verificable) luciéndose ([[abogabot-competencia]]).
- Nav inferior ajustado para 4 ítems (nowrap, píldoras un poco más angostas).

### Skills (mejora continua — con permiso del usuario para editar/eliminar)
El usuario dio permiso permanente para editar/eliminar skills a mi criterio (respaldo: copia
en `~/.claude/skills-backup-2026-06-15` + git init dentro de `~/.claude/skills`). Cambios:
**creé `abogabot-diseno`**, **podé `abogabot-master`** (saqué la tabla de ruteo que se
desincronizaba; quedó como mapa de las 2 cadenas + orden de flujo, ahora con diseno), y
verifiqué/anoté el comando de `abogabot-finiquito` (corre en Node 24). Todo en `MEJORAS-SKILLS.md`.

### 🚨 DOS BLOQUEANTES DE INFRAESTRUCTURA (decisión del usuario, cuestan plata)
1. **Gemini free tier agotado**: tope DIARIO de requests de `flash-lite` muy bajo; el chat
   muestra "problema técnico" hasta el reset diario. Para público real → **plan pagado de Gemini**.
2. **Trial de Fly.io TERMINÓ**: los logs dicen "Trial machine stopping… add a credit card" y
   "trial has ended". La máquina **se apaga a los 5 min** y ya no arranca on-demand → la app
   está caída. El deploy SÍ subió la imagen nueva (lista para correr). Para que esté arriba 24/7
   → **agregar tarjeta en fly.io/trial** (o migrar a otro host). **Decisión pendiente del usuario.**

> **Cómo retomar**: leer `CLAUDE.md` (arquitectura y reglas duras — NO repetirlas
> aquí) y este archivo. La app vive en `3-aplicacion/`. Encenderla:
> `npm run dev -- -H 0.0.0.0 -p 3000` (acceso teléfono: http://192.168.1.4:3000).

## 🤖 CHAT re-afinado + cuota Premium (2026-06-15, sesión noche)

El usuario propuso "poner Gemini más como asesor que cite la ley y la app enlace".
**Probé esa vía (Gemini cita de memoria → la app verifica que el artículo exista) y la
DESCARTÉ con evidencia**: citaba artículos REALES pero fuera de tema (Código de Justicia
Militar para un robo, Ley de Arrendamiento para impuestos, se saltaba RPA para un menor).
La verificación confirma *existencia*, no *pertinencia*. Volví a la **garantía arquitectural
de [[abogabot-cerebro]]**: el modelo solo cita ids del CONTEXTO recuperado (nunca de
memoria); la "completitud" que pedía el usuario se logró con **prosa de asesor + mejor
retrieval**, no con citas libres.

- **Prompt** (`api/chat/route.ts`): tono de asesor cercano y completo, pero cita SOLO los
  `[id]` del contexto; si algo no está cubierto, lo dice honesto y deriva. Limpia `[id]` que
  el modelo filtre a la prosa. ~150-220 palabras, viñetas + "Qué hacer ahora".
- **Retrieval mejorado** (sinónimos nuevos + núcleo): consumidor/garantía, accidente laboral,
  **RPA menor** (20.084), **IVA** (DL 825), **renta/tributa** (DL 824), robo/hurto, formar
  sociedad, expulsión migratoria, **recurso de protección/derechos fundamentales**
  (Constitución), **DICOM/datos** (19.628), pensión/**alimentante** (14.908). Se añadieron
  **Constitución (242302)** y **Migración (1158549)** al bono de núcleo (`NUCLEO_EXTRA` en
  `db.ts`). Batería QA Nivel 4: **5/5** con la ley esperada presente.
- **Refundidos duplicados excluidos del buscador** (`idsDuplicadosNucleo` en `db.ts`):
  detecta copias con nombre crudo ("DFL 1"=Cód. Trabajo, "DFL 2"=Cód. Civil, "DFL 3"=
  Consumidor) y las saca → ya no cita "DFL 1 art.32" sino "Código del Trabajo art.32".
- **`numeroReal`** limpia metadata del importador en DL/DFL: "27 (DEL ART 1)" → "27".
- **`etiquetaLey`**: "LEY 21325" → "Ley 21.325"; nombres crudos inútiles → título en oración.
- **Cuota nueva**: **3 consultas / 12 h por visitante** (antes 40/día). Muestra "te quedan N
  consultas"; al agotarse → mensaje + botón **✨ Actualizar a Premium** (placeholder, sin
  pago aún). Env `LIMITE_CHAT_CONSULTAS`/`LIMITE_CHAT_HORAS` (default 3/12).
- **Fix importante**: la cuota se descuenta **solo si la respuesta sale bien** (antes un
  error técnico de Gemini igual le cobraba una consulta al usuario).
- Desplegado en Fly (`leyes-de-chile`, gru). QA: key solo server-side (no en bundle),
  citas siempre del contexto (anti-invención), disclaimer por código.

### 🚨 HALLAZGO CRÍTICO — cuota de Gemini free tier (bloqueante para escalar)
La API key está en **free tier** y `gemini-2.5-flash-lite` tiene un **tope DIARIO muy bajo**
de requests (HTTP 429 `RESOURCE_EXHAUSTED`, quota `...RequestsPerDayPerProject...FreeTier`).
Lo agoté con las pruebas de QA de hoy → el chat en producción muestra "problema técnico"
hasta el reset diario (medianoche Pacífico). El cap de 3/12h por visitante protege la cuota
*por usuario*, pero el **tope global diario** es el techo real. **Para una app pública de
verdad hay que pasar a un plan PAGADO de Gemini** (pay-as-you-go) o el sitio se cae con
pocos usuarios. Decisión pendiente del usuario.

## 📚 SISTEMA DE GUÍAS renovado + 1er lote de contenido (2026-06-15, sesión tarde)

Trabajo con Jonathan en paralelo, "paso a paso". Foco: **guías ciudadanas para AdSense**.

- **Template de guías reescrito** (`src/app/guias/[slug]/page.tsx`): ahora con **H1 real**
  (antes el título era `<h2>` — error SEO), renderer de markdown propio (encabezados,
  **negritas, enlaces `[texto](url)`, listas** con/sin orden; escapa HTML), **respuesta
  corta** destacada (apunta al featured snippet), bloque **FAQ** visible, caja de
  **herramienta** (CTA a calculadora) y **JSON-LD** Article + FAQPage + BreadcrumbList.
  Metadata: `<title>` propio ≤60 + `canonical` + OpenGraph.
- **Modelo `Guia` extendido** (`src/lib/guias.ts`): campos `categoria` (laboral/vivienda/
  familia/consumidor), `destacada`, `metaTitle`, `respuestaCorta`, `herramienta`, `faq`.
  Helpers `guiasDestacadas()` y `categoriasConGuias()` (solo muestran pestañas con guías).
- **Índice /guias rediseñado**: nuevo `GuiasExplorer.tsx` (client) con **carrusel de
  destacadas** (scroll-snap horizontal) + **pestañas por macro-grupo**. OJO SEO: TODAS las
  tarjetas van al DOM (links crawlables); solo se alterna `display`. Abajo, **chat rápido**
  `<ChatBar />` (consulta → /chat?q=) — pedido del usuario "chatbot al entrar a guías".
- **6 guías** (todas con citas verificadas contra la DB, ids reales enlazados a la
  Biblioteca `/leyes/{norma}?art={id}`): Laboral (5) = finiquito⭐, gratificación⭐,
  vacaciones/feriado, despido sin aviso, horas extras; Arriendo y vivienda (1) = desalojo⭐.
- **Sitemap arreglado**: antes NO incluía `/guias` ni las guías → ahora sí (`sitemap.ts`).
- Build OK (6 guías SSG). Verificado visualmente con Playwright (`herramientas-captura/
  capturar-guia.mjs [base] [ruta]` — captura una guía a página completa; útil para QA visual).

### ⚠️ HALLAZGO de QA de datos (importante, NO publicar guías afectadas aún)
Al verificar citas para las guías de pensión y consumidor, la DB tiene **versiones
desactualizadas** de esas leyes:
- **Ley 14.908 (Pensión de alimentos)**: `fecha_version` **1962** — texto original. Habla
  de "Jueces de Letras de Menores" (reemplazados por Tribunales de Familia en 2005) y **NO**
  trae los mínimos 40%/30% del ingreso mínimo ni el Registro Nacional de Deudores (reformas
  2021-22). → guía de pensión **DIFERIDA** hasta actualizar la norma vía BCN.
- **Ley 19.496 (Consumidor)**: `fecha_version` **1997**; art. 21 dice garantía de "**tres
  meses**" (la reforma Pro Consumidor 2021 la subió a **6 meses**). → guía de garantía/
  consumidor **DIFERIDA**.
- Código del Trabajo (2003) y Ley 18.101 Arriendo (arts. 3/4): contenido citado **vigente**.
- **Acción**: el actualizador BCN (pendiente de construir) debe priorizar refrescar 14.908
  y 19.496. Antes de escribir esas guías, re-bajar esas normas y re-validar.

### Roadmap de guías (llenar ~10 por macro-grupo, sin relleno: calidad o nada)
- Laboral: faltan fuero maternal, acoso laboral (Ley Karin), licencia médica, jornada/
  40 horas, contrato a honorarios vs. dependiente.
- Vivienda: gastos comunes, garantía/mes de arriendo, ruidos molestos.
- Familia/Consumidor: **bloqueadas** hasta refrescar 14.908 y 19.496.

## Qué es (1 frase) y metas del kickoff

Web pública donde cualquier chileno consulta las leyes y chatea con AbogaBot
(Gemini) que cita artículos reales; ingresos por AdSense vía SEO de la biblioteca.

- MVP en línea (dominio + biblioteca + chatbot citando fuentes): **25 jun 2026**
- Solicitud AdSense enviada: **2 jul** · 1.000 vistas org./mes: **31 ago** · primeros US$100: **dic 2026**
- NO-hacer del MVP: login, pagos, app de tiendas, embeddings, foro, multi-idioma.

## ESTADO: lo que ya FUNCIONA (todo construido y probado el 2026-06-11)

**App Next.js 16 completa** en `3-aplicacion/` (App Router, TS, Turbopack;
`params`/`searchParams` son Promises; docs locales en `node_modules/next/dist/docs/`):

- `/` Inicio fiel a la plantilla del usuario (header Ley Chilena azul/rojo, hero
  bandera, 6 materias, últimas publicaciones desde la DB, barra de chat con huasito).
- `/leyes` Biblioteca con **10 macro-grupos desplegables** (`gruposBiblioteca()` en
  `src/lib/db.ts` + `<details>`): Constitución y Códigos (abierto), 6 materias,
  Estado, DL/DFL, Otras. Cada norma cae en UN grupo por prioridad; escala solo al
  importar más leyes. + búsqueda FTS global y filtro por materia.
- `/leyes/[id]` artículos paginados (100/pág), búsqueda interna, Guardar, link BCN.
- `/calculadora` finiquito con motor determinista `src/lib/finiquito.ts` (reglas
  verificadas contra la DB: arts. 67/69/73, 159-163, 168, 172; topes 90 UF y 11
  años; UF del día vía mindicador.cl). Regresión: `node scripts/probar-finiquito.ts`.
  Regla: el código calcula, la IA solo explica (skill `abogabot-finiquito`).
- `/guardadas` localStorage sin login. `/chat` AbogaBot con chips de fuentes.
- **API `/api/chat`** (route.ts): casos sensibles por CÓDIGO antes del modelo
  (suicidio→*4141, VIF→1455/133 — patrón ampliado tras QA que cazó "me quiero
  matar" sin cubrir), sinónimos + FTS5 OR con prefijos ("extra"→"extraordinarias"),
  top-6 al contexto, Gemini REST con 1 reintento, parsing FUENTES:, disclaimer por
  código. Probado: "despido sin aviso"→arts. 162/489 CT; "horas extra"→art. 32 ✓.
- **DB**: `3-aplicacion/data/leyes.db` — **234 normas / 24.412 artículos** (Tier 1
  completo con CJM real 18914 + parte del Tier 2). Importador `npm run import:leyes`
  idempotente, excluye derogadas y datos incompletos, hash por norma, FTS5 rebuild.
- **GEMINI_API_KEY ACTIVA** en `3-aplicacion/.env.local` (no está en git/ZIP; jamás moverla al cliente).
- `global-error.tsx` propio (workaround bug Turbopack con espacios en la ruta —
  500 intermitentes resueltos; en producción usar ruta SIN espacios).
- `next.config.ts`: `serverExternalPackages:['better-sqlite3']` +
  `allowedDevOrigins:['192.168.1.4','192.168.1.*']` (sin esto el JS no carga desde
  el teléfono en dev — fue el "no funciona el chat" del usuario).
- Tarea programada `revision-mensual-leyes` (día 1 de cada mes 10:00): validador +
  conteos + competencia → anotar aquí.
- Skills: cadena abogabot completa + `abogabot-finiquito` + `abogabot-master`
  (índice creado por el usuario). QA SIEMPRE con `abogabot-qa` tras tocar DB/prompt.

**Entorno dev**: firewall puerto 3000 requiere admin
(`netsh advfirewall firewall add rule name="Ley Chilena dev 3000" dir=in action=allow protocol=TCP localport=3000`);
NordVPN puede bloquear el acceso desde el teléfono.

## 👁️ AHORA PUEDO VER LA APP + rediseño desplegado (2026-06-15)

- **Capacidad de "ver" la app**: instalé **Playwright** en `herramientas-captura/`
  (gitignored node_modules). `node capturar.mjs [url]` toma capturas a tamaño
  teléfono (Pixel 7) de inicio/biblioteca/calculadora/chat/guías/splash → las leo
  con Read. YA NO diseño a ciegas. Por defecto captura https://leyes-de-chile.fly.dev;
  pasar `http://127.0.0.1:3002` para local. Flujo: build → npm start local → capturar
  → revisar → corregir → desplegar.
- **Rediseño estilo gobierno DESPLEGADO y verificado visualmente**: barras superiores
  azul institucional sólido + texto blanco (gob.cl/ClaveÚnica), Roboto + Roboto Slab,
  splash de bienvenida, biblioteca con cabecera azul y acordeones, todo compacto.
- **Bugs encontrados AL VERLO y corregidos**: (1) chat mostraba markdown en crudo
  (`**`, `*`) → `formatearRespuesta()` en ChatClient (negritas + viñetas, escapa
  HTML); (2) inicio: chat inferior tapaba contenido → paddingBottom; (3) hero se
  veía grisáceo → bandera limpia (blanco/rojo, cantón azul+estrella, título en
  franja roja).
- **Protección de cuota Gemini** (commit f40b63e): `/api/chat` con tope diario por
  IP (`LIMITE_CHAT_DIARIO`, default 40); al superar, responde amable + ofrece
  artículos de Biblioteca sin gastar Gemini. Casos sensibles NUNCA se limitan.
- Integridad: cabecera biblioteca "República de Chile" → "Legislación chilena ·
  Fuente oficial BCN" (no implicar ser servicio oficial del Estado).

## 🎨 REDISEÑO estilo gobierno de Chile (2026-06-14) — commit 79688e9 (ya desplegado)

- **Investigación legítima** del sistema de diseño OFICIAL y PÚBLICO del Estado
  (framework.digital.gob.cl, kitdigital.gob.cl). NO se descompilaron APKs
  (ingeniería inversa = no apropiado). Hallazgos aplicados:
  - **Roboto** (cuerpo) — el gobierno la eligió por ser la fuente default de Android.
  - **Roboto Slab** (títulos) — firma visual del gobierno. Cargada en layout.tsx
    (`--font-titulo`) y aplicada a .marca, títulos de sección, h3 de tarjetas/artículos,
    cabecera biblioteca, hero.
  - Paleta oficial de referencia: azul #006FB3, navy #0A132D, rojo #FE6565, grises.
- **globals.css reescrito completo**: unifica los dos estilos que estaban mezclados
  (original + Antigravity) en UN sistema cohesivo, compacto e institucional. Tokens
  nuevos (--azul #0a4595, --azul-oscuro #07306e, --azul-claro, etc.), densidad alta
  (base 14px, shell 460px, paddings/radios menores), reemplaza los acentos celestes
  #38bdf8 'tech' por azul institucional. Bottom nav Material 3 (píldora en activo),
  cabecera de biblioteca con degradado azul de gobierno. **Todos los nombres de
  clase preservados** (no rompe componentes). Build OK.
- **PENDIENTE**: desplegar a Fly (`flyctl deploy --remote-only --ha=false` desde
  3-aplicacion/) para ver el rediseño en https://leyes-de-chile.fly.dev y en el
  teléfono. Probar visualmente que se vea bien (no pude ver screenshot).

## ⏳ PENDIENTE de esta sesión (pedido del usuario, NO hecho aún)

1. **Parte 2 — "beneficios + comparar con internet"**: el usuario quiere que la app
   busque local primero, compare con internet y agregue info de BENEFICIOS (no leyes:
   bonos, subsidios, IFE, etc.). DECISIÓN PENDIENTE: no hacer scraping libre de
   internet (riesgo de info no verificable en contenido YMYL). Plan seguro propuesto:
   sección/feature "Beneficios" curada desde fuente oficial **ChileAtiende**
   (chileatiende.gob.cl), con enlaces oficiales, separada del chat de leyes citadas.
   Alternativa: Gemini con Google Search grounding restringido a dominios .gob.cl.
   Falta decidir con el usuario e implementar.
2. **Skills**: el usuario pidió usar skills necesarias y agregar populares de git
   verificadas. La skill `anthropic-skills:desarrollo-web-ui-animada` NO cargó
   ("Unknown skill" — la lista rota según servidores conectados). No se instalaron
   skills externas (requieren auditar con `verificar-skills` antes; no instalar a
   ciegas). Reintentar invocar la skill de UI cuando esté disponible.

## 🌎 EN VIVO EN INTERNET + chat mejorado (2026-06-14)

- **DESPLEGADA EN FLY.IO**: **https://leyes-de-chile.fly.dev** (app `leyes-de-chile`,
  región `gru` São Paulo — OJO: `scl` Santiago fue descontinuada por Fly).
  Stack de deploy: `Dockerfile` multi-stage + `output:"standalone"` + DB horneada
  en la imagen (230 MB). `GEMINI_API_KEY` como secreto de Fly (no en la imagen).
  `flyctl` instalado en `~/.fly/bin`; sesión del usuario activa. `auto_stop` ON →
  primer acceso del día tarda ~10-15 s (máquina despierta sola). Para instalar en
  el teléfono: abrir la URL → "Agregar a pantalla de inicio" (PWA).
  Redeploy: `flyctl deploy --remote-only --ha=false` desde `3-aplicacion/`.
- **Chat RAG mucho mejor** (commit 0e4b02b). Lección clave de calidad: para
  preguntas AMPLIAS ("beneficios para extranjeros") el chat respondía pobre porque
  el boost de leyes núcleo hacía que el Código Civil copara los 6 resultados y
  enterrara la Ley 21.325 de Migración (que SÍ está, 192 arts). **No era falta de
  datos sino de recuperación.** Arreglo: `buscar(q, n, undefined, true)` modo
  diversificar (pool grande + máx 2 artículos por norma) → el modelo ve varias
  leyes; +sinónimos migración/salud/educación/vivienda; prompt reescrito a
  respuesta ESTRUCTURADA por temas, filtra tangenciales, varias citas, ~200
  palabras, mantiene anti-invención y deriva honesto a organismos cuando la ley no
  da el detalle. Decisión de producto: NO convertir AbogaBot en "Gemini suelto"
  (perdería las citas verificables, su moat y la seguridad en contenido YMYL);
  sí acercarse a esa riqueza con RAG mejor. Ver [[abogabot-cerebro]].
- Pendiente afinado: el modo diversificar puede diluir preguntas MUY puntuales
  (ej. "monto exacto multa licencia vencida" → responde honesto "no tengo la cifra,
  consulta el Juzgado"). Aceptable y seguro; evaluar retrieval adaptativo
  (diversificar solo si la pregunta es amplia) más adelante.

## 🚀 BASE COMPLETA INTEGRADA (2026-06-13)

- **Antigravity terminó**: importadas TODAS las leyes → **20.088 normas /
  139.876 artículos** en `data/leyes.db`. Sitemap: 20.091 URLs. JSONL tier2 pesa
  173 MB (gitignored, excede límite GitHub; regenerable). QA en
  `2-archivo-maestro-leyes/QA-TIER2-FINAL.txt`.
- **Nueva UI de Antigravity** (el usuario la aprobó desde /guardadas y pidió
  mantenerse fiel): biblioteca estilo "compendio BCN" (cinta tricolor, grupos
  desplegables con emoji), **barra de accesibilidad** (tamaño de letra 100/125/150%
  + toggle "Lenguaje Simple") vía `SettingsContext`, **favoritos por artículo**
  (corazón, localStorage `favoritos_articulos`), **guías** (`/guias` + `lib/guias.ts`),
  TTS por artículo. Componentes: `ArticuloItem`, `BibliotecaHeader`,
  `AccessibilityBar`. CSS nuevo (clases `*-compendio`, `barra-accesibilidad`,
  `patriotic-ribbon`, `bloque-explicacion-simple`) ya en globals.css.
- **`/api/simplificar`**: reescribe un artículo en lenguaje simple con Gemini
  (cache en memoria) — alimenta el toggle "Lenguaje Simple".
- **Rendimiento a escala** (lecciones): (1) `listarNormas` con `GROUP BY` único +
  cache de conteos (era 20K subconsultas correlacionadas = 7,5 s → 0,18 s).
  (2) Biblioteca renderiza 25 tarjetas/grupo, no 100 (los `<details>` colapsados
  igual van al HTML → /leyes 7,5s→1s en prod). (3) **dev mode es ~2x más lento
  que prod**: para usar/demostrar la app, correr `npm run build && npm start`.
- **Relevancia del chat a 20K normas** (regla dura: el bot ES el producto):
  con la DB 600× mayor, leyes oscuras le ganaban a las canónicas
  ("pensión"→ley vieja; "licencia"→Código Aeronáutico). Arreglo estructural:
  **boost a leyes núcleo** en `buscar()` (bm25 − 6 si la norma está en MATERIAS)
  + sinónimos de tránsito. Re-validado OK: despido→CT 162, horas extra→CT 32,
  arriendo→18.101, consumidor→19.496, tránsito→18.290, alimentos→VIF 20.066 art.14bis.
- **Pendiente de datos**: hay normas refundidas DUPLICADAS (el Código del Trabajo
  aparece también como "DFL 1"; el CC como "DFL 2"). No rompe (la canónica ahora
  rankea primero), pero conviene deduplicar refundidos antes del lanzamiento público.
- **Git**: commit 9094b10. **CORRIENDO EN PRODUCCIÓN puerto 3001**
  (`npm start -- -H 0.0.0.0 -p 3001`; el 3000 lo ocupa la copia de Antigravity en
  `Desktop\gemini\`). Teléfono: **http://192.168.1.4:3001** (QR nuevo entregado).
  Firewall: si el teléfono no carga, permitir el puerto 3001 (regla admin).

## 🏁 MVP CERRADO (2026-06-12) — listo para la DB completa y el deploy

- **Build de producción PASA** (`npm run build`: 15 rutas, typecheck OK; tsconfig
  excluye `scripts/`). `npm start` sirve la versión optimizada.
- **PWA**: `src/app/manifest.ts` (instalable, theme #0039A6). **SEO**: `sitemap.ts`
  dinámico desde la DB (237 URLs hoy, crece solo al importar tiers) + `robots.ts`.
  En producción definir `NEXT_PUBLIC_SITE_URL` (hoy default localhost).
- **Páginas legales AdSense**: /aviso-legal, /privacidad, /quienes-somos (footer en
  portada). Contacto publicado: gmail del usuario — cambiar a correo del dominio
  cuando exista.
- **Biblioteca preparada para 23.000+ normas**: cada grupo desplegable muestra
  máx. 40 + aviso "usa el buscador" (el HTML no explota con la DB completa).
- **Git inicializado** (rama main, commit e57db98, 58 archivos): `.gitignore`
  excluye node_modules, .next, **.env.local (key verificada FUERA del repo)** y
  data/*.db (regenerable). Identidad git local: Jonathan Fuentes / gmail.
- Verificado: 11/11 rutas MVP responden 200 vía 127.0.0.1.
- **Lo único que falta para salir a producción**: dominio (decisión usuario),
  deploy (Railway/Fly, ruta sin espacios, subir leyes.db o correr import allá),
  Search Console + GA4, y las guías para postular AdSense.

## Sesión 2026-06-12: voz, consultas guardadas e índice de populares

- **Marca portada**: "Leyes de Chile" (logo + texto linkean a /leyes, pedido del usuario).
- **Índice "Las más consultadas"** en la portada: 8 leyes resueltas POR NOMBRE
  desde la DB (`normasPopulares()` en db.ts — jamás hardcodear títulos). Regresión:
  `node scripts/probar-populares.mjs`. Lección: el ORDER BY prefiere match en
  nombre_corto (un DFL con título largo le robaba el puesto a Pensiones
  Alimenticias); better-sqlite3 NO acepta `?1` repetido (usar `?` + repetir valor).
- **Chat con VOZ** (Web Speech API nativa, $0): micrófono es-CL para dictar la
  consulta (botón pulsante rojo al escuchar; solo aparece si el navegador soporta
  — Chrome/Android sí, Firefox no) + botón "Escuchar" (TTS) en cada respuesta.
- **Consultas guardadas**: botón "Guardar" bajo cada respuesta del bot →
  localStorage `consultas_guardadas` (máx 100). /guardadas ahora tiene 2 secciones:
  Consultas (desplegables con respuesta + fuentes + escuchar + quitar) y Leyes.

## ⚠️ DESCUBRIMIENTO CRÍTICO: copia fantasma en Desktop\gemini

Existe una **copia completa del proyecto en `Desktop\gemini\Leyes chilenas\3-aplicacion`**
(la hizo Antigravity) corriendo **`next start` (build viejo) en el puerto 3000**,
con un supervisor que LA REVIVE al matarla. Convive con nuestro dev server:
la copia toma IPv6 (localhost del PC) y la nuestra IPv4 (0.0.0.0). Consecuencias:
- En el PC, `http://localhost:3000` puede mostrar la **versión vieja** →
  **usar `http://127.0.0.1:3000`** (IPv4 = nuestra app).
- El teléfono (`http://192.168.1.4:3000`, IPv4) SIEMPRE ve la app nueva.
- PENDIENTE usuario: decirle a Antigravity que detenga su `next start` (y borrar
  esa copia del código para no editar dos versiones; OJO: NO borrar
  `Desktop\gemini\todas-las-leyes\` — ahí están los datos del Tier 2 bajando).
- No matar procesos de Antigravity a ciegas: puede abortar la descarga del Tier 2.

## Datos / Antigravity (fuente de verdad de leyes)

- Catálogo SPARQL completo: 23.294 normas vigentes (`catalogo.json`). Tier 2
  (~23.255 normas) descargando en background en Antigravity (~3 s/norma).
- Originales en `Desktop/gemini/todas-las-leyes/todas-las-leyes/data/`; copias
  validadas en `2-archivo-maestro-leyes/`.
- **ACORDADO**: cuando Antigravity entregue los archivos finales, el usuario los
  pasa → copiar a `2-archivo-maestro-leyes/` → `npm run import:leyes` → QA con el
  validador (`~/.claude/skills/abogabot-qa/scripts/validar-leyes.js`).
- Feedback pendiente a Antigravity: Tier 2 incluía derogadas (16) y sin título (3)
  — la spec exige filtrarlas a derogadas.json (nuestro importador las excluye solo).
- `fecha_version` de BCN no es confiable → el actualizador semanal (POR CONSTRUIR)
  compara hash de contenido (ya guardado por norma).

## PENDIENTES (prioridad)

1. **Dominio — URGENTE, decisión del usuario**: `leyeschile.cl` TOMADO;
   `leyesdechile.cl` y `leychilena.cl` DISPONIBLES al 2026-06-11 (~$10.000 CLP/año, NIC Chile).
2. **Fase 3 (Claude)**: PWA manifest, sitemap.xml/robots/schema.org, páginas
   legales (privacidad/quiénes somos/aviso legal — requisito AdSense), deploy
   Railway/Fly (volumen para leyes.db, ruta sin espacios) + Search Console + GA4.
3. **Fase 4**: 10-15 guías ciudadanas en `4-guias/` (abogabot-seo) → postular AdSense ~2 jul.
4. **Refinamientos pre-deploy** (abogabot-cerebro + abogabot-qa): (a) artículos de
   leyes anexas del refundido CC 172986 se citan como "Código Civil" (etiquetar
   sub-normas); (b) respuestas a veces >120 palabras (afinar prompt); (c) tope de
   mensajes/día por visitante.
5. **Actualizador BCN semanal** (`npm run update:bcn`) — diseño en CLAUDE.md, sin código.
6. Importar tiers 2-3 cuando lleguen (ver sección Datos).

## Documentos de referencia (y sus advertencias)

- `1-diseno-web/pagina-principal.html` + captura del usuario = plantilla visual.
  `assets/` logo y huasito (copiados a `3-aplicacion/public/`).
- `2-archivo-maestro-leyes/FORMATO-LEYES.md` y `PROMPT-ANTIGRAVITY-LEYES.md` = spec de datos.
- `1-diseno-web/PROMPT-AI-STUDIO.md` = EL prompt demo para AI Studio (fiable).
  Nota: el 2026-06-11 noche existieron 4 borradores con datos inventados
  (PROMPT-AI-STUDIO-COMPLETO, GUIA-TAXONOMIA-MACROGRUPOS, SCHEMA-MEJORADO.sql,
  ENTREGA-FINAL) — **enviados a la Papelera en la limpieza de cierre**. El schema
  real lo crea `scripts/importar-leyes.mjs`; la taxonomía real es
  `gruposBiblioteca()` en `src/lib/db.ts`.
- ZIP del código (sin key, sin DB, sin node_modules): `Desktop/ley-chilena-codigo.zip`.

## Lecciones clave (detalle en CLAUDE.md — no re-aprender)

- BCN da 429 agresivo: backoff + pausas + idempotencia. Validar título contra
  esperado (así se cazó el falso CJM 14249 → real es 18914).
- Navegar por id de fila; número visible con `numeroReal()` (refundidos repiten numeración).
- Disclaimer y casos sensibles por código, no por prompt. Key solo server-side.
- FTS5: OR + stopwords + prefijos (AND estricto daba 0 resultados con frases reales).
- Next 16: params async, Turbopack default, `allowedDevOrigins` para LAN,
  espacios en ruta = bug global-error (workaround aplicado).
