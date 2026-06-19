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

// Cargar GEMINI_API_KEY desde .env.local
let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey && existsSync(ENV)) {
  const m = readFileSync(ENV, "utf8").match(/GEMINI_API_KEY\s*=\s*(.+)/);
  if (m) apiKey = m[1].trim().replace(/^["']|["']$/g, "");
}
if (!apiKey) { console.error("Falta GEMINI_API_KEY"); process.exit(1); }

const modelo = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const db = new Database(fileURLToPath(new URL("../data/leyes.db", import.meta.url)), { readonly: true });

// Prioridad: las leyes que la gente realmente lee (núcleo).
const NORMAS = [207436, 242302, 141599, 27977, 172986]; // Trabajo, Constitución, Datos, Pensiones, Civil
const objetivos = [];
for (const n of NORMAS) {
  const filas = db.prepare("SELECT id, encabezado, texto, (SELECT nombre_corto FROM normas WHERE id=?) nom FROM articulos WHERE norma_id=? AND (derogado IS NULL OR derogado=0) ORDER BY orden").all(n, n);
  for (const f of filas) objetivos.push(f);
}

const store = JSON.parse(readFileSync(RUTA, "utf8"));
const numeroReal = (enc) => (enc.match(/Art[íi]culo\s+([\dA-Za-z° ]+)/i)?.[1] || "").trim();

async function simplificar(art) {
  const prompt = `Reescribe este artículo legal chileno en lenguaje simple para una persona sin formación jurídica.

REGLAS: máximo 60 palabras; solo reformula lo que DICE el texto (no agregues información externa ni interpretaciones); tutea; si el artículo lista varios puntos, resume los principales.

${art.nom} — Artículo ${numeroReal(art.encabezado)}:
${(art.texto || "").slice(0, 2500)}`;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2, maxOutputTokens: 300 } }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const data = await r.json();
  const t = (data?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
  if (!t) throw new Error("vacío");
  return t;
}

let hechos = 0, fallos = 0;
const pendientes = objetivos.filter((a) => !store[a.id]);
console.log(`Total objetivo: ${objetivos.length} · ya hechos: ${objetivos.length - pendientes.length} · pendientes: ${pendientes.length}`);

for (const art of pendientes) {
  if (hechos >= MAX) break;
  try {
    store[art.id] = await simplificar(art);
    hechos++;
    if (hechos % 25 === 0) { writeFileSync(RUTA, JSON.stringify(store)); console.log(`  guardado parcial: ${hechos}`); }
    await new Promise((res) => setTimeout(res, 600)); // respeta el RPM
  } catch (e) {
    fallos++;
    console.error(`  fallo art ${art.id}: ${e.message}`);
    if (fallos >= 5) { console.error("Varios fallos seguidos (¿cuota agotada?). Corto aquí."); break; }
    await new Promise((res) => setTimeout(res, 1500));
  }
}

writeFileSync(RUTA, JSON.stringify(store));
console.log(`LISTO. Nuevos: ${hechos} · total en store: ${Object.keys(store).length}`);
