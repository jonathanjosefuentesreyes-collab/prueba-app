// Formato de pesos chilenos compartido por las calculadoras: 1234567 → "$1.234.567".
// Antes estaba definido igual en cada página (violación DRY que esto corrige).
export const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");
