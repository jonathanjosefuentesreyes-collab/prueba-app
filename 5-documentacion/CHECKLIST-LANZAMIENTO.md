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
| ✅🟡 | 12–15+ guías originales indexadas, con citas verificadas | **52 guías** ya (laboral, vivienda, familia, deudas, consumidor) — cantidad para AdSense CUMPLIDA. ⚠️ **QA pendiente**: hay guías de **familia y consumidor** que CONTINUAR.md daba por bloqueadas hasta refrescar Ley 14.908 (pensión, versión 1962) y Ley 19.496 (consumidor, garantía 3 vs 6 meses 2021). Verificar que sus citas no usen texto desactualizado ([[abogabot-qa]]) |

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
1. **Claude (QA, prioritario)**: auditar las 52 guías con [[abogabot-qa]], en especial las de
   **familia y consumidor**, verificando que sus citas existan y NO usen texto desactualizado
   (Ley 14.908 y 19.496). Si la DB sigue con las versiones viejas, re-bajar esas normas de BCN
   antes de promocionarlas. *(Antes 6 guías; hoy 52 — actualizar CONTINUAR.md.)*
2. **Tú**: decidir dominio y plan de Gemini (desbloquean AdSense + privacidad + Play).
3. **Claude**: al haber dominio, conectar el gate de consentimiento real a `Anuncios.tsx` y generar el icono maskable.
4. **Más adelante (Play)**: agregar botón de reporte de contenido IA, generar `assetlinks.json`, empaquetar TWA con Bubblewrap.
