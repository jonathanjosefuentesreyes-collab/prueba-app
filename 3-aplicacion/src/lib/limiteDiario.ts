// Límite freemium: cuenta los usos gratis por día por herramienta (localStorage). Es una
// barrera suave que engancha a Premium —el cálculo es determinista en el cliente—, no un
// control estricto. Reutilizado por las calculadoras (finiquito, facturación, sueldo);
// antes estaba copiado en cada página (violación DRY que esto corrige).

const hoy = () => new Date().toISOString().slice(0, 10);

export function leerUsosHoy(clave: string): number {
  try {
    const raw = JSON.parse(localStorage.getItem(clave) || "{}");
    return raw.dia === hoy() ? raw.n || 0 : 0;
  } catch {
    return 0;
  }
}

export function registrarUso(clave: string): number {
  const n = leerUsosHoy(clave) + 1;
  try {
    localStorage.setItem(clave, JSON.stringify({ dia: hoy(), n }));
  } catch {
    /* sin storage */
  }
  return n;
}
