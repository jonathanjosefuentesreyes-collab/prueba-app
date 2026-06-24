// Casos sensibles: se detectan y responden por CÓDIGO antes de tocar a Gemini.
// Es seguridad de las personas, no orientación legal: si alguien escribe que quiere
// hacerse daño, sufre violencia o vive una emergencia, lo primero NO es la ley sino
// derivarlo al canal de ayuda correcto (Salud Responde *4141, SernamEG 1455,
// Carabineros 133). Por eso vive separado y con tests (lib/casos-sensibles.test.ts):
// una regresión aquí —que una de estas frases deje de detectarse— es grave de verdad.
// Estos patrones JAMÁS deben quedar detrás del rate-limit ni depender del modelo.

export interface CasoSensible {
  patron: RegExp;
  respuesta: string;
}

export const CASOS_SENSIBLES: CasoSensible[] = [
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
    // Niño, niña o adolescente en peligro / maltrato / abuso. Números verificados en
    // ChileAtiende (Fono Niños 147 de Carabineros, 24/7; PDI 134; 133 emergencia).
    // El patrón exige un verbo de daño CERCA de un término de infancia (en cualquier
    // orden) para no desviar preguntas legales generales sobre tuición o alimentos.
    patron: /(?:maltrat\w*|abus\w*|pega\w*|golpe\w*|viol(?:a|an|ó|o|aron|ando)|tocan|grooming).{0,20}(?:ni[ñn][oa]s?|menor(?:es)?|hij[oa]s?|guagua|beb[eé]|adolescente|infantil)|(?:mi hij[oa]s?|un[a]? ni[ñn][oa]|un[a]? menor|mi guagua|mi beb[eé]).{0,20}(?:maltrat\w*|abus\w*|pega\w*|golpe\w*|viol(?:a|an|ó|o|aron|ando)|tocan|da[ñn]an|sufre)/i,
    respuesta:
      "Si un niño, niña o adolescente está en peligro o sufre maltrato o abuso, lo primero es protegerlo. Llama gratis al 147 (Fono Niños de Carabineros, atiende las 24 horas) para orientación o para denunciar, o al 133 si la emergencia es ahora. También puedes denunciar en la PDI (134), en cualquier comisaría o en la fiscalía. Cuando esté a salvo, puedo explicarte las medidas de protección que contempla la ley.",
  },
  {
    patron: /(est[aá]n robando|me est[aá]n asaltando|emergencia ahora)/i,
    respuesta:
      "Si hay un delito o emergencia ocurriendo AHORA, llama al 133 (Carabineros) o al 134 (PDI). Después puedo ayudarte con los pasos legales.",
  },
];

// Devuelve la respuesta de ayuda si el mensaje cae en un caso sensible, o null si no.
// El orden importa: gana el primer patrón que calce (crisis personal antes que delito).
export function respuestaSensible(mensaje: string): string | null {
  for (const caso of CASOS_SENSIBLES) {
    if (caso.patron.test(mensaje)) return caso.respuesta;
  }
  return null;
}
