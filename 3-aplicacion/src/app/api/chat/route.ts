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
  articuloPorId,
  numeroReal,
  nombreDe,
  normaPorReferencia,
  articuloPorNumero,
} from "@/lib/db";
import { NextResponse } from "next/server";

const DISCLAIMER =
  "Esto es orientación general, no asesoría legal. Para tu caso concreto consulta a un abogado (la Corporación de Asistencia Judicial atiende gratis).";

const SENSIBLES: { patron: RegExp; respuesta: string }[] = [
  {
    patron: /(suicid|quitarme la vida|me quiero (morir|matar)|matarme|no quiero (seguir )?vivi|terminar con mi vida|hacerme da[ñn]o)/i,
    respuesta:
      "Lo más importante ahora no es lo legal: si estás pasando por un momento muy difícil, llama gratis a Salud Responde marcando *4141 (línea de prevención del suicidio, atiende 24/7) o al 600 360 7777. No estás solo/a. Cuando quieras, acá estaré para ayudarte con lo demás.",
  },
  {
    patron: /(me pega|me golpea|me amenaza|violencia intrafamiliar|me maltrata|tengo miedo de mi (pareja|marido|esposo|conviviente))/i,
    respuesta:
      "Tu seguridad es lo primero. Si estás en peligro AHORA llama al 133 (Carabineros). Para orientación en violencia intrafamiliar llama gratis al 1455 (SernamEG, 24/7) o escribe al WhatsApp +56 9 9700 7000. También puedes denunciar en cualquier comisaría o Fiscalía. Cuando estés a salvo, puedo explicarte las medidas de protección de la Ley 20.066.",
  },
  {
    patron: /(est[aá]n robando|me est[aá]n asaltando|emergencia ahora)/i,
    respuesta: "Si hay un delito o emergencia ocurriendo AHORA, llama al 133 (Carabineros) o al 134 (PDI). Después puedo ayudarte con los pasos legales.",
  },
];

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
function ipDe(req: Request): string {
  return (
    req.headers.get("fly-client-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anon"
  );
}
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
  let mensaje = "";
  try {
    const body = await req.json();
    mensaje = String(body?.mensaje || "").slice(0, 600).trim();
  } catch { /* cuerpo inválido */ }
  if (!mensaje) {
    return NextResponse.json({ respuesta: "Cuéntame tu situación y te oriento.", fuentes: [], disclaimer: DISCLAIMER });
  }

  for (const s of SENSIBLES) {
    if (s.patron.test(mensaje)) {
      return NextResponse.json({ respuesta: s.respuesta, fuentes: [], disclaimer: DISCLAIMER });
    }
  }

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

  const contexto = candidatos
    .map((c) => {
      const a = articuloPorId(c.articulo_id);
      return `${c.nombre} — Artículo ${numeroReal(c.encabezado)}:\n${(a?.texto || "").slice(0, 800)}`;
    })
    .join("\n\n");

  const bloqueRef = contexto
    ? `ARTÍCULOS DE REFERENCIA (extractos reales de la base oficial; úsalos para precisar, sin limitarte a ellos):\n${contexto}`
    : `(No se recuperaron extractos para esta consulta; responde con tu conocimiento de la ley chilena vigente.)`;

  const prompt = `Eres AbogaBot, un asesor legal chileno experto y cercano que ayuda a ciudadanos comunes (no abogados) a entender sus derechos y qué hacer.

${bloqueRef}

PREGUNTA DEL CIUDADANO: "${mensaje}"

CÓMO RESPONDER:
1. Da una respuesta COMPLETA, clara y útil, como un buen abogado explicándole a un amigo: cubre todo lo importante para su problema. Apóyate en tu conocimiento de la legislación chilena VIGENTE; los artículos de referencia te ayudan a precisar, pero no te limites a ellos.
2. Lenguaje simple y cercano (tutea, cero latín jurídico). Estructura: una frase directa al inicio, viñetas cortas por tema, y cierra con "Qué hacer ahora:" (pasos concretos, con plazos si los hay).
3. Menciona dentro del texto las leyes en que te basas, por su nombre (ej.: "según el Código del Trabajo", "la Ley 21.325 de Migración"). Solo derecho chileno VIGENTE; nunca inventes datos, cifras ni plazos.
4. Si el tema no es legal o escapa a la ley chilena, dilo con honestidad y deriva al organismo o profesional adecuado.
5. Extensión: completa pero enfocada, ~200-280 palabras.
6. En la ÚLTIMA línea escribe EXACTAMENTE: LEYES: seguido de los nombres de las leyes/códigos que aplican a tu respuesta, separados por coma (ej.: "LEYES: Código del Trabajo, Ley 21.325, Constitución Política"). Máximo 5. Usa nombres reconocibles (nombre del código o "Ley NN.NNN"); la app los enlazará a sus artículos. Si ninguna aplica: LEYES:`;

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

    // Separa la PROSA del bloque LEYES (nombres de leyes que Gemini dice que aplican).
    // La prosa es de Gemini; los ENLACES los arma la app: resuelve cada ley en la base
    // oficial y, con su buscador FTS, trae el artículo real y pertinente DENTRO de esa ley.
    const lineas = bruto.trim().split("\n");
    const esLeyes = (l: string) => l.replace(/^[\s*#>_-]+/, "").toUpperCase().startsWith("LEYES");
    const idxLeyes = lineas.findIndex(esLeyes);
    let respuesta = bruto.trim();
    let nombresLeyes: string[] = [];
    if (idxLeyes >= 0) {
      respuesta = lineas.slice(0, idxLeyes).join("\n").trim();
      const resto = [lineas[idxLeyes].split(/leyes:?/i)[1] || "", ...lineas.slice(idxLeyes + 1)].join(", ");
      nombresLeyes = resto
        .split(/[,;\n]+/)
        .map((s) => s.replace(/^[\s*•\-]+/, "").trim())
        .filter((s) => s.length > 3)
        .slice(0, 6);
    }
    respuesta = respuesta.replace(/\s*\[\d+\]/g, "").trim();

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
    // 1) Por cada ley que nombró Gemini: resolverla en la base y traer sus artículos
    //    más pertinentes a la consulta (FTS dentro de esa norma). Si no hay match
    //    interno, se enlaza la ley a nivel norma. Nunca se enlaza algo que no exista.
    for (const nombre of nombresLeyes) {
      const norma = normaPorReferencia(nombre);
      if (!norma) continue;
      const mNum = nombre.match(/art[íi]?culo?\s*([\dA-Za-z]+)/i);
      const art = mNum ? articuloPorNumero(norma.id, mNum[1]) : undefined;
      if (art) {
        agregar(art.id, norma.id, etiquetaLey(nombreDe(norma), norma.titulo), numeroReal(art.encabezado));
        continue;
      }
      const dentro = buscar(consulta, 2, norma.id);
      if (dentro.length) {
        for (const d of dentro) agregar(d.articulo_id, d.norma_id, etiquetaLey(d.nombre, d.titulo_ley), numeroReal(d.encabezado));
      } else {
        agregar(null, norma.id, etiquetaLey(nombreDe(norma), norma.titulo), "");
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

    return NextResponse.json({ respuesta, fuentes, disclaimer: DISCLAIMER, restantes });
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
