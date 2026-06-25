// Inserta en src/data/simplificaciones.json un lote de explicaciones en lenguaje simple
// redactadas a mano (sin Gemini). Valida cada artículo contra la base oficial:
//   - el id debe existir como artículo real,
//   - no debe estar ya en el store (no se sobrescribe; se informa),
//   - el texto debe ser no vacío y de largo razonable.
// Uso:  node scripts/agregar-simplificaciones.mjs <archivo-lote.json>
// El lote es un objeto { "<id_articulo>": "explicación…", ... }.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const ARCHIVO = process.argv[2];
if (!ARCHIVO) { console.error("Falta el archivo de lote. Uso: node scripts/agregar-simplificaciones.mjs <lote.json>"); process.exit(1); }

const RUTA = new URL("../src/data/simplificaciones.json", import.meta.url);
const store = JSON.parse(readFileSync(RUTA, "utf8"));
const lote = JSON.parse(readFileSync(ARCHIVO, "utf8"));
const db = new Database(fileURLToPath(new URL("../data/leyes.db", import.meta.url)), { readonly: true });
const existe = db.prepare("SELECT id, encabezado FROM articulos WHERE id=?");

let nuevos = 0, yaEstaban = 0, invalidos = 0;
for (const [idStr, texto] of Object.entries(lote)) {
  const id = Number(idStr);
  const art = existe.get(id);
  if (!art) { console.error(`  ✗ id ${id}: NO existe en la base — se omite`); invalidos++; continue; }
  const t = String(texto || "").trim();
  if (t.length < 15 || t.length > 700) { console.error(`  ✗ id ${id}: largo sospechoso (${t.length}) — se omite`); invalidos++; continue; }
  if (store[idStr]) { yaEstaban++; continue; } // no sobrescribir lo ya hecho
  store[idStr] = t;
  nuevos++;
}

writeFileSync(RUTA, JSON.stringify(store));
console.log(`LOTE aplicado · nuevos: ${nuevos} · ya estaban: ${yaEstaban} · inválidos: ${invalidos} · total en store: ${Object.keys(store).length}`);
