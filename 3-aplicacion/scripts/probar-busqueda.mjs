import Database from 'better-sqlite3';
const db = new Database('C:/Users/Lucyfer/Desktop/vs and claude/Leyes chilenas/3-aplicacion/data/leyes.db', { readonly: true });
const q = db.prepare(`
  SELECT n.nombre_corto, a.encabezado, snippet(articulos_fts, 1, '>>', '<<', '…', 12) extracto,
         bm25(articulos_fts) score
  FROM articulos_fts f
  JOIN articulos a ON a.id = f.rowid
  JOIN normas n ON n.id = a.norma_id
  WHERE articulos_fts MATCH ?
  ORDER BY score LIMIT 4
`);
for (const consulta of ['despido indemnizacion aviso', 'pension alimentos deudor', 'arrendatario restitucion inmueble']) {
  console.log(`\n>>> "${consulta}"`);
  for (const r of q.all(consulta)) console.log(` [${r.nombre_corto}] ${r.encabezado}: ${r.extracto.replace(/\s+/g, ' ')}`);
}
db.close();
