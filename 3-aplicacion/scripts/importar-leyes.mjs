// Importador de leyes (QA Nivel 3 aplicado en código) — carga leyes-tier*.jsonl a SQLite.
// Uso: npm run import:leyes
// Idempotente: re-importar actualiza solo las normas cuyo hash de contenido cambió.
// Excluye normas derogadas (un idNorma equivocado suele venir derogado — caso real: 14249).

import Database from 'better-sqlite3';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const carpetaLeyes = path.resolve(raiz, '..', '2-archivo-maestro-leyes');
const carpetaData = path.join(raiz, 'data');
fs.mkdirSync(carpetaData, { recursive: true });
const db = new Database(path.join(carpetaData, 'leyes.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS normas (
  id INTEGER PRIMARY KEY,
  tipo TEXT, numero_norma TEXT,
  titulo TEXT NOT NULL,
  nombre_corto TEXT,
  vigencia TEXT,
  fecha_version TEXT,
  fecha_descarga TEXT,
  tier INTEGER,
  url TEXT,
  organismo TEXT,
  hash TEXT NOT NULL,
  importado_en TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS articulos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  norma_id INTEGER NOT NULL REFERENCES normas(id) ON DELETE CASCADE,
  orden INTEGER NOT NULL,
  encabezado TEXT NOT NULL,
  texto TEXT NOT NULL,
  derogado INTEGER DEFAULT 0,
  transitorio INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_articulos_norma ON articulos(norma_id, orden);
CREATE TABLE IF NOT EXISTS cambios_normas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  norma_id INTEGER NOT NULL,
  detectado_en TEXT NOT NULL,
  detalle TEXT
);
CREATE VIRTUAL TABLE IF NOT EXISTS articulos_fts USING fts5(
  encabezado, texto,
  content='articulos', content_rowid='id',
  tokenize='unicode61 remove_diacritics 2'
);
`);

const archivos = fs.readdirSync(carpetaLeyes).filter(f => /^leyes-tier\d+\.jsonl$/i.test(f)).sort();
if (archivos.length === 0) {
  console.error(`No hay leyes-tier*.jsonl en ${carpetaLeyes}`);
  process.exit(1);
}

const upsertNorma = db.prepare(`
  INSERT INTO normas (id, tipo, numero_norma, titulo, nombre_corto, vigencia, fecha_version, fecha_descarga, tier, url, organismo, hash, importado_en)
  VALUES (@id, @tipo, @numero_norma, @titulo, @nombre_corto, @vigencia, @fecha_version, @fecha_descarga, @tier, @url, @organismo, @hash, @importado_en)
  ON CONFLICT(id) DO UPDATE SET
    tipo=excluded.tipo, numero_norma=excluded.numero_norma, titulo=excluded.titulo,
    nombre_corto=excluded.nombre_corto, vigencia=excluded.vigencia, fecha_version=excluded.fecha_version,
    fecha_descarga=excluded.fecha_descarga, tier=excluded.tier, url=excluded.url,
    organismo=excluded.organismo, hash=excluded.hash, importado_en=excluded.importado_en
`);
const borrarArticulos = db.prepare('DELETE FROM articulos WHERE norma_id = ?');
const insertarArticulo = db.prepare(`
  INSERT INTO articulos (norma_id, orden, encabezado, texto, derogado, transitorio)
  VALUES (?, ?, ?, ?, ?, ?)
`);
const hashExistente = db.prepare('SELECT hash FROM normas WHERE id = ?');

let nuevas = 0, actualizadas = 0, sinCambio = 0, excluidas = [];

const importarNorma = db.transaction((n, hash) => {
  upsertNorma.run({
    id: n.idNorma, tipo: n.tipo ?? null, numero_norma: n.numero_norma ?? null,
    titulo: n.titulo, nombre_corto: n.nombre_corto ?? null, vigencia: n.vigencia ?? null,
    fecha_version: n.fecha_version ?? null, fecha_descarga: n.fecha_descarga ?? null,
    tier: n.tier ?? null, url: n.url ?? null, organismo: n.organismo ?? null,
    hash, importado_en: new Date().toISOString(),
  });
  borrarArticulos.run(n.idNorma);
  for (const a of n.articulos) {
    insertarArticulo.run(n.idNorma, a.orden, String(a.encabezado ?? '').trim(), String(a.texto ?? ''), a.derogado ? 1 : 0, a.transitorio ? 1 : 0);
  }
});

for (const archivo of archivos) {
  const lineas = fs.readFileSync(path.join(carpetaLeyes, archivo), 'utf8').split(/\r?\n/).filter(l => l.trim());
  console.log(`\n${archivo}: ${lineas.length} normas`);
  for (const linea of lineas) {
    const n = JSON.parse(linea);
    if (String(n.vigencia ?? '').toLowerCase().includes('derogada')) {
      excluidas.push(`${n.idNorma} (${n.nombre_corto ?? n.titulo}) [derogada]`);
      continue;
    }
    // Datos incompletos: sin idNorma no hay actualizador, sin título no hay Biblioteca.
    if (!n.idNorma || !n.titulo || !Array.isArray(n.articulos) || n.articulos.length === 0) {
      excluidas.push(`${n.idNorma ?? '??'} (${n.nombre_corto ?? 'sin nombre'}) [datos incompletos]`);
      continue;
    }
    const hash = createHash('sha256').update(JSON.stringify(n.articulos)).digest('hex');
    const previa = hashExistente.get(n.idNorma);
    if (previa && previa.hash === hash) { sinCambio++; continue; }
    importarNorma(n, hash);
    previa ? actualizadas++ : nuevas++;
  }
}

// Reconstruir el índice de búsqueda completo (idempotente y simple)
db.exec(`INSERT INTO articulos_fts(articulos_fts) VALUES('rebuild');`);

const totNormas = db.prepare('SELECT COUNT(*) c FROM normas').get().c;
const totArt = db.prepare('SELECT COUNT(*) c FROM articulos').get().c;
console.log(`\n=== IMPORTACIÓN COMPLETA ===`);
console.log(`Nuevas: ${nuevas} | actualizadas: ${actualizadas} | sin cambios: ${sinCambio}`);
if (excluidas.length) console.log(`Excluidas por DEROGADA (revisar idNorma): ${excluidas.join('; ')}`);
console.log(`En DB: ${totNormas} normas, ${totArt} artículos. Archivo: data/leyes.db`);
db.close();
