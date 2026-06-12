# Prompt para Google AI Studio (Build) — réplica DEMO de "Ley Chilena"

> Pegar el bloque de abajo en aistudio.google.com → Build. IMPORTANTE: esto crea una
> DEMO de la app real. La versión de producción (Next.js + SQLite con 24.000+
> artículos oficiales) vive en `3-aplicacion/` y NO es replicable en AI Studio
> porque ahí no hay servidor ni base de datos (ver "Límites" al final).

---

Build a mobile-first web app called "Ley Chilena" — a Chilean legal assistant for ordinary citizens. All UI text in Chilean Spanish.

BRAND: deep blue #0039A6 (primary), red #CE1126 (accent), off-white background, white cards with 14px radius, friendly and trustworthy tone. Bottom navigation with 4 tabs: "Todas las Leyes", "Inicio", "Calculadora", "Guardadas".

SCREEN 1 — INICIO: header "Ley Chilena" (blue/red wordmark); hero card with a stylized Chilean flag (blue canton with white star, white and red bands) titled "TODAS LAS LEYES"; grid of 6 subject cards (Laboral, Familia, Civil, Penal, Comercial, Tributario); a chat input bar at the bottom with a friendly cartoon huaso mascot.

SCREEN 2 — BIBLIOTECA: collapsible accordion groups ("Constitución y Códigos", the 6 subjects, "Otras leyes"), each showing a count badge. Inside: law cards from the embedded LEYES_DEMO constant. Tapping a law shows its articles.

SCREEN 3 — CALCULADORA DE FINIQUITO: deterministic calculation in plain TypeScript (NEVER ask the AI to compute numbers). Inputs: causal de término (select: art. 161 necesidades de la empresa / desahucio / renuncia art. 159 / art. 160), fecha inicio, fecha término, última remuneración mensual CLP, valor UF (numeric input, default 40768.69, editable), vacaciones acumuladas en días hábiles, días del último mes impagos, checkbox "hubo aviso de 30 días". Rules (Código del Trabajo): indemnización por años de servicio = min(remuneración, 90×UF) × años (counting +1 year if fraction > 6 months, cap 11 years) ONLY for art. 161 with contract ≥ 1 year [art. 163]; aviso previo = min(remuneración, 90×UF) if art. 161 without 30-day notice [art. 162 inc. 4°]; feriado = (acumulados + 1.25 × months since last anniversary) días hábiles converted to calendar days skipping Saturdays and Sundays, × (remuneración/30) — paid for EVERY causal [arts. 67, 69, 73]. Show each line with its formula, amount in CLP (es-CL format) and the article cited as a chip. Show total, plus warnings: 90 UF cap applied, 11-year cap, "si el despido fuera improcedente puedes demandar en 60 días hábiles (art. 168)". Label everything "Estimación referencial — no constituye asesoría legal".

SCREEN 4 — CHAT "AbogaBot" (uses Gemini via @google/genai, model gemini-2.5-flash-lite): STRICT system behavior: (1) Before calling the model, check the user message against hardcoded sensitive patterns — suicidal ideation → reply ONLY with help line *4141 Salud Responde 24/7, warm tone, no legal content; domestic violence → 1455 SernamEG and 133 Carabineros. (2) The model may ONLY cite articles included in the LEYES_DEMO constant, which must be injected into the prompt as context; instruct it: "si los artículos provistos no responden la duda, dilo honestamente — JAMÁS cites artículos de memoria, tu memoria sobre leyes chilenas está desactualizada". (3) Answers ≤120 words, simple Spanish, one main citation ("según el artículo X del…"), ending with "Qué hacer ahora:" steps. (4) Append below every answer, in small text added by CODE (not by the model): "Orientación general, no asesoría legal. Para tu caso consulta a un abogado."

DATA — create a LEYES_DEMO constant with a handful of real key articles (Código del Trabajo arts. 32, 162, 163, 172; Ley 18.101 art. 4; Ley 19.496 retracto) marked clearly in the UI as "Versión demo — la app completa contiene todas las normas vigentes desde la BCN".

ACCESSIBILITY: 16px+ text, 44px touch targets, AA contrast, all interactive elements keyboard-accessible.

---

## Límites de la réplica (saberlos antes de invertir tiempo ahí)

1. **Sin base de datos**: AI Studio corre todo en el navegador. Los 24.412 artículos
   oficiales NO caben; la demo usa un puñado embebido. La garantía "cita verificable
   contra la fuente" solo existe completa en la app real.
2. **API key**: en AI Studio la key la gestiona la plataforma para ti; si publicas o
   compartes el código, JAMÁS dejes una key escrita dentro.
3. **Sin SEO**: una app de AI Studio no genera las miles de páginas indexables que
   son el modelo de negocio (AdSense). Sirve como demo/juguete, no como producto.
4. La app real y completa está en `Leyes chilenas/3-aplicacion/` (y el ZIP del
   escritorio) — esa es la que se deploya con dominio propio.
