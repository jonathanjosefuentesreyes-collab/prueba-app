// Chat AbogaBot — reglas de abogabot-cerebro:
// 1) casos sensibles se derivan por CÓDIGO antes de llamar al modelo;
// 2) el modelo solo puede citar artículos que recibe en contexto (RAG sobre FTS5);
// 3) el disclaimer lo agrega el código, jamás el prompt;
// 4) la API key vive solo en el servidor.
import { NextResponse } from "next/server";
import { buscar, articuloPorId, numeroReal } from "@/lib/db";

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
  [/no paga la pensi[oó]n|pensi[oó]n de alimentos|papá no paga|madre no paga/i, "alimentos deudor pensión"],
  [/arriendo|arrendador|arrendatario|me echan de la casa/i, "arrendamiento restitución inmueble"],
  [/dicom|deuda|me embarga/i, "deudor embargo obligación"],
  [/compr[eé] (online|por internet)|devolver (un|el) producto|retracto/i, "consumidor retracto garantía"],
  [/horas? extras?/i, "horas extraordinarias jornada recargo cincuenta"],
  [/no me paga|me debe[n]? (el |la )?(sueldo|plata|remuneraci)/i, "remuneraciones pago empleador"],
  [/manej|conduc|chofer|volante|al volante|licencia de conducir|parte|fotomulta|carab/i, "conducción licencia conductor tránsito vehículo infracción"],
  [/choque|colisi[oó]n|accidente de tr[aá]nsito|me chocaron/i, "accidente tránsito responsabilidad daños vehículo"],
  [/velocidad|exceso de velocidad/i, "velocidad máxima conducción tránsito"],
  [/multa|infracci[oó]n/i, "infracción multa sanción"],
  [/acoso (laboral|sexual)|ley karin/i, "acoso laboral prevención investigación"],
  [/licencia m[eé]dica/i, "incapacidad laboral licencia"],
  [/divorcio|separaci[oó]n/i, "divorcio matrimonio civil"],
  [/herencia|herederos/i, "sucesión herederos asignación"],
  [/extranjer|migrante|inmigrante|migraci[oó]n|residencia|visa|permanencia/i, "extranjero migración residencia igualdad derechos permiso"],
  [/beneficios?|ayudas?|subsidios?|derechos?/i, "derechos beneficios prestaciones acceso"],
  [/salud|fonasa|isapre|atenci[oó]n m[eé]dica/i, "salud atención prestaciones acceso"],
  [/educaci[oó]n|colegio|matr[ií]cula|universidad|gratuidad/i, "educación establecimiento matrícula acceso"],
  [/vivienda|subsidio habitacional|minvu/i, "vivienda subsidio habitacional postulación"],
];

interface Fuente { articulo_id: number; norma_id: number; ley: string; numero: string; }

// Límite diario de consultas por visitante (protege la cuota de Gemini ahora que
// la app es pública). En memoria: se reinicia si la máquina se reinicia — es una
// barrera básica anti-abuso, no un control estricto. Configurable por env.
const TOPE_DIARIO = Number(process.env.LIMITE_CHAT_DIARIO || 40);
const contador = new Map<string, { dia: string; n: number }>();
function ipDe(req: Request): string {
  return (
    req.headers.get("fly-client-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anon"
  );
}
function superaTope(req: Request): boolean {
  const hoy = new Date().toISOString().slice(0, 10);
  const ip = ipDe(req);
  const prev = contador.get(ip);
  if (!prev || prev.dia !== hoy) {
    contador.set(ip, { dia: hoy, n: 1 });
    if (contador.size > 5000) contador.clear(); // evita crecer sin fin
    return false;
  }
  prev.n += 1;
  return prev.n > TOPE_DIARIO;
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

  if (candidatos.length === 0) {
    return NextResponse.json({
      respuesta:
        "No encontré artículos cargados que respondan directamente tu consulta, y prefiero decírtelo antes que inventar. Prueba reformulando con otras palabras, revisa la Biblioteca de Leyes, o consulta gratis en la Corporación de Asistencia Judicial.",
      fuentes: [],
      disclaimer: DISCLAIMER,
    });
  }

  // Tope diario por visitante: si se supera, igual le servimos artículos reales de
  // la Biblioteca (sin gastar Gemini), no lo dejamos con las manos vacías.
  if (superaTope(req)) {
    return NextResponse.json({
      respuesta:
        "Llegaste al máximo de consultas con el asistente por hoy 🙂. Pero igual te dejo artículos de la Biblioteca que pueden responder tu duda — tócalos para leerlos completos. Mañana puedes volver a preguntarle a AbogaBot.",
      fuentes: candidatos.slice(0, 4).map((c) => ({ articulo_id: c.articulo_id, norma_id: c.norma_id, ley: c.nombre, numero: numeroReal(c.encabezado) })),
      disclaimer: DISCLAIMER,
    });
  }

  const contexto = candidatos
    .map((c) => {
      const a = articuloPorId(c.articulo_id);
      return `[${c.articulo_id}] ${c.nombre} — Artículo ${numeroReal(c.encabezado)}:\n${(a?.texto || "").slice(0, 900)}`;
    })
    .join("\n\n");

  const prompt = `Eres AbogaBot, asistente legal chileno para ciudadanos comunes (no abogados).

ARTÍCULOS DISPONIBLES (única fuente permitida para afirmar lo que dice la ley):
${contexto}

PREGUNTA DEL CIUDADANO: "${mensaje}"

CÓMO RESPONDER:
1. Usa SOLO los artículos de arriba para afirmar qué dice la ley. NUNCA inventes ni cites de memoria artículos o números que no estén arriba. Si falta cubrir parte de la pregunta, dilo con honestidad y deriva al organismo correcto (ej.: Servicio Nacional de Migraciones, FONASA, MINEDUC, Dirección del Trabajo) o a un abogado.
2. FILTRA por relevancia: de los artículos que te di, usa solo los que de verdad responden la pregunta del ciudadano. IGNORA los tangenciales (no los cites solo por incluirlos). Prioriza lo más importante y cotidiano para una persona común.
3. Cubre los temas relevantes pero sé conciso: máximo 4-5 viñetas, las más útiles. No hagas una lista exhaustiva de todo lo que aparezca.
4. Estructura clara para el ciudadano:
   - Una frase de resumen directa que responda al tiro.
   - Viñetas cortas por tema: "• **Tema**: qué dice la ley en simple (según el art. X de [ley])."
   - Cierra con "Qué hacer ahora:" (1-3 pasos concretos con plazos si aplican).
5. Lenguaje simple y cercano (tutea), cero latín jurídico. Extensión: preguntas puntuales ~100 palabras; preguntas amplias máximo ~200 palabras. Mejor claro y enfocado que largo.
6. Cita cada afirmación con su artículo así: "según el artículo X de [nombre de la ley]".
7. En la última línea escribe exactamente: FUENTES: seguido de los ids (entre corchetes arriba) de los artículos que realmente usaste, separados por coma. Si no usaste ninguno: FUENTES:`;

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
          generationConfig: { temperature: 0.3, maxOutputTokens: 1000 },
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

    const lineas = bruto.trim().split("\n");
    let idsUsados: number[] = [];
    let respuesta = bruto.trim();
    const idxFuentes = lineas.findIndex((l) => l.trim().toUpperCase().startsWith("FUENTES:"));
    if (idxFuentes >= 0) {
      idsUsados = (lineas[idxFuentes].split(":")[1] || "")
        .split(/[,\s]+/)
        .map((x) => Number(x.replace(/\D/g, "")))
        .filter(Boolean);
      respuesta = lineas.slice(0, idxFuentes).join("\n").trim();
    }
    const permitidos = new Set(candidatos.map((c) => c.articulo_id));
    const fuentes: Fuente[] = idsUsados
      .filter((id) => permitidos.has(id))
      .map((id) => {
        const c = candidatos.find((x) => x.articulo_id === id)!;
        return { articulo_id: id, norma_id: c.norma_id, ley: c.nombre, numero: numeroReal(c.encabezado) };
      });

    return NextResponse.json({ respuesta, fuentes, disclaimer: DISCLAIMER });
  } catch {
    return NextResponse.json({
      respuesta:
        "Tuve un problema técnico al generar la respuesta. Intenta de nuevo en un momento — o revisa estos artículos relacionados en la Biblioteca.",
      fuentes: candidatos.slice(0, 3).map((c) => ({ articulo_id: c.articulo_id, norma_id: c.norma_id, ley: c.nombre, numero: numeroReal(c.encabezado) })),
      disclaimer: DISCLAIMER,
    });
  }
}
