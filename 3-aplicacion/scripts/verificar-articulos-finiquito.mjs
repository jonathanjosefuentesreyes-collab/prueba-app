// Verifica contra la DB oficial los artículos que fundan la calculadora de finiquito.
import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const db = new Database(path.join(raiz, 'data', 'leyes.db'), { readonly: true });
const CT = 207436; // Código del Trabajo

const q = db.prepare(`
  SELECT encabezado, texto FROM articulos
  WHERE norma_id = ? AND TRIM(encabezado) IN (SELECT value FROM json_each(?))
  ORDER BY orden
`);
for (const enc of ['Artículo 73', 'Artículo 162', 'Artículo 163', 'Artículo 172', 'Artículo 69', 'Artículo 168']) {
  const filas = q.all(CT, JSON.stringify([enc, enc.replace('Artículo', 'Art.')]));
  for (const f of filas) {
    console.log(`\n=== CT ${f.encabezado} ===`);
    console.log(f.texto.slice(0, 700).replace(/\n+/g, '\n'));
  }
}
db.close();
