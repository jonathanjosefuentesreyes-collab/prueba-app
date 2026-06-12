# Ley Chilena (AbogaBot v2) — CONTINUAR.md

Última actualización: **2026-06-11 (noche)** — sesión maratónica: la app quedó
CONSTRUIDA Y FUNCIONANDO. Este archivo fue consolidado para retomar en ventana
nueva con poco contexto.

> **Cómo retomar**: leer `CLAUDE.md` (arquitectura y reglas duras — NO repetirlas
> aquí) y este archivo. La app vive en `3-aplicacion/`. Encenderla:
> `npm run dev -- -H 0.0.0.0 -p 3000` (acceso teléfono: http://192.168.1.4:3000).

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
