# HANDOFF — Ley Chilena / AbogaBot v2  (2026-06-17)

> Para retomar en una ventana nueva: di **"lee Leyes chilenas/HANDOFF.md y sigamos"**.
> Este archivo tiene TODO lo necesario para continuar sin re-explorar y gastar tokens.

---

## 1. Qué es y dónde está
- **Proyecto:** web de leyes chilenas (SQLite + FTS5) + chatbot legal **AbogaBot** (Gemini),
  monetizado con AdSense + suscripción Premium.
- **Código de la app:** `Leyes chilenas/3-aplicacion/` (Next.js 16, App Router, output standalone).
- **Repo (público):** https://github.com/jonathanjosefuentesreyes-collab/prueba-app
  (raíz del repo = `Leyes chilenas/`, la app vive en `3-aplicacion/`).
- **Producción (Render, free tier, duerme a los 15 min):** https://leyes-de-chile.onrender.com
  - Servicio `srv-d8oeegbeo5us73e5i9eg`. **Auto-deploy** al hacer push a `main`.
  - API key de Render que dio el usuario: `rnd_w9mXRFIvqAcRZqF7Cyc5W063sq3B` → **pedirle que la REVOQUE** cuando ya no se use.
- **Lecturas base del proyecto:** `Leyes chilenas/CLAUDE.md` (arquitectura, reglas, lecciones v1)
  y `Leyes chilenas/CONTINUAR.md`.

## 2. Cómo trabajar (flujo validado)
- **Dev server:** ya suele estar corriendo en `http://localhost:3000` (hot-reload). Si no:
  `cd "Leyes chilenas/3-aplicacion" && next dev` (usar `dev`, NO `next start`: sirve builds viejos).
  Si hay lock de node colgado: `powershell Get-Process node | Stop-Process -Force`.
- **Typecheck antes de subir:** `cd 3-aplicacion && npx tsc --noEmit`.
- **Captura visual (Playwright):** `herramientas-captura/` — patrón Pixel 7, screenshot, y leer el PNG.
- **Deploy:** `git add -A && git commit && git push origin main` → Render auto-despliega (~1-3 min).
  Verificar deploy: `curl -H "Authorization: Bearer <RENDER_KEY>" https://api.render.com/v1/services/srv-d8oeegbeo5us73e5i9eg/deploys?limit=1`.
- **REGLA DEL USUARIO (obligatoria):** antes de CADA cambio, respaldar los archivos a tocar en
  `Desktop/vs and claude/_backups/<timestamp>--desc/` (externo al repo). Aplica a todos los proyectos.

## 3. Reglas duras (NO romper)
- **Nunca inventar/citar artículos que no existan.** Los enlaces se resuelven contra la base
  (`/leyes/{norma_id}?art={articulo_id}`). El modelo nunca cita de memoria sin verificación.
- **GEMINI_API_KEY solo server-side** (nunca en bundle/repo/imagen Docker). `.env.local` gitignored.
- **Casos sensibles** (suicidio→*4141, VIF→1455/133/149) los maneja el CÓDIGO y NUNCA se rate-limitean.
- **Disclaimer** lo agrega el código, no el prompt.

## 4. Datos técnicos clave (para no re-descubrir)
### norma_id de la base (núcleo, ya verificados)
- **Código del Trabajo = 207436** (vigente). Arts: 159→3293, 160→3294, 161→3295, 162→3297,
  163→3298, 168→3304, 169→3305.
- **Código Civil = 172986** (vigente). Alimentos: 321→498, 323→500, 329→506, 332→509.
- **Ley 14.908 Pensiones = 27977** → ⚠️ **TEXTO REFUNDIDO ANTIGUO** en la base (su art 3 habla de
  "juez competente", no del monto mínimo moderno). NO citar sus artículos; anclar guías de alimentos
  en el Código Civil y mencionar la 14.908 solo por nombre.
- **Ley 19.628 Protección Datos (DICOM) = 141599** (vigente). 12→10592, 18→10598 (caducidad 5 años),
  19→10599 (acreedor avisa pago en 7 días hábiles).
- **Ley 19.496 Consumidor:** el refundido DFL 3 = 1160403 está EXCLUIDO como duplicado en db.ts
  (`idsDuplicadosNucleo`). Para guías de consumidor, buscar la norma núcleo real antes de enlazar.
- **Duplicados refundidos excluidos** (idsDuplicadosNucleo): 3471, 3551, 176925, 1160403.

### Cómo resolver IDs de artículos (script que funciona)
```bash
cd "Leyes chilenas/3-aplicacion" && node -e "
const db=require('better-sqlite3')('data/leyes.db',{readonly:true});
const art=(n,num)=>db.prepare(\"SELECT id,encabezado FROM articulos WHERE norma_id=? AND encabezado LIKE ? ORDER BY LENGTH(encabezado) LIMIT 5\").all(n,'Artículo '+num+'%');
console.log(art(207436,161));"
```
(La DB `data/leyes.db` es de solo lectura, 228MB, gitignored; se sube como `leyes.db.gz` + Dockerfile la descomprime.)

### Chat (route.ts)  `3-aplicacion/src/app/api/chat/route.ts`
- Prompt VALIDADO por el usuario: abogado chileno experto, respuesta completa sin omitir beneficios,
  lenguaje simple, **párrafos numerados**, **pasos a seguir**, y sección final
  **"Leyes relacionadas:"** (queda VISIBLE). Formato citas: `Código del Trabajo artículos 162, 168; Ley 21.325 artículo 5`.
- El parser toma esa sección, atribuye cada nº de artículo a su código y enlaza el **artículo exacto**
  verificado contra la base (los que no existen se omiten). Cuota: 3 consultas/24h, se descuenta solo si la respuesta sale OK.

### Assets de la mascota (en `3-aplicacion/public/`)
- `abogabot.png` — robot original, **fondo blanco** (RGB sin alfa). Usado en el círculo de las pestañas.
- `abogabot-personaje.png` — **transparente** (colorkey del blanco, `0xFFFFFF:0.025:0.05`). Usado en /chat (estilo personaje).
- `abogabot-premium.png` — **dorado** (selectivecolor sobre el personaje: piel gris→oro, traje azul/corbata roja conservados). Solo en /premium hero.
- ffmpeg está disponible. Para muestrear color: `ffmpeg -i x.png -vf "crop=1:1:X:Y" -f rawvideo -pix_fmt rgba - | od -An -tu1`.

## 5. Estado actual de la navegación y guías
- **Bottom nav (5 pestañas, izq→der):** Leyes 📚 · Guías 💡 · Inicio 🏠 (centro) · Guardados ❤️ · Premium 👑
  (`components/BottomNav.tsx`, íconos line-art). Se eliminó el switcher interno de 3 pestañas.
- **ChatBar** (mascota fija + input que abre /chat) está en TODAS las pestañas: Inicio, Leyes, Guías, Guardados, Premium.
- **Guías** (`src/lib/guias.ts`), 13 publicadas. Conteo por macro grupo (CATEGORIAS):
  - **Laboral 💼: 10** | **Arriendo/vivienda 🏠: 1** | **Familia 👨‍👩‍👧: 1** | **Consumidor 🛒: 1**
  - Estructura de cada guía: slug, titulo(pregunta H1), descripcion(meta), categoria, destacada,
    metaTitle, respuestaCorta(snippet), contenido(markdown con enlaces a artículos), faq(schema), fecha.
  - Explorador: `components/GuiasExplorer.tsx` (carrusel de destacadas + chips de categorías + listado).

## 6. PENDIENTES (cola del usuario, con sus palabras)
> El usuario está en modo lluvia de ideas; pidió varias features seguidas. Orden sugerido abajo.

1. **Categoría dorada Premium "Deudas"** en *Explora por tema*:
   *"agrega una dorada en explorar tema donde recaudaras las guias mas polemicas y mejor ceo de deudas,
   ese boton sera premium, dejalo en MEDIO del carrusel de los temas de guia"*.
   → Crear categoría/chip dorado (estilo oro) al CENTRO del carrusel de `GuiasExplorer`, que agrupe las
   guías de deudas/polémicas. (DICOM ya existe; mover a esta categoría.) Mantener guías PÚBLICAS (SEO+ads); el oro es branding Premium.
2. **Destacadas = lo más buscado en Google:** *"las guias destacadas seran las mas consultadas en google,
   arma asi la estrategia"*. → Curar `destacada:true` a los temas de mayor volumen.
3. **10 guías por cada macro grupo:** *"haz 10 guias por cada macro grupo"*. Faltan: vivienda +9, familia +9,
   consumidor +9, y armar el set de "Deudas". Cada una con enlaces verificados (usar el script de §4).
   Candidatos altos en SEO: despido (varios), licencia médica, contrato a plazo, sueldo mínimo;
   arriendo (garantía, no pago, término); alimentos/divorcio/VIF (familia); garantía SERNAC, retracto,
   cobranzas (consumidor); DICOM, prescripción de deudas, embargo de sueldo, repactación, Ley 20.720 (deudas).
4. **Herramienta de facturación** *"agrega la herramienta de facturacion tambien en la pestaña premium"* +
   *"haz la mejor herramienta de facturacion para chile"*. → Construir `/facturacion` (boleta de honorarios:
   bruto↔líquido con retención 2026, IVA 19% para facturas, etc.) y enlazarla en la sección "Herramientas Premium".
5. **Mejor calculadora de finiquito** *"la mejor calculadora de finiquito para los chilenos"*. Ya existe
   `/calculadora` (Código del Trabajo). → Mejorarla: indemnización años (tope 11 años / 90 UF), mes de aviso,
   feriado proporcional, recargos art 168, vacaciones, etc.
6. **Icono de la cabecera (Leyes y Guías):** *"agrega esta imagen... el icono de la balanza cambialo por este,
   haz el icono mas grande para que resalte"*. → En `components/BibliotecaHeader.tsx` reemplazar el SVG de la
   balanza por la imagen del usuario, más grande. ⚠️ **FALTA EL ARCHIVO**: pedirle dónde guardó la imagen
   (suele dejarla en el Escritorio o en `Desktop/diseño leyes de chile/`).

## 7. Hecho en esta sesión (últimos commits en main)
- Prompt del chat validado + citas visibles + enlace de artículos exactos.
- 3 guías SEO (despido por necesidades, pensión de alimentos [abre Familia], salir de DICOM [abre Consumidor]).
- Nav de 5 pestañas con íconos line-art; se quitó el switcher interno.
- Mascota AbogaBot: círculo fijo en pestañas; **personaje sin fondo** flotando en /chat; loader = personaje corriendo.
- **Chat permanente** (sin expiración 24h). ChatBar en todas las pestañas. Avatar **dorado** en Premium.
- Service worker cache v2 (para que el celular se actualice; los íconos del inicio SÍ existen, era caché).

## 8. Notas de UX abiertas
- En /premium la ChatBar fija puede solaparse con el botón "Suscribirme" al hacer scroll arriba; el
  `paddingBottom:196` deja espacio al final. Revisar si molesta.
- En /chat se ven 2 personajes cuando está vacío (saludo grande + flotante sobre input). Si se quiere, dejar solo uno.
