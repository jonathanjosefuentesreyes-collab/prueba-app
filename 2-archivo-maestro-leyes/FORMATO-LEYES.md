# FORMATO-LEYES.md — especificación del archivo de leyes para AbogaBot

> Este archivo es la instrucción para generar `leyes.jsonl`. Se le puede entregar
> tal cual a Antigravity (o a cualquier herramienta) como prompt/spec.

## Regla número 1 — la fuente

**Todo texto legal debe descargarse de la fuente oficial de la BCN, jamás escribirse
de memoria del modelo.** Un artículo inventado o desactualizado en una app legal es
el peor bug posible.

- Endpoint XML oficial por norma:
  `https://www.leychile.cl/Consulta/obtxml?opt=7&idNorma=<ID>`
- El `idNorma` de cada ley se obtiene de la URL al buscarla en https://www.leychile.cl
  (ej.: `...Navegar?idNorma=172986`).
- Validar que el título devuelto por la BCN coincida con la ley esperada (ha pasado
  que un idNorma equivocado devuelve otra norma).

**Advertencia de scraping**: la BCN bloquea la IP ~20+ minutos si recibe peticiones
seguidas (HTTP 429). Instrucción obligatoria: **pausa de 15 segundos entre normas**
y, ante un 429, esperar 30/60/120 s antes de reintentar. El proceso debe poder
reanudarse omitiendo normas ya descargadas.

## Formato del archivo: `leyes.jsonl`

JSON Lines (una norma por línea, UTF-8, sin BOM). Cada línea:

```json
{
  "idNorma": 172986,
  "titulo": "Texto oficial exacto que devuelve la BCN",
  "nombre_corto": "Código del Trabajo",
  "fecha_version": "2026-05-30",
  "url": "https://www.leychile.cl/Navegar?idNorma=172986",
  "articulos": [
    { "orden": 1, "encabezado": "Artículo 1", "texto": "Texto íntegro del artículo, plano, sin HTML." },
    { "orden": 2, "encabezado": "Art. 1 bis", "texto": "..." }
  ]
}
```

Reglas de los campos:

- `idNorma` — **obligatorio**. Es la clave que permitirá el actualizador automático
  contra la BCN. Sin esto el archivo pierde la mitad de su valor.
- `fecha_version` — la fecha de versión/última modificación que reporta el XML de la
  BCN (no la fecha de hoy). Es lo que se compara para detectar cambios.
- `encabezado` — **texto original tal cual aparece** ("Artículo 12", "Art. 12",
  "Artículo 12 bis", "Artículo final"). NO normalizar, NO renumerar, NO convertir a
  número: los textos refundidos reutilizan numeración y los sufijos bis/ter importan.
- `orden` — posición secuencial del artículo dentro de la norma (1, 2, 3…), para
  reconstruir el orden de lectura.
- `texto` — texto plano completo del artículo. Conservar saltos de párrafo como `\n`.
  Sin HTML, sin notas del editor.
- No incluir resúmenes, comentarios ni interpretación — solo el texto oficial.

## Normas a incluir (núcleo MVP, ~20)

Código Civil · Código del Trabajo · Código Penal · Ley 19.496 (protección al
consumidor) · Ley 18.101 (arriendo de predios urbanos) · Ley 14.908 (pensión de
alimentos) · Ley 21.643 (Ley Karin) · Ley 21.561 (40 horas) · Ley 18.290 (tránsito)
· Ley 19.968 (tribunales de familia) · Ley 20.720 (insolvencia y reemprendimiento)
· Ley 19.628 (datos personales) · Ley 21.442 (copropiedad inmobiliaria) · Ley 16.744
(accidentes del trabajo) · Ley 18.046 (sociedades anónimas) · Ley 20.609
(antidiscriminación) · Ley 19.947 (matrimonio civil) · Ley 20.830 (acuerdo de unión
civil) · Ley 17.336 (propiedad intelectual) · Ley 19.886 o la que el usuario decida.

## Checklist de validación antes de entregar el archivo

1. Cada línea parsea como JSON válido (`jq` o similar sobre todo el archivo).
2. Las ~20 normas están y ninguna tiene `articulos` vacío.
3. El `titulo` de cada una corresponde a la ley pedida (no otra norma).
4. Muestreo: abrir 3 artículos al azar y compararlos contra leychile.cl — texto idéntico.
5. Conteo de artículos por norma anotado (el importador lo re-verificará).
