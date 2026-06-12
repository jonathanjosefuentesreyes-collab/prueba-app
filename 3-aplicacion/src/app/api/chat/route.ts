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
  [/acoso (laboral|sexual)|ley karin/i, "acoso laboral prevención investigación"],
  [/licencia m[eé]dica/i, "incapacidad laboral licencia"],
  [/divorcio|separaci[oó]n/i, "divorcio matrimonio civil"],
  [/herencia|herederos/i, "sucesión herederos asignación"],
];

interface Fuente { articulo_id: number; norma_id: number; ley: string; numero: string; }

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
  const candidatos = buscar(consulta, 6);

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

  const contexto = candidatos
    .map((c) => {
      const a = articuloPorId(c.articulo_id);
      return `[${c.articulo_id}] ${c.nombre} — Artículo ${numeroReal(c.encabezado)}:\n${(a?.texto || "").slice(0, 900)}`;
    })
    .join("\n\n");

  const prompt = `Eres AbogaBot, asistente legal chileno para ciudadanos comunes (no abogados).

ARTÍCULOS DISPONIBLES (única fuente permitida):
${contexto}

PREGUNTA DEL CIUDADANO: "${mensaje}"

REGLAS ESTRICTAS:
1. Responde SOLO con base en los artículos de arriba. Si no responden la duda, dilo honestamente y sugiere consultar la Biblioteca o un abogado.
2. Máximo 120 palabras, lenguaje simple y cercano (tutea), cero latín jurídico.
3. Cita UNA norma principal mencionándola así: "según el artículo X del/de la [nombre]".
4. Termina con una sección "Qué hacer ahora:" con 1-3 pasos concretos y sus plazos si aplican.
5. En la última línea escribe exactamente: FUENTES: seguido de los ids (entre corchetes arriba) de los artículos que usaste, separados por coma. Si no usaste ninguno: FUENTES:`;

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
