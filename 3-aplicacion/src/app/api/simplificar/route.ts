// Explicación en lenguaje simple de UN artículo (para el toggle de la barra de
// accesibilidad). Reglas: el modelo solo reformula el texto que recibe — no
// agrega derecho de memoria; cache en memoria para no pagar dos veces el mismo
// artículo; la key vive solo en el servidor.
import { NextResponse } from "next/server";
import { articuloPorId, numeroReal } from "@/lib/db";
import { limitar, mismoOrigen } from "@/lib/seguridad";
import simplificaciones from "@/data/simplificaciones.json";

const PREGENERADAS = simplificaciones as Record<string, string>;
const cache = new Map<number, string>();

export async function GET(req: Request) {
  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id || !Number.isInteger(id) || id < 1) {
    return NextResponse.json({ resumen: null, error: "falta id" }, { status: 400 });
  }

  // 1) PRE-GENERADO: lo sirve la propia app al instante, SIN Gemini y sin límite
  //    (es texto estático ya revisado). Esta es la vía normal una vez lleno el almacén.
  const guardada = PREGENERADAS[String(id)];
  if (guardada) return NextResponse.json({ resumen: guardada });

  // 2) Caché en memoria de generaciones en vivo previas.
  const enCache = cache.get(id);
  if (enCache) return NextResponse.json({ resumen: enCache });

  // 3) Fallback EN VIVO a Gemini, solo para artículos aún no pre-generados. Con anti-abuso:
  //    mismo origen + rate-limit (evita que iteren IDs y quemen la cuota).
  if (!mismoOrigen(req)) return NextResponse.json({ resumen: null, error: "origen" }, { status: 403 });
  if (!limitar(req, "simpl", 40, 10 * 60 * 1000).ok) {
    return NextResponse.json({ resumen: null, error: "límite alcanzado" }, { status: 429 });
  }

  const articulo = articuloPorId(id);
  if (!articulo) return NextResponse.json({ resumen: null, error: "no existe" }, { status: 404 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ resumen: null, error: "sin GEMINI_API_KEY" });

  const prompt = `Reescribe este artículo legal chileno en lenguaje simple para una persona sin formación jurídica.

REGLAS: máximo 60 palabras; solo reformula lo que DICE el texto (no agregues información externa ni interpretaciones); tutea; si el artículo lista varios puntos, resume los principales.

${articulo.nombre} — Artículo ${numeroReal(articulo.encabezado)}:
${articulo.texto.slice(0, 2500)}`;

  const modelo = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 300 },
        }),
      }
    );
    if (!r.ok) throw new Error(`Gemini ${r.status}`);
    const data = await r.json();
    const partes: { text?: string }[] = data?.candidates?.[0]?.content?.parts || [];
    const resumen = partes.map((p) => p.text || "").join("").trim();
    if (!resumen) throw new Error("vacío");
    cache.set(id, resumen);
    return NextResponse.json({ resumen });
  } catch {
    return NextResponse.json({ resumen: null, error: "error generando" });
  }
}
