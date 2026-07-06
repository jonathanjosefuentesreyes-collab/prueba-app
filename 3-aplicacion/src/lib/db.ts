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
    // Metadata del importador en los DL/DFL refundidos: "27 (DEL ART 1)",
    // "20 (DEL ART. PRIMERO)" → el número real es lo de antes del paréntesis.
    .replace(/\s*\((?:DEL\s+)?ART[^)]*\)\s*$/i, "")
    .replace(/[\s.:]+$/g, "")
    .trim();
  return limpio || encabezado;
}

export function nombreDe(n: Pick<Norma, "nombre_corto" | "titulo">): string {
  return n.nombre_corto || n.titulo;
}

// Devuelve el Set de norma_ids que tienen al menos uno de los ids de artículo dados (las
// que tienen simplificación = valor único). UNA sola consulta. Sirve para indexar solo las
// leyes con explicación en simple y dejar fuera del índice/sitemap el texto legal crudo
// (duplicado de la BCN), que es lo que AdSense marca como "contenido de bajo valor".
export function normasConSimplificacion(idsArticulos: number[]): Set<number> {
  if (!idsArticulos.length) return new Set();
  const filas = getDb()
    .prepare(`SELECT DISTINCT norma_id FROM articulos WHERE id IN (SELECT value FROM json_each(?))`)
    .all(JSON.stringify(idsArticulos)) as { norma_id: number }[];
  return new Set(filas.map((f) => f.norma_id));
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

// ¿Es una de las leyes núcleo (curadas, las que la gente realmente consulta)?
// Se usa como guardia: una cita del modelo a una ley fuera de contexto solo se
// enlaza si es núcleo (evita enlazar leyes obscuras inventadas de memoria).
export function esLeyNucleo(id: number): boolean {
  return idsNucleo().includes(id);
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
// Leyes muy consultadas que no viven en una materia del grid pero merecen el bono
// de relevancia del núcleo: la Constitución y la Ley de Migración y Extranjería.
const NUCLEO_EXTRA = [242302, 1158549];
let cacheCore: number[] | null = null;
function idsNucleo(): number[] {
  if (!cacheCore)
    cacheCore = [...new Set([...Object.values(MATERIAS).flatMap((m) => m.ids), ...NUCLEO_EXTRA])];
  return cacheCore;
}

// Refundidos DUPLICADOS de leyes núcleo: el archivo BCN trae copias del mismo código
// con nombre crudo ("DFL 1" = Código del Trabajo, "DFL 2" = Código Civil). Si afloran
// en la búsqueda, el chatbot las cita con ese nombre feo y duplica la fuente. Se
// detectan por título idéntico a un núcleo + refundidos de Códigos del núcleo, y se
// excluyen de la búsqueda (la versión canónica curada queda). Cacheado.
let cacheDuplicados: Set<number> | null = null;
function idsDuplicadosNucleo(): Set<number> {
  if (cacheDuplicados) return cacheDuplicados;
  const d = getDb();
  const dup = new Set<number>();
  const enMayus = (s: string) => s.toUpperCase().normalize("NFD").replace(SIN_TILDES, "");
  const nucleos = d
    .prepare(`SELECT id, titulo, nombre_corto, numero_norma FROM normas WHERE id IN (SELECT value FROM json_each(?))`)
    .all(JSON.stringify(idsNucleo())) as { id: number; titulo: string; nombre_corto: string | null; numero_norma: string | null }[];

  // Identificadores de núcleo que aparecen en el título de un refundido: el nombre
  // del Código ("CODIGO CIVIL") o el número de ley con puntos ("19.496").
  const idents: string[] = [];
  for (const n of nucleos) {
    if (n.nombre_corto && /^Código/i.test(n.nombre_corto)) idents.push(enMayus(n.nombre_corto));
    const dig = (n.numero_norma || "").replace(/\D/g, "");
    if (dig.length >= 4) idents.push(dig.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  }

  // 1) Copias con título IDÉNTICO a un núcleo.
  const mismoTitulo = d.prepare(`SELECT id FROM normas WHERE titulo = ? AND id != ?`);
  for (const n of nucleos) for (const r of mismoTitulo.all(n.titulo, n.id) as { id: number }[]) dup.add(r.id);

  // 2) Refundidos con nombre CRUDO (DFL/DL/DECRETO N) cuyo título referencia un núcleo.
  //    Conservador: exige la palabra REFUNDIDO + un identificador de núcleo. Así no
  //    arrastra leyes que solo "modifican" un código.
  const crudos = d
    .prepare(
      `SELECT id, titulo FROM normas
       WHERE titulo LIKE '%REFUNDIDO%'
         AND (nombre_corto GLOB 'DFL [0-9]*' OR nombre_corto GLOB 'DL [0-9]*'
              OR nombre_corto GLOB 'DECRETO [0-9]*' OR nombre_corto GLOB 'D.L. [0-9]*')`
    )
    .all() as { id: number; titulo: string }[];
  for (const c of crudos) {
    const t = enMayus(c.titulo);
    if (idents.some((frag) => t.includes(frag))) dup.add(c.id);
  }

  cacheDuplicados = dup;
  return dup;
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
  const dups = JSON.stringify([...idsDuplicadosNucleo()]);
  // Trae un pool más grande cuando diversificamos, para poder filtrar por norma.
  const pool = diversificar ? Math.max(limite * 6, 48) : limite;
  // bm25 es negativo (más negativo = más relevante); restar el bono empuja las
  // leyes núcleo hacia arriba, sin anular un match muy fuerte de otra norma.
  // Se excluyen los refundidos duplicados para no citar copias ("DFL 1"/"DFL 2").
  const args: (string | number)[] = normaId
    ? [match, normaId, dups, core, pool]
    : [match, dups, core, pool];
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
           AND a.norma_id NOT IN (SELECT value FROM json_each(?))
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
  // Filtra fechas corruptas (algunas normas traen años futuros como 2222/2946 o
  // anteriores a 1900) para que "más recientes" muestre leyes con fecha real.
  return getDb()
    .prepare(
      `SELECT * FROM normas
       WHERE fecha_version IS NOT NULL
         AND fecha_version <= date('now') AND fecha_version >= '1900-01-01'
       ORDER BY fecha_version DESC, id DESC LIMIT ?`
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

// Índice ligero (id + encabezado) de TODOS los artículos de una norma, en orden. Para las
// páginas por-artículo (SSG): generar params y resolver slug → artículo, sin traer el texto.
export function articulosIndice(normaId: number): { id: number; encabezado: string }[] {
  return getDb()
    .prepare(`SELECT id, encabezado FROM articulos WHERE norma_id = ? ORDER BY orden`)
    .all(normaId) as { id: number; encabezado: string }[];
}

// Slug SEO de un artículo a partir de su encabezado: "Artículo 196 C" → "articulo-196-c".
// Estable (deriva de numeroReal, regla dura #4); el mismo encabezado da siempre el mismo slug.
export function slugDeArticulo(encabezado: string): string {
  const n = numeroReal(encabezado)
    .toLowerCase()
    // La Ñ se mapea a "nn" ANTES de quitar tildes: si se normalizara como N, el
    // "Artículo 183 Ñ" del Código del Trabajo chocaría con el "Artículo 183 N"
    // (mismo slug → una de las dos páginas queda inalcanzable y el sitemap la
    // anuncia duplicada). Con "nn" cada uno conserva URL propia y estable.
    .replace(/ñ/g, "nn")
    .normalize("NFD")
    .replace(SIN_TILDES, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `articulo-${n || "s-n"}`;
}

// Slugs ÚNICOS para todos los artículos de una norma. Los textos refundidos reutilizan
// numeración (regla dura #4: el Código Civil trae leyes anexas que parten de nuevo en
// "Artículo 1"), así que el slug simple colisiona. Regla determinista: el PRIMER artículo
// por orden conserva el slug limpio (es la ley principal, la que la gente busca); los
// siguientes con el mismo slug llevan sufijo con su id de fila (estable entre builds).
export function slugsDeNorma(normaId: number): Map<number, string> {
  const usados = new Set<string>();
  const mapa = new Map<number, string>();
  for (const a of articulosIndice(normaId)) {
    const base = slugDeArticulo(a.encabezado);
    const slug = usados.has(base) ? `${base}-${a.id}` : base;
    usados.add(base);
    mapa.set(a.id, slug);
  }
  return mapa;
}

// ─── Resolución de citas del modelo ──────────────────────────────────────────
// AbogaBot responde como asesor y cita leyes por nombre/número; aquí verificamos
// cada cita contra la base OFICIAL y solo enlazamos lo que existe de verdad. Lo
// que no se puede verificar no se enlaza (el texto lo menciona, pero sin chip
// falso). Es el candado que pide el usuario: "que cite la ley y verifique fuentes".
const soloDigitos = (s: string) => (s || "").replace(/\D/g, "");

const SIN_TILDES = new RegExp("[\\u0300-\\u036f]", "g");
function normalizarNombre(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(SIN_TILDES, "") // quita tildes
    .replace(/n[°º]\s*/g, "")
    .replace(/["“”']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normNum(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/^art[ií]culo\s*/i, "")
    .replace(/^art\.?\s*/i, "")
    .replace(/[\s.]+/g, "");
}

// Conjunto de normas enlazables por nombre: el núcleo curado + todos los Códigos +
// la Constitución. Cacheado: la DB es de solo lectura. Cada norma guarda claves
// normalizadas (nombre completo y versión corta antes de "(" o " - ") para casar
// citas como "Ley Karin" contra "Ley Karin - Acoso Laboral (21.643)".
let cacheEnlazables: { id: number; claves: string[]; nucleo: boolean }[] | null = null;
function enlazables() {
  if (!cacheEnlazables) {
    const nuc = new Set(idsNucleo());
    const filas = getDb()
      .prepare(
        `SELECT id, nombre_corto FROM normas
         WHERE nombre_corto IS NOT NULL
           AND (nombre_corto LIKE 'Código%' OR nombre_corto LIKE '%onstituci%'
                OR id IN (SELECT value FROM json_each(?)))`
      )
      .all(JSON.stringify(idsNucleo())) as { id: number; nombre_corto: string }[];
    cacheEnlazables = filas.map((f) => {
      const base = normalizarNombre(f.nombre_corto);
      const corta = base.split(/\s+\(|\s+-\s+/)[0].trim();
      const claves = [...new Set([base, corta].filter((x) => x.length >= 4))];
      return { id: f.id, claves, nucleo: nuc.has(f.id) };
    });
  }
  return cacheEnlazables;
}

// Resuelve una referencia textual del modelo ("Código del Trabajo", "Ley 21.325",
// "Ley N° 20.066") a una norma real. Devuelve undefined si no existe en la base.
export function normaPorReferencia(ref: string): Norma | undefined {
  const d = getDb();
  const r = normalizarNombre(ref);
  if (!r) return undefined;

  // 1) Por número de ley o decreto ley (DFL se omite: "DFL 1" es ambiguo).
  const mNum = ref.match(/\b(ley|decreto\s+ley|d\.?\s?l\.?)\b[^\d]*?(\d[\d.]*)/i);
  if (mNum) {
    const dig = soloDigitos(mNum[2]);
    if (dig.length >= 3) {
      const cand = d.prepare(`SELECT * FROM normas WHERE numero_norma LIKE ?`).all(`%${dig}%`) as Norma[];
      const exactas = cand.filter((n) => soloDigitos(n.numero_norma || "") === dig);
      if (exactas.length) {
        const nuc = new Set(idsNucleo());
        exactas.sort(
          (a, b) =>
            Number(nuc.has(b.id)) - Number(nuc.has(a.id)) ||
            (a.tier ?? 99) - (b.tier ?? 99) ||
            a.id - b.id
        );
        const elegida = exactas[0];
        elegida.total_articulos = conteosArticulos().get(elegida.id) ?? 0;
        return elegida;
      }
    }
  }

  // 2) Por nombre (núcleo + Códigos + Constitución), contención en ambos sentidos.
  let mejor: { id: number; score: number; nucleo: boolean } | null = null;
  for (const e of enlazables()) {
    for (const clave of e.claves) {
      if (r.includes(clave) || clave.includes(r)) {
        const score = Math.min(clave.length, r.length);
        if (!mejor || score > mejor.score || (score === mejor.score && e.nucleo && !mejor.nucleo)) {
          mejor = { id: e.id, score, nucleo: e.nucleo };
        }
      }
    }
  }
  if (mejor) {
    const n = d.prepare(`SELECT * FROM normas WHERE id = ?`).get(mejor.id) as Norma;
    n.total_articulos = conteosArticulos().get(n.id) ?? 0;
    return n;
  }

  // 3) Fallback: LIKE amplio (prefiere coincidencia en nombre_corto, núcleo, corto).
  // Excluye nombres CRUDOS sin curar ("DFL 1", "LEY 21325", "DL 476", "DECRETO 100"):
  // son fragmentos refundidos que, si Gemini cita "DFL N°1", resolverían a la copia
  // equivocada del Código (las leyes reales ya se resuelven por número arriba).
  const like = `%${ref.trim().replace(/%/g, "")}%`;
  const n = d
    .prepare(
      `SELECT * FROM normas
       WHERE (nombre_corto LIKE ? OR titulo LIKE ?)
         AND nombre_corto NOT GLOB 'DFL [0-9]*' AND nombre_corto NOT GLOB 'DL [0-9]*'
         AND nombre_corto NOT GLOB 'LEY [0-9]*' AND nombre_corto NOT GLOB 'DECRETO*[0-9]*'
       ORDER BY CASE WHEN nombre_corto LIKE ? THEN 0 ELSE 1 END,
                (CASE WHEN tier IS NULL THEN 99 ELSE tier END),
                LENGTH(COALESCE(nombre_corto, titulo)) LIMIT 1`
    )
    .get(like, like, like) as Norma | undefined;
  if (n) n.total_articulos = conteosArticulos().get(n.id) ?? 0;
  return n;
}

// Resuelve el número visible de un artículo ("159", "9 bis", "19") a su fila real
// dentro de una norma. Acota por LIKE y confirma con numeroReal exacto en JS.
export function articuloPorNumero(
  normaId: number,
  numero: string
): { id: number; encabezado: string } | undefined {
  const objetivo = normNum(numero);
  const dig = soloDigitos(numero);
  if (!objetivo || !dig) return undefined;
  const d = getDb();
  const intentos: [string, string][] = [
    [`Artículo ${dig}`, `Artículo ${dig} %`],
    [`Art. ${dig}`, `Art. ${dig} %`],
    [`%${dig}%`, `%${dig}%`],
  ];
  for (const [p1, p2] of intentos) {
    const filas = d
      .prepare(
        `SELECT id, encabezado FROM articulos WHERE norma_id = ? AND (encabezado LIKE ? OR encabezado LIKE ?)
         ORDER BY LENGTH(encabezado) LIMIT 80`
      )
      .all(normaId, p1, p2) as { id: number; encabezado: string }[];
    for (const f of filas) if (normNum(numeroReal(f.encabezado)) === objetivo) return f;
  }
  return undefined;
}

export interface Grupo { clave: string; etiqueta: string; descripcion: string; normas: Norma[]; total: number; }

// Macro-grupos de la Biblioteca: cada norma cae en UN solo grupo, por prioridad
// (fundamentales → materia curada → DL/DFL → otras). Escala solo cuando lleguen
// los tiers 2-3: lo no clasificado cae a "Otras leyes" y sigue siendo buscable.
//
// CACHEADO + ALIGERADO: cargar y particionar las 20.000+ normas tardaba ~6 s en CADA
// request (la Biblioteca se sentía trabada). Ahora se calcula UNA vez y se guardan solo
// las primeras 25 por grupo (lo único que renderiza la página) + el total real. Resultado
// instantáneo y caché chico. La DB es de solo lectura, así que el caché no expira.
const TOPE_GRUPO = 12;
let cacheGruposBib: Grupo[] | null = null;
export function gruposBiblioteca(): Grupo[] {
  if (cacheGruposBib) return cacheGruposBib;
  const todas = listarNormas();
  const usadas = new Set<number>();
  const tomar = (pred: (n: Norma) => boolean) =>
    todas.filter((n) => {
      if (usadas.has(n.id) || !pred(n)) return false;
      usadas.add(n.id);
      return true;
    });

  const grupos: Omit<Grupo, "total">[] = [
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
  cacheGruposBib = grupos
    .filter((g) => g.normas.length > 0)
    .map((g) => ({ ...g, total: g.normas.length, normas: g.normas.slice(0, TOPE_GRUPO) }));
  return cacheGruposBib;
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
