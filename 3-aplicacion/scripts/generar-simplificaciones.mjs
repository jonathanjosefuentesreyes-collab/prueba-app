// Pre-genera las explicaciones en "lenguaje simple" de los artículos y las GUARDA en
// src/data/simplificaciones.json, para que la app las sirva al instante SIN pedirle a
// Gemini en vivo (más rápido, sin depender de la cuota, hasta offline).
//
// Es RESUMIBLE: salta los que ya están hechos. Tiene tope por corrida (MAX) para no
// abusar de la cuota gratis; corre varias veces (o con Gemini de pago para llenarlo todo).
//
// Uso:  node scripts/generar-simplificaciones.mjs [MAX]
//   MAX = cuántos NUEVOS generar en esta corrida (default 150).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const MAX = Number(process.argv[2] || 150);
const RUTA = new URL("../src/data/simplificaciones.json", import.meta.url);
const ENV = new URL("../.env.local", import.meta.url);

// Cargar GEMINI_API_KEY y GEMINI_MODEL desde .env.local
let apiKey = process.env.GEMINI_API_KEY;
let modelo = process.env.GEMINI_MODEL;
if (existsSync(ENV)) {
  const envText = readFileSync(ENV, "utf8");
  if (!apiKey) {
    const m = envText.match(/GEMINI_API_KEY\s*=\s*(.+)/);
    if (m) apiKey = m[1].trim().replace(/^["']|["']$/g, "");
  }
  if (!modelo) {
    const m = envText.match(/GEMINI_MODEL\s*=\s*(.+)/);
    if (m) modelo = m[1].trim().replace(/^["']|["']$/g, "");
  }
}
if (!apiKey) { console.error("Falta GEMINI_API_KEY"); process.exit(1); }
if (!modelo) modelo = "gemini-2.5-flash-lite";
const db = new Database(fileURLToPath(new URL("../data/leyes.db", import.meta.url)), { readonly: true });

// Prioridad: las leyes que la gente realmente lee = núcleo + las MATERIAS del grid
// (src/lib/db.ts: laboral, familia, civil, penal, comercial, tributario) + Tránsito.
// Deduplicado (las que ya están en el núcleo no se repiten en su materia).
const NORMAS = [
  // Cola larga voluminosa (poco buscada artículo por artículo) — se procesa primero.
  1974, 1984, 176595, 1058072, 18914, 6374, 7147, 29473, 6368, 6369, 235507,
  // Alto valor de búsqueda ciudadana.
  29708, 61438, 29526, 225128, 1075210, 1174663, 28650, 244803,
  // Núcleo y materias restantes (las ya hechas se saltan; es idempotente).
  207436, 242302, 141599, 27977, 172986,
  1200096, 1191554, 1143741, 1030936, 229557, 242648,
];
const objetivos = [];
for (const n of NORMAS) {
  const filas = db.prepare("SELECT id, encabezado, texto, (SELECT nombre_corto FROM normas WHERE id=?) nom FROM articulos WHERE norma_id=? AND (derogado IS NULL OR derogado=0) ORDER BY orden").all(n, n);
  for (const f of filas) objetivos.push(f);
}

const store = JSON.parse(readFileSync(RUTA, "utf8"));
const numeroReal = (enc) => (enc.match(/Art[íi]culo\s+([\dA-Za-z° ]+)/i)?.[1] || "").trim();

async function simplificar(art) {
  const prompt = `Reescribe este artículo legal chileno en lenguaje simple para una persona sin formación jurídica.

REGLAS: máximo 60 palabras; solo reformula lo que DICE el texto (no agregues información externa ni interpretaciones); tutea; si el artículo lista varios puntos, resume los principales. Empieza DIRECTO con la explicación: NADA de saludos ("Hola"), exclamaciones ni frases meta ("Este artículo dice…", "Te explico…"). NO uses markdown ni asteriscos: solo texto plano, una idea clara. Si el artículo está derogado o suprimido, responde EXACTAMENTE: "Este artículo fue derogado: ya no tiene contenido vigente."

${art.nom} — Artículo ${numeroReal(art.encabezado)}:
${(art.texto || "").slice(0, 2500)}`;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 500, thinkingConfig: { thinkingBudget: 0 } } }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const data = await r.json();
  const t = (data?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
  if (!t) throw new Error("vacío");
  return t;
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
let hechos = 0, fallosDuros = 0, esperas429 = 0;
// El free tier limita por MINUTO (RPM ≈ 15) y por DÍA (RPD). Ante un 429 NO nos rendimos:
// esperamos a que se abra la ventana del minuto y reintentamos el MISMO artículo. Solo
// cortamos tras muchas esperas seguidas (señal de que se agotó la cuota del DÍA, no del minuto).
const ESPERA_429_MS = Number(process.env.ESPERA_429_S || 60) * 1000;
const MAX_ESPERAS_429 = Number(process.env.MAX_ESPERAS_429 || 10);
const pendientes = objetivos.filter((a) => !store[a.id]);
console.log(`Total objetivo: ${objetivos.length} · ya hechos: ${objetivos.length - pendientes.length} · pendientes: ${pendientes.length}`);

let i = 0;
while (i < pendientes.length && hechos < MAX) {
  const art = pendientes[i];
  try {
    store[art.id] = await simplificar(art);
    hechos++;
    fallosDuros = 0; esperas429 = 0; // una buena respuesta reinicia los contadores
    if (hechos % 25 === 0) { writeFileSync(RUTA, JSON.stringify(store)); console.log(`  guardado parcial: ${hechos}`); }
    await sleep(4000); // espacia para respetar el RPM (15 RPM en el tier gratuito)
    i++;
  } catch (e) {
    if (/429/.test(e.message)) {
      esperas429++;
      writeFileSync(RUTA, JSON.stringify(store)); // no perder lo avanzado si se corta
      if (esperas429 > MAX_ESPERAS_429) { console.error(`Cuota DIARIA agotada (429 sostenido tras ${MAX_ESPERAS_429} esperas). Corto aquí.`); break; }
      console.error(`  429 en art ${art.id}: espero ${ESPERA_429_MS / 1000}s y reintento [${esperas429}/${MAX_ESPERAS_429}]`);
      await sleep(ESPERA_429_MS); // NO avanza i: reintenta el mismo artículo al abrir la ventana
    } else {
      fallosDuros++;
      console.error(`  fallo art ${art.id}: ${e.message}`);
      if (fallosDuros >= 5) { console.error("Varios fallos no-cuota seguidos. Corto aquí."); break; }
      await sleep(1500);
      i++; // salta el artículo problemático (503/vacío) y sigue
    }
  }
}

writeFileSync(RUTA, JSON.stringify(store));
console.log(`LISTO. Nuevos: ${hechos} · total en store: ${Object.keys(store).length}`);
