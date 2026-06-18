// Pre-respuestas para las ~200 consultas legales más frecuentes en Chile.
// Cuando la pregunta del usuario hace match con los keywords de una entrada,
// se sirve esta respuesta sin llamar a Gemini → respuesta instantánea y verificada.
// Normas citadas verificadas en la base BCN.

export interface QA {
  id: string;
  categoria: "laboral" | "deudas" | "familia" | "vivienda" | "consumidor" | "penal" | "transito" | "tributario" | "migracion" | "salud" | "general";
  keywords: string[]; // al menos 2 deben estar en el mensaje para hacer match
  pregunta: string;   // pregunta canónica (también sirve para UI)
  respuesta: string;  // respuesta pre-curada lista para mostrar
}

export const QAS: QA[] = [

  // ─── LABORAL ────────────────────────────────────────────────────────────────

  {
    id: "L01",
    categoria: "laboral",
    keywords: ["finiquito", "cuánto", "corresponde", "despiden", "despedido"],
    pregunta: "¿Cuánto me corresponde de finiquito si me despiden?",
    respuesta: `**El finiquito incluye siempre:**\n1. **Remuneraciones pendientes** del último período.\n2. **Feriado proporcional** (vacaciones no tomadas): 1,25 días hábiles por cada mes desde tu último aniversario (el sábado cuenta como inhábil).\n\n**Si te despidieron por necesidades de la empresa (art. 161) y tienes ≥ 1 año:**\n3. **Indemnización por años de servicio:** un mes de sueldo por cada año trabajado (fracción > 6 meses cuenta como año). Tope: 11 años y 90 UF de remuneración.\n4. **Mes de aviso previo** si no te avisaron por escrito con 30 días de anticipación.\n\n**Si renunciaste o fue por falta grave (art. 160):** solo los puntos 1 y 2.\n\n**Pasos a seguir:**\n- Revisa la carta de despido (debe indicar la causal exacta).\n- Usa la calculadora de Ley Chilena antes de firmar el finiquito.\n- Puedes firmar con "reserva de derechos" si no estás de acuerdo.\n- Si el despido parece injustificado, tienes **60 días hábiles** para demandar (art. 168).\n\nLeyes relacionadas: Código del Trabajo artículos 161, 162, 163`,
  },
  {
    id: "L02",
    categoria: "laboral",
    keywords: ["horas", "extra", "extraordinarias", "cuánto", "pagan"],
    pregunta: "¿Cuánto me deben pagar por horas extra?",
    respuesta: `Las horas extraordinarias se pagan con un **recargo mínimo del 50%** sobre el valor de tu hora ordinaria (art. 32 del Código del Trabajo). Es decir, **cada hora extra vale 1,5 veces tu hora normal**.\n\n**Cómo calcular tu hora extra:**\n1. Divide tu sueldo mensual por las horas que trabajas al mes (con jornada de 42 h son ~168 h/mes).\n2. Multiplica ese valor por 1,5.\n\nEjemplo: sueldo $600.000 → hora normal ≈ $3.571 → hora extra ≈ $5.357.\n\n**Límites:** máximo 2 horas extra por día; deben pactarse por escrito para necesidades temporales.\n\n**Si no te las pagan:** reclama en la Dirección del Trabajo (DT).\n\nLeyes relacionadas: Código del Trabajo artículos 30, 31, 32`,
  },
  {
    id: "L03",
    categoria: "laboral",
    keywords: ["vacaciones", "feriado", "días", "corresponden", "cuántos"],
    pregunta: "¿Cuántos días de vacaciones me corresponden?",
    respuesta: `Con más de **un año** trabajando tienes derecho a **15 días hábiles** de feriado anual (art. 67). El sábado siempre se cuenta como inhábil, igual que domingos y festivos, así que equivale a unas 3 semanas corridas.\n\n**Si llevas menos de un año:** aún no tienes el feriado completo, pero si te desvinculan te corresponde el **feriado proporcional** (se paga en el finiquito).\n\n**No se puede compensar en dinero** mientras sigas trabajando. Solo se pagan al salir de la empresa.\n\n**Si no te las dan:** puedes reclamar en la Dirección del Trabajo.\n\nLeyes relacionadas: Código del Trabajo artículos 67, 69, 70, 73`,
  },
  {
    id: "L04",
    categoria: "laboral",
    keywords: ["sueldo", "mínimo", "cuánto", "2024", "2025", "2026"],
    pregunta: "¿Cuál es el sueldo mínimo en Chile?",
    respuesta: `El **ingreso mínimo mensual** se actualiza anualmente por ley. A partir del 1 de mayo de 2025 el mínimo es de **$560.000** para trabajadores mayores de 18 años y menores de 65 (la cifra exacta se ajusta cada año, confirma en el Diario Oficial la vigente).\n\n**Nadie puede pagarte menos** que el mínimo legal, aunque el contrato diga lo contrario.\n\n**Si te pagan menos:** tienes derecho a reclamar la diferencia ante la Dirección del Trabajo.\n\nLeyes relacionadas: Código del Trabajo artículo 44`,
  },
  {
    id: "L05",
    categoria: "laboral",
    keywords: ["embarazada", "despedir", "fuero", "maternal", "embarazo"],
    pregunta: "¿Me pueden despedir si estoy embarazada?",
    respuesta: `**No, salvo excepciones.** Desde el inicio del embarazo y hasta **un año después** del postnatal (sin contar el permiso postnatal parental) tienes **fuero maternal**: el empleador necesita autorización judicial previa (desafuero) para terminar tu contrato (art. 201).\n\nSin esa autorización el despido **no produce efecto**: puedes exigir reincorporación y el pago de los sueldos del tiempo fuera.\n\n**El fuero te protege aunque el empleador no supiera** de tu embarazo: basta presentar el certificado médico.\n\n**Descansos:**\n- Prenatal: 6 semanas antes del parto.\n- Postnatal: 12 semanas después.\n- Postnatal parental: 12 semanas adicionales.\n\n**Si te despidieron:** avisa con el certificado médico y pide por escrito la reincorporación. Reclama en la DT o en la Corporación de Asistencia Judicial (CAJ).\n\nLeyes relacionadas: Código del Trabajo artículos 174, 195, 201`,
  },
  {
    id: "L06",
    categoria: "laboral",
    keywords: ["jornada", "horas", "semana", "40 horas", "cuántas"],
    pregunta: "¿Cuántas horas se trabaja a la semana en Chile?",
    respuesta: `La jornada ordinaria máxima se está reduciendo de forma gradual:\n- **44 horas** desde abril de 2024\n- **42 horas** desde abril de 2026\n- **40 horas** desde abril de 2028\n\nSe distribuye en **5 o 6 días** (nunca más de 10 h diarias). La ley permite pactar promedios en ciclos de hasta 4 semanas, lo que posibilita la semana de 4 días por acuerdo escrito.\n\nTodo lo que trabajes sobre tu jornada son **horas extraordinarias** con recargo del 50%.\n\nLeyes relacionadas: Código del Trabajo artículos 22, 28, 32`,
  },
  {
    id: "L07",
    categoria: "laboral",
    keywords: ["acoso", "laboral", "karin", "hostigamiento", "denunciar"],
    pregunta: "Sufro acoso laboral, ¿qué puedo hacer?",
    respuesta: `Con la **Ley Karin** (vigente desde agosto 2024) basta **un solo hecho** de hostigamiento para configurar acoso laboral.\n\n**Cómo denunciar:**\n1. Denuncia **por escrito o verbalmente** en tu empresa o directo en la **Inspección del Trabajo** (no necesitas abogado).\n2. La empresa debe adoptar **medidas de resguardo inmediatas** (separar a las personas).\n3. Luego investigan internamente o remiten los antecedentes a la DT en **3 días**.\n\n**Reúne pruebas:** correos, mensajes, fechas, testigos.\n\n**Prohibición de represalias:** no te pueden despedir por denunciar.\n\nLeyes relacionadas: Código del Trabajo artículos 2, 211-A, 211-C, 211-E`,
  },
  {
    id: "L08",
    categoria: "laboral",
    keywords: ["honorarios", "dependiente", "contrato", "trabajo", "primacía"],
    pregunta: "Me pagan a honorarios pero trabajo como empleado, ¿qué hago?",
    respuesta: `Si trabajas con **horario, supervisión y obligación de asistir**, la ley puede reconocer que existe un **contrato de trabajo**, aunque te paguen a honorarios. Es el principio de **primacía de la realidad** (art. 8 del Código del Trabajo).\n\n**Señales de relación laboral encubierta:**\n- Cumples horario fijo.\n- Recibes instrucciones de una jefatura.\n- Trabajas con herramientas de la empresa.\n- Asistencia obligatoria y justificación de inasistencias.\n\n**Si se reconoce:** tienes derecho retroactivo a vacaciones, gratificación, indemnizaciones y cotizaciones de AFP, salud y cesantía.\n\n**Pasos:** reúne pruebas y pide una fiscalización en la **Dirección del Trabajo**.\n\nLeyes relacionadas: Código del Trabajo artículos 7, 8, 9`,
  },
  {
    id: "L09",
    categoria: "laboral",
    keywords: ["gratificación", "cuánto", "pagan", "empresa", "utilidades"],
    pregunta: "¿Cuánto es la gratificación y cuándo me la pagan?",
    respuesta: `La gratificación es una participación en las utilidades de la empresa. La pagan empresas **con fines de lucro** que llevan contabilidad y tuvieron **utilidades líquidas** en el año.\n\n**Dos formas de pago (el empleador elige):**\n1. **30% de las utilidades líquidas** repartidas proporcionalmente.\n2. **25% de lo que ganaste en el año**, con un tope de **4,75 ingresos mínimos mensuales** (la más común).\n\nSi te la pagan mensual en la liquidación, están usando la opción 2.\n\n**Si trabajaste solo unos meses:** te corresponde la parte proporcional.\n\nLeyes relacionadas: Código del Trabajo artículos 47, 50`,
  },
  {
    id: "L10",
    categoria: "laboral",
    keywords: ["licencia", "médica", "cuánto", "pagan", "subsidio"],
    pregunta: "¿Cuánto me pagan durante una licencia médica?",
    respuesta: `Durante una licencia médica recibes un **subsidio** (no el sueldo directamente) que paga la ISAPRE o FONASA:\n\n- **Primeros 3 días:** generalmente los paga el empleador (pero muchos contratos los compensan).\n- **Del 4° día en adelante:** subsidio calculado sobre tu remuneración imponible de los últimos 3 meses. El tope es de **$4.028 UF** al mes aproximadamente (varía con el UF).\n\n**El empleador NO puede despedirte mientras tienes licencia médica vigente** por la causal de necesidades de la empresa.\n\n**Licencia por enfermedad grave del hijo menor de 1 año:** ambos padres tienen derecho (art. 199).\n\nLeyes relacionadas: Código del Trabajo artículos 199, 200`,
  },
  {
    id: "L11",
    categoria: "laboral",
    keywords: ["despido", "injustificado", "demandar", "plazo", "reclamar"],
    pregunta: "Me despidieron injustificadamente, ¿qué puedo hacer?",
    respuesta: `Tienes **60 días hábiles** desde la separación para presentar una demanda en el **Juzgado del Trabajo** por despido injustificado (art. 168). Si primero reclamas en la DT, el plazo se suspende (máximo 90 días hábiles total).\n\n**Si ganas:** la indemnización por años de servicio se recarga:\n- 30% si el despido fue injustificado.\n- 50% si fue indebido (ej. causal falsa).\n- 80% o 100% en casos especiales.\n\n**Puedes firmar el finiquito con "reserva de derechos"** para recibir el pago y seguir reclamando.\n\nLeyes relacionadas: Código del Trabajo artículos 162, 168`,
  },
  {
    id: "L12",
    categoria: "laboral",
    keywords: ["contrato", "trabajo", "indefinido", "plazo", "fijo"],
    pregunta: "¿Cuándo un contrato a plazo fijo se vuelve indefinido?",
    respuesta: `Un contrato a plazo fijo se convierte en **indefinido** cuando:\n1. Se renueva por **segunda vez** (art. 159 N°4).\n2. El trabajador continúa prestando servicios después del vencimiento con conocimiento del empleador.\n3. Se usa el contrato a plazo para **funciones que son propias de actividades permanentes** de la empresa.\n\n**Los contratos a plazo fijo no pueden durar más de 1 año** (2 años para gerentes o personas con título profesional).\n\n**Si el empleador termina el contrato al vencimiento del segundo plazo:** se considera igual que un despido injustificado para el cómputo de derechos.\n\nLeyes relacionadas: Código del Trabajo artículos 159, 160`,
  },
  {
    id: "L13",
    categoria: "laboral",
    keywords: ["accidente", "trabajo", "mutual", "qué", "hacer"],
    pregunta: "Tuve un accidente en el trabajo, ¿qué hago?",
    respuesta: `**Pasos inmediatos:**\n1. Recibe atención médica: tienes derecho a ser atendido **gratis** en la mutualidad que corresponda a tu empleador (IST, Mutual de Seguridad, ACHS, u hospital FONASA en accidentes de trayecto).\n2. **Avisa a tu empleador** de inmediato para que complete la **Denuncia Individual de Accidente del Trabajo (DIAT)**.\n3. Guarda todos los documentos médicos.\n\n**Derechos:** atención médica y dental, rehabilitación, prótesis, subsidio por incapacidad laboral (con tope), y si hay secuelas permanentes, una **pensión de invalidez** o **indemnización global** según el porcentaje de incapacidad.\n\n**Si el empleador no hace la denuncia:** hazla tú directamente en la mutualidad.\n\nLeyes relacionadas: Ley 16.744 artículos 5, 29, 30`,
  },
  {
    id: "L14",
    categoria: "laboral",
    keywords: ["cotizaciones", "impagas", "afp", "isapre", "ley bustos"],
    pregunta: "Me despidieron y mis cotizaciones estaban sin pagar, ¿qué pasa?",
    respuesta: `Si al momento del despido tus **cotizaciones previsionales estaban impagas**, el despido **no produce efecto** (Ley Bustos, art. 162 del Código del Trabajo). El empleador debe:\n1. Pagar todas las cotizaciones adeudadas.\n2. Comunicártelo.\n\nMientras no lo haga, **debe seguir pagándote la remuneración completa** aunque no estés trabajando.\n\n**Verifica tus cotizaciones en:** www.previred.com o directamente en tu AFP.\n\nLeyes relacionadas: Código del Trabajo artículo 162`,
  },
  {
    id: "L15",
    categoria: "laboral",
    keywords: ["semana corrida", "qué", "es", "dominical", "pago"],
    pregunta: "¿Qué es la semana corrida y a quién le corresponde?",
    respuesta: `La **semana corrida** (art. 45) es un pago adicional equivalente al **valor de un día de trabajo** por cada semana en que trabajaste todos los días hábiles pactados. Se cobra con la remuneración de la semana.\n\n**A quién le corresponde:** trabajadores con sueldo diario o variable (comisiones, trato). Los trabajadores con sueldo mensual fijo ya tienen los domingos incluidos en su remuneración.\n\nEl cálculo: promedio diario de lo ganado en la semana → eso se paga por el día de descanso.\n\nLeyes relacionadas: Código del Trabajo artículo 45`,
  },
  {
    id: "L16",
    categoria: "laboral",
    keywords: ["seguro", "cesantía", "afc", "cobrar", "cómo"],
    pregunta: "¿Cómo cobro el seguro de cesantía?",
    respuesta: `Puedes cobrar el Seguro de Cesantía (AFC) si:\n- Te **despidieron** por cualquier causal.\n- Terminó tu **contrato a plazo fijo** o por obra.\n- Firmaste **mutuo acuerdo** (también puede cobrar en algunos casos).\n\n**Cómo cobrar:**\n1. Lleva tu aviso de término de contrato y cédula de identidad a la **AFC** (www.afc.cl) o sucursal AFC/banco.\n2. También en línea en afc.cl con clave AFC o ClaveÚnica.\n\n**Monto:** depende de tu saldo acumulado en la cuenta individual y el fondo solidario. El primer mes puede ser el 70% del promedio de las últimas 12 remuneraciones (varía según causal y tiempo cotizado).\n\nLeyes relacionadas: Ley 19.728 artículos 2, 15, 24`,
  },
  {
    id: "L17",
    categoria: "laboral",
    keywords: ["no", "pagan", "sueldo", "remuneración", "deber"],
    pregunta: "No me pagan el sueldo, ¿qué puedo hacer?",
    respuesta: `**El sueldo debe pagarse en la fecha pactada** (máximo el último día hábil del mes). Si no te pagan:\n\n1. **Reclama por escrito al empleador** y guarda copia.\n2. **Denuncia en la Dirección del Trabajo** (inspección.drtrabajo.gob.cl o 600 450 4000) — es gratis y sin necesidad de abogado.\n3. La DT puede multar al empleador y exigir el pago.\n4. Si no se resuelve, puedes **demandar en el Juzgado del Trabajo**.\n\n**Además:** el no pago de remuneraciones es una causal para que tú **renuncies con derecho a indemnización** (art. 171, despido indirecto).\n\nLeyes relacionadas: Código del Trabajo artículos 54, 171`,
  },
  {
    id: "L18",
    categoria: "laboral",
    keywords: ["prenatal", "postnatal", "permiso", "maternidad", "semanas"],
    pregunta: "¿Cuánto dura la licencia de maternidad (prenatal y postnatal)?",
    respuesta: `**Descanso de maternidad (art. 195):**\n- **Prenatal:** 6 semanas antes del parto (se pueden agregar hasta 2 semanas del postnatal si el bebé no ha nacido).\n- **Postnatal:** 12 semanas después del parto.\n\n**Permiso postnatal parental (art. 197 bis):**\n- 12 semanas adicionales a tiempo completo, o 18 semanas a media jornada (la madre elige).\n- Las últimas 6 semanas (o 12 a media jornada) pueden traspasarse al padre.\n\n**Financiamiento:** subsidio que reemplaza la remuneración, pagado por tu previsión de salud con base en tus últimas cotizaciones.\n\nLeyes relacionadas: Código del Trabajo artículos 195, 197, 197 bis`,
  },
  {
    id: "L19",
    categoria: "laboral",
    keywords: ["sindical", "sindicato", "fuero", "dirigente"],
    pregunta: "¿Los dirigentes sindicales tienen fuero?",
    respuesta: `Sí. Los **directores sindicales** tienen **fuero laboral** desde que se postula al cargo hasta 6 meses después de cesar en él (art. 243 del Código del Trabajo). El empleador no puede despedirlos sin autorización judicial previa (desafuero).\n\nEl fuero protege durante:\n- La negociación colectiva.\n- La directiva del sindicato.\n- Los delegados de personal.\n\nSi te despiden con fuero sin autorización, el despido no produce efecto y puedes exigir reincorporación.\n\nLeyes relacionadas: Código del Trabajo artículos 243, 244, 245`,
  },
  {
    id: "L20",
    categoria: "laboral",
    keywords: ["subcontrato", "subcontratación", "empresa", "principal", "responsabilidad"],
    pregunta: "Trabajo en subcontrato y el contratista no paga, ¿puedo ir contra la empresa principal?",
    respuesta: `Sí. La **empresa principal es subsidiariamente responsable** de las obligaciones laborales y previsionales del contratista (art. 183-B). Si el contratista no paga:\n\n1. Primero debes demandar al **contratista** (tu empleador directo).\n2. Si no paga, puedes dirigirte **subsidiariamente** contra la empresa principal.\n\nLa empresa principal puede liberarse de esta responsabilidad si **retiene pagos al contratista** para cubrir las deudas laborales y previsionales, o si verifica que el contratista las cumple.\n\n**Solidaridad:** Si la empresa principal era dueña de la obra y el contratista trabaja exclusivamente para ella, la responsabilidad puede ser solidaria.\n\nLeyes relacionadas: Código del Trabajo artículos 183-A, 183-B`,
  },

  // ─── DEUDAS ─────────────────────────────────────────────────────────────────

  {
    id: "D01",
    categoria: "deudas",
    keywords: ["dicom", "salir", "cómo", "borrar", "registro"],
    pregunta: "¿Cómo salgo de DICOM?",
    respuesta: `**Cuando pagas la deuda:** el acreedor (banco, casa comercial) tiene la obligación de avisar al registro en **7 días hábiles** para que te borren (art. 19 Ley 19.628). Una vez pagada, no pueden seguir publicando esa deuda.\n\n**Sin pagar (caducidad):** pasados **5 años** desde que la deuda se hizo exigible, no puede seguir publicándose en DICOM aunque no la hayas pagado (art. 18).\n\n**Si sigues apareciendo después de pagar:**\n1. Reúne el comprobante de pago.\n2. Exige por escrito al acreedor (no a DICOM) que informe el pago.\n3. Si no corrigen, puedes reclamar ante los tribunales.\n\n**Salir de DICOM es GRATIS**. No le pagues a "limpiadores de DICOM".\n\nLeyes relacionadas: Ley 19.628 artículos 18, 19`,
  },
  {
    id: "D02",
    categoria: "deudas",
    keywords: ["prescribe", "deuda", "años", "plazo", "prescripción"],
    pregunta: "¿Cuándo prescribe una deuda en Chile?",
    respuesta: `**Plazos generales:**\n- **Acción ejecutiva (cobro rápido con pagaré, cheque, etc.):** 3 años desde que la deuda fue exigible.\n- **Acción ordinaria:** 5 años (al vencer los 3 años ejecutivos, pasan a ser 2 años ordinarios más).\n\n**Casos especiales:**\n- Impuestos (SII/municipios): 3 años.\n- Honorarios de abogados, médicos: 2 años.\n\n**⚠️ MUY IMPORTANTE:** la prescripción **no opera sola**. Si te demandan, debes **presentarte al juicio y alegarla**. Si no concurres, te pueden condenar igual aunque la deuda esté prescrita.\n\n**Lo que interrumpe el plazo:** hacer un abono, repactar o que el acreedor te demande y te notifique (reinicia el conteo desde cero).\n\nLeyes relacionadas: Código Civil artículos 2514, 2515, 2521`,
  },
  {
    id: "D03",
    categoria: "deudas",
    keywords: ["embargar", "sueldo", "deuda", "pueden", "remuneración"],
    pregunta: "¿Pueden embargarme el sueldo por una deuda?",
    respuesta: `**Regla general:** las remuneraciones son **inembargables** (art. 57 del Código del Trabajo). Un acreedor común (banco, casa comercial) **no puede quedarse con tu sueldo**.\n\n**Excepción del monto:** solo es embargable la parte del sueldo que **exceda de 56 UF** mensuales.\n\n**Excepción por tipo de deuda:**\n- **Pensión de alimentos:** sí puede descontarse directamente del sueldo (hasta el 50%).\n- Fraude, hurto o robo del trabajador contra su empleador.\n\n**Las cotizaciones de AFP tampoco se pueden embargar.**\n\n**Si te embargan algo que no corresponde** (bajo el límite de 56 UF o un bien inembargable): pide al tribunal la exclusión del embargo.\n\nLeyes relacionadas: Código del Trabajo artículo 57`,
  },
  {
    id: "D04",
    categoria: "deudas",
    keywords: ["repactar", "deuda", "banco", "renegociar", "convenio"],
    pregunta: "Quiero repactar mi deuda con el banco, ¿qué debo saber?",
    respuesta: `**Antes de repactar, ten en cuenta:**\n1. **Repactar interrumpe la prescripción**: el plazo de 3 o 5 años se reinicia desde cero con la firma.\n2. Lee el contrato completo: fíjate en la tasa de interés final, seguros asociados y comisiones.\n3. Puedes negociar directamente con el banco; no necesitas intermediarios ni "gestores de deuda" (pueden cobrarte comisiones abusivas).\n\n**Alternativa gratuita:** si tienes múltiples deudas, el **Servicio Nacional del Consumidor (SERNAC)** tiene mediación gratuita; y si son deudas abrumadoras, existe el procedimiento de **renegociación de deudas** ante la Superintendencia de Insolvencia y Reemprendimiento (SIREc), gratuito para personas naturales.\n\nLeyes relacionadas: Ley 20.720 artículos 260, 261`,
  },
  {
    id: "D05",
    categoria: "deudas",
    keywords: ["insolvencia", "quiebra", "renegociación", "deudas", "natural"],
    pregunta: "¿Puedo declarar quiebra o renegociar mis deudas como persona?",
    respuesta: `Sí, las personas naturales pueden acceder a dos procedimientos gratuitos ante la **SIREc (Superintendencia de Insolvencia y Reemprendimiento)**:\n\n1. **Renegociación de deudas:** proceso de mediación en que un asesor ayuda a negociar un acuerdo de pago con tus acreedores. Es gratuito, voluntario y reservado.\n2. **Liquidación de bienes (quiebra personal):** si no hay acuerdo, un liquidador vende tus bienes para pagar las deudas y quedas con deuda "borrada" salvo excepciones (alimentos, multas penales).\n\n**Acceso:** en www.superir.gob.cl o presencialmente en sus oficinas, con cédula de identidad.\n\nLeyes relacionadas: Ley 20.720 artículos 260, 261, 277`,
  },
  {
    id: "D06",
    categoria: "deudas",
    keywords: ["cobranza", "llamadas", "hostigamiento", "acoso", "empresa"],
    pregunta: "Una empresa de cobranza me llama y hostiga todo el día, ¿es legal?",
    respuesta: `No. La ley prohíbe las prácticas de cobranza abusivas (art. 37 Ley del Consumidor):\n\n**Está prohibido:**\n- Llamar a horas inadecuadas (antes de las 8 am o después de las 21 pm).\n- Enviar mensajes con datos de la deuda a terceros.\n- Hostigar al deudor con llamadas reiteradas.\n- Usar amenazas o lenguaje vejatorio.\n- Cobrar gastos de cobranza extrajudicial que superen el 9% de la deuda (y solo si figura en el contrato).\n\n**Qué hacer:**\n1. Registra las llamadas (hora, número, contenido).\n2. Reclama en SERNAC (sernac.cl o 800 700 100).\n3. Puedes denunciar ante los tribunales; el juez puede multar al infractor.\n\nLeyes relacionadas: Ley 19.496 artículo 37`,
  },
  {
    id: "D07",
    categoria: "deudas",
    keywords: ["fiador", "aval", "codeudor", "solidario", "deuda"],
    pregunta: "Salí de aval y el titular no paga, ¿me pueden cobrar a mí?",
    respuesta: `Sí. Como **codeudor solidario** (la fórmula más común), el banco puede cobrarte a ti directamente **sin necesidad de ir primero contra el deudor principal** (art. 1514 del Código Civil). Tienes las mismas obligaciones que si la deuda fuera tuya.\n\nComo **fiador simple** (menos común), el banco debe agotar primero los recursos contra el deudor principal antes de cobrar al fiador.\n\n**Qué hacer:**\n- Si pagas la deuda en lugar del titular, puedes **repetir en su contra** (exigirle que te reembolse lo pagado).\n- Revisa el contrato que firmaste para saber si eres codeudor solidario o fiador.\n\nLeyes relacionadas: Código Civil artículos 1514, 2335, 2336`,
  },
  {
    id: "D08",
    categoria: "deudas",
    keywords: ["herencia", "deuda", "heredar", "pagar", "fallecido"],
    pregunta: "¿Los hijos heredan las deudas del fallecido?",
    respuesta: `Los herederos **pueden heredar deudas**, pero solo hasta el monto del **activo (bienes) heredado**. No están obligados a pagar con su propio patrimonio si la herencia es insuficiente.\n\n**Beneficio de inventario:** para protegerse, los herederos pueden aceptar la herencia "con beneficio de inventario", lo que limita su responsabilidad al valor de los bienes recibidos.\n\n**Si repudias la herencia:** no heredas bienes ni deudas.\n\n**Importante:** si aceptas la herencia sin beneficio de inventario y no sabes que hay deudas, podrías quedar obligado con tu patrimonio propio.\n\n**Recomendación:** ante una herencia, pide asesoría para revisar el estado de deudas antes de aceptar.\n\nLeyes relacionadas: Código Civil artículos 1245, 1247, 1261`,
  },

  // ─── FAMILIA ─────────────────────────────────────────────────────────────────

  {
    id: "F01",
    categoria: "familia",
    keywords: ["pensión", "alimentos", "cuánto", "hijo", "pagar"],
    pregunta: "¿Cuánto es la pensión de alimentos por un hijo?",
    respuesta: `El monto se fija caso a caso según **las necesidades del hijo** y las **facultades del alimentante**. La ley fija mínimos:\n\n- **Un hijo:** no menos del **40%** de un ingreso mínimo mensual.\n- **Dos o más hijos:** no menos del **30%** por cada uno.\n- **Máximo total:** no puede exceder el **50%** de las rentas del alimentante.\n\nEl juez puede fijar un monto mayor si los ingresos del alimentante lo permiten.\n\n**Duración:** hasta los **21 años**; hasta los **28** si el hijo estudia; sin límite si tiene una incapacidad permanente.\n\n**Cómo pedirla:** demanda en el **Tribunal de Familia** (no necesitas abogado para la demanda inicial). La CAJ te ayuda gratis.\n\nLeyes relacionadas: Código Civil artículos 321, 329, 332; Ley 14.908`,
  },
  {
    id: "F02",
    categoria: "familia",
    keywords: ["divorcio", "cómo", "divorciarme", "matrimonio", "separación"],
    pregunta: "¿Cómo puedo divorciarme en Chile?",
    respuesta: `Hay **tres formas de divorcio** en Chile (Ley 19.947):\n\n1. **Divorcio de común acuerdo:** ambos cónyuges acuerdan el divorcio y hay separación de hecho de **al menos 1 año**. Es el más rápido.\n2. **Divorcio unilateral:** solo uno quiere divorciarse. Debe acreditar **3 años** de separación de hecho.\n3. **Divorcio por falta:** por conductas que atenten gravemente contra el matrimonio (infidelidad, maltrato, condena penal, etc.), sin necesidad de esperar plazo.\n\n**Proceso:** se tramita en el **Tribunal de Familia**. Se recomienda un abogado (la CAJ tiene abogados gratis). En divorcios de mutuo acuerdo también se puede ir ante notario si se cumplen ciertos requisitos.\n\nLeyes relacionadas: Ley 19.947 artículos 54, 55`,
  },
  {
    id: "F03",
    categoria: "familia",
    keywords: ["tuición", "custodia", "hijo", "padre", "madre"],
    pregunta: "¿A quién le corresponde la tuición de los hijos?",
    respuesta: `La **tuición** (cuidado personal) corresponde por ley a la **madre** en caso de desacuerdo, si los hijos son menores (art. 225 del Código Civil). Sin embargo, el juez puede otorgar la tuición al padre si el interés superior del niño lo requiere.\n\n**Los padres pueden acordar** tuición compartida o cualquier otra modalidad, y el acuerdo queda aprobado por el juez si es conveniente para el hijo.\n\n**El padre sin tuición tiene derecho a:** visitas y participación en la crianza (art. 229).\n\n**Tribunales competentes:** Tribunal de Familia. Si hay violencia, el juez puede restringir el contacto.\n\nLeyes relacionadas: Código Civil artículos 225, 229`,
  },
  {
    id: "F04",
    categoria: "familia",
    keywords: ["herencia", "heredar", "testamento", "bienes", "fallecido"],
    pregunta: "¿Cómo funciona la herencia en Chile?",
    respuesta: `En Chile la herencia se distribuye según la ley si no hay testamento, o siguiendo el testamento si existe, respetando siempre las **asignaciones forzosas**.\n\n**Sin testamento (sucesión intestada), los herederos son:**\n1. Hijos (y descendientes) → llevan la mayor parte.\n2. Cónyuge o conviviente civil → también tiene parte.\n3. Padres (si no hay hijos).\n4. Hermanos (si no hay hijos ni padres).\n\n**Partes forzosas que el testamento no puede tocar:**\n- **Mitad legitimaria:** para los hijos (y cónyuge).\n- **Cuarta de mejoras:** se puede dejar a ciertos herederos favorecidos.\n- **Cuarta de libre disposición:** para quien quieras.\n\n**Para tramitar la herencia** se hace una **posesión efectiva** ante el SRCeI o los tribunales.\n\nLeyes relacionadas: Código Civil artículos 988, 989, 1167, 1184`,
  },
  {
    id: "F05",
    categoria: "familia",
    keywords: ["pensión", "alimentos", "no", "paga", "apremio"],
    pregunta: "El padre/madre no paga la pensión de alimentos, ¿qué puedo hacer?",
    respuesta: `Si hay **3 mensualidades impagas** (continuas o no), el alimentante queda inscrito en el **Registro Nacional de Deudores de Pensiones de Alimentos**, lo que:\n- Bloquea renovar licencia de conducir y pasaporte.\n- Impide acceder a créditos.\n- Permite retener su devolución de impuestos para pagar la deuda.\n\n**Apremios que puede decretar el juez:**\n- **Arraigo** (prohibición de salir del país).\n- **Arresto nocturno** hasta 15 noches.\n- Retención directa del sueldo (hasta el 50%).\n\n**Cómo activarlo:** pide al Tribunal de Familia la **liquidación de la deuda** y solicita los apremios. La CAJ te puede ayudar gratis.\n\nLeyes relacionadas: Ley 14.908 artículos 14, 16, 19`,
  },
  {
    id: "F06",
    categoria: "familia",
    keywords: ["violencia", "intrafamiliar", "denuncia", "vif", "maltrato"],
    pregunta: "Sufro violencia intrafamiliar, ¿qué hago?",
    respuesta: `**Si estás en peligro AHORA:** llama al **133** (Carabineros) o al **1455** (SernamEG, 24/7 gratis).\n\n**Puedes denunciar en:**\n- Carabineros o PDI (cualquier comisaría).\n- Fiscalía (para delitos penales).\n- Tribunal de Familia (para VIF sin delito penal).\n\n**Medidas cautelares que puede decretar el juez:**\n- Prohibición de acercarse a ti o a tu domicilio.\n- Expulsión del agresor del hogar común.\n- Prohibición de porte de armas.\n\n**Importante:** los Carabineros pueden **detener en flagrancia** y llevar al imputado ante el Ministerio Público sin esperar orden judicial.\n\n**La Ley 20.066** también contempla el **delito de maltrato habitual** con pena de presidio menor.\n\nLeyes relacionadas: Ley 20.066 artículos 5, 6, 7, 9`,
  },
  {
    id: "F07",
    categoria: "familia",
    keywords: ["conviviente", "civil", "acuerdo", "derechos", "pareja"],
    pregunta: "¿Qué derechos da el Acuerdo de Unión Civil?",
    respuesta: `El **Acuerdo de Unión Civil (AUC)** (Ley 20.830) es un contrato entre dos personas (de cualquier sexo) que les da derechos similares al matrimonio:\n\n- **Previsión y salud:** beneficiario del sistema de salud del conviviente civil.\n- **Herencia:** el conviviente civil hereda igual que el cónyuge en la sucesión intestada.\n- **Tuición y alimentos:** mismas reglas que parejas casadas.\n- **Régimen de bienes:** comunidad de bienes salvo que se pacte separación.\n- **Pensión de alimentos** entre convivientes civiles.\n\n**Se celebra** ante el Registro Civil. **Se termina** de mutuo acuerdo ante notario o unilateralmente con notificación judicial (plazo mínimo entre celebración y término: 1 año).\n\nLeyes relacionadas: Ley 20.830 artículos 1, 4, 10, 15`,
  },
  {
    id: "F08",
    categoria: "familia",
    keywords: ["adopción", "adoptar", "niño", "requisitos", "proceso"],
    pregunta: "¿Cómo se adopta un niño en Chile?",
    respuesta: `La adopción en Chile se rige por la **Ley 21.430** (antes Ley 19.620). Solo es posible adoptar niños declarados **susceptibles de ser adoptados** por un tribunal.\n\n**Requisitos generales para adoptantes:**\n- Mayores de 25 años (casados, convivientes civiles, o solteros en casos especiales).\n- Al menos 20 años más que el adoptado.\n- Residencia en Chile.\n- Evaluación psicosocial favorable por el **Servicio Nacional de Protección Especializada** (SENAME+).\n\n**Proceso:**\n1. Postulación ante SENAME o entidad acreditada.\n2. Evaluación y preparación.\n3. Emparejamiento con un niño declarado adoptable.\n4. Período de acogida.\n5. Sentencia de adopción del Tribunal de Familia.\n\nLeyes relacionadas: Ley 21.430`,
  },
  {
    id: "F09",
    categoria: "familia",
    keywords: ["bienes", "gananciales", "separación", "matrimonio", "régimen"],
    pregunta: "¿Qué pasa con los bienes si me separo o divorcio?",
    respuesta: `Depende del **régimen matrimonial**:\n\n1. **Sociedad conyugal (el más común si no se pactó algo distinto):** los bienes adquiridos durante el matrimonio son comunes. Al divorciarse, se hace una "liquidación de la sociedad conyugal" y cada uno se lleva la mitad de los bienes comunes.\n\n2. **Separación de bienes:** cada cónyuge mantiene sus propios bienes. Al separarse no hay partición.\n\n3. **Participación en los gananciales:** al término, el que ganó menos en el matrimonio tiene derecho a la mitad de la diferencia de lo ganado por el otro.\n\n**La casa familiar** tiene protección especial: el cónyuge que no es propietario puede impedir su venta si es la residencia habitual de la familia.\n\nLeyes relacionadas: Código Civil artículos 1715, 1725, 1792-6`,
  },

  // ─── VIVIENDA ────────────────────────────────────────────────────────────────

  {
    id: "V01",
    categoria: "vivienda",
    keywords: ["arriendo", "echar", "desalojar", "arrendador", "plazo"],
    pregunta: "Me quieren echar del arriendo, ¿en cuánto tiempo deben avisarme?",
    respuesta: `**Contrato mes a mes o indefinido:** el desahucio debe hacerse **judicial o ante notario**. Plazo mínimo: **2 meses**, más **1 mes por cada año** que lleves en el inmueble, con un máximo de **6 meses**.\n\n**Contrato a plazo fijo de hasta 1 año:** el arrendador solo puede pedir la restitución ante el tribunal, y tienes **2 meses** desde que te notifican la demanda.\n\n**El arrendador NO puede:**\n- Cambiar la chapa.\n- Cortar los servicios (agua, luz, gas).\n- Sacarte por su propia cuenta sin orden judicial.\n\n**Si te cortan servicios o te amenazan:** denuncia en Carabineros y pide orientación en la CAJ (es gratis).\n\nLeyes relacionadas: Ley 18.101 artículos 3, 4`,
  },
  {
    id: "V02",
    categoria: "vivienda",
    keywords: ["garantía", "arriendo", "devolver", "mes", "cuándo"],
    pregunta: "¿Cuándo deben devolverme la garantía del arriendo?",
    respuesta: `La ley no fija un plazo específico para devolver la garantía, pero el arrendador debe devolverla **una vez terminado el arriendo y entregado el inmueble en buen estado**, descontando solo los daños que excedan el **desgaste natural** (uso razonable).\n\n**Prácticas aceptadas:** máximo 30 días después de la entrega es un plazo razonable en la jurisprudencia.\n\n**Si no te la devuelven o deducen más de lo que corresponde:**\n1. Exige por escrito la devolución con detalle de descuentos.\n2. Si no hay acuerdo, demanda en el **Juzgado de Policía Local** (para montos menores es más simple y rápido).\n\n**Recomendación:** al entregar el inmueble, haz un **acta de entrega con fotos** firmada por ambas partes.\n\nLeyes relacionadas: Ley 18.101 artículos 1, 2`,
  },
  {
    id: "V03",
    categoria: "vivienda",
    keywords: ["arriendo", "no", "paga", "arrendatario", "cobrar"],
    pregunta: "Mi arrendatario no me paga, ¿puedo echarlo?",
    respuesta: `Sí, pero **por vía judicial** (no puedes sacarlo por tu cuenta). El proceso:\n\n1. **Demanda de terminación de contrato por no pago** en el Tribunal de Arrendamiento (o civil) de tu ciudad.\n2. El tribunal notifica al arrendatario, que tiene plazo para contestar y pagar.\n3. Si no paga ni contesta, el juez ordena el lanzamiento.\n\n**Plazo aproximado:** 2 a 4 meses en casos simples con tribunal rápido; puede extenderse.\n\n**Tip:** incluye en el contrato una cláusula de **pago anticipado de renta** y la forma de notificación para agilizar el proceso judicial.\n\nLeyes relacionadas: Ley 18.101 artículos 1, 8`,
  },
  {
    id: "V04",
    categoria: "vivienda",
    keywords: ["reparaciones", "arriendo", "quién", "paga", "daños"],
    pregunta: "¿Quién paga las reparaciones en un arriendo?",
    respuesta: `**Arrendador:** reparaciones necesarias para mantener el inmueble en condiciones de uso (estructura, cañerías principales, techumbre). Son las **reparaciones mayores**.\n\n**Arrendatario:** reparaciones de las cosas que se deterioran por su **uso ordinario** (grifos, focos, cerraduras, pintura por desgaste normal). Son las **reparaciones locativas**.\n\n**Si hay daños causados por el arrendatario:** él es responsable.\n\n**Si el arrendador no hace las reparaciones mayores:** puedes pedirle al juez que lo obligue, o incluso terminar el contrato con indemnización.\n\n**Recomendación:** documenta el estado del inmueble al entrar con fotos y un inventario firmado.\n\nLeyes relacionadas: Código Civil artículos 1924, 1927, 1939`,
  },
  {
    id: "V05",
    categoria: "vivienda",
    keywords: ["subsidio", "habitacional", "casa", "vivienda", "postular"],
    pregunta: "¿Cómo postulo a un subsidio habitacional?",
    respuesta: `Los subsidios habitacionales son del **MINVU** y se postulan en el **SERVIU** de tu región o en la municipalidad. Existen varios tipos:\n\n- **DS 49 (FSV I):** para familias vulnerables, vivienda nueva o usada.\n- **DS 1 (FSV II):** para familias de clase media, complementa crédito hipotecario.\n- **DS 27 (Clase media):** para compra de vivienda nueva o usada con crédito.\n- **Subsidio de arriendo:** para pagar arriendo en zonas urbanas.\n\n**Requisitos generales:** inscribirse en el **Registro Social de Hogares**, no ser propietario de vivienda, y cumplir los topes de ingreso de cada programa.\n\n**Postulación:** en www.minvu.cl o en la municipalidad. Los llamados se hacen por decreto.\n\nLeyes relacionadas: DFL 2 de 1959`,
  },
  {
    id: "V06",
    categoria: "vivienda",
    keywords: ["gastos", "comunes", "condominio", "pagar", "obligación"],
    pregunta: "¿Estoy obligado a pagar gastos comunes?",
    respuesta: `Sí. En un **condominio o copropiedad** todos los copropietarios están obligados a pagar los **gastos comunes** en proporción a sus cuotas (art. 4 Ley 21.442). Si no pagas:\n\n- El condominio puede cobrarlos **ejecutivamente** (con la misma fuerza que una deuda con título ejecutivo).\n- La deuda puede anotarse en el Conservador de Bienes Raíces como **prohibición sobre el inmueble**.\n- Se pueden cobrar intereses y multas según el reglamento del condominio.\n\n**Si el condominio no presta los servicios por los que cobran:** puedes reclamar ante la administración o, si no se resuelve, ante el Juzgado de Policía Local.\n\nLeyes relacionadas: Ley 21.442 artículos 4, 5, 24`,
  },

  // ─── CONSUMIDOR ──────────────────────────────────────────────────────────────

  {
    id: "C01",
    categoria: "consumidor",
    keywords: ["garantía", "producto", "falla", "defectuoso", "cambio"],
    pregunta: "Compré un producto y falló, ¿qué garantía tengo?",
    respuesta: `Tienes **3 meses de garantía legal** desde la compra para exigir al vendedor, a tu elección:\n1. **Reparación gratuita** del producto.\n2. **Cambio** por el mismo producto.\n3. **Devolución del dinero pagado** más reajuste.\n\nPuedes elegir cualquiera de las tres opciones sin que el vendedor pueda imponerte solo una (art. 20 Ley del Consumidor).\n\n**Si el vendedor se niega o demora:** reclama en SERNAC (sernac.cl o 800 700 100) o en el **Juzgado de Policía Local**.\n\n**Guarda siempre el boleto o factura** como prueba de compra.\n\nLeyes relacionadas: Ley 19.496 artículos 19, 20`,
  },
  {
    id: "C02",
    categoria: "consumidor",
    keywords: ["retracto", "online", "internet", "devolver", "compra"],
    pregunta: "Compré por internet y quiero devolver el producto, ¿puedo?",
    respuesta: `Sí. En compras por internet (a distancia) tienes derecho a **retractarte** dentro de **10 días hábiles** desde que recibes el producto, sin necesidad de dar explicaciones (art. 3 bis Ley del Consumidor).\n\n**El vendedor debe devolver el dinero** en el mismo plazo y no puede cobrarte por el retracto, salvo el costo de devolución si el producto está en buen estado.\n\n**Excepciones (no aplica retracto):** productos perecibles, servicios ya prestados, productos personalizados, software o contenido digital descargado.\n\n**Cómo ejercerlo:** comunica al vendedor por escrito (email) dentro del plazo.\n\nLeyes relacionadas: Ley 19.496 artículos 3 bis, 17 G`,
  },
  {
    id: "C03",
    categoria: "consumidor",
    keywords: ["sernac", "reclamar", "proveedor", "cómo", "denunciar"],
    pregunta: "¿Cómo reclamo ante el SERNAC?",
    respuesta: `**Paso a paso para reclamar en SERNAC:**\n1. Ingresa a **sernac.cl** y busca el formulario de reclamo (también puedes ir en persona o llamar al 800 700 100).\n2. Describe el problema con todos los detalles: fecha, producto/servicio, empresa, montos.\n3. SERNAC contacta al proveedor y tiene **15 días hábiles** para intentar una mediación.\n4. Si el proveedor no responde o no hay acuerdo, SERNAC puede remitirlo al **Juzgado de Policía Local**.\n\n**Paralelamente:** puedes ir directamente al Juzgado de Policía Local del domicilio del proveedor si el monto no supera un máximo (montos pequeños: proceso simplificado).\n\nLeyes relacionadas: Ley 19.496 artículos 50, 50 B, 58`,
  },
  {
    id: "C04",
    categoria: "consumidor",
    keywords: ["banco", "cobro", "indebido", "cargo", "tarjeta"],
    pregunta: "El banco me hizo un cobro que no reconozco en mi tarjeta, ¿qué hago?",
    respuesta: `**Pasos:**\n1. **Reporta el cobro al banco** de inmediato (llamada al número de la tarjeta o en sucursal). Pide el bloqueo de la tarjeta si sospechas fraude.\n2. El banco tiene la obligación de investigar. Para cargos por fraude, debe **reversar el cobro** mientras investiga.\n3. Si el banco no resuelve en **10 días hábiles**, reclama en la **CMF (Comisión para el Mercado Financiero)** en cmfchile.cl.\n4. También puedes reclamar en **SERNAC** si el banco no responde.\n\n**Para compras no reconocidas en línea:** el banco debe presumir que fue fraude y reversar mientras investiga (Ley Fintech y circulares CMF).\n\nLeyes relacionadas: Ley 19.496 artículo 43; Ley 20.009 artículo 5`,
  },
  {
    id: "C05",
    categoria: "consumidor",
    keywords: ["isapre", "fonasa", "salud", "plan", "cobertura"],
    pregunta: "Mi ISAPRE no me cubre el tratamiento, ¿qué puedo hacer?",
    respuesta: `**Opciones:**\n1. **Reclama ante la ISAPRE** por escrito, exigiendo la cobertura con fundamentación médica.\n2. Si la ISAPRE rechaza, reclama en la **Superintendencia de Salud** (supersalud.gob.cl o fono 600 360 3000). El proceso es gratuito y sin abogado.\n3. Si el rechazo afecta una prestación GES (Garantías Explícitas en Salud / AUGE), la ISAPRE está **obligada a cubrirla** dentro de plazos establecidos: la Superintendencia puede sancionarla.\n4. Como última instancia, puedes recurrir a los tribunales.\n\n**Tip:** guarda todas las prescripciones médicas, negativas de la ISAPRE y recibos.\n\nLeyes relacionadas: Ley 18.933; DFL 1 de 2005 (Ley de ISAPRES)`,
  },

  // ─── PENAL ───────────────────────────────────────────────────────────────────

  {
    id: "P01",
    categoria: "penal",
    keywords: ["detuvieron", "detenido", "preso", "derechos", "arrestado"],
    pregunta: "Me detuvieron, ¿cuáles son mis derechos?",
    respuesta: `Al ser **detenido** tienes derecho a:\n1. **Ser informado** de la razón de la detención y tus derechos (en tu idioma si es necesario).\n2. **Guardar silencio**: no estás obligado a declarar contra ti mismo. Cualquier declaración ante policías sin abogado puede usarse en tu contra.\n3. **Llamar a un abogado** o a quien designes de inmediato.\n4. **Defensa letrada gratuita** a través de la Defensoría Penal Pública (defensoría.cl).\n5. Ser presentado ante el juez dentro de **24 horas** desde la detención (audiencia de control de detención).\n6. No ser objeto de torturas ni malos tratos.\n\n**Si te detienen en la calle:** pide que te muestren la orden o indica que estás siendo detenido en flagrancia. No resistas físicamente: reclama después por vías legales.\n\nLeyes relacionadas: Código Procesal Penal artículos 94, 95, 135`,
  },
  {
    id: "P02",
    categoria: "penal",
    keywords: ["robo", "hurto", "denunciar", "cómo", "carabineros"],
    pregunta: "Me robaron, ¿cómo hago la denuncia?",
    respuesta: `**Dónde denunciar:**\n- Cualquier **comisaría de Carabineros** o cuartel de **PDI**.\n- En línea en **carabineros.cl** o **pdichile.cl** (para delitos sin violencia).\n- En la **Fiscalía** directamente.\n\n**Qué llevar:** documentos de identidad, y cualquier evidencia (fotos, testigos, descripción del bien robado, número de serie si lo tienes).\n\n**Diferencia robo vs hurto:**\n- **Robo:** hay violencia, intimidación o fuerza (ej. asalto o breaking).\n- **Hurto:** sin violencia ni fuerza (ej. carterista).\n\n**Plazos:** denuncia lo antes posible; en delitos penales no hay plazo para denunciar (salvo prescripción de la acción penal, que varía).\n\n**Seguro del hogar o auto:** avisa también a tu seguro si tienes cobertura.\n\nLeyes relacionadas: Código Penal artículos 432, 436, 446`,
  },
  {
    id: "P03",
    categoria: "penal",
    keywords: ["imputado", "formalización", "proceso", "penal", "defensa"],
    pregunta: "Me van a formalizar, ¿qué significa y qué debo hacer?",
    respuesta: `La **formalización** es el acto en que el Fiscal te comunica oficialmente que estás siendo investigado por un delito. Es la audiencia ante el juez en que:\n\n1. El Fiscal expone los cargos.\n2. El juez puede decretar **medidas cautelares** (desde firma mensual hasta prisión preventiva).\n3. Se fija un **plazo de investigación**.\n\n**Lo más importante:** tienes derecho a **defensa letrada**. Si no tienes abogado, la **Defensoría Penal Pública** te asignará uno gratis.\n\n**No debes hablar sin tu abogado presente.** Puedes guardar silencio.\n\n**Después de la formalización** la investigación continúa; ser formalizado no es lo mismo que ser condenado.\n\nLeyes relacionadas: Código Procesal Penal artículos 229, 231, 155`,
  },
  {
    id: "P04",
    categoria: "penal",
    keywords: ["cyberbullying", "amenazas", "redes", "sociales", "acoso"],
    pregunta: "Me amenazan o acosan por redes sociales, ¿es delito?",
    respuesta: `Sí, varias conductas en redes sociales son delitos en Chile:\n\n- **Amenazas:** comunicar una amenaza seria de hacerle daño a alguien es delito (art. 296 Código Penal).\n- **Grooming (acoso sexual a menores en línea):** delito con pena de hasta 5 años (art. 269 ter).\n- **Difusión de imágenes íntimas sin consentimiento (pornovenganza):** delito con penas privativas de libertad (Ley 21.459).\n- **Fraude o estafa online:** delito.\n\n**Cómo actuar:**\n1. **Guarda evidencia** (capturas de pantalla con fecha y hora visibles).\n2. Denuncia en la **PDI** (Brigada del Cibercrimen) o en Carabineros.\n3. Reporta el contenido en la plataforma (Facebook, Instagram, etc.).\n\nLeyes relacionadas: Ley 21.459; Código Penal artículos 296, 269 ter`,
  },

  // ─── TRÁNSITO ────────────────────────────────────────────────────────────────

  {
    id: "T01",
    categoria: "transito",
    keywords: ["multa", "tránsito", "pagar", "fotomulta", "cómo"],
    pregunta: "¿Cómo pago o impugno una multa de tránsito?",
    respuesta: `**Pagar:** en el **Juzgado de Policía Local** correspondiente al lugar donde se cometió la infracción, en su sitio web (muchos tienen pago online) o en algunas municipalidades.\n\n**Impugnar (si crees que la multa es injusta):**\n1. Dentro del plazo indicado en la citación (generalmente 10 días hábiles), preséntate al Juzgado de Policía Local.\n2. Presenta tus argumentos y pruebas (fotos, testigos).\n3. El juez resuelve; si ganas, la multa se anula.\n\n**Fotomultas:** puedes impugnarlas si no eras el conductor (acreditas que otro manejaba) o si hay error en los datos del vehículo.\n\n**Si no pagas ni impugnas:** la multa se registra y puede afectar la renovación del permiso de circulación o la licencia de conducir.\n\nLeyes relacionadas: Ley 18.287; Ley de Tránsito 18.290`,
  },
  {
    id: "T02",
    categoria: "transito",
    keywords: ["accidente", "tránsito", "choque", "seguro", "responsabilidad"],
    pregunta: "Tuve un accidente de tránsito, ¿qué hago?",
    respuesta: `**En el momento:**\n1. Llama al **133** (Carabineros) si hay lesionados o si no hay acuerdo.\n2. Llama al **131** (SAMU) si hay heridos.\n3. **No muevas los vehículos** hasta que llegue Carabineros (salvo peligro).\n4. Intercambia datos: nombre, RUT, licencia, seguro obligatorio (SOAP), patente.\n\n**Documentos importantes:**\n- El parte de Carabineros establece la responsabilidad inicial.\n- El **SOAP (Seguro Obligatorio)** cubre daños a personas (no a vehículos) de hasta 1.800 UF por fallecimiento y cubre tratamiento médico.\n\n**Si eres víctima:**\n- Reclama al SOAP del vehículo que te golpeó.\n- Si hay negligencia grave, puedes demandar por daños al propietario o conductor.\n\nLeyes relacionadas: DFL 251 (SOAP); Ley 18.290 artículos 164, 167`,
  },
  {
    id: "T03",
    categoria: "transito",
    keywords: ["licencia", "conducir", "suspensión", "puntos", "alcohol"],
    pregunta: "Me suspendieron la licencia, ¿cuándo la recupero?",
    respuesta: `La suspensión depende de la causal:\n\n- **Alcohol o drogas al volante:** suspensión de **1 a 2 años** (primera vez); cancelación definitiva en reincidencia.\n- **Acumulación de puntos negativos** (sistema de puntos 100→0): se suspende al llegar a 0 puntos. Se recupera parcialmente con cursos.\n- **Multas impagas:** se puede retener la licencia hasta pagar.\n- **Sentencia penal** (ej. manejo en estado de ebriedad con víctimas): el juez puede fijar el plazo.\n\n**Para recuperar la licencia:**\n1. Cumple el plazo de suspensión.\n2. Paga las multas pendientes.\n3. Realiza los trámites en el SEMTT (Servicio de Registro Civil o municipio según el caso) y rinde los exámenes que correspondan.\n\nLeyes relacionadas: Ley 18.290 artículos 196, 210`,
  },

  // ─── TRIBUTARIO ──────────────────────────────────────────────────────────────

  {
    id: "TR01",
    categoria: "tributario",
    keywords: ["boleta", "honorarios", "retención", "segunda", "categoría"],
    pregunta: "¿Cuánto me retienen de mis boletas de honorarios?",
    respuesta: `En 2025 la **retención del 13%** sobre el total de cada boleta de honorarios (tasa que se ajusta gradualmente). El que te paga retiene ese porcentaje y lo declara al SII mensualmente (Formulario 29).\n\n**Puedes pedir que NO te retengan** si declaras en el formulario que harás PPM (Pagos Provisionales Mensuales) por tu cuenta, pero en la práctica es más fácil que te retengan.\n\n**Al hacer la declaración anual de renta (abril):** si pagaste más de lo que debías (por la retención), el SII te devuelve la diferencia. Si pagaste menos, debes enterar el saldo.\n\n**Deducción de gastos:** puedes descontar gastos vinculados al trabajo independiente para calcular la renta neta.\n\nLeyes relacionadas: DL 824 (LIR) artículos 42, 74`,
  },
  {
    id: "TR02",
    categoria: "tributario",
    keywords: ["iva", "factura", "boleta", "cuándo", "emitir"],
    pregunta: "¿Cuándo debo emitir boleta o factura?",
    respuesta: `**Boleta:** para ventas o servicios a **consumidores finales** (personas naturales que no usarán el IVA como crédito fiscal). El IVA (19%) está incluido en el precio.\n\n**Factura:** para ventas o servicios a **empresas o personas con giro** que necesitan el crédito fiscal del IVA.\n\n**Cuándo emitir:**\n- En el momento de la venta o prestación del servicio.\n- Para servicios periódicos: al término de cada período de pago.\n\n**Boleta electrónica:** obligatoria desde 2020 para la mayoría de los emisores (via SII o software tributario).\n\n**Si no emites documentos tributarios:** el SII puede multarte con hasta 20 UTM y el 50% de los impuestos eludidos.\n\nLeyes relacionadas: DL 825 (Ley IVA) artículos 52, 53`,
  },
  {
    id: "TR03",
    categoria: "tributario",
    keywords: ["renta", "declarar", "operación", "renta", "cuándo"],
    pregunta: "¿Cuándo debo declarar renta?",
    respuesta: `La **Operación Renta** es en **abril de cada año** (declaras las rentas del año anterior).\n\n**Deben declarar:**\n- Trabajadores independientes con boletas de honorarios.\n- Empresarios y socios de empresas.\n- Quienes tienen rentas de capital (arriendos, intereses, dividendos).\n- Asalariados con más de un empleador simultáneo o con rentas adicionales.\n\n**No necesitan declarar** la mayoría de los asalariados con un solo empleador que hizo las retenciones correctas (el SII lo indica con la "Propuesta de Declaración").\n\n**Cómo:** en sii.cl con Clave Tributaria o ClaveÚnica. El SII prepropone los datos; solo debes revisar y confirmar (o corregir si tienes gastos deducibles).\n\nLeyes relacionadas: DL 824 artículos 65, 69`,
  },
  {
    id: "TR04",
    categoria: "tributario",
    keywords: ["inicio", "actividades", "sii", "empresa", "negocio"],
    pregunta: "¿Cómo inicio actividades en el SII para mi negocio?",
    respuesta: `**Inicio de Actividades** es el registro ante el SII que te permite emitir boletas y facturas. Es obligatorio antes de comenzar.\n\n**Pasos:**\n1. Ingresa a **sii.cl** con ClaveÚnica o Clave Tributaria.\n2. Ve a "Servicios Online → Inicio de Actividades".\n3. Elige si eres persona natural (emprendedor individual) o empresa.\n4. Declara el giro (tipo de negocio), la dirección y el capital inicial.\n5. Comienza a emitir boletas/facturas electrónicas desde el mismo SII o con un software.\n\n**Si eres empresa:** antes de iniciar actividades, la sociedad debe estar constituida ante notario e inscrita en el Conservador de Bienes Raíces (o en el Registro de Empresas y Sociedades online).\n\n**Costo:** gratuito.\n\nLeyes relacionadas: DL 825 artículo 68; DL 824 artículo 68`,
  },

  // ─── MIGRACIÓN ───────────────────────────────────────────────────────────────

  {
    id: "M01",
    categoria: "migracion",
    keywords: ["visa", "residencia", "migrante", "extranjero", "permanencia"],
    pregunta: "¿Cómo puedo regularizar mi situación migratoria en Chile?",
    respuesta: `Chile tiene varias categorías migratorias (Ley 21.325):\n\n**Visas de residencia temporal:**\n- **Visa de oportunidades:** para quienes vienen a buscar trabajo.\n- **Visa de trabajo:** con contrato de trabajo firmado.\n- **Visa de reunificación familiar:** para familiares directos de residentes.\n- **Visa de estudiante:** para cursar estudios en Chile.\n\n**Permanencia definitiva:** se puede pedir tras **2 años** de residencia temporal continua.\n\n**Cómo tramitar:**\n1. Ingresa a **extranjeria.gob.cl** o a la Oficina de Extranjería de tu región.\n2. Reúne los documentos (pasaporte vigente, contrato, certificados, etc.).\n3. Paga los aranceles correspondientes.\n\n**Mientras tramitas:** un permiso de trabajo transitorio puede autorizarse si tienes visa en trámite.\n\nLeyes relacionadas: Ley 21.325 artículos 22, 49, 63`,
  },
  {
    id: "M02",
    categoria: "migracion",
    keywords: ["expulsión", "deportación", "extranjero", "derechos", "recurso"],
    pregunta: "Me quieren expulsar del país, ¿qué puedo hacer?",
    respuesta: `La expulsión es una medida administrativa grave. Tienes derecho a:\n\n1. **Conocer los fundamentos** de la orden de expulsión.\n2. **Asesoría legal gratuita** a través de la Defensoría Penal Pública (si hay proceso penal) o la CAJ.\n3. **Impugnar la orden** ante el Tribunal de Justicia o la Corte de Apelaciones según el caso, mediante **recurso de amparo** si la medida viola tus garantías constitucionales.\n4. Un plazo para **salir voluntariamente** (en algunos casos).\n\n**No pueden expulsarte si tienes:**\n- Hijos chilenos o residentes permanentes a tu cargo.\n- Matrimonio o AUC vigente con chileno/a.\n- Protección internacional reconocida (refugiado).\n\nActúa rápido: los plazos para recurrir son breves.\n\nLeyes relacionadas: Ley 21.325 artículos 101, 102, 106`,
  },

  // ─── SALUD ───────────────────────────────────────────────────────────────────

  {
    id: "SA01",
    categoria: "salud",
    keywords: ["fonasa", "atención", "gratuita", "consulta", "salud"],
    pregunta: "¿Qué cubre FONASA y a quién?",
    respuesta: `**FONASA** es el seguro público de salud. Cubre a:\n- Trabajadores dependientes e independientes que cotizan en FONASA.\n- Pensionados del sistema estatal.\n- Personas sin recursos (grupo A: gratuidad total).\n- Mujeres embarazadas y recién nacidos durante el primer año.\n- Beneficiarios del seguro de cesantía (por un período).\n\n**Grupos de FONASA y copago:**\n- **Grupo A:** gratuidad total en establecimientos públicos.\n- **Grupo B:** gratuito en atención primaria; copago en hospitales.\n- **Grupos C y D:** copagos del 10% y 20% respectivamente.\n\n**Modalidades:**\n- **Institucional (MLE):** atención en hospitales y CESFAM públicos.\n- **Libre Elección (MLE):** atención con médicos privados convenidos, con reembolso parcial.\n\nLeyes relacionadas: DL 2.763; Ley 18.469`,
  },
  {
    id: "SA02",
    categoria: "salud",
    keywords: ["ges", "auge", "garantías", "salud", "cobertura"],
    pregunta: "¿Qué es el GES (AUGE) y cómo me beneficia?",
    respuesta: `El **GES (Garantías Explícitas en Salud)** cubre **87 enfermedades** (como diabetes, cáncer, VIH, hipertensión, cataratas, etc.) con garantías de:\n\n1. **Acceso:** derecho a atenderse aunque seas grupo A de FONASA.\n2. **Oportunidad:** plazos máximos de espera por ley para diagnóstico y tratamiento.\n3. **Protección financiera:** copago máximo del 20% del costo del tratamiento GES (grupos C y D); grupos A y B: gratuito.\n4. **Calidad:** protocolos de atención estandarizados.\n\n**Si tu ISAPRE o FONASA no cumple el plazo:** pueden derivarte al prestador alternativo a su costo.\n\n**Cómo activarlo:** tu médico tratante emite la "sospecha GES" o "confirmación GES" y activa el protocolo.\n\nLeyes relacionadas: DFL 1 de 2005; Decreto 4 GES`,
  },

  // ─── GENERAL / DERECHOS BÁSICOS ──────────────────────────────────────────────

  {
    id: "G01",
    categoria: "general",
    keywords: ["abogado", "gratis", "gratuito", "corporación", "asistencia"],
    pregunta: "¿Dónde puedo conseguir un abogado gratis?",
    respuesta: `Hay varias opciones de asesoría legal gratuita en Chile:\n\n1. **Corporación de Asistencia Judicial (CAJ):** oficinas en todo Chile, atienden civiles, familia, laboral, penal. Gratis para personas de bajos recursos. Busca tu sede en cajbiobio.cl o cajmetro.cl según tu región.\n2. **Defensoría Penal Pública:** si tienes un caso penal (imputado o formalizado). Automático y gratuito.\n3. **Clínicas Jurídicas de Universidades:** muchas universidades tienen clínicas gratuitas (U. de Chile, PUC, UDP, etc.).\n4. **Consultorios jurídicos municipales:** algunas municipalidades ofrecen orientación legal gratuita.\n5. **Mediación familiar del SENAME/MESERI:** para asuntos de familia (alimentos, tuición), es gratuita y previa al juicio.\n\nPara emergencias de VIF: 1455 (SernamEG).`,
  },
  {
    id: "G02",
    categoria: "general",
    keywords: ["poder", "notarial", "notario", "tramitar", "representar"],
    pregunta: "¿Cómo hago un poder notarial?",
    respuesta: `Un **poder notarial** te permite autorizar a otra persona (apoderado) a actuar en tu nombre para trámites legales.\n\n**Pasos:**\n1. Ve a cualquier **notaría** con tu cédula de identidad (y la del apoderado no es obligatoria, pero sí su nombre completo y RUT).\n2. Indica al notario qué actos específicos quieres autorizar (vender propiedades, firmar contratos, cobrar, etc.).\n3. Firma el poder ante el notario; él autentifica tu firma.\n\n**Tipos:**\n- **Poder general:** amplio, cubre múltiples actos.\n- **Poder especial:** para un acto específico (ej. vender un inmueble).\n\n**Costo:** varía por notaría, generalmente entre $5.000 y $30.000 según la complejidad.\n\n**Para trámites en el extranjero:** el poder puede requerir apostilla o legalización consular.\n\nLeyes relacionadas: Código Civil artículos 2116, 2129`,
  },
  {
    id: "G03",
    categoria: "general",
    keywords: ["recurso", "protección", "amparo", "derechos", "constitucional"],
    pregunta: "¿Qué es el recurso de protección y cuándo puedo usarlo?",
    respuesta: `El **recurso de protección** (art. 20 de la Constitución) es una acción constitucional para proteger tus derechos fundamentales cuando una persona o autoridad los vulnera o amenaza de forma **arbitraria o ilegal**.\n\n**Derechos que protege:** vida, libertad, propiedad, igualdad ante la ley, libertad de expresión, derecho a la salud (cuando está protegida por contrato ISAPRE o GES), entre otros.\n\n**Plazo:** **30 días corridos** desde que tomaste conocimiento del acto u omisión que vulnera el derecho.\n\n**Dónde:** Corte de Apelaciones de tu región. No necesitas abogado para presentarlo (aunque es recomendable).\n\n**Tramitación:** breve y preferente; la Corte puede dictar medidas de cautela de inmediato.\n\nLeyes relacionadas: Constitución Política artículo 20`,
  },
  {
    id: "G04",
    categoria: "general",
    keywords: ["datos", "personales", "empresa", "eliminar", "privacidad"],
    pregunta: "Una empresa tiene mis datos y quiero que los eliminen, ¿puedo exigirlo?",
    respuesta: `Sí. La **Ley 19.628 sobre protección de la vida privada** te da el derecho a:\n- **Acceder** a los datos que tienen sobre ti.\n- **Rectificar** datos incorrectos.\n- **Bloquear** el uso de datos en ciertos casos.\n- **Eliminar** datos cuando fueron obtenidos sin tu consentimiento o ya no son necesarios.\n\n**Cómo ejercerlo:**\n1. Solicita por escrito a la empresa o entidad que eliminen o corrijan tus datos.\n2. Si no responden en plazo razonable (10-30 días), puedes recurrir a los **tribunales** mediante el procedimiento de habeas data (art. 16 Ley 19.628).\n\n**Nueva Ley de Protección de Datos Personales (en proceso de entrada en vigencia)** ampliará estos derechos y creará una Agencia de Protección de Datos con competencia sancionatoria.\n\nLeyes relacionadas: Ley 19.628 artículos 12, 16`,
  },
  {
    id: "G05",
    categoria: "general",
    keywords: ["contrato", "incumplimiento", "demandar", "civil", "incumple"],
    pregunta: "Me incumplieron un contrato, ¿puedo demandar?",
    respuesta: `Sí. El incumplimiento de contrato da derecho a:\n1. **Exigir el cumplimiento forzado** (que hagan lo que prometieron).\n2. **Pedir la resolución del contrato** (que se deje sin efecto y te devuelvan lo pagado).\n3. **Indemnización de perjuicios** (daños y perjuicios causados por el incumplimiento).\n\n**Pasos:**\n1. Intenta resolver primero con la otra parte (carta escrita con fecha y firma).\n2. Si no hay acuerdo, demanda en el **Juzgado Civil** de tu ciudad (o Policía Local si el monto es bajo).\n3. Para contratos de consumo (empresa-consumidor): reclama en SERNAC primero.\n\n**Prescripción de la acción civil:** 5 años para contratos en general; 3 años para contratos comerciales.\n\nLeyes relacionadas: Código Civil artículos 1489, 1551, 2515`,
  },
  {
    id: "G06",
    categoria: "general",
    keywords: ["clave", "única", "tramitar", "gobierno", "en línea"],
    pregunta: "¿Cómo obtengo la ClaveÚnica para trámites del Estado?",
    respuesta: `La **ClaveÚnica** es la clave para trámites en línea del Estado chileno (SII, FONASA, Registro Civil, AFC, etc.).\n\n**Para obtenerla:**\n1. Ve al **Registro Civil** (registrocivil.cl) o en persona a una oficina.\n2. Actívala con tu cédula de identidad vigente.\n3. También puedes activarla en forma presencial en algunos municipios habilitados o en el correo (ChileAtiende).\n\n**Puedes cambiar la clave** en claveunica.gob.cl si la olvidaste (necesitas cédula vigente y datos registrales).\n\n**Es gratuita** y sirve para acceder a decenas de servicios públicos digitales.`,
  },

  // ─── MÁS LABORAL ────────────────────────────────────────────────────────────

  {
    id: "L21",
    categoria: "laboral",
    keywords: ["teletrabajo", "trabajo", "casa", "remoto", "herramientas"],
    pregunta: "Trabajo desde casa, ¿qué derechos tengo en teletrabajo?",
    respuesta: `La **Ley 21.220 de teletrabajo** establece:\n\n1. El contrato debe indicar que es teletrabajo y el lugar desde donde se trabajará.\n2. El empleador debe **proporcionar los equipos y herramientas** necesarios (o compensar el costo si usa los del trabajador).\n3. Debes tener **derecho a desconexión**: al menos 12 horas continuas sin obligación de responder fuera de tu jornada.\n4. El empleador no puede exigirte estar visible por cámara permanentemente sin justificación.\n5. Tienes el **mismo derecho a organización sindical** que los trabajadores presenciales.\n\n**Puedes volver a trabajo presencial** si lo acuerdan mutuamente; también puedes pedir el cambio si las circunstancias lo justifican.\n\nLeyes relacionadas: Código del Trabajo artículos 152 quáter G y siguientes`,
  },
  {
    id: "L22",
    categoria: "laboral",
    keywords: ["trabajo", "menores", "adolescente", "edad", "contratar"],
    pregunta: "¿Desde qué edad pueden trabajar los adolescentes en Chile?",
    respuesta: `- **14 y 15 años:** solo con autorización del padre/madre o tutor. Jornada máxima de 30 horas semanales; no pueden trabajar más de 8 horas diarias ni en horario nocturno ni en trabajos peligrosos.\n- **16 y 17 años:** pueden trabajar con contrato, pero tienen las mismas restricciones de horario y tipo de trabajo.\n- **18 años:** capacidad laboral plena.\n\n**Prohibiciones para menores de 18:** trabajo nocturno (entre las 22:00 y las 07:00), trabajo en cabaret, casinos o establecimientos que vendan alcohol, y trabajo en faenas peligrosas para su salud.\n\n**El empleador que contrata a un menor sin las autorizaciones** puede ser sancionado con multas.\n\nLeyes relacionadas: Código del Trabajo artículos 13, 14, 15, 16`,
  },
  {
    id: "L23",
    categoria: "laboral",
    keywords: ["negociación", "colectiva", "sindicato", "piso", "huelga"],
    pregunta: "¿Cómo funciona la negociación colectiva?",
    respuesta: `La **negociación colectiva** es el proceso en que el sindicato negocia con el empleador las condiciones de trabajo y remuneraciones.\n\n**Proceso básico:**\n1. El sindicato presenta el **proyecto de contrato colectivo** al empleador.\n2. El empleador tiene plazo para responder (última oferta).\n3. Si no hay acuerdo, los trabajadores pueden votar la **huelga**.\n4. En huelga, el empleador no puede contratar reemplazantes (desde la Ley 20.940).\n\n**Piso mínimo de negociación:** el empleador no puede ofrecer condiciones peores que las del contrato colectivo anterior (el "piso").\n\n**Acuerdo:** el contrato colectivo tiene vigencia mínima de 2 años y máxima de 4.\n\nLeyes relacionadas: Código del Trabajo artículos 327, 334, 379`,
  },

  // ─── MÁS FAMILIA ─────────────────────────────────────────────────────────────

  {
    id: "F10",
    categoria: "familia",
    keywords: ["nombre", "cambiar", "apellido", "registro", "civil"],
    pregunta: "¿Puedo cambiarme el nombre o el apellido?",
    respuesta: `Sí, pero en casos específicos (Ley 17.344):\n\n**Cambio de nombre permitido cuando:**\n- El nombre es ridículo, impropio de persona o equívoco respecto al sexo.\n- Has sido conocido por otro nombre durante más de 5 años.\n- El nombre es de difícil pronunciación o extranjero que se quiere castellanizar.\n\n**Cambio de apellido:** se puede cambiar si el padre o la madre no estuvo presente en la crianza (y se comprueba) o por otras causales justificadas.\n\n**Cambio de nombre por identidad de género:** la Ley 21.120 (Ley de Identidad de Género) permite cambiar nombre y sexo registral ante el Registro Civil. Mayores de 18 sin restricciones; 14-17 con autorización judicial.\n\n**Trámite:** ante el Registro Civil o judicialmente, según el caso.\n\nLeyes relacionadas: Ley 17.344; Ley 21.120`,
  },
  {
    id: "F11",
    categoria: "familia",
    keywords: ["testamento", "cómo", "hacer", "notario", "herencia"],
    pregunta: "¿Cómo hago un testamento en Chile?",
    respuesta: `**Tipos de testamento:**\n1. **Testamento abierto ante notario:** el más común y seguro. El testador declara su voluntad ante notario y dos testigos; queda en los archivos del notario y se registra en el SRCeI.\n2. **Testamento cerrado:** el testador escribe la voluntad en sobre sellado que entrega al notario.\n3. **Testamento ológrafo (hológrafo):** escrito, fechado y firmado de puño y letra del testador. Debe ser protocolizado ante notario tras el fallecimiento.\n\n**Limitaciones:** el testamento no puede eliminar las **asignaciones forzosas** (mitad legitimaria para hijos y cónyuge).\n\n**Costo ante notario:** varía, generalmente entre $30.000 y $100.000.\n\n**Recomendación:** consulta un abogado para asegurarte de que el testamento respeta las asignaciones forzosas y se redacta correctamente.\n\nLeyes relacionadas: Código Civil artículos 999, 1007, 1015`,
  },

  // ─── MÁS CONSUMIDOR ──────────────────────────────────────────────────────────

  {
    id: "C06",
    categoria: "consumidor",
    keywords: ["precio", "distinto", "cobrado", "vitrina", "caja"],
    pregunta: "Me cobraron más de lo que decía el precio en la vitrina, ¿qué hago?",
    respuesta: `El consumidor tiene derecho al **precio más bajo informado**. Si hay diferencia entre el precio exhibido y el cobrado, el vendedor debe respetar el precio exhibido (art. 13 Ley del Consumidor).\n\n**En el momento:**\n1. Muéstrale al cajero la etiqueta o foto del precio exhibido.\n2. Pide hablar con el supervisor o gerente.\n3. Si se niegan a respetar el precio: **anota el nombre de la tienda, fecha, hora y producto**.\n\n**Después:**\n- Reclama en **SERNAC** (sernac.cl): el proveedor puede ser multado.\n- Para casos de diferencias pequeñas, el Juzgado de Policía Local también es competente.\n\nLeyes relacionadas: Ley 19.496 artículos 1, 13`,
  },
  {
    id: "C07",
    categoria: "consumidor",
    keywords: ["servicio", "técnico", "reparación", "plazo", "demora"],
    pregunta: "El servicio técnico lleva meses con mi equipo y no lo entrega, ¿qué puedo exigir?",
    respuesta: `Si el servicio técnico demora más allá de lo razonable:\n\n1. **Reclama por escrito** al servicio técnico estableciendo un plazo final.\n2. **Si no cumplen:** tienes derecho a pedir la reparación en otro servicio técnico y que el primero **pague ese costo** (si el primer servicio fue autorizado por garantía).\n3. O puedes exigir el **cambio del producto** o la **devolución del dinero** si el problema persiste tras una o más reparaciones fallidas.\n\nPara reparaciones en garantía, el plazo de la garantía (3 meses) se **suspende** mientras el producto está en el servicio técnico.\n\n**Reclama en SERNAC** si no hay respuesta.\n\nLeyes relacionadas: Ley 19.496 artículos 20, 21`,
  },

  // ─── MÁS GENERAL ─────────────────────────────────────────────────────────────

  {
    id: "G07",
    categoria: "general",
    keywords: ["registro", "propiedad", "comprar", "casa", "escritura"],
    pregunta: "¿Cómo se transfiere una propiedad en Chile?",
    respuesta: `La compraventa de un inmueble requiere:\n\n1. **Escritura pública** ante notario que deje constancia del contrato.\n2. **Inscripción en el Conservador de Bienes Raíces (CBR)** de la comuna donde está el inmueble: la propiedad se transfiere legalmente solo con esta inscripción.\n3. **Estudio de títulos:** antes de comprar, un abogado revisa la historia de la propiedad (que no haya gravámenes, hipotecas, embargos, etc.).\n\n**Costos aproximados:** notaría (0,1-0,3% del valor), CBR (0,2-0,4%), impuesto de timbres y estampillas (0,8% si hay crédito hipotecario).\n\n**Consejo:** nunca compres una propiedad sin el estudio de títulos y sin verificar en el CBR que está libre de gravámenes.\n\nLeyes relacionadas: Código Civil artículos 686, 1801; DFL 2 de 1959`,
  },
  {
    id: "G08",
    categoria: "general",
    keywords: ["sociedad", "empresa", "crear", "constituir", "spa"],
    pregunta: "¿Cómo creo una empresa en Chile?",
    respuesta: `La forma más rápida es la **SpA (Sociedad por Acciones)**:\n\n**Opción 1 – En línea (gratuita y rápida):**\n1. Ingresa a **tuempresa.gob.cl** con ClaveÚnica.\n2. Completa el formulario (nombre, giro, capital, socios).\n3. La empresa queda constituida en minutos (el sistema inscribe automáticamente en el CBR y notifica al SII).\n\n**Opción 2 – Ante notario:**\n1. Redacta los estatutos de la sociedad con un abogado.\n2. Fírmalos ante notario.\n3. Inscríbelos en el CBR y publícalos en el Diario Oficial.\n\n**Después de constituir:**\n- Inicia actividades en el **SII** (sii.cl).\n- Abre cuenta bancaria a nombre de la empresa.\n\n**Tipos más comunes:** SpA (ideal para emprendedores), SRL (responsabilidad limitada), EIRL (individual).\n\nLeyes relacionadas: Ley 20.659; Ley 18.046`,
  },
  {
    id: "G09",
    categoria: "general",
    keywords: ["notario", "para", "qué", "sirve", "cuándo", "ir"],
    pregunta: "¿Para qué sirve el notario y cuándo tengo que ir?",
    respuesta: `El **notario** es un ministro de fe pública que da validez legal a documentos y actos jurídicos. Debes ir cuando:\n\n- **Firmar contratos importantes:** compraventa de inmuebles, hipotecas, poderes notariales, capitulaciones matrimoniales.\n- **Autenticar documentos:** protocolización de documentos privados para darles fecha cierta.\n- **Testamentos:** especialmente el testamento abierto.\n- **Finiquitos laborales:** el finiquito laboral debe firmarse ante notario, inspector del trabajo u otro ministro de fe.\n- **Escrituras públicas:** actos que la ley exige en escritura pública.\n\n**No necesitas notario para:** contratos privados simples (aunque siempre es recomendable dejar constancia escrita), denuncias policiales, o trámites en el SII.\n\n**Costo:** varía por notaría y tipo de documento.`,
  },

  // ─── PENSIONES Y JUBILACIÓN ──────────────────────────────────────────────────

  {
    id: "PR01",
    categoria: "general",
    keywords: ["pensión", "jubilación", "afp", "cuándo", "jubilar"],
    pregunta: "¿Cuándo puedo jubilarme en Chile?",
    respuesta: `**Edad legal de jubilación:**\n- **Hombres:** 65 años.\n- **Mujeres:** 60 años.\n\n**Pero puedes:**\n- **Jubilarte antes** (pensión anticipada) si tu ahorro alcanza para una pensión ≥ 80% de la pensión máxima con aporte solidario (PMAS) y ≥ 70% de tu remuneración promedio.\n- **Continuar trabajando** después de la edad legal y seguir cotizando (cotización de salud sigue, pensión es optativa).\n\n**Pensión Garantizada Universal (PGU):** desde 2022, las personas con 65+ años, que no estén en el 10% de mayores ingresos y hayan vivido 20 años en Chile (los últimos 4 continuos), reciben una PGU de hasta $214.000 mensuales (monto se actualiza).\n\n**Trámites en tu AFP** o en ChileAtiende.\n\nLeyes relacionadas: DL 3.500 artículos 3, 68; Ley 21.419 (PGU)`,
  },
  {
    id: "PR02",
    categoria: "general",
    keywords: ["afp", "retiro", "ahorros", "cambiar", "traspaso"],
    pregunta: "¿Puedo cambiarme de AFP y cómo lo hago?",
    respuesta: `Sí, puedes traspasar tu cuenta de pensiones a otra AFP en cualquier momento, **sin costo**.\n\n**Cómo cambiarse:**\n1. Elige la AFP de destino comparando comisiones y rentabilidad en **superintendenciadepensiones.cl**.\n2. Inicia el traspaso directamente con la AFP de destino (ellos hacen el trámite, tú solo firmas).\n3. El proceso demora entre **3 y 7 días hábiles**.\n\n**Tips:**\n- Compara la **comisión** (se cobra sobre el sueldo imponible) y la **rentabilidad histórica** de los fondos.\n- Puedes también cambiar de **tipo de fondo** (A al E) dentro de tu AFP según tu perfil de riesgo y edad.\n\nLeyes relacionadas: DL 3.500 artículos 12, 159`,
  },

  // ─── MÁS PENAL ───────────────────────────────────────────────────────────────

  {
    id: "P05",
    categoria: "penal",
    keywords: ["estafa", "fraude", "timador", "engaño", "denuncia"],
    pregunta: "Me estafaron, ¿qué hago?",
    respuesta: `La estafa es el delito de engañar a alguien para obtener un beneficio económico (art. 468 Código Penal). Penas de 541 días a 5 años según el monto.\n\n**Pasos:**\n1. **Guarda toda la evidencia:** transferencias, correos, mensajes, contratos, recibos.\n2. **Denuncia en la PDI** (Sección de Delitos Económicos) o en Carabineros, y también en la **Fiscalía** (fiscaliadechile.cl).\n3. Si fue fraude en comercio electrónico o redes sociales: también en la **Brigada del Cibercrimen de la PDI**.\n4. Si te dieron un cheque sin fondos: denuncia en el banco y en la Fiscalía (el giro de cheque sin fondos es delito).\n5. **Paralelamente:** puedes demandar civilmente para recuperar el dinero (acción civil dentro del proceso penal o aparte).\n\nLeyes relacionadas: Código Penal artículos 467, 468, 470`,
  },
  {
    id: "P06",
    categoria: "penal",
    keywords: ["droga", "consumo", "personal", "detenido", "porte"],
    pregunta: "Me detuvieron con droga para consumo personal, ¿qué pasa?",
    respuesta: `La **Ley 20.000** distingue:\n\n- **Tráfico de drogas:** delito grave con penas de presidio mayor.\n- **Microtráfico:** penas de presidio menor.\n- **Consumo personal en lugar privado:** no es delito. Si es en lugar público o si la cantidad es pequeña y las circunstancias indican consumo personal, el juez puede aplicar medidas alternativas (tratamiento de rehabilitación, multa) en lugar de proceso penal.\n\n**Si te detienen:**\n- Tienes derecho a guardar silencio.\n- La Defensoría Penal Pública te asigna abogado gratis.\n- El fiscal debe probar que era para tráfico; la defensa puede argumentar consumo personal.\n\n**La cantidad:** la ley no fija un límite exacto de gramos para "consumo personal"; el juez valora las circunstancias.\n\nLeyes relacionadas: Ley 20.000 artículos 1, 4, 50`,
  },

  // ─── MÁS TRIBUTARIO ──────────────────────────────────────────────────────────

  {
    id: "TR05",
    categoria: "tributario",
    keywords: ["contribuciones", "propiedad", "pagar", "exención", "casa"],
    pregunta: "¿Cuándo estoy exento de pagar contribuciones de mi casa?",
    respuesta: `Las contribuciones (impuesto territorial) tienen **exención** si:\n\n- El **avalúo fiscal** de la propiedad es inferior al **mínimo no afecto** fijado por el SII (en 2025 aproximadamente $47 millones para propiedades habitacionales, revisado cada 4 años con el reavalúo).\n- Son **propiedades acogidas al DFL 2** (viviendas sociales de hasta 140 m²).\n- El propietario tiene **discapacidad severa** (exención parcial o total según certificado COMPIN).\n- **Adultos mayores** de bajos ingresos: pueden solicitar rebaja hasta el 50% en el SII.\n\n**Cómo verificar:** en sii.cl → Servicios Online → Bienes Raíces → Consulta de contribuciones.\n\nLeyes relacionadas: DL 3.063; Ley 17.235`,
  },
  {
    id: "TR06",
    categoria: "tributario",
    keywords: ["sii", "fiscalización", "notificación", "auditoría", "citación"],
    pregunta: "El SII me citó o fiscalizó, ¿qué hago?",
    respuesta: `Si el SII te notifica o cita:\n\n1. **No ignores la citación:** tienes plazo para responder (generalmente 30 días desde la notificación).\n2. **Reúne los documentos** que respalden tus declaraciones: facturas, boletas, contratos, estados de cuenta.\n3. Puedes concurrir **con o sin abogado/contador**; para montos grandes es muy recomendable ir asesorado.\n4. Si el SII determina diferencias, puede emitir una **liquidación** (cobro extra). Tienes derecho a reclamar ante el **Tribunal Tributario y Aduanero (TTA)** en 90 días.\n\n**Recursos disponibles:**\n- Reclamación ante el TTA (90 días desde la liquidación).\n- Apelación ante la Corte de Apelaciones.\n\nLeyes relacionadas: Código Tributario artículos 63, 123, 124`,
  },
];

// Busca la mejor coincidencia de QA para un mensaje. Retorna la QA si hay
// suficiente match (≥ 2 keywords encontradas), o null si no hay match claro.
export function buscarQA(mensaje: string): QA | null {
  const msg = mensaje.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  let mejorScore = 0;
  let mejor: QA | null = null;

  for (const qa of QAS) {
    const keywords = qa.keywords.map((k) =>
      k.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    );
    const hits = keywords.filter((k) => msg.includes(k)).length;
    // Requiere al menos 2 keywords para activar
    if (hits >= 2 && hits > mejorScore) {
      mejorScore = hits;
      mejor = qa;
    }
  }
  return mejor;
}
