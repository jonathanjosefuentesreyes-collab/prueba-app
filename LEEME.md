# Leyes chilenas — mapa de la carpeta

Proyecto **Ley Chilena / AbogaBot v2**: web de leyes chilenas explicadas simple +
chatbot legal con Gemini, monetizada con anuncios. Todo el proyecto vive aquí.

## Las carpetas, en orden

| Carpeta | Qué contiene |
|---|---|
| **1-diseno-web/** | El diseño de la página. `pagina-principal.html` es la versión mejorada (ábrela con doble clic para verla); `original-stitch.html` es tu diseño original intacto; `assets/` tiene el logo y el huasito descargados; `PROMPT-STITCH.txt` es el prompt con que se generó. |
| **2-archivo-maestro-leyes/** | El archivo maestro con todas las leyes. `FORMATO-LEYES.md` es la especificación; aquí debe quedar el `leyes.jsonl` cuando lo generes con Antigravity. |
| **3-aplicacion/** | El código de la app (Next.js). Claude lo construye aquí (Fase 0 en adelante). |
| **4-guias/** | Las guías ciudadanas ("Cómo calcular tu finiquito", etc.) que traen visitas de Google y son requisito para AdSense. |
| **5-documentacion/** | Decisiones, reportes de QA y notas que no calcen en otra parte. |

## Los dos archivos de control (raíz)

- **CLAUDE.md** — arquitectura, reglas duras y lecciones (lo estable)
- **CONTINUAR.md** — estado actual, pendientes y próximo paso (lo vivo; se actualiza cada sesión)

## Cómo ver la página principal

Doble clic en `1-diseno-web/pagina-principal.html` → se abre en el navegador.
Funciona en teléfono y computador, con la bandera animada y el huasito.
