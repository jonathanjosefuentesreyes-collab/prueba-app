// Vuelca los artículos de una norma que AÚN NO tienen simplificación, con su texto oficial,
// para redactarlas a mano y luego insertarlas con agregar-simplificaciones.mjs.
// Uso:  node scripts/extraer-pendientes.mjs <normaId> [MAX]
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const NORMA = Number(process.argv[2]);
const MAX = Number(process.argv[3] || 60);
if (!NORMA) { console.error("Uso: node scripts/extraer-pendientes.mjs <normaId> [MAX]"); process.exit(1); }

const RUTA = new URL("../src/data/simplificaciones.json", import.meta.url);
const store = JSON.parse(readFileSync(RUTA, "utf8"));
const db = new Database(fileURLToPath(new URL("../data/leyes.db", import.meta.url)), { readonly: true });

const filas = db.prepare(
  "SELECT id, encabezado, texto FROM articulos WHERE norma_id=? AND (derogado IS NULL OR derogado=0) ORDER BY orden"
).all(NORMA);
const pendientes = filas.filter((f) => !store[f.id]);
const numeroReal = (enc) => (enc.match(/Art[íi]culo\s+([\dA-Za-z° ]+)/i)?.[1] || "").trim();

console.log(`NORMA ${NORMA} · total no-derogados: ${filas.length} · pendientes: ${pendientes.length}`);
console.log("=== LOTE ===");
for (const f of pendientes.slice(0, MAX)) {
  console.log(`\n#ID ${f.id} · Art ${numeroReal(f.encabezado)}`);
  console.log((f.texto || "").replace(/\s+/g, " ").trim().slice(0, 1100));
}
