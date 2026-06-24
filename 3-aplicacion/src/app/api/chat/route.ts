// Chat AbogaBot — reglas de abogabot-cerebro (síntesis 2026-06-16):
// 1) casos sensibles se derivan por CÓDIGO antes de llamar al modelo;
// 2) GEMINI da la PROSA completa (asesor), pero los ENLACES NO salen de su memoria:
//    el modelo solo NOMBRA las leyes que aplican; la app las resuelve contra la base
//    oficial y, con su propio buscador FTS, encuentra el artículo real y pertinente
//    DENTRO de esa ley. Así la respuesta es completa y los enlaces son verificados
//    (la "garantía anti-invención" se mantiene para lo que se enlaza, no para la prosa);
// 3) el disclaimer lo agrega el código, jamás el prompt;
// 4) la API key vive solo en el servidor.
import {
  buscar,
  numeroReal,
  nombreDe,
  normaPorReferencia,
  articuloPorNumero,
} from "@/lib/db";
import { NextResponse } from "next/server";
import { ipDe, mismoOrigen } from "@/lib/seguridad";
import { respuestaSensible } from "@/lib/casos-sensibles";

const DISCLAIMER =
  "Esto es orientación general, no asesoría legal. Para tu caso concreto consulta a un abogado (la Corporación de Asistencia Judicial atiende gratis).";

const SINONIMOS: [RegExp, string][] = [
  [/echaron|echado|despidieron|despedid/i, "despido indemnización aviso"],
  [/finiquito/i, "finiquito indemnización años servicio"],
  [/no paga la pensi[oó]n|pensi[oó]n de alimentos|papá no paga|madre no paga|alimentos/i, "alimentos pensión alimentante alimentario apremio retención arresto deudor"],
  [/arriendo|arrendador|arrendatario|me echan de la casa/i, "arrendamiento restitución inmueble"],
  [/dicom|bolet[ií]n comercial|registro de deudores|morosidad|me cobran|cobranza|repactar|prescrib/i, "datos personales morosidad deudor crédito cobranza información comercial prescripción"],
  [/deuda|me embarga/i, "deudor embargo obligación"],
  [/compr[eé] (online|por internet)|devolver (un|el) producto|retracto/i, "consumidor retracto garantía"],
  [/garant[ií]a|falla|fallado|defectuoso|me vendieron|no funciona|servicio t[eé]cnico|cambio del producto|me lo cambien|reembolso|sernac/i, "consumidor garantía producto reparación devolución defecto"],
  [/accidente.*(trabaj|laboral)|me accident[eé].*trabaj|enfermedad profesional|mutual/i, "accidente trabajo enfermedad profesional prestaciones médicas seguro indemnización"],
  [/menor.*(delito|cometi|infracci|rob|mat[oó]|hurt)|adolescente.*(delito|penal|infracci)|1[4567] años|responsabilidad penal (de )?(un )?(menor|adolescente)/i, "responsabilidad penal adolescente menor catorce dieciséis sanción infracción"],
  [/\biva\b|impuesto al valor agregado|ventas y servicios|vendo.*(internet|online|producto)|emitir (boleta|factura)/i, "impuesto ventas servicios débito crédito fiscal contribuyente"],
  [/tributa|impuesto a la renta|declarar (la )?renta|pago de impuesto|cu[aá]nto.*impuesto|tributaci[oó]n/i, "impuesto renta tributación rentas contribuyente"],
  [/horas? extras?/i, "horas extraordinarias jornada recargo cincuenta"],
  [/no me paga|me debe[n]? (el |la )?(sueldo|plata|remuneraci)/i, "remuneraciones pago empleador"],
  [/me robaron|me asaltaron|asalto|\brobo\b|hurto|me sustrajeron|carterista|lanza/i, "robo hurto apropiación sustracción delito propiedad fuerza intimidación"],
  [/formar (una )?sociedad|crear (una )?empresa|emprend|constituir.*sociedad|eirl|sociedad limitada|spa/i, "sociedad constitución empresa responsabilidad socios capital"],
  [/manej|conduc|chofer|volante|al volante|licencia de conducir|parte|fotomulta|carab/i, "conducción licencia conductor tránsito vehículo infracción"],
  [/choque|colisi[oó]n|accidente de tr[aá]nsito|me chocaron/i, "accidente tránsito responsabilidad daños vehículo"],
  [/velocidad|exceso de velocidad/i, "velocidad máxima conducción tránsito"],
  [/multa|infracci[oó]n/i, "infracción multa sanción"],
  [/acoso (laboral|sexual)|ley karin/i, "acoso laboral prevención investigación"],
  [/ciberacoso|ciberbullying|cyberbullying|matonaje|grooming|sextorsi[oó]n|funan|difund.*(mis|las) fotos|amenaz.*(internet|redes|whatsapp)/i, "acoso amenazas difusión imágenes datos personales delito informático honra intimidad"],
  [/licencia m[eé]dica/i, "incapacidad laboral licencia"],
  [/divorcio|separaci[oó]n/i, "divorcio matrimonio civil"],
  [/herencia|herederos/i, "sucesión herederos asignación"],
  [/extranjer|migrante|inmigrante|migraci[oó]n|residencia|visa|permanencia|expuls|deportac|reconducci|me echan del pa[ií]s/i, "extranjero migración residencia expulsión igualdad derechos permiso"],
  [/recurso de protecci[oó]n|recurso de amparo|garant[ií]as? constitucional|derechos? fundamental|me garantiza la constituci|derecho a la (educaci|salud|vida|propiedad|igualdad)/i, "constitución derechos garantías recurso protección igualdad ante ley"],
  [/beneficios?|ayudas?|subsidios?|derechos?/i, "derechos beneficios prestaciones acceso"],
  [/salud|fonasa|isapre|atenci[oó]n m[eé]dica/i, "salud atención prestaciones acceso"],
  [/educaci[oó]n|colegio|matr[ií]cula|universidad|gratuidad/i, "educación establecimiento matrícula acceso"],
  [/vivienda|subsidio habitacional|minvu/i, "vivienda subsidio habitacional postulación"],
];

interface Fuente { articulo_id: number | null; norma_id: number; ley: string; numero: string; }

// Etiqueta legible para el chip: "LEY 21325" → "Ley 21.325" (los nombres curados,
// como "Código del Trabajo", se dejan tal cual). Si el nombre_corto es inútil
// ("LEY s/n", "DFL 1"…) cae al título en formato oración, recortado.
function etiquetaLey(nombre: string, titulo?: string): string {
  const m = nombre.match(/^ley\s*0*(\d+)$/i);
  if (m) return `Ley ${m[1].replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  if (titulo && /^(ley s\/n|s\/n|dfl\b|dl\b|decreto\b|d\.?\s?l\.?\b|d\.?\s?f\.?\s?l\.?)/i.test(nombre.trim())) {
    const oracion = titulo.charAt(0).toUpperCase() + titulo.slice(1).toLowerCase();
    return oracion.length > 42 ? oracion.slice(0, 40).trimEnd() + "…" : oracion;
  }
  return nombre;
}

// Cuota de consultas gratis por visitante: MÁX por ventana móvil (anti-abuso, y
// gancho a Premium). En memoria: barrera básica, no control estricto (se reinicia
// si la máquina se reinicia). Configurable por env.
const MAX_CONSULTAS = Number(process.env.LIMITE_CHAT_CONSULTAS || 3);
const VENTANA_MS = Number(process.env.LIMITE_CHAT_HORAS || 24) * 60 * 60 * 1000;
const contador = new Map<string, { inicio: number; n: number }>();
// Estado de cuota SIN consumir (peek): se mira antes de llamar a Gemini para decidir
// si bloquear. `bloqueado` = ya no le quedan. `reinicioHoras` = horas para renovar.
function estadoCuota(req: Request): { restantes: number; bloqueado: boolean; reinicioHoras: number } {
  const ip = ipDe(req);
  const ahora = Date.now();
  let reg = contador.get(ip);
  if (!reg || ahora - reg.inicio >= VENTANA_MS) {
    reg = { inicio: ahora, n: 0 };
    contador.set(ip, reg);
    if (contador.size > 5000) {
      for (const [k, v] of contador) if (ahora - v.inicio >= VENTANA_MS) contador.delete(k);
    }
  }
  const reinicioHoras = Math.max(1, Math.ceil((reg.inicio + VENTANA_MS - ahora) / 3600000));
  return { restantes: Math.max(0, MAX_CONSULTAS - reg.n), bloqueado: reg.n >= MAX_CONSULTAS, reinicioHoras };
}
// Registra UNA consulta exitosa (se llama solo si Gemini respondió bien, para no
// cobrarle al usuario una consulta que falló). Devuelve cuántas le quedan.
function registrarConsulta(req: Request): number {
  const reg = contador.get(ipDe(req));
  if (!reg) return MAX_CONSULTAS - 1;
  reg.n += 1;
  return Math.max(0, MAX_CONSULTAS - reg.n);
}

export async function POST(req: Request) {
  // Anti-abuso de entrada: solo desde nuestro propio sitio y con cuerpo acotado (evita
  // que otras webs usen nuestro Gemini y corta payloads enormes antes de parsearlos).
  if (!mismoOrigen(req)) {
    return NextResponse.json({ respuesta: "Solicitud no permitida.", fuentes: [], disclaimer: DISCLAIMER }, { status: 403 });
  }
  if (Number(req.headers.get("content-length") || 0) > 10_000) {
    return NextResponse.json({ respuesta: "Tu mensaje es demasiado largo. Resúmelo, por favor.", fuentes: [], disclaimer: DISCLAIMER }, { status: 413 });
  }

  let mensaje = "";
  try {
    const body = await req.json();
    mensaje = String(body?.mensaje || "").slice(0, 600).trim();
  } catch { /* cuerpo inválido */ }
  if (!mensaje) {
    return NextResponse.json({ respuesta: "Cuéntame tu situación y te oriento.", fuentes: [], disclaimer: DISCLAIMER });
  }

  const sensible = respuestaSensible(mensaje);
  if (sensible) {
    return NextResponse.json({ respuesta: sensible, fuentes: [], disclaimer: DISCLAIMER });
  }

  // (Se eliminaron las Q&A precomputadas: confundían al bot. Salvo los casos SENSIBLES
  //  de seguridad, TODA consulta la responde Gemini en vivo.)
  let consulta = mensaje;
  for (const [patron, extra] of SINONIMOS) {
    if (patron.test(mensaje)) consulta += " " + extra;
  }
  const candidatos = buscar(consulta, 10, undefined, true);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const sugerencias = candidatos.slice(0, 3).map((c) => `• ${c.nombre}, artículo ${numeroReal(c.encabezado)}`).join("\n");
    return NextResponse.json({
      respuesta:
        "El chat aún no está conectado a Gemini (falta GEMINI_API_KEY en el servidor). Mientras tanto, estos artículos de la Biblioteca pueden responder tu duda:\n" +
        (sugerencias || "Usa el buscador de la Biblioteca de Leyes."),
      fuentes: candidatos.slice(0, 3).map((c) => ({ articulo_id: c.articulo_id, norma_id: c.norma_id, ley: c.nombre, numero: numeroReal(c.encabezado) })),
      disclaimer: DISCLAIMER,
    });
  }

  // Cuota por visitante: si se agotó, mostramos el gancho a Premium y, de yapa,
  // artículos reales de la Biblioteca (sin gastar Gemini) para no dejarlo vacío.
  // Solo PEEK aquí; se descuenta recién cuando la respuesta sale bien (más abajo).
  const cuota = estadoCuota(req);
  if (cuota.bloqueado) {
    return NextResponse.json({
      respuesta:
        `Se te acabaron tus consultas gratis con AbogaBot por ahora 🙂.\n\n✨ **Actualiza a Premium** para hacer consultas ilimitadas. Mientras tanto, te dejo artículos de la Biblioteca que pueden ayudarte —tócalos para leerlos completos— y tus consultas gratis se renuevan en ~${cuota.reinicioHoras} h.`,
      fuentes: candidatos.slice(0, 4).map((c) => ({ articulo_id: c.articulo_id, norma_id: c.norma_id, ley: etiquetaLey(c.nombre, c.titulo_ley), numero: numeroReal(c.encabezado) })),
      disclaimer: DISCLAIMER,
      restantes: 0,
      premium: true,
    });
  }

  // Pregunta DIRECTA a Gemini: NO se le inyectan extractos de la base (eso bajaba la
  // calidad, amarrándolo a artículos a veces poco relevantes). Gemini responde con su
  // propio conocimiento de la ley chilena; los `candidatos` se reservan solo como
  // respaldo de enlaces si Gemini no nombra ninguna ley resoluble. La verificación de
  // citas (sección "Leyes relacionadas:" → artículos reales) se mantiene intacta.
  const prompt = `Eres un abogado chileno experto. La persona te preguntará sobre leyes. Responde buscando en tu conocimiento de fuentes verificadas y VIGENTES del derecho chileno, con la respuesta lo más COMPLETA posible, sin dejar pasar ningún derecho ni beneficio que le corresponda según las leyes de Chile.

CÓMO RESPONDER:
1. Lenguaje SIMPLE y cercano (como explicándole a un amigo), lo más BREVE posible pero sin dejar fuera nada importante. Solo derecho chileno vigente; nunca inventes datos, cifras ni plazos.
2. Estructura tu respuesta en PÁRRAFOS NUMERADOS (1., 2., 3.…), una idea o tema por párrafo.
3. Incluye los PASOS A SEGUIR para que sea una asesoría legal completa (qué hacer, dónde acudir, plazos si los hay).
4. Si el tema no es legal o escapa a la ley chilena, dilo con honestidad y deriva al organismo o profesional adecuado.
5. AL FINAL escribe una sección que empiece EXACTAMENTE con "Leyes relacionadas:". Por cada norma escribe su NOMBRE OFICIAL seguido de "artículos" y los números, así: "Código del Trabajo artículos 162, 168, 489". Separa una norma de otra con punto y coma ";". Ejemplo completo:
   Leyes relacionadas: Código del Trabajo artículos 162, 163, 168; Ley 21.325 artículo 5
   Reglas ESTRICTAS: usa el nombre EXACTO del código ("Código del Trabajo", "Código Civil", "Código Penal", "Constitución Política") o el número de la ley ("Ley 21.325"); NUNCA nombres vagos como "ley laboral". Cita como MÁXIMO 3 normas y, por cada una, MÁXIMO 3 artículos: solo los CLAVE que regulan directamente el tema. PROHIBIDO listar rangos largos o muchos números seguidos (nada de "10, 11, 12, 13…"); si dudas, cita menos. Si ninguna norma aplica, escribe "Leyes relacionadas: —".

La pregunta es: "${mensaje}"`;

  const modelo = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

  // Gemini a veces falla transitoriamente (503/respuesta vacía): un reintento basta.
  async function generar(): Promise<string> {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.35, maxOutputTokens: 1500 },
        }),
      }
    );
    if (!r.ok) throw new Error(`Gemini ${r.status}`);
    const data = await r.json();
    const partes: { text?: string }[] = data?.candidates?.[0]?.content?.parts || [];
    const texto = partes.map((p) => p.text || "").join("").trim();
    if (!texto) throw new Error("respuesta vacía");
    return texto;
  }

  try {
    let bruto = "";
    try {
      bruto = await generar();
    } catch {
      await new Promise((res) => setTimeout(res, 800));
      bruto = await generar();
    }

    // La respuesta de Gemini queda VISIBLE completa (párrafos numerados, pasos y la
    // sección final "Leyes relacionadas:" que el usuario validó). De esa última sección
    // la app EXTRAE los nombres de leyes para armar los ENLACES reales: resuelve cada
    // ley en la base oficial y, con su buscador FTS, trae el artículo pertinente. La
    // prosa es de Gemini; los enlaces los verifica la app contra la base. Nunca se
    // enlaza algo que no exista.
    const lineas = bruto.trim().split("\n");
    const esLeyes = (l: string) => /leyes\s*relacionadas/i.test(l.replace(/^[\s*#>_-]+/, ""));
    const idxLeyes = lineas.findIndex(esLeyes);
    // Gemini suele escribir "Código del Trabajo artículos 159, 160, 162…": UN código con
    // VARIOS artículos. Se atribuye cada número al código que lo precede para enlazar el
    // artículo EXACTO citado. Una "Ley 21.325" sin artículos se enlaza por su nombre.
    type RefLey = { nombre: string; articulos: string[] };
    const refs: RefLey[] = [];
    if (idxLeyes >= 0) {
      const resto = [lineas[idxLeyes].split(/relacionadas:?/i)[1] || "", ...lineas.slice(idxLeyes + 1)].join(", ");
      const tokens = resto.split(/[,;\n]+/).map((t) => t.replace(/^[\s*•\-]+/, "").trim()).filter(Boolean);
      const reNombre = /c[óo]digo|ley\s*n?[°º.]?\s*\d|constituci[óo]n|decreto|\bdfl\b|\bd\.?l\.?\b|reglamento|estatuto/i;
      const reArt = /art[íi]?culos?\.?\s*(?:n[°º]?\s*)?(\d+\s*(?:bis|ter|qu[áa]ter)?)/gi;
      const reNum = /^(\d+\s*(?:bis|ter|qu[áa]ter)?)\.?$/i;
      let actual: RefLey | null = null;
      for (const tok of tokens) {
        if (tok === "—" || tok === "-") continue;
        if (reNombre.test(tok)) {
          actual = { nombre: tok, articulos: [] };
          for (const m of tok.matchAll(reArt)) actual.articulos.push(m[1].replace(/\s+/g, " ").trim());
          refs.push(actual);
        } else {
          const mNum = tok.match(reNum);
          const mArt = tok.match(/^art[íi]?culos?\.?\s*(?:n[°º]?\s*)?(\d+\s*(?:bis|ter|qu[áa]ter)?)/i);
          if (mNum && actual) actual.articulos.push(mNum[1].replace(/\s+/g, " ").trim());
          else if (mArt && actual) actual.articulos.push(mArt[1].replace(/\s+/g, " ").trim());
          else if (tok.length > 3) { actual = { nombre: tok, articulos: [] }; refs.push(actual); }
        }
      }
    }
    // Mantiene la respuesta tal cual (incluida la sección de leyes); solo limpia las
    // marcas internas tipo "[1]" que el modelo a veces deja de los artículos de contexto.
    const respuesta = bruto.trim().replace(/\s*\[\d+\]/g, "").trim();

    // Recién ahora (respuesta OK) descontamos la consulta de su cuota.
    const restantes = registrarConsulta(req);

    const fuentes: Fuente[] = [];
    const vistos = new Set<string>();
    const agregar = (articulo_id: number | null, norma_id: number, ley: string, numero: string) => {
      const clave = `${norma_id}:${articulo_id ?? 0}`;
      if (vistos.has(clave) || fuentes.length >= 6) return;
      vistos.add(clave);
      fuentes.push({ articulo_id, norma_id, ley, numero });
    };
    // 1) Por cada ley citada: resolverla en la base. Si trae artículos, enlazar CADA
    //    artículo exacto (el que no exista se omite, nunca se inventa). Si no cita
    //    artículos resolubles, se traen sus artículos más pertinentes por FTS dentro de
    //    esa norma, o la norma a secas. Todo verificado contra la base.
    for (const ref of refs) {
      if (fuentes.length >= 6) break;
      const norma = normaPorReferencia(ref.nombre);
      if (!norma) continue;
      const etq = etiquetaLey(nombreDe(norma), norma.titulo);
      let enlazoArticulo = false;
      for (const numStr of ref.articulos) {
        const art = articuloPorNumero(norma.id, numStr);
        if (art) { agregar(art.id, norma.id, etq, numeroReal(art.encabezado)); enlazoArticulo = true; }
      }
      if (enlazoArticulo) continue;
      const dentro = buscar(consulta, 2, norma.id);
      if (dentro.length) {
        for (const d of dentro) agregar(d.articulo_id, d.norma_id, etiquetaLey(d.nombre, d.titulo_ley), numeroReal(d.encabezado));
      } else {
        agregar(null, norma.id, etq, "");
      }
    }
    // 2) Respaldo SOLO si Gemini no nombró ninguna ley resoluble (fuentes vacío):
    //    ahí sí completamos con los candidatos globales más relevantes. Si Gemini
    //    nombró bien sus leyes, confiamos en esos enlaces y no metemos ruido global.
    if (fuentes.length === 0) {
      for (const c of candidatos) {
        if (fuentes.length >= 3) break;
        agregar(c.articulo_id, c.norma_id, etiquetaLey(c.nombre, c.titulo_ley), numeroReal(c.encabezado));
      }
    }

    // Red de seguridad: reescribe la línea visible "Leyes relacionadas:" a partir de los
    // chips YA verificados, para que el texto coincida con los enlaces y nunca muestre el
    // listado desbordado que el modelo a veces genera (ej. "art. 10, 11, 12 … 170").
    const porLey = new Map<number, { ley: string; nums: string[] }>();
    for (const f of fuentes) {
      let g = porLey.get(f.norma_id);
      if (!g) { g = { ley: f.ley, nums: [] }; porLey.set(f.norma_id, g); }
      if (f.numero) g.nums.push(f.numero);
    }
    const lineaCitas = porLey.size
      ? "Leyes relacionadas: " + [...porLey.values()]
          .map((g) => (g.nums.length ? `${g.ley} ${g.nums.length > 1 ? "artículos" : "artículo"} ${g.nums.join(", ")}` : g.ley))
          .join("; ")
      : "Leyes relacionadas: —";
    const respuestaFinal = /leyes\s*relacionadas\s*:/i.test(respuesta)
      ? respuesta.replace(/\n*\s*leyes\s*relacionadas\s*:[\s\S]*$/i, "\n\n" + lineaCitas)
      : `${respuesta}\n\n${lineaCitas}`;

    return NextResponse.json({ respuesta: respuestaFinal, fuentes, disclaimer: DISCLAIMER, restantes });
  } catch {
    return NextResponse.json({
      respuesta:
        "Tuve un problema técnico al generar la respuesta. Intenta de nuevo en un momento — o revisa estos artículos relacionados en la Biblioteca.",
      fuentes: candidatos.slice(0, 3).map((c) => ({ articulo_id: c.articulo_id, norma_id: c.norma_id, ley: etiquetaLey(c.nombre, c.titulo_ley), numero: numeroReal(c.encabezado) })),
      disclaimer: DISCLAIMER,
      restantes: cuota.restantes,
    });
  }
}
