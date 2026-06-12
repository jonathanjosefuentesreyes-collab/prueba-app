import Database from "better-sqlite3";
const db = new Database("data/leyes.db", { readonly: true });
const PATRONES = [
  "%Código del Trabajo%",
  "%Arrendamiento%",
  "%Pensiones Alimenticias%",
  "%Consumidor%",
  "%Código Civil%",
  "%Tránsito%",
  "%Constitución%",
  "%Código Penal%",
];
const q = db.prepare(
  `SELECT n.id, COALESCE(n.nombre_corto, n.titulo) AS nombre
   FROM normas n
   WHERE n.nombre_corto LIKE ? OR n.titulo LIKE ?
   ORDER BY LENGTH(COALESCE(n.nombre_corto, n.titulo)) LIMIT 1`
);
for (const p of PATRONES) {
  const n = q.get(p, p);
  console.log(p.padEnd(30), "->", n ? `${n.id} ${n.nombre}` : "SIN MATCH");
}
