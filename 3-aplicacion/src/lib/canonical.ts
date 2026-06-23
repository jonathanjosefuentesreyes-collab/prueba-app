// Normas DUPLICADAS en la base (el archivo BCN trae copias del mismo cuerpo legal con
// otro id) → su versión CANÓNICA. Para SEO apuntamos la canónica de la copia a UNA sola
// URL y excluimos la copia del sitemap, para no competir contra nosotros mismos con
// contenido duplicado. Mapa: { idDuplicado: idCanonico }.
export const CANONICAL: Record<number, number> = {
  1007469: 29708, // duplicado de la Ley de Tránsito (18.290 → norma canónica 29708)
};
