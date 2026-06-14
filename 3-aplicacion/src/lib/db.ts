// Capa de acceso a la DB de leyes (solo servidor). Regla dura #4 de CLAUDE.md:
// la navegación usa el id de fila; el número visible se deriva del encabezado.
import Database from "better-sqlite3";
import path from "node:path";

export interface Norma {
  id: number;
  tipo: string | null;
  numero_norma: string | null;
  titulo: string;
  nombre_corto: string | null;
  fecha_version: string | null;
  url: string | null;
  tier: number | null;
  organismo: string | null;
  total_articulos?: number;
}

export interface Articulo {
  id: number;
  norma_id: number;
  orden: number;
  encabezado: string;
  texto: string;
  transitorio: number;
}

export interface ResultadoBusqueda {
  articulo_id: number;
  norma_id: number;
  encabezado: string;
  nombre: string;
  extracto: string;
  texto?: string;
  transitorio?: number;
  titulo_ley?: string;
}

let db: Database.Database | null = null;
function getDb() {
  if (!db) {
    db = new Database(path.join(process.cwd(), "data", "leyes.db"), {
      readonly: true,
      fileMustExist: true,
    });
  }
  return db;
}

export function numeroReal(encabezado: string): string {
  const limpio = encabezado
    .replace(/^art[ií]culo\s*/i, "")
    .replace(/^art\.?\s*/i, "")
    .replace(/[\s.:]+$/g, "")
    .trim();
  return limpio || encabezado;
}

export function nombreDe(n: Pick<Norma, "nombre_corto" | "titulo">): string {
  return n.nombre_corto || n.titulo;
}

// Conteo de artículos por norma en UNA pasada (cacheado en proceso). Con 20.000+
// normas, un COUNT correlacionado por fila tardaba ~7 s; este GROUP BY único baja
// a milisegundos. La DB es de solo lectura en runtime, así que el caché no expira.
let cacheConteos: Map<number, number> | null = null;
function conteosArticulos(): Map<number, number> {
  if (!cacheConteos) {
    cacheConteos = new Map();
    const filas = getDb()
      .prepare(`SELECT norma_id, COUNT(*) AS n FROM articulos GROUP BY norma_id`)
      .all() as { norma_id: number; n: number }[];
    for (const f of filas) cacheConteos.set(f.norma_id, f.n);
  }
  return cacheConteos;
}

export function listarNormas(ids?: number[]): Norma[] {
  const d = getDb();
  const conteos = conteosArticulos();
  let rows: Norma[];
  if (ids && ids.length > 0) {
    rows = d
      .prepare(`SELECT * FROM normas WHERE id IN (SELECT value FROM json_each(?)) ORDER BY nombre_corto`)
      .all(JSON.stringify(ids)) as Norma[];
  } else {
    rows = d
      .prepare(`SELECT * FROM normas ORDER BY CASE WHEN tier IS NULL THEN 99 ELSE tier END, nombre_corto, titulo`)
      .all() as Norma[];
  }
  for (const r of rows) r.total_articulos = conteos.get(r.id) ?? 0;
  return rows;
}

export function obtenerNorma(id: number): Norma | undefined {
  return getDb()
    .prepare(
      `SELECT n.*, (SELECT COUNT(*) FROM articulos a WHERE a.norma_id = n.id) AS total_articulos FROM normas n WHERE n.id = ?`
    )
    .get(id) as Norma | undefined;
}

export const POR_PAGINA = 100;

export function articulosDeNorma(normaId: number, pagina: number): Articulo[] {
  return getDb()
    .prepare(
      `SELECT id, norma_id, orden, encabezado, texto, transitorio FROM articulos WHERE norma_id = ? ORDER BY orden LIMIT ? OFFSET ?`
    )
    .all(normaId, POR_PAGINA, (pagina - 1) * POR_PAGINA) as Articulo[];
}

export function paginaDeArticulo(normaId: number, articuloId: number): number {
  const fila = getDb()
    .prepare(
      `SELECT COUNT(*) AS pos FROM articulos WHERE norma_id = ? AND orden <= (SELECT orden FROM articulos WHERE id = ?)`
    )
    .get(normaId, articuloId) as { pos: number };
  return Math.max(1, Math.ceil(fila.pos / POR_PAGINA));
}

const VACIAS = new Set([
  "me", "mi", "mis", "tu", "tus", "su", "sus", "el", "la", "los", "las", "un", "una", "unos", "unas",
  "de", "del", "al", "a", "en", "por", "para", "con", "sin", "que", "qué", "como", "cómo", "cuando",
  "cuándo", "donde", "dónde", "es", "son", "ser", "está", "estoy", "hay", "fue", "se", "lo", "le",
  "les", "no", "ni", "o", "u", "y", "e", "si", "sí", "ya", "más", "muy", "pero", "este", "esta",
  "esto", "ese", "esa", "eso", "puede", "puedo", "pueden", "hace", "hacer", "tengo", "tiene", "quiero",
]);

// OR + ranking bm25: la gente escribe frases completas ("me despidieron sin aviso");
// exigir todas las palabras (AND) devolvía cero resultados.
function consultaFts(q: string): string | null {
  const tokens = q
    .normalize("NFC")
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 2 && !VACIAS.has(t));
  if (tokens.length === 0) return null;
  // Prefijo en palabras largas: "extra" encuentra "extraordinarias", "indemniz" → "indemnización"
  return [...new Set(tokens)]
    .map((t) => {
      const limpio = t.replaceAll('"', "");
      return limpio.length >= 4 ? `"${limpio}"*` : `"${limpio}"`;
    })
    .join(" OR ");
}

// Leyes núcleo (las que la gente realmente consulta): se construye desde MATERIAS.
// Con 20.000+ normas, una ley oscura puede ganarle por bm25 a la canónica
// ("pensión de alimentos" devolvía una ley vieja en vez de la 14.908). Damos a
// estas normas un bono de relevancia para que afloren cuando hay match.
let cacheCore: number[] | null = null;
function idsNucleo(): number[] {
  if (!cacheCore) cacheCore = [...new Set(Object.values(MATERIAS).flatMap((m) => m.ids))];
  return cacheCore;
}

// `diversificar`: limita a 2 artículos por norma y trae un pool mayor, para que
// en preguntas amplias ("beneficios para extranjeros") el modelo vea VARIAS leyes
// (Migración, Salud, Vivienda…) y no 6 artículos del mismo Código. Sin esto, el
// boost de leyes núcleo hacía que el Código Civil copara todos los resultados.
export function buscar(
  q: string,
  limite = 20,
  normaId?: number,
  diversificar = false
): ResultadoBusqueda[] {
  const match = consultaFts(q);
  if (!match) return [];
  const filtro = normaId ? "AND a.norma_id = ?" : "";
  const core = JSON.stringify(idsNucleo());
  // Trae un pool más grande cuando diversificamos, para poder filtrar por norma.
  const pool = diversificar ? Math.max(limite * 6, 48) : limite;
  // bm25 es negativo (más negativo = más relevante); restar el bono empuja las
  // leyes núcleo hacia arriba, sin anular un match muy fuerte de otra norma.
  const args: (string | number)[] = normaId
    ? [match, normaId, core, pool]
    : [match, core, pool];
  try {
    const filas = getDb()
      .prepare(
        `SELECT a.id AS articulo_id, a.norma_id, a.encabezado, a.texto, a.transitorio,
                COALESCE(n.nombre_corto, n.titulo) AS nombre, n.titulo AS titulo_ley,
                snippet(articulos_fts, 1, '<mark>', '</mark>', '…', 16) AS extracto
         FROM articulos_fts f
         JOIN articulos a ON a.id = f.rowid
         JOIN normas n ON n.id = a.norma_id
         WHERE articulos_fts MATCH ? ${filtro}
         ORDER BY bm25(articulos_fts) - CASE WHEN a.norma_id IN (SELECT value FROM json_each(?)) THEN 6 ELSE 0 END
         LIMIT ?`
      )
      .all(...args) as ResultadoBusqueda[];
    if (!diversificar) return filas;
    const porNorma = new Map<number, number>();
    const diversa: ResultadoBusqueda[] = [];
    for (const f of filas) {
      const usados = porNorma.get(f.norma_id) ?? 0;
      if (usados >= 2) continue;
      porNorma.set(f.norma_id, usados + 1);
      diversa.push(f);
      if (diversa.length >= limite) break;
    }
    return diversa;
  } catch {
    return [];
  }
}

export function ultimasPublicaciones(n = 3): Norma[] {
  return getDb()
    .prepare(
      `SELECT * FROM normas WHERE fecha_version IS NOT NULL ORDER BY fecha_version DESC, id DESC LIMIT ?`
    )
    .all(n) as Norma[];
}

export function articuloPorId(id: number): (Articulo & { nombre: string }) | undefined {
  return getDb()
    .prepare(
      `SELECT a.*, COALESCE(n.nombre_corto, n.titulo) AS nombre FROM articulos a JOIN normas n ON n.id = a.norma_id WHERE a.id = ?`
    )
    .get(id) as (Articulo & { nombre: string }) | undefined;
}

export interface Grupo { clave: string; etiqueta: string; descripcion: string; normas: Norma[]; }

// Macro-grupos de la Biblioteca: cada norma cae en UN solo grupo, por prioridad
// (fundamentales → materia curada → DL/DFL → otras). Escala solo cuando lleguen
// los tiers 2-3: lo no clasificado cae a "Otras leyes" y sigue siendo buscable.
export function gruposBiblioteca(): Grupo[] {
  const todas = listarNormas();
  const usadas = new Set<number>();
  const tomar = (pred: (n: Norma) => boolean) =>
    todas.filter((n) => {
      if (usadas.has(n.id) || !pred(n)) return false;
      usadas.add(n.id);
      return true;
    });

  const grupos: Grupo[] = [
    {
      clave: "fundamentales",
      etiqueta: "Constitución y Códigos",
      descripcion: "Las normas madre del derecho chileno",
      normas: tomar(
        (n) => n.id === 242302 || /c[óo]digo/i.test(n.nombre_corto || "") || /\bC[ÓO]DIGO\b/i.test(n.titulo)
      ),
    },
  ];
  const DESCRIPCIONES: Record<string, string> = {
    laboral: "Trabajo, despidos, accidentes y previsión",
    familia: "Matrimonio, pensión de alimentos y familia",
    civil: "Arriendo, consumidor, datos y copropiedad",
    penal: "Delitos, drogas y responsabilidad penal",
    comercial: "Empresas, sociedades e insolvencia",
    tributario: "Impuestos: renta, IVA y Código Tributario",
  };
  for (const [clave, m] of Object.entries(MATERIAS)) {
    grupos.push({
      clave,
      etiqueta: m.etiqueta,
      descripcion: DESCRIPCIONES[clave] || "",
      normas: tomar((n) => m.ids.includes(n.id)),
    });
  }
  grupos.push({
    clave: "estado",
    etiqueta: "Estado y administración",
    descripcion: "Municipalidades, procedimientos y organismos públicos",
    normas: tomar((n) => /(MUNICIPALIDADES|ADMINISTRACION DEL ESTADO|PROCEDIMIENTOS ADMINISTRATIVOS|MINISTERIO PUBLICO|ORGANICA CONSTITUCIONAL)/i.test(n.titulo)),
  });
  grupos.push({
    clave: "dfl-dl",
    etiqueta: "Decretos Ley y DFL",
    descripcion: "Decretos con rango de ley",
    normas: tomar((n) => /^(DL|DFL|DECRETO)/i.test(n.numero_norma || "") || /^(DL|DFL|Decreto)/i.test(n.tipo || "")),
  });
  grupos.push({
    clave: "otras",
    etiqueta: "Otras leyes",
    descripcion: "El resto del archivo, siempre buscable",
    normas: tomar(() => true),
  });
  return grupos.filter((g) => g.normas.length > 0);
}

// Índice "más consultadas" de la portada: se buscan por nombre en la DB (nunca
// hardcodear títulos — el nombre mostrado siempre sale de la fuente oficial).
// Orden = popularidad de consulta ciudadana real (despido > arriendo > alimentos…).
const PATRONES_POPULARES = [
  "%Código del Trabajo%",
  "%Arrendamiento%",
  "%Pensiones Alimenticias%",
  "%Consumidor%",
  "%Código Civil%",
  "%Tránsito%",
  "%Constitución%",
  "%Código Penal%",
];

export function normasPopulares(): Norma[] {
  const d = getDb();
  // Preferir match en nombre_corto (curado por nosotros) sobre match en título:
  // sin esto, "Pensiones Alimenticias" la ganaba un DFL cuyo título cita la frase.
  const q = d.prepare(
    `SELECT n.*, (SELECT COUNT(*) FROM articulos a WHERE a.norma_id = n.id) AS total_articulos
     FROM normas n
     WHERE n.nombre_corto LIKE ? OR n.titulo LIKE ?
     ORDER BY CASE WHEN n.nombre_corto LIKE ? THEN 0 ELSE 1 END,
              LENGTH(COALESCE(n.nombre_corto, n.titulo)) LIMIT 1`
  );
  const vistos = new Set<number>();
  const populares: Norma[] = [];
  for (const patron of PATRONES_POPULARES) {
    const n = q.get(patron, patron, patron) as Norma | undefined;
    if (n && !vistos.has(n.id)) {
      vistos.add(n.id);
      populares.push(n);
    }
  }
  return populares;
}

// Acceso rápido por materia (curado; se amplía a medida que crezca la DB)
export const MATERIAS: Record<string, { etiqueta: string; ids: number[] }> = {
  laboral: { etiqueta: "Laboral", ids: [207436, 28650, 1200096, 1191554, 1143741, 1030936, 7147] },
  familia: { etiqueta: "Familia", ids: [225128, 1075210, 27977, 229557, 242648] },
  civil: { etiqueta: "Civil", ids: [172986, 29526, 141599, 1174663, 61438] },
  penal: { etiqueta: "Penal", ids: [1984, 176595, 235507, 244803, 18914] },
  comercial: { etiqueta: "Comercial", ids: [1974, 29473, 1058072] },
  tributario: { etiqueta: "Tributario", ids: [6374, 6368, 6369] },
};
