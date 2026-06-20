// QA Nivel 2 de las guías: extrae TODAS las citas /leyes/{norma}?art={id} de
// src/lib/guias.ts y verifica contra la DB que (a) el artículo existe, (b) su
// norma_id coincide con el de la cita. Además imprime el texto de artículos
// "sensibles" (garantía consumidor, etc.) para confirmar versión vigente.
// Uso: node scripts/qa-citas-guias.mjs   (desde 3-aplicacion/)
import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import path from "node:path";

const db = new Database(path.join(process.cwd(), "data", "leyes.db"), { readonly: true, fileMustExist: true });
const fuente = readFileSync(path.join(process.cwd(), "src", "lib", "guias.ts"), "utf8");

// numeroReal simplificado (espejo de db.ts)
function numeroReal(enc) {
  return (enc || "")
    .replace(/^art[ií]culo\s*/i, "").replace(/^art\.?\s*/i, "")
    .replace(/\s*\((?:DEL\s+)?ART[^)]*\)\s*$/i, "")
    .replace(/[\s.:]+$/g, "").trim() || enc;
}

const re = /\/leyes\/(\d+)\?art=(\d+)/g;
const citas = [];
let m;
while ((m = re.exec(fuente)) !== null) {
  citas.push({ norma: Number(m[1]), art: Number(m[2]) });
}

const getArt = db.prepare("SELECT id, norma_id, encabezado FROM articulos WHERE id = ?");
const getNorma = db.prepare("SELECT id, titulo, nombre_corto, fecha_version FROM normas WHERE id = ?");

let ok = 0;
const errores = [];
const vistos = new Set();
for (const c of citas) {
  const clave = `${c.norma}:${c.art}`;
  if (vistos.has(clave)) continue;
  vistos.add(clave);
  const a = getArt.get(c.art);
  if (!a) { errores.push(`❌ art_id ${c.art} (cita /leyes/${c.norma}) NO EXISTE en la DB`); continue; }
  if (a.norma_id !== c.norma) {
    const real = getNorma.get(a.norma_id);
    errores.push(`❌ art_id ${c.art} existe pero pertenece a norma ${a.norma_id} (${real?.nombre_corto || real?.titulo}), no a ${c.norma} citada`);
    continue;
  }
  ok++;
}

console.log(`\n=== QA citas de guías ===`);
console.log(`Citas únicas verificadas: ${vistos.size} | OK: ${ok} | Errores: ${errores.length}`);
if (errores.length) { console.log("\n--- ERRORES ---"); errores.forEach((e) => console.log(e)); }
else console.log("✅ Todas las citas existen y su norma coincide.");

// Normas citadas (resumen de versión)
const normasCitadas = [...new Set(citas.map((c) => c.norma))];
console.log(`\n--- Normas citadas (${normasCitadas.length}) y su fecha_version ---`);
for (const n of normasCitadas.sort((a, b) => a - b)) {
  const info = getNorma.get(n);
  console.log(`  ${n}  ${info ? `${info.nombre_corto || info.titulo} · v.${info.fecha_version}` : "⚠️ NORMA NO EXISTE"}`);
}

// Spot-check de artículos sensibles (confirmar versión vigente por TEXTO)
const sensibles = [
  { etq: "Consumidor art.21 (garantía: ¿6 meses?)", art: 138558 },
  { etq: "Consumidor art.20 (3 opciones)", art: 138557 },
  { etq: "Consumidor art.3 bis (retracto 10 días)", art: 138512 },
];
console.log(`\n--- Spot-check de texto (versión vigente) ---`);
const getTexto = db.prepare("SELECT norma_id, encabezado, texto FROM articulos WHERE id = ?");
for (const s of sensibles) {
  const a = getTexto.get(s.art);
  if (!a) { console.log(`  ❌ ${s.etq}: art_id ${s.art} no existe`); continue; }
  const txt = (a.texto || "").replace(/\s+/g, " ").trim();
  console.log(`  • ${s.etq} [${numeroReal(a.encabezado)}]: ${txt.slice(0, 240)}…`);
}
db.close();
