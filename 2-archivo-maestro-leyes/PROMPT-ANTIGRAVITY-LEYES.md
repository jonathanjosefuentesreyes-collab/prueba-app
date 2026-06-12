# MISIÓN: Archivo maestro de TODAS las normas vigentes de Chile (fuente oficial: BCN)

Eres un agente encargado de construir el archivo maestro de legislación chilena para
una aplicación legal. El requisito es **COMPLETITUD VERIFICABLE**: todas las normas
vigentes de Chile, con todos sus artículos, descargadas de la fuente oficial, y un
informe final que demuestre con números que no falta nada.

## Regla 1 — Fuente oficial única (inquebrantable)

- Todo texto legal se descarga EXCLUSIVAMENTE de LeyChile, de la Biblioteca del
  Congreso Nacional: `https://www.leychile.cl/Consulta/obtxml?opt=7&idNorma=<ID>`
- PROHIBIDO escribir, completar, resumir o "recordar" texto legal con el modelo, y
  prohibido usar fuentes no oficiales (blogs, PDFs de terceros, Wikipedia).
- Si una norma no se puede descargar tras los reintentos, se registra en
  `fallidos.json` con su motivo. JAMÁS se rellena con texto generado.

## Regla 2 — "No dejar escapar nada" se garantiza con un catálogo, no con fe

### Fase A: construir el catálogo PRIMERO

1. Enumerar todas las normas chilenas y su estado de vigencia usando los servicios
   oficiales de la BCN: el buscador de leychile.cl (filtrando por estado de
   vigencia y por tipo de norma) y/o los datos abiertos de la BCN (datos.bcn.cl).
   Documentar en el informe qué método de enumeración se usó.
2. Guardar `catalogo.json`: una entrada por norma con
   `{idNorma, tipo, numero, titulo, estado_vigencia}`.
   Tipos a cubrir: Constitución, Códigos, Leyes, DFL (decretos con fuerza de ley),
   DL (decretos leyes), decretos y reglamentos.
3. Este catálogo es el contrato de completitud: al final, TODO lo descargado se
   audita contra él. "Completo" significa: cada norma vigente del catálogo está
   descargada, o listada en `fallidos.json` con su motivo. Nada en el limbo.

### Fase B: descargar por tandas (tiers), entregando lo más valioso primero

- **Tier 1 — descargar y ENTREGAR PRIMERO (la app lo necesita ya)** →
  `leyes-tier1.jsonl` (~35 normas, unas 2-3 horas con el pacing obligatorio):
  Constitución Política; Códigos Civil, del Trabajo, Penal, Procesal Penal, de
  Procedimiento Civil, de Comercio, Sanitario, Tributario, de Aguas y de Minería;
  y las leyes 19.496 (consumidor), 18.101 (arriendo), 14.908 (pensión de
  alimentos), 21.643 (Ley Karin), 21.561 (40 horas), 18.290 (tránsito), 19.968
  (tribunales de familia), 20.720 (insolvencia), 19.628 (datos personales),
  21.442 (copropiedad), 16.744 (accidentes del trabajo), 18.046 (sociedades
  anónimas), 20.609 (antidiscriminación), 19.947 (matrimonio civil), 20.830
  (acuerdo de unión civil), 17.336 (propiedad intelectual), 21.719 (protección
  de datos), 20.084 (responsabilidad penal adolescente) y 19.300 (medio ambiente).
- **Tier 2** → `leyes-tier2.jsonl`: todas las demás LEYES numeradas vigentes,
  más DFL y DL vigentes del catálogo (miles; correr por tandas).
- **Tier 3** → `leyes-tier3.jsonl`: el resto de normas vigentes del catálogo
  (decretos, reglamentos).

## Regla 3 — Respeto al servidor (o la BCN bloquea la IP y nadie obtiene nada)

- **15 segundos de pausa entre normas, siempre.** No reducirla para "avanzar más
  rápido": la BCN responde 429 y bloquea la IP ~20+ minutos.
- Ante HTTP 429: esperar 30 s → 60 s → 120 s. Si persiste, DETENER la tanda y
  reanudar al menos 1 hora después.
- Progreso persistente en `progreso.json`: el proceso debe ser reanudable e
  idempotente — lo ya descargado completo NUNCA se vuelve a pedir.
- Expectativa realista: cada 1.000 normas ≈ 4-5 horas efectivas. Los tiers 2 y 3
  toman DÍAS corriendo por tandas (por ejemplo nocturnas). Está planificado así.

## Formato de salida: JSON Lines (UTF-8 sin BOM), una norma por línea

```json
{"idNorma": 172986, "tipo": "Código", "numero_norma": "DFL 1", "titulo": "<título oficial EXACTO devuelto por la BCN>", "nombre_corto": "Código del Trabajo", "vigencia": "vigente", "fecha_version": "<la que reporta el XML de la BCN>", "fecha_descarga": "2026-06-12", "tier": 1, "url": "https://www.leychile.cl/Navegar?idNorma=172986", "articulos": [{"orden": 1, "encabezado": "Artículo 1", "texto": "Texto íntegro del artículo, plano, con \n entre párrafos."}]}
```

Reglas de campos:

- `idNorma` y `fecha_version` son **obligatorios** — habilitan el actualizador
  automático que vigilará cambios en la BCN.
- `encabezado` TAL CUAL aparece en la fuente: "Artículo 12", "Art. 12", "Artículo
  12 bis", "Artículo final", "Artículo primero transitorio". NO normalizar, NO
  renumerar, NO convertir a número — los textos refundidos reutilizan numeración
  y los sufijos bis/ter importan. **Incluir los artículos transitorios.**
- `texto` completo y plano: sin HTML, sin notas del editor, sin resúmenes ni
  interpretación.
- Norma que el XML marque como DEROGADA o no vigente: NO va al JSONL; se anota en
  `derogadas.json` (idNorma + título) para constancia de que fue revisada.
- Norma sin articulado (texto único): un solo elemento en `articulos` con
  encabezado "Texto único".

## Validación final — entregar `INFORME-DESCARGA.md`

1. Cada archivo `.jsonl` pasa validación JSON línea por línea (100%).
2. **Auditoría contra `catalogo.json`**: total de vigentes del catálogo,
   descargadas, fallidas (cada una con motivo), derogadas excluidas. Meta:
   fallidas = 0, o cada una explicada.
3. Ninguna norma del JSONL con `articulos` vacío.
4. Muestreo de fidelidad: 10 artículos al azar, de tiers distintos, comparados
   contra leychile.cl — texto idéntico carácter a carácter.
5. Verificación de títulos: el `titulo` descargado corresponde a la norma esperada
   del catálogo (un idNorma equivocado devuelve OTRA ley con nombre creíble — es
   el error más peligroso de todos).
6. Tabla resumen: normas y artículos por tier, tamaño de cada archivo.

## Entregables (todos en esta carpeta)

1. `catalogo.json` — el contrato de completitud
2. `leyes-tier1.jsonl` — ENTREGAR APENAS ESTÉ LISTO, sin esperar al resto
3. `leyes-tier2.jsonl`
4. `leyes-tier3.jsonl`
5. `derogadas.json`
6. `fallidos.json`
7. `progreso.json`
8. `INFORME-DESCARGA.md`
