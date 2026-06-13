export interface Guia {
  slug: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  fecha: string;
}

export const guias: Guia[] = [
  {
    slug: "me-despidieron-sin-aviso",
    titulo: "¿Me despidieron sin previo aviso? Conoce tus derechos",
    descripcion: "Descubre qué indemnizaciones te corresponden si tu empleador te despide sin darte los 30 días de aviso previo legal.",
    fecha: "2026-06-11",
    contenido: `
Si fuiste despedido por **necesidades de la empresa** (artículo 161 del Código del Trabajo) y tu empleador no te avisó con al menos 30 días de anticipación, tienes derecho a una compensación.

### La Indemnización Sustitutiva del Aviso Previo
La ley establece que el empleador debe pagar una **indemnización sustitutiva del aviso previo** equivalente a tu última remuneración mensual. Esto es un derecho irrenunciable diseñado para darte estabilidad mientras buscas un nuevo empleo.

### ¿Qué pasa si la causal fue otra?
Si te despidieron por **faltas graves** (artículo 160, como abandono de deberes o acoso), el empleador **no está obligado** a darte aviso previo ni a pagarte esta indemnización.

### Pasos a seguir
1. Revisa tu carta de despido: debe indicar claramente la causal y si se te pagará el mes de aviso.
2. No firmes tu finiquito si no estás de acuerdo con los montos. Puedes firmar dejando una "reserva de derechos".
3. Si tienes dudas, puedes utilizar la calculadora de finiquito de Ley Chilena o consultarle a AbogaBot citando tu situación.
    `
  },
  {
    slug: "calcular-horas-extras",
    titulo: "Guía rápida: Cómo calcular tus horas extras",
    descripcion: "Aprende la fórmula legal exacta para saber cuánto deben pagarte por cada hora extra trabajada en Chile.",
    fecha: "2026-06-10",
    contenido: `
Las horas extraordinarias son aquellas que exceden la jornada ordinaria de trabajo (actualmente con tope legal de 45 o 40 horas, dependiendo de la implementación de la nueva ley).

### El Recargo Legal
Según el Código del Trabajo (Artículo 32), las horas extras **se pagan con un recargo del 50%** sobre el sueldo convenido para la jornada ordinaria. Es decir, valen un 1.5 veces más que tu hora normal.

### La Fórmula
Para calcular cuánto vale tu hora extra si tienes un sueldo mensual:
1. Divide tu sueldo base mensual por 30 para obtener tu sueldo diario.
2. Multiplica el sueldo diario por 28 (los días de la jornada legal mensual).
3. Divide el resultado por 180 (el total de horas ordinarias del mes).
4. El resultado es el valor de tu hora normal.
5. Multiplica ese valor por 1.5 y obtendrás el valor exacto de tu hora extra.

Recuerda que las horas extras deben pactarse por escrito y solo para atender necesidades temporales de la empresa.
    `
  }
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}
