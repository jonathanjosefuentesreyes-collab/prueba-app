# Checklist de lanzamiento — Ley Chilena / AbogaBot

Estado de la app frente al rulebook de la skill `abogabot-cumplimiento` (§7).
Última revisión: **2026-06-20**. Leyenda: ✅ hecho · 🟡 parcial/afinar · 🔧 requiere DECISIÓN o credenciales del usuario.

> Cómo se llenó: auditoría del código real en `3-aplicacion/` contra el checklist de cumplimiento.
> Los ítems 🔧 NO los puede cerrar Claude solo: necesitan plata, una cuenta o una decisión tuya.

## Web / chat (siempre)

| Estado | Ítem | Dónde / nota |
|---|---|---|
| ✅ | Disclaimer legal por código en cada respuesta | `api/chat/route.ts` (const `DISCLAIMER`, va en todas las respuestas, incluso errores) |
| ✅ | Aviso "no escribas datos sensibles" en el chat | `ChatClient.tsx` (bienvenida) **+** Política de Privacidad — *agregado 2026-06-20* |
| ✅ | Privacidad: Gemini/Google, cookies/AdSense, derechos ARCO + portabilidad, contacto | `privacidad/page.tsx` — *reforzado 2026-06-20 (ARCO + Ley 21.719 + entrenamiento free-tier)* |
| ✅ | Aviso legal: info ≠ asesoría, IA falible, sin relación abogado-cliente | `aviso-legal/page.tsx` — *reforzado 2026-06-20* |
| ✅ | Privacidad / Quiénes somos / Contacto accesibles desde el footer | `PieInstitucional.tsx` (columna "Información") |
| ✅ | Atribución a BCN visible; no implicar ser servicio oficial | Footer + cabecera Biblioteca ("Fuente oficial BCN", "sitio independiente") |
| 🟡 | Premium honesto (Ley 19.496) | Checkout es stub honesto ("pagos en preparación"); la página muestra precio y "Pago seguro en Chile" en futuro. OK para no-cobro. Al activar pago: Términos con precio/condiciones/retracto |
| 🔧 | Plan Gemini PAGADO antes de tráfico real | Decisión tuya. Doble motivo: cuota diaria (bloqueante ya documentado) **+** en free tier Google entrena con los prompts (privacidad) |

## AdSense

| Estado | Ítem | Dónde / nota |
|---|---|---|
| ✅ | Banner de consentimiento Aceptar/Rechazar en 1ª capa | `ConsentimientoCookies.tsx` |
| 🟡 | Anuncios solo tras consentir | `Anuncios.tsx` carga el script si hay `ADSENSE_CLIENT` (hoy vacío → no carga). Cuando se active, conectar el gate de consentimiento / usar el mensaje de privacidad de AdSense |
| 🔧 | CMP **certificada por Google** (IAB TCF) para EEA/UK/Suiza | El banner propio sirve para Chile; para tráfico europeo Google exige CMP certificada. Activar al postular a AdSense |
| 🔧 | Dominio propio HTTPS | Pendiente de decisión (metadataBase apunta a `leyesdechile.com`). Hoy en `onrender.com` |
| ✅ | `ads.txt` listo | Ruta `app/ads.txt/route.ts` (publica el ID al aprobar) |
| ✅ | 12–15+ guías originales indexadas, con citas verificadas | **52 guías** (laboral, vivienda, familia, deudas, consumidor) — cantidad CUMPLIDA. **QA Nivel 2 APTO** (`scripts/qa-citas-guias.mjs`): 100/100 citas existen en la DB y su norma coincide; cero inventadas. El riesgo familia/consumidor quedó RESUELTO: DB tiene Ley 19.496 v.2021 (art. 21 = "seis meses"), pensión cita Código Civil vigente |

## Google Play (cuando se publique — canal extra, no MVP)

| Estado | Ítem | Dónde / nota |
|---|---|---|
| ✅ | PWA empaquetable como TWA | Manifest válido + service worker + standalone ya existen |
| 🟡 | Icono maskable real con zona segura | `logo.png` es JPEG etiquetado .png; manifest reusa el mismo para maskable. Generar PNG real |
| 🔧 | Dominio propio + `/.well-known/assetlinks.json` | Requiere el dominio Y la huella SHA-256 de la firma de Play (no se puede crear antes) |
| 🔧 | Cuenta dev verificada (US$25 + ID); NO registrar como "servicio de gobierno" | Decisión/registro tuyo |
| 🔧 | Data safety form veraz + clasificación de contenido | Se llena en Play Console; debe COINCIDIR con `privacidad/page.tsx` |
| 🔧 | Botón/canal de reporte de contenido IA | Lo exige la política de IA generativa de Play; falta agregarlo a la app antes de publicar |
| 🔧 | Anuncios en la app: AdMob o sin anuncios (NO AdSense web en el TWA) | Decisión al monetizar la app |

## Próximos pasos sugeridos (orden)
1. ~~QA de las 52 guías~~ ✅ **HECHO 2026-06-20** (APTO, 100/100 citas válidas; familia/consumidor desbloqueadas).
2. **Tú**: decidir dominio y plan de Gemini (desbloquean AdSense + privacidad + Play).
3. **Claude**: al haber dominio, conectar el gate de consentimiento real a `Anuncios.tsx` y generar el icono maskable.
4. **Más adelante (Play)**: generar `assetlinks.json` y empaquetar TWA con Bubblewrap (el botón de reporte de IA ya existe en `ChatClient.tsx`).
5. **Futuro (dic-2026)**: al entrar en vigencia la Ley 21.719, revisar la guía de DICOM (Ley 19.628 está en v.1999 en la DB).
