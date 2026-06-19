// Lectura en voz alta (TTS) robusta con la Web Speech API — voces GRATIS del navegador/SO.
// Arregla los 3 motivos típicos de "no se escucha":
//   1) las voces cargan async (getVoices() viene vacío al inicio) → esperamos voiceschanged;
//   2) no se elegía voz en español → priorizamos es-CL/es-419/es-ES/...;
//   3) Chrome corta los textos largos a los ~15s → troceamos por oraciones.

let cache: SpeechSynthesisVoice[] = [];

function cargarVoces(): Promise<SpeechSynthesisVoice[]> {
  const ya = window.speechSynthesis.getVoices();
  if (ya.length) { cache = ya; return Promise.resolve(ya); }
  if (cache.length) return Promise.resolve(cache);
  return new Promise((res) => {
    let listo = false;
    const fin = () => {
      if (listo) return;
      listo = true;
      cache = window.speechSynthesis.getVoices();
      res(cache);
    };
    window.speechSynthesis.addEventListener("voiceschanged", fin, { once: true });
    setTimeout(fin, 800); // respaldo si el evento no dispara
  });
}

function vozEspanol(vs: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const pref = ["es-cl", "es-419", "es-mx", "es-us", "es-co", "es-ar", "es-es", "es"];
  for (const p of pref) {
    const v = vs.find((x) => x.lang.toLowerCase().replace("_", "-").startsWith(p));
    if (v) return v;
  }
  return vs.find((x) => /espa|spanish/i.test(x.name) || /^es/i.test(x.lang));
}

function limpiar(t: string): string {
  return t
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown [texto](url) → texto
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function hablar(texto: string, onFin?: () => void): Promise<void> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) { onFin?.(); return; }
  const synth = window.speechSynthesis;
  synth.cancel();
  const voz = vozEspanol(await cargarVoces());
  const limpio = limpiar(texto).slice(0, 5000);
  const partes = limpio.match(/[^.!?\n]+[.!?\n]*/g)?.map((p) => p.trim()).filter(Boolean) || [limpio];
  partes.forEach((parte, i) => {
    const u = new SpeechSynthesisUtterance(parte);
    if (voz) u.voice = voz;
    u.lang = voz?.lang || "es-CL";
    u.rate = 1;
    u.pitch = 1.05; // un toque más amable
    if (i === partes.length - 1 && onFin) u.onend = onFin;
    synth.speak(u);
  });
  synth.resume(); // Chrome a veces queda en pausa tras cancel()
}

export function detenerHabla(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
