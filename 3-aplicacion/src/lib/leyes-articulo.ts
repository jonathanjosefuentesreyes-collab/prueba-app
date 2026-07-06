// Fase 4 del motor de páginas por-artículo (2026-07-06). El piloto (Código del Trabajo)
// validó el patrón con demanda real en Search Console: la consulta "artículo 44 del código
// del trabajo" ya nos trajo clics. Se escala SOLO a códigos ciudadanos con cobertura de
// simplificaciones ~100% (cada página lleva explicación única, no texto crudo): las páginas
// sin simplificación siguen noindex y fuera del sitemap, así que la lista solo habilita
// generación; el filtro de valor lo aplican generateStaticParams/sitemap por artículo.
// Lote conservador a propósito (códigos que la gente busca artículo por artículo); los
// tributarios/comerciales (Renta, IVA, Comercio, SA) esperan a medir este lote en Search
// Console antes de sumarse — crecer 10x de golpe es señal de "scaled content" para Google.
export const LEYES_CON_PAGINAS_POR_ARTICULO: number[] = [
  207436, // Código del Trabajo (piloto, 729 arts simplificados)
  172986, // Código Civil (2.841 — el más citado en búsquedas por artículo)
  242302, // Constitución Política (169 — "artículo 19 de la constitución")
  61438, // Ley del Consumidor 19.496 (148)
  229557, // Tribunales de Familia 19.968 (177)
  225128, // Matrimonio Civil 19.947 (110)
  1174663, // Ley de Copropiedad 21.442 (115)
  28650, // Accidentes del Trabajo 16.744 (113)
  1058072, // Insolvencia y Reemprendimiento 20.720 (455)
];
