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
