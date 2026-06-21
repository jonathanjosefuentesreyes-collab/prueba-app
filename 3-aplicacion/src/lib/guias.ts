export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export interface Herramienta {
  titulo: string;
  descripcion: string;
  href: string;
  boton: string;
}

export type CategoriaGuia = "laboral" | "familia" | "vivienda" | "consumidor" | "deudas";

export interface Guia {
  slug: string;
  /** H1 visible = la pregunta tal como la busca la gente. */
  titulo: string;
  /** Meta description ≤155. */
  descripcion: string;
  /** Macro-grupo al que pertenece (define la pestaña). */
  categoria: CategoriaGuia;
  /** Si va en el carrusel de destacadas del índice. */
  destacada?: boolean;
  /** <title> ≤60, keyword al inicio + marca. Si falta, se deriva del título. */
  metaTitle?: string;
  /** Respuesta corta (2-4 frases) para el featured snippet. Markdown inline. */
  respuestaCorta?: string;
  contenido: string;
  /** Caja destacada hacia una herramienta del sitio (calculadora, etc.). */
  herramienta?: Herramienta;
  /** Preguntas frecuentes → bloque visible + schema FAQPage. */
  faq?: FaqItem[];
  fecha: string;
}

/** Etiqueta y emoji de cada macro-grupo de guías. Solo se muestran como pestaña
 *  los grupos que ya tienen al menos una guía publicada. */
export const CATEGORIAS: Record<CategoriaGuia, { etiqueta: string; emoji: string }> = {
  laboral: { etiqueta: "Laboral", emoji: "💼" },
  vivienda: { etiqueta: "Arriendo y vivienda", emoji: "🏠" },
  familia: { etiqueta: "Familia", emoji: "👨‍👩‍👧" },
  consumidor: { etiqueta: "Consumidor", emoji: "🛒" },
  // Categoría DORADA (destacada Premium en el explorador): temas de deudas, los de mayor
  // volumen de búsqueda y mejor monetización. Las guías siguen siendo públicas (SEO + ads).
  deudas: { etiqueta: "Deudas", emoji: "💰" },
};

export const guias: Guia[] = [
  {
    slug: "me-pueden-despedir-embarazada",
    titulo: "¿Me pueden despedir si estoy embarazada en Chile?",
    categoria: "laboral",
    destacada: true,
    metaTitle: "Despido en el embarazo: el fuero maternal | Ley Chilena",
    descripcion:
      "¿Pueden despedirte estando embarazada? El fuero maternal te protege desde el embarazo hasta un año después del postnatal. Conoce tus derechos y qué hacer.",
    fecha: "2026-06-16",
    respuestaCorta:
      "**No, salvo excepciones.** Desde que quedas embarazada y hasta **un año después** de terminado tu postnatal, tienes **fuero maternal**: el empleador **no puede despedirte** sin pedir antes autorización a un juez (desafuero). Si te despiden igual, el despido **no vale** y puedes exigir que te reincorporen y te paguen los sueldos del tiempo que estuviste fuera. El fuero te protege **incluso si el empleador no sabía** de tu embarazo.",
    contenido: `
## ¿Me pueden despedir estando embarazada?
No de forma libre. La ley te da **fuero maternal**, una protección especial que impide que tu empleador te despida por su sola voluntad ([artículo 201 del Código del Trabajo](/leyes/207436?art=3373)). Para terminar tu contrato necesita **autorización previa de un juez**; sin esa autorización, el despido **no produce efecto** ([artículo 174](/leyes/207436?art=3310)).

## ¿Desde cuándo y hasta cuándo me protege el fuero?
El fuero corre **desde el inicio del embarazo** y dura hasta **un año después** de terminado el descanso de maternidad (el postnatal), sin contar el permiso postnatal parental ([artículo 201](/leyes/207436?art=3373)). En total suele superar los dos años de protección.

Importante: te protege **aunque todavía no hayas avisado** que estás embarazada. El fuero opera por el hecho del embarazo, no por el aviso.

## ¿Qué pasa si me despiden igual?
Si te despiden sin la autorización del juez, el despido es **nulo**: puedes pedir que te **reincorporen** y que te **paguen las remuneraciones** de todo el tiempo que estuviste indebidamente fuera.

¿Y si te despidieron sin que el empleador supiera de tu embarazo? También quedas protegida: basta con presentar el **certificado médico** y solicitar tu reincorporación ([artículo 201](/leyes/207436?art=3373)).

## ¿Entonces nunca pueden despedirme?
Sí pueden, pero solo con **autorización judicial previa** (un trámite llamado *desafuero*) y por causas justificadas, como el **vencimiento del plazo** del contrato, la **conclusión de la obra** o una **causal grave** del artículo 160 ([artículo 174](/leyes/207436?art=3310)). El juez revisa si la causal es real antes de permitir el despido.

## ¿Qué descansos me corresponden?
- **Descanso de maternidad**: 6 semanas antes del parto y 12 semanas después ([artículo 195](/leyes/207436?art=3365)).
- **Permiso postnatal parental**: 12 semanas adicionales después del postnatal ([artículo 197 bis](/leyes/207436?art=3368)).

Durante esos períodos recibes un subsidio que reemplaza tu remuneración.

## ¿Pueden cambiarme de funciones por el embarazo?
Si tu trabajo es perjudicial para tu salud o la del embarazo (por ejemplo, esfuerzo físico o turnos de noche), tienen que **trasladarte a otras funciones sin rebajarte el sueldo** ([artículo 202](/leyes/207436?art=3374)).

## ¿Qué hacer ahora?
1. **Avisa con un certificado médico** apenas confirmes el embarazo (aunque el fuero te protege aun sin avisar, deja todo por escrito).
2. Si **te despidieron**, presenta el certificado y **pide por escrito tu reincorporación** lo antes posible.
3. Recuerda: sin **autorización del juez**, tu despido **no vale**.
4. Reclama gratis en la **Dirección del Trabajo** o pide orientación en la **Corporación de Asistencia Judicial**; si debes demandar, hazlo pronto.
5. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te explica qué dice la ley para tu situación.
`,
    faq: [
      {
        pregunta: "¿El fuero maternal aplica si mi contrato es a plazo fijo o por obra?",
        respuesta:
          "Sí. Aunque tu contrato sea a plazo fijo o por obra, el empleador necesita autorización judicial previa para terminarlo durante el fuero (artículos 174 y 201 del Código del Trabajo). No basta con que 'se cumpla el plazo'.",
      },
      {
        pregunta: "¿Me protege el fuero si el empleador no sabía que estaba embarazada?",
        respuesta:
          "Sí. El fuero opera por el hecho del embarazo, no por el aviso. Si te despidieron sin saberlo, presenta el certificado médico y debes ser reincorporada (artículo 201).",
      },
      {
        pregunta: "¿Cuánto dura el fuero maternal?",
        respuesta:
          "Desde el inicio del embarazo hasta un año después de terminado el descanso de maternidad (postnatal), sin contar el permiso postnatal parental (artículo 201).",
      },
      {
        pregunta: "¿Qué es el desafuero?",
        respuesta:
          "Es el juicio en que el empleador pide a un juez autorización para despedir a una trabajadora con fuero. Sin esa autorización previa, el despido es nulo (artículo 174).",
      },
      {
        pregunta: "¿El padre también tiene protección?",
        respuesta:
          "El padre tiene derecho a un permiso pagado de 5 días por el nacimiento y, si la madre le traspasa parte del postnatal parental, queda con fuero por ese período (artículos 195 y 197 bis).",
      },
    ],
  },
  {
    slug: "acoso-laboral-ley-karin",
    titulo: "Sufro acoso laboral: ¿qué puedo hacer? (Ley Karin)",
    categoria: "laboral",
    metaTitle: "Acoso laboral en Chile: la Ley Karin | Ley Chilena",
    descripcion:
      "Qué es el acoso laboral y sexual, cómo denunciarlo y qué te protege con la Ley Karin y el Código del Trabajo. Pasos, plazos y a quién acudir.",
    fecha: "2026-06-16",
    respuestaCorta:
      "El **acoso laboral** es toda agresión u hostigamiento que afecta tu dignidad o tu ambiente de trabajo. Con la **Ley Karin**, tu empleador está obligado a **prevenirlo** y a **investigar** toda denuncia. Puedes denunciar **por escrito o verbalmente** en tu empresa o directamente en la **Inspección del Trabajo**, que debe tomar medidas de resguardo y resolver. No tienes que aguantarlo: la ley te protege.",
    contenido: `
## ¿Qué se considera acoso laboral o sexual?
El Código del Trabajo exige un trato **libre de violencia y compatible con tu dignidad**, con perspectiva de género ([artículo 2 del Código del Trabajo](/leyes/207436?art=3012)). Son conductas contrarias a eso:

- **Acoso sexual**: requerimientos de carácter sexual no consentidos que amenazan o perjudican tu situación o tus oportunidades en el trabajo.
- **Acoso laboral**: toda agresión u hostigamiento (de una o varias personas) que te humilla, menoscaba o maltrata, afectando tu dignidad o tu ambiente laboral.
- **Violencia en el trabajo**: ejercida por terceros ajenos a la empresa (clientes, usuarios) contra el trabajador.

La **Ley Karin** (vigente desde agosto de 2024) actualizó estas reglas: ahora basta **un solo hecho** de hostigamiento para que sea acoso laboral —antes se exigía que fuera reiterado—.

## ¿Qué obligaciones tiene mi empleador?
Tu empleador debe **proteger tu vida y salud** en el trabajo ([artículo 184](/leyes/207436?art=3353)) y, con la Ley Karin, **prevenir** el acoso: tener un **protocolo de prevención**, informar los canales de denuncia y capacitar al personal ([artículo 211-A](/leyes/207436?art=3387)). No es opcional.

## ¿Cómo denuncio?
Puedes hacer la denuncia **por escrito o de manera verbal**, y presentarla en **tu empresa** o directamente en la **Inspección del Trabajo** ([artículo 211-B bis](/leyes/207436?art=3389)). Si la haces verbal, deben levantar un acta. Guarda copia de todo (correos, mensajes, testigos).

## ¿Qué pasa después de denunciar?
La empresa debe **adoptar medidas de resguardo inmediatas** (por ejemplo, separar a las personas involucradas) y luego **investigar**: puede hacer una investigación interna o, en un plazo de **3 días**, remitir los antecedentes a la **Inspección del Trabajo** ([artículo 211-C](/leyes/207436?art=3390)). La investigación es reservada y debe respetar tu derecho a no ser víctima de represalias.

## ¿Qué medidas o sanciones pueden aplicarse?
Según el resultado del informe, el empleador debe aplicar las **medidas y sanciones que correspondan** dentro de los plazos legales —desde amonestaciones hasta el **despido del acosador** por la causal del artículo 160— y medidas de resguardo para la persona afectada ([artículo 211-E](/leyes/207436?art=3392)).

## ¿Qué hacer ahora?
1. **Reúne pruebas**: correos, mensajes, fechas, nombres de testigos.
2. **Denuncia** por escrito o verbalmente en tu empresa o en la **Inspección del Trabajo** (no necesitas abogado para denunciar).
3. Pide que apliquen **medidas de resguardo** mientras se investiga.
4. Si hay riesgo para tu salud, acude a tu **mutualidad** (la Ley Karin reconoce el daño psicológico como riesgo laboral).
5. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te explica qué dice la ley para tu situación.
`,
    faq: [
      {
        pregunta: "¿El acoso laboral tiene que ser reiterado?",
        respuesta:
          "No. Desde la Ley Karin (2024), basta un solo hecho de hostigamiento o agresión que afecte tu dignidad o ambiente laboral para que sea acoso laboral (artículo 2 del Código del Trabajo).",
      },
      {
        pregunta: "¿Puedo denunciar directamente en la Inspección del Trabajo?",
        respuesta:
          "Sí. Puedes denunciar en tu empresa o directamente en la Inspección del Trabajo, por escrito o de manera verbal (artículo 211-B bis).",
      },
      {
        pregunta: "¿Me pueden despedir por denunciar acoso?",
        respuesta:
          "No. Las represalias por denunciar están prohibidas. El empleador debe adoptar medidas de resguardo para la persona afectada durante y después de la investigación (artículos 211-C y 211-E).",
      },
      {
        pregunta: "¿En cuánto tiempo deben investigar?",
        respuesta:
          "La empresa investiga internamente o, en un plazo de 3 días, remite los antecedentes a la Inspección del Trabajo (artículo 211-C). La investigación es acotada y reservada.",
      },
    ],
  },
  {
    slug: "cuantas-horas-se-trabaja-a-la-semana",
    titulo: "¿Cuántas horas se trabaja a la semana en Chile? (Ley de 40 horas)",
    categoria: "laboral",
    metaTitle: "¿Cuántas horas se trabaja a la semana? 40 horas | Ley Chilena",
    descripcion:
      "La jornada laboral en Chile se está reduciendo a 40 horas de forma gradual. Cuántas horas corresponden hoy, cómo se distribuyen y qué dice el Código del Trabajo.",
    fecha: "2026-06-16",
    respuestaCorta:
      "La jornada ordinaria máxima en Chile se está reduciendo de **45 a 40 horas semanales** de forma **gradual**: bajó a **44 horas** en abril de 2024, a **42 horas** en abril de 2026, y llegará a **40 horas** en abril de 2028. Esa jornada se distribuye en **5 o 6 días** a la semana, y lo que trabajes por sobre ella son **horas extraordinarias** con recargo.",
    contenido: `
## ¿Cuántas horas son la jornada normal hoy?
La ley fijó la jornada ordinaria máxima en **40 horas semanales**, pero la rebaja es **gradual** ([artículo 22 del Código del Trabajo](/leyes/207436?art=3039)):

- **44 horas** desde abril de 2024
- **42 horas** desde abril de 2026
- **40 horas** desde abril de 2028

Es decir, en 2026 el máximo legal es de **42 horas** semanales, en camino a las 40. Tu contrato puede pactar **menos** horas, pero nunca más que el máximo legal.

## ¿En cuántos días se reparte?
La jornada semanal no puede distribuirse en **más de 6 ni en menos de 5 días** ([artículo 28](/leyes/207436?art=3050)). Tampoco puede haber jornadas ordinarias de más de **10 horas** diarias.

## ¿Puedo trabajar 4 días y descansar 3?
La ley de 40 horas permite **pactar promedios**: distribuir la jornada en ciclos de hasta 4 semanas, lo que abre la puerta a semanas de 4 días por acuerdo con el empleador ([artículo 22](/leyes/207436?art=3039)). Debe quedar por escrito y respetar los límites diarios.

## ¿Y si trabajo más de mi jornada?
Todo lo que trabajes por sobre tu jornada pactada son **horas extraordinarias**, y se pagan con un **recargo mínimo del 50%**. Revisa nuestra guía de horas extras para calcularlas.

## ¿Hay quienes quedan fuera del límite?
Sí. Algunos cargos de **exclusiva confianza** o sin fiscalización superior inmediata (gerentes, trabajadores que prestan servicios fuera de la empresa) pueden quedar excluidos del límite de jornada, según su situación ([artículo 22](/leyes/207436?art=3039)).

## ¿Qué hacer ahora?
1. Revisa tu **contrato**: la jornada pactada no puede superar el máximo legal vigente.
2. Cuenta tus horas: si trabajas más, son **horas extra** con recargo.
3. Si te exigen más horas sin pago de recargo, puedes reclamar en la **Dirección del Trabajo**.
`,
    faq: [
      {
        pregunta: "¿Cuántas horas semanales son legales en 2026?",
        respuesta:
          "En 2026 el máximo legal es de 42 horas semanales. La jornada baja de forma gradual: 44 horas (2024), 42 horas (2026) y 40 horas (2028), según el artículo 22 del Código del Trabajo.",
      },
      {
        pregunta: "¿La ley de 40 horas permite la semana de 4 días?",
        respuesta:
          "Lo habilita: permite distribuir la jornada en promedios de hasta 4 semanas, lo que hace posible la semana de 4 días por acuerdo escrito con el empleador, respetando los límites diarios (artículo 22).",
      },
      {
        pregunta: "¿Cuántos días a la semana puedo trabajar como máximo?",
        respuesta:
          "La jornada ordinaria semanal se distribuye en no más de 6 ni menos de 5 días, y no puede superar las 10 horas diarias (artículo 28).",
      },
    ],
  },
  {
    slug: "honorarios-pero-trabajo-como-dependiente",
    titulo: "Me tienen a honorarios pero trabajo como dependiente: ¿qué hago?",
    categoria: "laboral",
    metaTitle: "Honorarios o contrato de trabajo en Chile | Ley Chilena",
    descripcion:
      "Si trabajas a honorarios pero con horario, jefatura y obligación de asistir, la ley puede reconocer un contrato de trabajo. Conoce la primacía de la realidad.",
    fecha: "2026-06-16",
    respuestaCorta:
      "Si te pagan **a honorarios** pero en la práctica trabajas con **horario, supervisión y obligación de asistir**, la ley puede reconocer que en realidad existe un **contrato de trabajo**. Es el principio de **primacía de la realidad**: importa cómo trabajas, no la etiqueta del papel. Si se declara, tienes derecho a todo lo de un trabajador dependiente: vacaciones, finiquito y cotizaciones de AFP y salud.",
    contenido: `
## ¿Qué diferencia hay entre honorarios y contrato de trabajo?
A **honorarios** prestas un servicio de forma **independiente**: organizas tú tu trabajo, sin horario impuesto ni jefatura, y emites boleta de honorarios. Hay **contrato de trabajo**, en cambio, cuando trabajas bajo **subordinación y dependencia**: cumples un horario, recibes órdenes, debes asistir y estás integrado a la empresa ([artículo 7 del Código del Trabajo](/leyes/207436?art=3017)).

## ¿Qué es la "primacía de la realidad"?
La ley mira **cómo trabajas de verdad**, no el nombre del contrato. Si prestas servicios con las características de un trabajador dependiente, **se presume que existe un contrato de trabajo**, aunque te paguen a honorarios ([artículo 8](/leyes/207436?art=3018)). A esto se le llama *primacía de la realidad*.

## ¿Cómo sé si en realidad soy dependiente?
Son señales de subordinación y dependencia:

- Cumples un **horario** fijado por la empresa.
- Recibes **instrucciones y supervisión** de una jefatura.
- Tienes **obligación de asistir** y de justificar inasistencias.
- Trabajas con las **herramientas y en el lugar** que te da la empresa.
- Lo haces de forma **continua** para esa empresa.

Mientras más de estas señales se cumplan, más fuerte es que exista una relación laboral encubierta.

## ¿Qué gano si se reconoce como contrato de trabajo?
Si la Inspección o un tribunal declaran que la relación era laboral, tienes derecho —incluso de forma retroactiva— a lo que corresponde a un trabajador dependiente: **vacaciones, gratificación, indemnizaciones** al término, y que se paguen tus **cotizaciones** de AFP, salud y seguro de cesantía.

## ¿Y si firmé un contrato a honorarios?
Da lo mismo lo que diga el papel: el contrato de trabajo es **consensual** y existe por los hechos, aunque no esté escrito o esté rotulado como "honorarios" ([artículo 9](/leyes/207436?art=3019)). La etiqueta no borra tus derechos.

## ¿Qué hacer ahora?
1. **Reúne pruebas** de cómo trabajas: horarios, correos con instrucciones, registros de asistencia, mensajes de tu jefatura.
2. Acude a la **Dirección del Trabajo** y pide una fiscalización para que revisen si hay una relación laboral encubierta.
3. Si corresponde, puedes **demandar el reconocimiento** de la relación laboral y el pago de lo adeudado (hay plazos: actúa pronto).
4. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Si estoy a honorarios tengo derecho a vacaciones y finiquito?",
        respuesta:
          "Solo si se reconoce que en realidad había una relación laboral (subordinación y dependencia). En ese caso te corresponden vacaciones, finiquito y cotizaciones. Un honorario verdaderamente independiente no genera esos derechos.",
      },
      {
        pregunta: "¿Pueden tenerme años a honorarios haciendo pega de empleado?",
        respuesta:
          "No debería. Si hay subordinación y dependencia, la ley presume un contrato de trabajo (artículo 8). Puedes pedir el reconocimiento de la relación laboral y el pago retroactivo de lo adeudado.",
      },
      {
        pregunta: "¿Quién decide si soy dependiente o independiente?",
        respuesta:
          "La Dirección del Trabajo mediante una fiscalización, o los tribunales laborales si demandas. Ambos miran la realidad de los hechos, no el rótulo del contrato.",
      },
      {
        pregunta: "¿En el sector público también aplica?",
        respuesta:
          "El honorario en el Estado tiene reglas propias y es más complejo, pero la jurisprudencia ha reconocido relación laboral cuando hay subordinación continua en el tiempo. Conviene asesorarte para tu caso específico.",
      },
    ],
  },
  {
    slug: "finiquito-cuanto-me-corresponde",
    titulo: "¿Cuánto me corresponde de finiquito si me despiden en Chile?",
    categoria: "laboral",
    destacada: true,
    metaTitle: "Finiquito en Chile: cuánto te corresponde | Ley Chilena",
    descripcion:
      "Calcula cuánto te corresponde de finiquito según el Código del Trabajo: indemnización por años, mes de aviso y feriado. Explicado simple y gratis.",
    fecha: "2026-06-15",
    respuestaCorta:
      "El finiquito reúne todo lo que tu empleador te debe al terminar el contrato. **Siempre** incluye tus días trabajados que aún no te pagan y las vacaciones que no alcanzaste a tomar (feriado). Además, si te despiden por **necesidades de la empresa**, te corresponde la **indemnización por años de servicio** (un sueldo por cada año trabajado) y, si no te avisaron con 30 días, el **mes de aviso previo**. Cuánto recibes depende de la causal del despido y de tu última remuneración.",
    herramienta: {
      titulo: "Calcula tu finiquito gratis",
      descripcion:
        "Ingresa tu sueldo, fechas y causal, y obtén el desglose con las fórmulas y los artículos exactos del Código del Trabajo.",
      href: "/calculadora",
      boton: "Ir a la calculadora",
    },
    contenido: `
## ¿Qué incluye un finiquito en Chile?
El finiquito es el documento que cierra tu relación laboral y deja por escrito lo que te pagan al salir. Según tu situación, puede incluir:

- **Remuneraciones pendientes**: los días que trabajaste el último mes y todavía no te pagan.
- **Feriado (vacaciones)**: los días de vacaciones acumulados o proporcionales que no alcanzaste a tomar.
- **Indemnización por años de servicio**: un sueldo por cada año trabajado, solo en ciertos despidos.
- **Indemnización sustitutiva del aviso previo**: un sueldo extra si te despidieron sin avisarte con 30 días.
- **Otros haberes pactados**: horas extra impagas, bonos o gratificaciones que te debían.

No todos los finiquitos incluyen todo: las indemnizaciones dependen de **por qué** terminó tu contrato.

## ¿Cuándo me pagan indemnización por años de servicio?
La indemnización por años de servicio se paga cuando te despiden por **necesidades de la empresa** ([artículo 161 del Código del Trabajo](/leyes/207436?art=3295)) y llevabas **al menos un año** trabajando.

La regla es **un mes de remuneración por cada año trabajado** y por la fracción superior a seis meses ([artículo 163](/leyes/207436?art=3298)). Por ejemplo, 3 años y 8 meses se pagan como 4 años.

Esta indemnización tiene un **tope de 11 años (330 días)** para los contratos firmados después del 14 de agosto de 1981.

## ¿Qué es la indemnización sustitutiva del aviso previo?
Si te despiden por necesidades de la empresa, tu empleador debe avisarte con **30 días de anticipación**. Si no lo hace, debe pagarte un **mes de remuneración** adicional como compensación ([artículo 162](/leyes/207436?art=3297)). Es lo que se conoce como "el mes de aviso".

## ¿Me pagan las vacaciones que no tomé?
Sí. El **feriado** se paga **siempre**, sin importar la causal del despido —incluso si renunciaste o te despidieron por una falta grave ([artículos 67](/leyes/207436?art=3108) y [73](/leyes/207436?art=3114)).

Te corresponden **15 días hábiles por año** trabajado. Si no completaste el año, se paga la parte proporcional: **1,25 días hábiles por cada mes** trabajado desde tu último aniversario. Para el cálculo, el sábado siempre se cuenta como inhábil ([artículo 69](/leyes/207436?art=3110)).

## ¿Y si renuncié o me despidieron por falta grave?
Si **renunciaste** o terminaron tu contrato de común acuerdo ([artículo 159](/leyes/207436?art=3293)), o te despidieron por una **causal imputable** como faltas graves ([artículo 160](/leyes/207436?art=3294)), **no** te corresponde indemnización por años de servicio ni mes de aviso.

Pero ojo: el **feriado** y las **remuneraciones pendientes** se pagan igual. Y si crees que la causal del despido es injusta, puedes reclamar (ver más abajo).

## ¿Con qué sueldo se calcula?
La base de cálculo es tu **última remuneración mensual**, pero con reglas precisas ([artículo 172](/leyes/207436?art=3308)):

- Incluye sueldo y regalías permanentes; **no** incluye horas extra, asignación familiar ni bonos esporádicos.
- Si tu sueldo es variable (comisiones), se usa el **promedio de los últimos 3 meses**.
- Tiene un **tope de 90 UF**: si ganas más, las indemnizaciones se calculan sobre 90 UF.

## ¿Qué hacer ahora?
1. **Revisa tu carta de despido**: debe indicar la causal exacta y la fecha. De ahí depende qué te corresponde.
2. **No firmes el finiquito si no estás de acuerdo** con los montos. Puedes firmar dejando **"reserva de derechos"** para reclamar después.
3. **Calcula lo que te corresponde** antes de firmar, con la calculadora gratuita de Ley Chilena.
4. Si el despido te parece injustificado, tienes **60 días hábiles** desde la separación para demandar ([artículo 168](/leyes/207436?art=3304)); si ganas, la indemnización sube entre un 30% y un 100%.
5. Recuerda que el finiquito debe firmarse ante un **ministro de fe** (notario, Inspección del Trabajo o finiquito electrónico de la Dirección del Trabajo).
    `,
    faq: [
      {
        pregunta: "¿El feriado se paga aunque haya renunciado?",
        respuesta:
          "Sí. Las vacaciones no tomadas (feriado proporcional y acumulado) se pagan siempre, cualquiera sea la causal de término, incluida la renuncia (artículos 67 y 73 del Código del Trabajo).",
      },
      {
        pregunta: "¿Cuál es el máximo de años que me pueden indemnizar?",
        respuesta:
          "El tope es de 11 años (330 días de remuneración) para los contratos posteriores al 14 de agosto de 1981 (artículo 163 del Código del Trabajo).",
      },
      {
        pregunta: "¿Qué pasa si tengo cotizaciones previsionales impagas?",
        respuesta:
          "Si el empleador no pagó tus cotizaciones, el despido no produce efecto (Ley Bustos, artículo 162 del Código del Trabajo) y debe seguir pagándote la remuneración hasta regularizarlas.",
      },
      {
        pregunta: "¿Puedo firmar el finiquito y aún así reclamar?",
        respuesta:
          "Sí. Puedes firmar con 'reserva de derechos', lo que te permite recibir el pago y reclamar después lo que falte ante la Inspección del Trabajo o los tribunales.",
      },
      {
        pregunta: "¿Cuánto tiempo tengo para demandar un despido injustificado?",
        respuesta:
          "Tienes 60 días hábiles desde la separación para presentar la demanda (artículo 168 del Código del Trabajo). Ese plazo se suspende si primero reclamas ante la Inspección del Trabajo.",
      },
    ],
  },
  {
    slug: "gratificacion-legal-como-se-paga",
    titulo: "¿Cómo se paga la gratificación y cuánto me corresponde en Chile?",
    categoria: "laboral",
    metaTitle: "Gratificación en Chile: cómo se paga | Ley Chilena",
    descripcion:
      "¿Tu empresa debe pagarte gratificación? Conoce las dos formas legales de pago (30% de las utilidades o 25% con tope) según el Código del Trabajo.",
    fecha: "2026-06-15",
    respuestaCorta:
      "La gratificación es una parte de las utilidades de la empresa que, por ley, se reparte entre los trabajadores. La pagan las empresas con fines de lucro que llevan contabilidad y tuvieron utilidades. Hay **dos formas**: repartir al menos el **30% de las utilidades líquidas**, o pagar el **25% de lo que ganaste en el año** con un tope de **4,75 ingresos mínimos mensuales**. El empleador elige la opción que más le convenga.",
    contenido: `
## ¿Qué es la gratificación legal?
La gratificación es un derecho del trabajador: una participación en las utilidades de la empresa. La paga obligatoriamente toda empresa **con fines de lucro**, obligada a llevar contabilidad y que haya tenido **utilidades líquidas** en el año ([artículo 47 del Código del Trabajo](/leyes/207436?art=3080)).

Si la empresa no tuvo utilidades, no está obligada a pagar gratificación legal ese año. Distinto es si tu contrato pactó una gratificación garantizada: esa se paga igual.

## ¿De cuánto es la gratificación?
La ley da al empleador **dos formas** de cumplir, y puede elegir la que le convenga:

- **30% de las utilidades** ([artículo 47](/leyes/207436?art=3080)): repartir al menos el 30% de las utilidades líquidas entre los trabajadores, en proporción a lo que ganó cada uno en el año.
- **25% de tu remuneración anual con tope** ([artículo 50](/leyes/207436?art=3083)): pagarte el 25% de lo que ganaste en sueldos durante el año, **con un tope de 4,75 ingresos mínimos mensuales**. En la práctica casi todas las empresas usan esta opción, porque el monto es más predecible.

## ¿Cómo se calcula el 30%?
La "utilidad líquida" no es cualquier ganancia: la determina el **Servicio de Impuestos Internos**, descontando un 10% del capital propio de la empresa ([artículo 48](/leyes/207436?art=3081)). Ese 30% se reparte entre los trabajadores en proporción a lo que ganó cada uno.

## ¿Me pagan gratificación si trabajé solo unos meses?
Sí. La gratificación es **proporcional** a lo que ganaste en el período, así que aunque hayas entrado a mitad de año te corresponde la parte proporcional.

## ¿Mensual o anual?
La gratificación legal es **anual**, pero muchas empresas la **anticipan mes a mes** —la verás como "gratificación" en tu liquidación de sueldo—. Si te la pagan mensual con el tope de 4,75 ingresos mínimos, están usando la opción del artículo 50.

## ¿Qué hacer ahora?
1. Revisa tu **liquidación de sueldo**: si aparece "gratificación" mensual, te la están anticipando con tope.
2. Mira tu **contrato**: si pactó una gratificación mejor que la legal, esa manda.
3. Si crees que no te la pagaron debiendo hacerlo, puedes reclamar en la **Inspección del Trabajo**.
    `,
    faq: [
      {
        pregunta: "¿Todas las empresas pagan gratificación?",
        respuesta:
          "No. Solo las empresas con fines de lucro, obligadas a llevar contabilidad y que hayan obtenido utilidades líquidas en el año (artículo 47 del Código del Trabajo). Si no hubo utilidades, no hay gratificación legal ese año.",
      },
      {
        pregunta: "¿Cuál es el tope de la gratificación?",
        respuesta:
          "Cuando el empleador paga el 25% de las remuneraciones anuales (artículo 50), la gratificación de cada trabajador no puede superar los 4,75 ingresos mínimos mensuales.",
      },
      {
        pregunta: "¿La gratificación es lo mismo que el aguinaldo?",
        respuesta:
          "No. El aguinaldo es un bono voluntario o pactado (por Fiestas Patrias o Navidad). La gratificación es un derecho legal ligado a las utilidades de la empresa.",
      },
      {
        pregunta: "¿Me corresponde gratificación si me voy a mitad de año?",
        respuesta:
          "Sí, de forma proporcional al tiempo trabajado y a las remuneraciones que ganaste en ese período.",
      },
    ],
  },
  {
    slug: "vacaciones-feriado-cuantos-dias",
    titulo: "¿Cuántos días de vacaciones me corresponden al año en Chile?",
    categoria: "laboral",
    metaTitle: "Vacaciones: cuántos días te corresponden | Ley Chilena",
    descripcion:
      "Cuántos días de feriado legal te corresponden al año en Chile, cómo se acumulan y qué pasa con las vacaciones no tomadas. Según el Código del Trabajo.",
    fecha: "2026-06-15",
    respuestaCorta:
      "Con más de un año trabajando, te corresponden **15 días hábiles** de vacaciones al año, pagadas con tu remuneración íntegra. Para el feriado, el **sábado se cuenta como inhábil**, así que en la práctica equivalen a unas tres semanas corridas. Las vacaciones **no se pueden cambiar por dinero**, salvo que dejes la empresa sin haberlas tomado.",
    herramienta: {
      titulo: "¿Saliste sin tomar vacaciones?",
      descripcion:
        "Las vacaciones no tomadas se pagan en el finiquito como feriado proporcional. Calcula cuánto te corresponde al salir.",
      href: "/calculadora",
      boton: "Calcular finiquito",
    },
    contenido: `
## ¿Cuántos días de vacaciones tengo?
Si llevas **más de un año** en la empresa, tienes derecho a un **feriado anual de 15 días hábiles** con remuneración íntegra ([artículo 67 del Código del Trabajo](/leyes/207436?art=3108)).

Para contar esos días, el **sábado siempre se considera inhábil** ([artículo 69](/leyes/207436?art=3110)), igual que el domingo y los festivos. Por eso 15 días hábiles equivalen aproximadamente a **tres semanas corridas**.

## ¿Puedo tomarlas de a poco o juntarlas con el otro año?
El feriado debe ser **continuo**, pero lo que pase de **10 días hábiles** se puede fraccionar de común acuerdo ([artículo 70](/leyes/207436?art=3111)). También puedes **acumular** hasta **dos períodos** seguidos; si juntas dos, el empleador debe darte al menos el primero antes de que cumplas el año que te da derecho a un tercero.

## ¿Me pueden pagar las vacaciones en vez de dármelas?
No. El feriado **no se puede compensar en dinero** mientras sigas trabajando ([artículo 73](/leyes/207436?art=3114)). La única excepción es cuando **dejas la empresa** sin haber tomado tus vacaciones: ahí te las deben pagar (feriado proporcional y acumulado) en el finiquito.

## ¿Y si llevo menos de un año?
Si aún no cumples el año, todavía no tienes derecho al feriado completo, pero si te desvinculan te corresponde el **feriado proporcional** por los meses trabajados, que se paga en el finiquito.

## ¿Qué hacer ahora?
1. Cuenta tus días: **15 hábiles por año**, sin contar sábados, domingos ni festivos.
2. Si dejas la empresa, revisa que el **finiquito incluya el feriado proporcional** que no tomaste.
3. Si no te dejan tomar las vacaciones que corresponden, puedes reclamar en la **Inspección del Trabajo**.
    `,
    faq: [
      {
        pregunta: "¿El sábado cuenta como día de vacaciones?",
        respuesta:
          "No. Para el feriado, el sábado siempre se considera inhábil (artículo 69 del Código del Trabajo), igual que el domingo y los festivos.",
      },
      {
        pregunta: "¿Puedo juntar las vacaciones de dos años?",
        respuesta:
          "Sí, puedes acumular hasta dos períodos consecutivos. Si los juntas, el empleador debe otorgarte al menos el primero antes de que cumplas el año que te da derecho al tercero (artículo 70).",
      },
      {
        pregunta: "¿Me pueden pagar las vacaciones en dinero?",
        respuesta:
          "No mientras sigas trabajando (artículo 73). Solo se pagan en dinero cuando dejas la empresa sin haberlas tomado, a través del finiquito.",
      },
      {
        pregunta: "¿Cuántos días corridos son 15 días hábiles?",
        respuesta:
          "Como el sábado se cuenta inhábil, 15 días hábiles equivalen a alrededor de 21 días corridos, es decir, unas tres semanas.",
      },
    ],
  },
  {
    slug: "arriendo-me-quieren-echar",
    titulo: "Me quieren echar del arriendo: ¿en cuánto tiempo deben avisarme?",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "Arriendo en Chile: plazos para desalojar | Ley Chilena",
    descripcion:
      "Si el arrendador quiere que te vayas, la ley fija plazos mínimos y exige aviso judicial o notarial. Conoce tus derechos según la Ley de Arrendamiento 18.101.",
    fecha: "2026-06-15",
    respuestaCorta:
      "El arrendador **no puede echarte de un día para otro**. Si tu contrato es **mes a mes o indefinido**, el aviso de término debe hacerse por la vía judicial o ante un notario, con un plazo mínimo de **2 meses**, que aumenta **1 mes por cada año** que llevas en el inmueble, hasta un **máximo de 6 meses**. Si el contrato es a **plazo fijo de hasta un año**, el desalojo también es judicial y tienes **2 meses** desde que te notifican la demanda.",
    contenido: `
## ¿Me pueden echar del arriendo sin aviso?
No. Aunque el arrendador sea el dueño, debe respetar los plazos y las formas que fija la ley. **No puede cambiar la chapa, cortarte los servicios ni obligarte a salir por su cuenta**: eso es ilegal.

## ¿Cuánto tiempo deben darme si el contrato es mes a mes?
Si arriendas **mes a mes** o el contrato es de **duración indefinida**, el aviso de término (desahucio) solo vale si se hace **judicialmente o por medio de un notario** ([artículo 3 de la Ley de Arrendamiento](/leyes/29526?art=9607)).

El plazo mínimo es de **2 meses** desde que te notifican, y **aumenta 1 mes por cada año completo** que hayas ocupado el inmueble, con un **tope total de 6 meses**. Por ejemplo, si llevas 3 años, el plazo es de 5 meses.

Puedes irte antes si quieres: en ese caso pagas el arriendo solo hasta el día en que entregues el inmueble.

## ¿Y si tengo contrato a plazo fijo?
Si el contrato es a **plazo fijo de hasta un año**, el arrendador solo puede pedir la restitución del inmueble **ante el tribunal**, y tú tienes derecho a un plazo de **2 meses** contados desde que te notifican la demanda ([artículo 4](/leyes/29526?art=9608)).

## ¿Y si no tengo contrato por escrito?
El arriendo **vale igual** aunque sea de palabra: la ley protege al arrendatario. Sin contrato escrito, la renta y las condiciones se prueban por otros medios (comprobantes de pago, mensajes, testigos). Por eso te conviene **guardar todos los comprobantes** de pago del arriendo.

## ¿Qué hacer ahora?
1. **Guarda todo**: contrato, comprobantes de pago y mensajes con el arrendador.
2. Si te notifican un desalojo, fíjate en que sea **judicial o notarial** y revisa que respeten el **plazo legal**.
3. No entregues el inmueble presionado: tienes derecho a usar todo el plazo que te corresponde.
4. Si te cortan los servicios o te amenazan, puedes denunciar y pedir orientación gratuita en la **Corporación de Asistencia Judicial**.
    `,
    faq: [
      {
        pregunta: "¿El dueño puede cambiar la chapa para sacarme?",
        respuesta:
          "No. El arrendador no puede desalojarte por su cuenta. El término del arriendo y la restitución del inmueble deben hacerse por la vía judicial o notarial (Ley 18.101). Hacerlo por la fuerza es ilegal.",
      },
      {
        pregunta: "¿Cuánto tiempo me deben dar para irme?",
        respuesta:
          "En contratos mes a mes o indefinidos, mínimo 2 meses, más 1 mes por cada año completo en el inmueble, con tope de 6 meses (artículo 3). En plazo fijo de hasta un año, 2 meses desde la notificación de la demanda (artículo 4).",
      },
      {
        pregunta: "¿Vale el arriendo si no firmé contrato?",
        respuesta:
          "Sí. El contrato de arriendo vale aunque sea verbal. La falta de contrato escrito no te quita tus derechos como arrendatario; conviene guardar los comprobantes de pago como prueba.",
      },
      {
        pregunta: "¿Puedo irme antes del plazo?",
        respuesta:
          "Sí. Puedes restituir el inmueble antes de que venza el plazo y solo pagas el arriendo hasta el día en que lo entregas (artículos 3 y 4).",
      },
    ],
  },
  {
    slug: "me-despidieron-sin-aviso",
    titulo: "¿Me despidieron sin previo aviso? Conoce tus derechos",
    categoria: "laboral",
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
    titulo: "¿Cómo se calculan las horas extras y cuánto deben pagarme?",
    categoria: "laboral",
    metaTitle: "Horas extras en Chile: cómo se calculan | Ley Chilena",
    descripcion:
      "Qué son las horas extraordinarias, cuánto deben pagártelas (recargo del 50%) y cómo estimar el valor de tu hora extra según el Código del Trabajo.",
    fecha: "2026-06-16",
    respuestaCorta:
      "Las **horas extraordinarias** son las que trabajas **por sobre tu jornada pactada**. Se pagan con un **recargo mínimo del 50%**: cada hora extra vale **1,5 veces** tu hora normal. Deben pactarse **por escrito**, solo para necesidades temporales de la empresa, y con un **máximo de 2 por día**. El pago va en la liquidación del mes en que las trabajaste.",
    contenido: `
## ¿Qué se considera hora extra?
Es toda hora que trabajas **por sobre el máximo legal o por sobre la jornada pactada** en tu contrato, si esta es menor ([artículo 30 del Código del Trabajo](/leyes/207436?art=3052)). Como la jornada legal se está reduciendo de forma gradual (44 horas en 2024, **42 en 2026** y 40 en 2028), las horas extra se cuentan sobre la jornada que te corresponde hoy.

## ¿Cuánto deben pagarme por cada hora extra?
El recargo mínimo es del **50%** sobre el sueldo convenido para tu jornada ordinaria ([artículo 32](/leyes/207436?art=3054)). Es decir, **cada hora extra vale 1,5 veces tu hora normal**. Tu contrato puede pactar un recargo mayor, pero nunca menor.

## ¿Cómo estimo el valor de mi hora extra?
1. Calcula el valor de tu **hora ordinaria**: divide tu sueldo mensual por el total de horas que trabajas al mes (con jornada de 42 horas, son unas **168 horas** al mes).
2. Multiplica ese valor por **1,5** para obtener el valor de tu hora extra.

Ejemplo con sueldo de $500.000 y jornada de 42 horas: tu hora ordinaria es aprox. $500.000 ÷ 168 ≈ **$2.976**, y cada hora extra vale ≈ **$4.464**. Para el valor exacto, la **Dirección del Trabajo** tiene una calculadora oficial.

## ¿Hay un máximo de horas extra?
Sí. Pueden pactarse hasta **2 horas extraordinarias por día**, y solo en faenas que no perjudiquen tu salud ([artículo 31](/leyes/207436?art=3053)). Además, los pactos deben constar **por escrito** y responder a necesidades temporales de la empresa ([artículo 32](/leyes/207436?art=3054)).

## ¿Qué hacer ahora?
1. Revisa tu **liquidación de sueldo**: las horas extra deben aparecer detalladas y con el recargo.
2. Lleva tu propio **registro de horas** trabajadas (la empresa también está obligada a registrarlas).
3. Si te hacen trabajar más sin pagar el recargo, puedes reclamar en la **Dirección del Trabajo**.
4. ¿Tienes dudas con tu caso? Pregúntale a **AbogaBot**.
`,
    faq: [
      {
        pregunta: "¿Cuánto se paga la hora extra en Chile?",
        respuesta:
          "Con un recargo mínimo del 50% sobre el valor de tu hora ordinaria, es decir, 1,5 veces tu hora normal (artículo 32 del Código del Trabajo). El contrato puede pactar un recargo mayor, nunca menor.",
      },
      {
        pregunta: "¿Cuántas horas extra puedo hacer al día?",
        respuesta:
          "Un máximo de 2 horas extraordinarias por día, en faenas que no perjudiquen la salud del trabajador (artículo 31). Deben pactarse por escrito y para necesidades temporales (artículo 32).",
      },
      {
        pregunta: "¿Las horas extra se pueden pagar con tiempo libre?",
        respuesta:
          "No. Las horas extraordinarias deben pagarse en dinero con el recargo del 50%, junto con las remuneraciones del período. No pueden compensarse con días libres.",
      },
      {
        pregunta: "¿Qué pasa si trabajo más horas pero no las pactamos por escrito?",
        respuesta:
          "Igual deben pagártelas con recargo: se consideran extraordinarias las trabajadas con conocimiento del empleador, aunque no haya pacto escrito (artículos 30 y 32).",
      },
    ],
  },
  {
    slug: "despido-por-necesidades-de-la-empresa",
    titulo: "Me despidieron por necesidades de la empresa: ¿qué me corresponde?",
    categoria: "laboral",
    destacada: true,
    metaTitle: "Despido por necesidades de la empresa: qué te pagan | Ley Chilena",
    descripcion:
      "Te despidieron por necesidades de la empresa en Chile: indemnización por años de servicio, mes de aviso, feriado y qué hacer si el despido es injustificado.",
    fecha: "2026-06-17",
    respuestaCorta:
      "Si te despiden por **necesidades de la empresa** (artículo 161) y llevas **1 año o más**, te corresponde: **indemnización por años de servicio** (un mes de sueldo por año, con tope de 11 años y 90 UF), el **mes de aviso** (o pago en su reemplazo si no te avisaron con 30 días), el **feriado pendiente** y las remuneraciones que te deban. Si crees que el despido fue **injustificado**, tienes **60 días hábiles** para demandar y el juez puede subir la indemnización en un **30%**.",
    contenido: `
## ¿Qué es el despido por "necesidades de la empresa"?
Es una causal que permite al empleador terminar tu contrato por razones de la empresa —no por una falta tuya— como baja en la productividad, cambios del mercado o reestructuración ([artículo 161 del Código del Trabajo](/leyes/207436?art=3295)). Al no ser culpa del trabajador, **da derecho a indemnización**.

## ¿Cuánto me deben pagar?
Si tu contrato estuvo vigente **un año o más**, te corresponde:

1. **Indemnización por años de servicio:** un mes de la última remuneración por **cada año trabajado** y por la fracción superior a 6 meses, con un **tope de 11 años** (salvo contratos anteriores a agosto de 1981) y un **tope de 90 UF** por mes de remuneración ([artículo 163](/leyes/207436?art=3298)).
2. **Indemnización sustitutiva del aviso previo:** si **no** te avisaron por escrito con **30 días** de anticipación, te deben pagar **un mes de sueldo** adicional ([artículo 162](/leyes/207436?art=3297)).
3. **Feriado proporcional:** los días de vacaciones que tenías acumulados y no tomaste.
4. **Remuneraciones pendientes:** sueldos, comisiones, horas extra y bonos que te adeuden hasta el último día.

## ¿Cómo deben avisarme?
Con una **carta de despido** entregada en persona o enviada por **carta certificada** a tu domicilio, dentro de los **3 días hábiles** siguientes a la separación. Debe indicar la causal (artículo 161), los hechos y el estado de tus cotizaciones. Una copia va a la **Inspección del Trabajo** ([artículo 162](/leyes/207436?art=3297)).

> **Ley Bustos:** si al despedirte tus cotizaciones **no estaban pagadas**, el despido **no produce efecto** y el empleador debe seguir pagándote el sueldo hasta que las entere y te lo comunique.

## ¿Y si el despido fue injustificado?
Si crees que la causal no era real, puedes reclamar ante el **Juzgado del Trabajo** dentro de **60 días hábiles** desde la separación (el plazo se suspende si reclamas antes en la Inspección). Si el juez te da la razón, la **indemnización por años de servicio aumenta en un 30%** ([artículo 168](/leyes/207436?art=3304)).

## ¿Tengo derecho al seguro de cesantía?
Sí. Además de lo anterior, puedes cobrar tu **Seguro de Cesantía** en la AFC con el aviso de término y tu certificado de cotizaciones.

## ¿Qué hacer ahora?
1. **Guarda la carta de despido**, tu contrato y tus últimas liquidaciones de sueldo.
2. **Revisa el finiquito** antes de firmar: que incluya indemnización por años, mes de aviso, feriado y lo pendiente. Si algo falta, **no lo firmes** y deja constancia.
3. **Calcula lo que te corresponde** con la herramienta de abajo para comparar con la oferta.
4. Si no hay acuerdo o el despido parece injustificado, **reclama en la Dirección del Trabajo** o demanda dentro de los 60 días hábiles.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley para tu situación.
`,
    herramienta: {
      titulo: "Calcula tu finiquito",
      descripcion: "Estima tu indemnización por años de servicio, el mes de aviso y el feriado pendiente.",
      href: "/calculadora",
      boton: "Calcular mi finiquito",
    },
    faq: [
      {
        pregunta: "¿Cuál es el tope de la indemnización por años de servicio?",
        respuesta:
          "Un mes de sueldo por año trabajado, con un máximo de 11 años (salvo contratos vigentes antes de agosto de 1981) y un tope de 90 UF en la remuneración mensual de cálculo (artículo 163 del Código del Trabajo).",
      },
      {
        pregunta: "¿Me pueden despedir por necesidades de la empresa estando con licencia médica?",
        respuesta:
          "No durante la licencia: mientras estés con licencia médica vigente no pueden hacer efectivo el término por necesidades de la empresa. Distinto es el fuero (embarazo, sindical), que requiere autorización judicial.",
      },
      {
        pregunta: "¿Cuánto tiempo tengo para reclamar un despido injustificado?",
        respuesta:
          "60 días hábiles desde la separación para demandar ante el Juzgado del Trabajo. Si reclamas antes en la Inspección del Trabajo, el plazo se suspende y no puede pasar de 90 días hábiles (artículo 168).",
      },
      {
        pregunta: "¿Me tienen que pagar el mes de aviso sí o sí?",
        respuesta:
          "Solo si no te avisaron por escrito con 30 días de anticipación. Si te dieron el aviso con esa antelación, no corresponde la indemnización sustitutiva; si no, deben pagarte un mes de sueldo (artículo 162).",
      },
    ],
  },
  {
    slug: "pension-de-alimentos-cuanto-y-como",
    titulo: "Pensión de alimentos en Chile: ¿cuánto es y cómo se pide?",
    categoria: "familia",
    destacada: true,
    metaTitle: "Pensión de alimentos: cuánto es y cómo pedirla | Ley Chilena",
    descripcion:
      "Cuánto corresponde de pensión de alimentos en Chile, montos mínimos, hasta qué edad se paga y cómo demandar en el Tribunal de Familia si no pagan.",
    fecha: "2026-06-17",
    respuestaCorta:
      "La pensión de alimentos se fija según las **necesidades del hijo** y las **facultades de quien la paga** ([artículo 329 del Código Civil](/leyes/172986?art=506)). Como referencia, la ley establece **montos mínimos**: por **un** hijo, no menos del **40% de un ingreso mínimo**; por **dos o más**, no menos del **30% por cada uno**. En total, la pensión **no puede superar el 50%** de las rentas del alimentante. Se pide en el **Tribunal de Familia** y, por regla general, se paga hasta los **21 años** (o **28** si el hijo estudia).",
    contenido: `
## ¿Quién tiene derecho a pensión de alimentos?
La ley obliga a darse alimentos entre sí, entre otros, al **cónyuge**, a los **hijos** (descendientes) y a los **padres** (ascendientes) ([artículo 321 del Código Civil](/leyes/172986?art=498)). Lo más común es la pensión que un padre o madre paga por sus hijos.

## ¿Qué cubre la pensión?
No es solo comida: debe permitir al hijo **subsistir y desarrollarse**, e incluye **enseñanza básica y media** y el aprendizaje de una profesión u oficio ([artículo 323](/leyes/172986?art=500)). En la práctica cubre alimentación, vivienda, salud, educación, vestuario y recreación.

## ¿Cuánto se paga?
El monto se fija caso a caso, considerando **las necesidades del hijo** y **las facultades económicas y circunstancias** de quien debe pagar ([artículo 329](/leyes/172986?art=506)). Para proteger al hijo, la **Ley 14.908** fija pisos y un techo:

- **Mínimo:** por **un** hijo, no menos del **40%** de un ingreso mínimo remuneracional; por **dos o más** hijos, no menos del **30%** de un ingreso mínimo **por cada uno**.
- **Máximo:** la suma de las pensiones **no puede exceder el 50%** de las rentas del alimentante.

El juez puede fijar un monto mayor al mínimo si los ingresos lo permiten.

## ¿Hasta qué edad se paga?
Por regla general, hasta los **21 años**. Se extiende hasta los **28 años** si el hijo está **estudiando** una profesión u oficio, y sin límite de edad si tiene una **incapacidad** que le impida mantenerse o si el juez lo considera indispensable ([artículo 332](/leyes/172986?art=509)).

## ¿Cómo se pide?
Se demanda en el **Tribunal de Familia** del domicilio del hijo (alimentario). No necesitas abogado para pedir alimentos: puedes hacerlo con el **formulario de demanda** del propio tribunal o con la **Corporación de Asistencia Judicial** (gratuita). Mientras dura el juicio, el tribunal suele fijar **alimentos provisorios** desde el inicio.

## ¿Y si no me pagan?
La ley entrega herramientas potentes de cobro:

- **Retención por el empleador:** el juez puede ordenar que la pensión se **descuente directamente del sueldo** del que debe pagar.
- **Registro Nacional de Deudores de Pensiones de Alimentos:** quien acumula **3 mensualidades** impagas (continuas o no) queda inscrito, lo que **bloquea trámites** como renovar licencia de conducir o pasaporte, sacar créditos o recibir devoluciones de impuestos (que se retienen para pagar la deuda).
- **Apremios:** el tribunal puede decretar **arraigo** (prohibición de salir del país) y hasta **arresto nocturno**.

## ¿Qué hacer ahora?
1. **Reúne pruebas** de los gastos del hijo (colegio, salud, etc.) y de los ingresos del que debe pagar.
2. **Presenta la demanda** en el Tribunal de Familia (o pide ayuda gratis en la Corporación de Asistencia Judicial).
3. Pide **alimentos provisorios** para no esperar todo el juicio.
4. Si ya hay pensión fijada y no pagan, solicita la **liquidación de la deuda**, la inscripción en el **Registro de Deudores** y los **apremios**.
5. ¿Dudas con tu caso? Cuéntaselo a **AbogaBot** y te orienta con la ley en la mano.
`,
    faq: [
      {
        pregunta: "¿Cuál es el monto mínimo de pensión de alimentos por un hijo?",
        respuesta:
          "Como referencia legal, no menos del 40% de un ingreso mínimo remuneracional por un hijo, y no menos del 30% por cada uno cuando son dos o más. El juez puede fijar un monto mayor según los ingresos de quien paga.",
      },
      {
        pregunta: "¿Puede una pensión superar el 50% del sueldo?",
        respuesta:
          "No. La suma de las pensiones que se decreten no puede exceder el 50% de las rentas del alimentante. Dentro de ese límite, el monto depende de las necesidades del hijo y las facultades de quien paga (artículo 329 del Código Civil).",
      },
      {
        pregunta: "¿Hasta qué edad se paga la pensión de alimentos?",
        respuesta:
          "Hasta los 21 años por regla general; hasta los 28 si el hijo estudia una profesión u oficio, y sin tope de edad si una incapacidad le impide subsistir por sí mismo (artículo 332 del Código Civil).",
      },
      {
        pregunta: "¿Qué pasa si el padre o madre no paga la pensión?",
        respuesta:
          "Tras acumular 3 mensualidades impagas queda inscrito en el Registro Nacional de Deudores de Pensiones, lo que bloquea trámites (licencia, pasaporte, créditos) y permite retener su devolución de impuestos. El tribunal también puede decretar arraigo y arresto nocturno.",
      },
      {
        pregunta: "¿Necesito abogado para pedir pensión de alimentos?",
        respuesta:
          "No es obligatorio para iniciar la demanda de alimentos: puedes usar el formulario del Tribunal de Familia o acudir gratis a la Corporación de Asistencia Judicial. Para casos complejos conviene asesoría de un abogado de familia.",
      },
    ],
  },
  {
    slug: "como-salir-de-dicom",
    titulo: "¿Cómo salir de DICOM en Chile? Cuándo te borran y qué hacer",
    categoria: "deudas",
    destacada: true,
    metaTitle: "Cómo salir de DICOM: cuándo te borran y qué hacer | Ley Chilena",
    descripcion:
      "Cómo salir de DICOM en Chile: cuándo deben borrarte al pagar, la caducidad a los 5 años, qué deudas ya no pueden publicarse y cómo exigir tu eliminación.",
    fecha: "2026-06-17",
    respuestaCorta:
      "Cuando **pagas o se extingue** la deuda, el acreedor debe **avisar al registro dentro de 7 días hábiles** para que dejes de aparecer ([artículo 19 de la Ley 19.628](/leyes/141599?art=10599)). Además, una deuda **no puede seguir publicándose después de 5 años** desde que se hizo exigible, aunque no la hayas pagado ([artículo 18](/leyes/141599?art=10598)). No necesitas pagarle a ningún \"borrador de DICOM\": es **gratis** y es **obligación del acreedor**.",
    contenido: `
## ¿Qué es DICOM?
DICOM (y otros boletines comerciales) es un **registro de datos** sobre deudas morosas y protestos. Aparecer ahí no es una "lista negra" eterna: la **Ley 19.628 sobre protección de la vida privada** regula **cuándo** pueden publicar tus deudas y **cuándo deben borrarlas**.

## Pagué mi deuda, ¿cuándo me borran?
Al **pagar o extinguir** la obligación, el acreedor (banco, casa comercial, etc.) está **obligado a avisar** al responsable del registro **dentro de los 7 días hábiles** siguientes, para que se actualice o elimine el dato ([artículo 19 de la Ley 19.628](/leyes/141599?art=10599)). Una vez pagada, **no pueden seguir comunicando** esa deuda ([artículo 18](/leyes/141599?art=10598)).

## ¿Y si nunca pagué? La caducidad a los 5 años
Aunque no pagues, una deuda **no puede seguir publicándose pasados 5 años** desde que se hizo exigible ([artículo 18](/leyes/141599?art=10598)). Ojo: que caduque la **publicación** no significa que la deuda desaparezca —el acreedor aún puede cobrarla mientras no prescriba— pero **deja de figurar** en el registro público.

## Deudas que ya NO pueden publicarse
La ley prohíbe informar en estos registros, entre otras, las deudas contraídas para financiar **servicios básicos** (agua, luz, gas), **educación** (colegios, universidades) y **salud**. Si apareces por una deuda de este tipo, pueden estar vulnerando la ley.

## ¿Pagué y sigo apareciendo?
Tienes derecho a exigir que **corrijan, bloqueen o eliminen** tus datos cuando estén equivocados, caducos o ya pagados ([artículo 12 de la Ley 19.628](/leyes/141599?art=10592)). Pasos:

1. **Reúne el comprobante de pago** o el documento que acredite que la deuda se extinguió.
2. **Exige por escrito al acreedor** (no al DICOM) que informe el pago y pida tu eliminación; conserva copia del reclamo.
3. Si en un plazo razonable no lo corrigen, puedes **reclamar ante los tribunales** mediante el procedimiento de protección de datos de la Ley 19.628.

## Cuidado con las estafas
Salir de DICOM **es gratis** y es **obligación del acreedor** una vez pagada la deuda. **No le pagues a "limpiadores de DICOM"** que prometen borrarte: no pueden hacer nada que tú no puedas exigir gratis, y muchos son derechamente estafas.

## ¿Qué hacer ahora?
1. **Pide tu informe** para ver exactamente qué deudas figuran y desde cuándo.
2. **Identifica** cuáles ya pagaste, cuáles superan los 5 años y cuáles no pueden publicarse (servicios básicos, educación, salud).
3. **Reclama por escrito al acreedor** para que informe el pago o retire el dato.
4. Si no corrigen, **acude a los tribunales** o pide orientación.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Cuánto demoran en borrarme de DICOM después de pagar?",
        respuesta:
          "El acreedor debe avisar el pago al registro dentro de los 7 días hábiles siguientes para que se actualice o elimine el dato (artículo 19 de la Ley 19.628). Desde ese aviso, deja de comunicarse la deuda.",
      },
      {
        pregunta: "¿A los cuántos años se borra una deuda de DICOM?",
        respuesta:
          "No puede seguir publicándose después de 5 años desde que la obligación se hizo exigible, aunque no esté pagada (artículo 18). Que caduque la publicación no extingue la deuda, pero deja de figurar en el registro.",
      },
      {
        pregunta: "¿Es verdad que salir de DICOM es gratis?",
        respuesta:
          "Sí. Actualizar o eliminar el dato al pagar es obligación del acreedor y no tiene costo. Desconfía de los 'limpiadores de DICOM' que cobran por borrarte: no pueden hacer nada que no puedas exigir gratuitamente.",
      },
      {
        pregunta: "¿Pueden publicar en DICOM deudas de luz, agua o educación?",
        respuesta:
          "No. La ley prohíbe informar en estos registros las deudas contraídas para financiar servicios básicos (agua, luz, gas), educación y salud. Si apareces por ese tipo de deuda, podrían estar infringiendo la ley.",
      },
    ],
  },
  {
    slug: "cuando-prescribe-una-deuda",
    titulo: "¿Cuándo prescribe una deuda en Chile? Plazos y qué hacer",
    categoria: "deudas",
    destacada: true,
    metaTitle: "¿Cuándo prescribe una deuda en Chile? Plazos | Ley Chilena",
    descripcion:
      "Cuándo prescribe una deuda en Chile: 3 años para el cobro ejecutivo y 5 para el ordinario. Cómo se cuenta el plazo, qué lo interrumpe y por qué debes alegarla.",
    fecha: "2026-06-17",
    respuestaCorta:
      "En general, la deuda deja de poder cobrarse por la **vía ejecutiva a los 3 años** y por la **vía ordinaria a los 5 años**, contados desde que la obligación se hizo exigible ([artículo 2515 del Código Civil](/leyes/172986?art=2728)). Pero la prescripción **no opera sola**: hay que **alegarla ante el tribunal**; si no la alegas y te demandan, igual te pueden condenar a pagar. Además, el plazo se **interrumpe** si reconoces la deuda (un abono, una repactación) o si el acreedor te demanda.",
    contenido: `
## ¿Qué significa que una deuda "prescriba"?
La prescripción extintiva hace que, pasado cierto tiempo sin cobro, el acreedor **pierda la acción** para exigirte el pago por los tribunales ([artículo 2514 del Código Civil](/leyes/172986?art=2727)). La deuda no "desaparece" mágicamente, pero ya **no te pueden obligar a pagarla** si alegas la prescripción.

## ¿Cuáles son los plazos?
- **Acción ejecutiva: 3 años.** Es la del cobro rápido (con un título como un pagaré o cheque).
- **Acción ordinaria: 5 años.** Pasados los 3 años, la ejecutiva "se convierte" en ordinaria y dura 2 años más ([artículo 2515](/leyes/172986?art=2728)).

El plazo se cuenta **desde que la obligación se hizo exigible** (normalmente, desde que dejaste de pagar).

## Casos especiales
- **Impuestos** (Fisco y municipalidades): **3 años** ([artículo 2521](/leyes/172986?art=2734)).
- **Honorarios** de profesionales (abogados, médicos, etc.): **2 años** ([artículo 2521](/leyes/172986?art=2734)).
- Cuentas de servicios y comercio suelen tener plazos cortos; revisa el caso concreto.

## ⚠️ Lo más importante: la prescripción HAY QUE ALEGARLA
El tribunal **no la aplica solo**. Si te demandan por una deuda antigua, debes **presentarte y alegar la prescripción** dentro del juicio. Si no contestas, te pueden condenar a pagar **aunque la deuda ya estuviera prescrita**. Nunca ignores una demanda.

## ¿Qué INTERRUMPE el plazo (y lo reinicia)?
- **Reconocer la deuda**: hacer un abono, firmar una repactación o un convenio de pago. Cuidado: repactar **reinicia el conteo**.
- **Que el acreedor te demande** y te notifiquen.

## ¿Qué hacer ahora?
1. **Junta tus papeles** y ubica la fecha del último pago o del incumplimiento.
2. **No reconozcas la deuda** a la ligera (un abono "de buena fe" puede reiniciar el plazo).
3. Si te llega una **demanda**, NO la ignores: responde a tiempo y **alega la prescripción** si corresponde (idealmente con apoyo de un abogado; la Corporación de Asistencia Judicial es gratis).
4. Recuerda que la deuda prescrita **no puede seguir en DICOM** pasados los plazos de publicación.
5. ¿Dudas con tu caso? Pregúntale a **AbogaBot** y te orienta con la ley en la mano.
`,
    faq: [
      {
        pregunta: "¿A los cuántos años prescribe una deuda en Chile?",
        respuesta:
          "Por regla general, la acción ejecutiva prescribe en 3 años y la ordinaria en 5, contados desde que la deuda se hizo exigible (artículo 2515 del Código Civil). Algunos casos tienen plazos especiales (impuestos 3 años, honorarios 2 años).",
      },
      {
        pregunta: "¿La deuda se borra sola cuando prescribe?",
        respuesta:
          "No. La prescripción debe alegarse ante el tribunal. Si te demandan por una deuda prescrita y no te presentas a alegarla, igual pueden condenarte a pagar. Por eso nunca debes ignorar una demanda.",
      },
      {
        pregunta: "¿Repactar una deuda reinicia el plazo de prescripción?",
        respuesta:
          "Sí. Reconocer la deuda —con un abono, una repactación o un convenio— interrumpe la prescripción y el plazo vuelve a contarse desde cero. Conviene evaluarlo antes de firmar.",
      },
      {
        pregunta: "¿Una deuda prescrita puede seguir apareciendo en DICOM?",
        respuesta:
          "No de forma indefinida: la publicación en los registros comerciales caduca a los 5 años desde que la deuda se hizo exigible (Ley 19.628). Una vez prescrita y caducada, no puede seguir comunicándose.",
      },
    ],
  },
  {
    slug: "me-pueden-embargar-el-sueldo",
    titulo: "¿Me pueden embargar el sueldo por una deuda en Chile?",
    categoria: "deudas",
    destacada: true,
    metaTitle: "¿Pueden embargar tu sueldo por deudas? | Ley Chilena",
    descripcion:
      "El sueldo en Chile es inembargable salvo la parte que supere 56 UF. Conoce las excepciones (pensión de alimentos), qué bienes no pueden embargarte y qué hacer.",
    fecha: "2026-06-17",
    respuestaCorta:
      "Por regla general **tu sueldo es inembargable**: solo se puede embargar la parte que **exceda de 56 UF** mensuales ([artículo 57 del Código Trabajo](/leyes/207436?art=3091)). Las **cotizaciones previsionales** tampoco se embargan. La gran excepción es la **pensión de alimentos**: por ella sí pueden retener parte de tu sueldo (hasta el 50%). Un acreedor común (banco, casa comercial) **no puede quedarse con tu sueldo** salvo el tramo sobre 56 UF.",
    contenido: `
## ¿Pueden embargarme el sueldo?
La regla general es que **NO**: las remuneraciones de los trabajadores son **inembargables**, igual que las cotizaciones de seguridad social ([artículo 57 del Código del Trabajo](/leyes/207436?art=3091)). Esto protege tu ingreso para vivir.

## La excepción del monto: sobre 56 UF
Sí se puede embargar la parte del sueldo que **exceda de 56 UF** al mes. Es decir, si ganas por debajo de ese monto, tu sueldo queda completamente a salvo de los acreedores comunes ([artículo 57](/leyes/207436?art=3091)).

## Excepciones por el tipo de deuda
La protección NO opera (o se reduce) en estos casos ([artículo 57](/leyes/207436?art=3091)):
- **Pensiones de alimentos** decretadas por un juez: pueden descontarse directamente de tu sueldo (hasta el **50%**).
- **Fraude, hurto o robo** cometidos por el trabajador contra su empleador.
- **Remuneraciones que el propio trabajador** adeude a personas que trabajaron para él.

## ¿Y mis otros bienes?
La ley también declara **inembargables** ciertos bienes básicos (la cama, la ropa, herramientas de trabajo, alimentos del mes, etc.). Un embargo no puede dejarte sin lo indispensable para vivir y trabajar.

## ¿Qué hacer si te llega un embargo o demanda?
1. **No ignores la demanda:** preséntate y, si la deuda es antigua, evalúa **alegar la prescripción**.
2. Si embargan tu sueldo bajo las 56 UF o un bien inembargable, **reclámalo ante el tribunal** (incidente de exclusión).
3. Pide ayuda gratis en la **Corporación de Asistencia Judicial** si no puedes pagar abogado.
4. Si tus deudas te superan, evalúa el **procedimiento de renegociación** de la Ley de Insolvencia (Ley 20.720), que permite ordenar y rebajar deudas ante la Superir.
5. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Pueden embargar todo mi sueldo por una deuda?",
        respuesta:
          "No. El sueldo es inembargable salvo la parte que exceda de 56 UF mensuales (artículo 57 del Código del Trabajo). Un acreedor común no puede quedarse con tu remuneración bajo ese monto.",
      },
      {
        pregunta: "¿Pueden descontar mi sueldo por pensión de alimentos?",
        respuesta:
          "Sí. La pensión de alimentos decretada judicialmente es una excepción: puede retenerse directamente de tu sueldo, hasta un máximo del 50% de tus ingresos.",
      },
      {
        pregunta: "¿Las cotizaciones de mi AFP se pueden embargar?",
        respuesta:
          "No. Las cotizaciones de seguridad social son inembargables, al igual que las remuneraciones bajo el límite de 56 UF (artículo 57 del Código del Trabajo).",
      },
      {
        pregunta: "¿Qué bienes no me pueden embargar?",
        respuesta:
          "La ley protege bienes básicos como la cama, la ropa de uso, las herramientas necesarias para tu trabajo y los alimentos del mes, entre otros. Un embargo no puede dejarte sin lo indispensable para vivir y trabajar.",
      },
    ],
  },
  {
    slug: "cuanto-aviso-para-terminar-arriendo",
    titulo: "¿Cuánto aviso me deben dar para terminar el arriendo en Chile?",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "Aviso para terminar el arriendo: plazos en Chile | Ley Chilena",
    descripcion:
      "Cuánto aviso te deben dar para terminar el arriendo en Chile: contratos mes a mes, indefinidos y a plazo fijo. Plazos para restituir y cómo debe notificarse.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Si tu contrato es **mes a mes** o **indefinido**, el arrendador solo puede terminarlo (desahucio) **por vía judicial o por carta de un notario**, y te debe dar al menos **2 meses** para irte, que **aumentan 1 mes por cada año** que llevas arrendando, hasta un **máximo de 6 meses** ([artículo 3 de la Ley 18.101](/leyes/29526?art=9607)). Si es a **plazo fijo de hasta un año**, te pueden pedir la restitución por tribunal y tienes **2 meses** desde la notificación ([artículo 4](/leyes/29526?art=9608)).",
    contenido: `
## ¿Cómo me pueden pedir que deje el arriendo?
Depende del tipo de contrato. La **Ley 18.101** (arrendamiento de viviendas urbanas) protege al arrendatario con plazos y formas claras de aviso. El arrendador **no puede echarte de un día para otro**.

## Contrato mes a mes o de duración indefinida
El término por voluntad del arrendador (llamado **desahucio**) solo vale si se hace **judicialmente o mediante una notificación personal de un notario** ([artículo 3 de la Ley 18.101](/leyes/29526?art=9607)). Además, te deben dar un plazo para irte:

- **Mínimo 2 meses** desde la notificación.
- Ese plazo **aumenta en 1 mes por cada año completo** que hayas arrendado.
- Con un **tope de 6 meses** en total.

Durante ese plazo sigues pagando la renta y puedes seguir viviendo ahí.

## Contrato a plazo fijo de hasta un año
El arrendador solo puede pedir la **restitución del inmueble ante el tribunal**, y en ese caso tienes derecho a un plazo de **2 meses** contados desde que te notifican la demanda ([artículo 4](/leyes/29526?art=9608)).

## Contrato a plazo fijo (con fecha de término)
Si pactaron una fecha de término, el contrato **expira en esa fecha** ([artículo 1950 del Código Civil](/leyes/172986?art=2163)). Al terminar, debes **restituir la propiedad en buen estado**, salvo el desgaste normal por el uso ([artículo 1947](/leyes/172986?art=2160)).

## ¿Y si no pago la renta?
El no pago es causa de término, pero igual debe hacerse por un **juicio de arrendamiento**: el arrendador no puede cambiarte la chapa ni sacarte las cosas por su cuenta. Eso sería ilegal.

## ¿Qué hacer ahora?
1. **Revisa tu contrato**: ¿es mes a mes, indefinido o a plazo fijo? De eso dependen tus plazos.
2. Exige que cualquier término te llegue **por escrito** (notario o demanda); un aviso verbal por WhatsApp no cumple la ley.
3. Cuenta tu **plazo** (2 meses + 1 por año, tope 6) y úsalo para organizar tu mudanza.
4. Si te presionan para salir antes o te cortan servicios, **reclama**: pide orientación gratis en la **Corporación de Asistencia Judicial**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Me pueden echar del arriendo sin aviso?",
        respuesta:
          "No. En contratos mes a mes o indefinidos, el desahucio debe hacerse por vía judicial o por notario, con un plazo mínimo de 2 meses que aumenta 1 mes por año arrendado, hasta 6 meses (artículo 3 de la Ley 18.101).",
      },
      {
        pregunta: "¿Cuánto plazo tengo para irme si me piden la casa?",
        respuesta:
          "Al menos 2 meses desde la notificación en contratos mes a mes o indefinidos, sumando 1 mes por cada año arrendado (tope 6 meses). En plazo fijo de hasta un año, 2 meses desde la notificación de la demanda (artículos 3 y 4 de la Ley 18.101).",
      },
      {
        pregunta: "¿El arrendador puede cambiar la chapa o cortarme la luz para que me vaya?",
        respuesta:
          "No. El término del contrato y la restitución deben pasar por un juicio de arrendamiento. Cortar servicios, cambiar la cerradura o sacar tus cosas por cuenta propia es ilegal y puedes reclamarlo.",
      },
      {
        pregunta: "¿Tengo que dejar la propiedad como estaba?",
        respuesta:
          "Debes restituirla en el estado en que la recibiste, descontando el desgaste normal por el uso legítimo (artículo 1947 del Código Civil). Los daños que excedan ese desgaste sí los debes reparar o pagar.",
      },
    ],
  },
  {
    slug: "quien-paga-las-reparaciones-del-arriendo",
    titulo: "¿Quién paga las reparaciones en un arriendo: dueño o arrendatario?",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "Reparaciones del arriendo: ¿quién paga? | Ley Chilena",
    descripcion:
      "Quién paga las reparaciones de una vivienda arrendada en Chile: el dueño las reparaciones necesarias y el arrendatario las locativas (desgaste de uso). Ejemplos y qué hacer.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Por regla general, el **dueño (arrendador)** paga las **reparaciones necesarias** para que la vivienda siga siendo habitable (techo, cañerías, instalaciones), porque está obligado a mantenerla en buen estado ([artículos 1924](/leyes/172986?art=2137) y [1927 del Código Civil](/leyes/172986?art=2140)). El **arrendatario** paga las **reparaciones locativas**: los pequeños deterioros del uso diario (vidrios quebrados, chapas, etc.) y todo daño que cause por su culpa.",
    contenido: `
## La regla general
En un arriendo, la ley reparte quién paga qué según el **tipo de reparación**. El dueño debe entregar y **mantener la vivienda en estado de servir** para vivir ([artículo 1924 del Código Civil](/leyes/172986?art=2137)).

## Las paga el DUEÑO (reparaciones necesarias)
Son las indispensables para que la propiedad siga habitable y funcional. El arrendador debe hacer **todas las reparaciones necesarias** durante el arriendo ([artículo 1927](/leyes/172986?art=2140)). Por ejemplo:
- Filtraciones de techo o muros, problemas estructurales.
- Cañerías, instalación eléctrica o de gas que fallan por antigüedad.
- Calefont o instalaciones esenciales que se dañan por uso normal.

## Las paga el ARRENDATARIO (reparaciones locativas)
Son los **deterioros pequeños** que ocurren por el uso diario y que la costumbre pone a cargo de quien vive ahí ([artículo 1927](/leyes/172986?art=2140)). Por ejemplo:
- Vidrios quebrados, chapas o llaves que se rompen por el uso.
- Pequeños arreglos de pintura, sellos, manillas.
- **Todo daño que cause el arrendatario** (o sus visitas/mascotas) por descuido.

## ¿Y si la propiedad se vuelve inhabitable?
Si necesita reparaciones grandes que el dueño no hace, el arrendatario puede **exigirlas**, y según el caso pedir una **rebaja de la renta** o incluso el **término del contrato**. Conviene avisar siempre **por escrito** y guardar la respuesta.

## ¿Qué hacer ante un problema?
1. **Avisa al dueño por escrito** (correo o WhatsApp) apenas detectes la falla, con fotos y fecha.
2. **Identifica el tipo**: ¿es estructural/esencial (dueño) o un deterioro menor del uso (tú)?
3. Si el dueño no responde y la falla es necesaria, **deja constancia** y pide orientación en la **Corporación de Asistencia Judicial** (gratis).
4. **No descuentes la renta por tu cuenta** sin acuerdo o respaldo legal: podría dar pie a un cobro.
5. ¿Dudas con tu caso? Cuéntaselo a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿El dueño está obligado a reparar el arriendo?",
        respuesta:
          "Sí. El arrendador debe mantener la vivienda en estado de servir y hacer las reparaciones necesarias durante el arriendo (artículos 1924 y 1927 del Código Civil). Las reparaciones locativas, en cambio, corresponden al arrendatario.",
      },
      {
        pregunta: "¿Qué son las reparaciones locativas?",
        respuesta:
          "Son los pequeños deterioros que produce el uso diario y que por costumbre paga quien arrienda: vidrios, chapas, manillas, sellos y similares, además de cualquier daño causado por su culpa (artículo 1927 del Código Civil).",
      },
      {
        pregunta: "¿Puedo descontar de la renta lo que gasté en reparar?",
        respuesta:
          "No por tu cuenta. Conviene avisar por escrito al dueño y acordar el descuento o reembolso. Descontar unilateralmente puede generarte un cobro o un conflicto; si no hay acuerdo, pide orientación legal.",
      },
      {
        pregunta: "¿Quién paga si se tapa una cañería o falla el calefont?",
        respuesta:
          "Si es por antigüedad o desgaste normal de la instalación, es una reparación necesaria que paga el dueño. Si la falla la causó el mal uso del arrendatario, la paga él (artículo 1927 del Código Civil).",
      },
    ],
  },
  {
    slug: "garantia-legal-cambio-reparacion-devolucion",
    titulo: "Garantía legal en Chile: ¿cambio, reparación o devolución?",
    categoria: "consumidor",
    destacada: true,
    metaTitle: "Garantía legal: cambio, reparación o devolución | Ley Chilena",
    descripcion:
      "Si compraste un producto con fallas en Chile, la garantía legal te deja elegir entre reparación, cambio o devolución del dinero dentro de 6 meses. Conoce tus derechos.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Si un producto sale **malo o falla**, tú **eliges a tu arbitrio** entre tres opciones: la **reparación gratuita**, el **cambio** por otro igual, o la **devolución del dinero** ([artículo 20 de la Ley del Consumidor](/leyes/1160403?art=138557)). Este derecho —la **garantía legal**— dura **6 meses** desde que recibiste el producto y se ejerce **ante el vendedor** (no te pueden mandar solo al servicio técnico) ([artículo 21](/leyes/1160403?art=138558)).",
    contenido: `
## ¿Qué es la garantía legal?
Es un derecho que te da la **Ley 19.496 (del Consumidor)**, distinto de la "garantía" del fabricante: si el producto sale **defectuoso, no sirve para lo que se compró o viene incompleto**, puedes reclamar. Y lo mejor: **tú decides** qué solución quieres.

## Las 3 opciones (eliges tú)
Frente a un producto con fallas, tienes el **derecho irrenunciable a optar, a tu arbitrio**, entre ([artículo 20 de la Ley del Consumidor](/leyes/1160403?art=138557)):
1. **Reparación gratuita** del producto.
2. **Cambio** por uno nuevo igual (reposición).
3. **Devolución de lo que pagaste**.

El vendedor **no puede obligarte** a aceptar solo la reparación: la elección es tuya.

## ¿Cuánto tiempo tengo?
**6 meses** contados desde que recibiste el producto, y el reclamo se hace **ante el vendedor** (la tienda donde compraste), no solo en el servicio técnico ([artículo 21](/leyes/1160403?art=138558)). Para alimentos perecibles u otros casos el plazo puede ser menor.

## ¿Y si el cambio o reparación no resultó?
La ley también contempla la **bonificación** del valor en la compra de otro producto, o la devolución, cuando la reposición no es posible ([artículo 19](/leyes/1160403?art=138556)). Guarda siempre tu **boleta o comprobante**: es la prueba de la compra (aunque por ley también valen otros medios de prueba).

## ¿Qué hacer ante una falla?
1. **Reúne la boleta** (o el comprobante de la compra / correo de confirmación).
2. Vuelve al **vendedor** y di claramente cuál de las **3 opciones** eliges.
3. Si se niegan, **deja un reclamo formal** y guarda copia.
4. Reclama en el **SERNAC** (sernac.cl) o, si corresponde, demanda en el **Juzgado de Policía Local**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Puedo pedir la devolución del dinero o solo el cambio?",
        respuesta:
          "Puedes elegir tú: la ley te da el derecho irrenunciable a optar entre reparación gratuita, cambio o devolución del dinero (artículo 20 de la Ley 19.496). El vendedor no puede obligarte a una sola opción.",
      },
      {
        pregunta: "¿Cuánto dura la garantía legal en Chile?",
        respuesta:
          "6 meses desde que recibiste el producto, y el reclamo se hace ante el vendedor (artículo 21 de la Ley 19.496). Es independiente de la garantía voluntaria del fabricante o la tienda.",
      },
      {
        pregunta: "¿Me pueden mandar solo al servicio técnico?",
        respuesta:
          "No. El derecho se ejerce ante el vendedor; no pueden obligarte a ir únicamente al servicio técnico ni a aceptar solo la reparación si tú prefieres el cambio o la devolución (artículos 20 y 21).",
      },
      {
        pregunta: "¿Necesito la boleta para reclamar?",
        respuesta:
          "Ayuda mucho, pero la compra puede acreditarse por otros medios (comprobante de tarjeta, correo de confirmación, etc.). Guarda siempre lo que tengas como respaldo.",
      },
    ],
  },
  {
    slug: "derecho-a-retracto-arrepentirme-de-una-compra",
    titulo: "Derecho a retracto: ¿puedo arrepentirme de una compra en Chile?",
    categoria: "consumidor",
    destacada: true,
    metaTitle: "Derecho a retracto: arrepentirse de una compra | Ley Chilena",
    descripcion:
      "El derecho a retracto te deja arrepentirte y anular una compra sin dar explicaciones dentro de 10 días en compras por internet, teléfono o catálogo. Cómo y cuándo aplica.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Sí, en varios casos puedes **arrepentirte sin dar explicaciones** y poner término a la compra dentro de **10 días** desde que recibiste el producto o contrataste el servicio ([artículo 3 bis de la Ley del Consumidor](/leyes/1160403?art=138512)). Aplica sobre todo a compras **por internet, teléfono o catálogo**, y te deben **devolver lo pagado**. No aplica a todo: hay excepciones (por ejemplo, si la empresa avisó que no había retracto y aceptaste expresamente).",
    contenido: `
## ¿Qué es el derecho a retracto?
Es la posibilidad de **arrepentirte de una compra**, sin tener que explicar por qué, y dejarla sin efecto dentro de un plazo ([artículo 3 bis de la Ley 19.496](/leyes/1160403?art=138512)). Es distinto de la garantía: aquí el producto **no tiene que estar malo**, simplemente cambiaste de opinión.

## ¿Cuándo aplica? (los casos típicos)
- **Compras a distancia**: por **internet, teléfono o catálogo**, salvo que la empresa haya informado expresamente que no hay retracto y tú lo hayas aceptado.
- **Compras en reuniones** convocadas por el vendedor o servicios contratados por medios electrónicos, en los casos que la ley señala.
- Tienes **10 días** contados desde que recibiste el producto o desde que contrataste el servicio.

## ¿Cuándo NO aplica?
No corresponde, por ejemplo, cuando el bien **se deterioró por tu uso** más allá de revisarlo, en productos hechos a tu medida, o cuando la ley o el contrato (válidamente) lo excluyen. Por eso conviene revisar las condiciones antes de comprar.

## ¿Qué pasa con mi dinero?
Si te retractas a tiempo, la empresa debe **devolverte lo que pagaste** a la brevedad. Tú debes **devolver el producto** en buen estado. Los costos de devolución pueden depender de lo informado al comprar.

## ¿Qué hacer para retractarte?
1. **Avisa por escrito** (correo, formulario web) dentro de los **10 días**, guardando la fecha.
2. Pide la **devolución del dinero** y coordina la **devolución del producto**.
3. Conserva el comprobante de tu aviso y del envío de vuelta.
4. Si no respetan tu retracto, reclama en el **SERNAC** o en el **Juzgado de Policía Local**.
5. ¿Dudas con tu caso? Cuéntaselo a **AbogaBot** y te orienta.
`,
    faq: [
      {
        pregunta: "¿Cuántos días tengo para arrepentirme de una compra por internet?",
        respuesta:
          "10 días contados desde que recibiste el producto o contrataste el servicio (artículo 3 bis de la Ley 19.496), salvo que la empresa haya informado expresamente que no hay derecho a retracto y lo hayas aceptado.",
      },
      {
        pregunta: "¿Necesito dar una razón para retractarme?",
        respuesta:
          "No. El derecho a retracto se ejerce sin expresión de causa: basta con avisar dentro del plazo. El producto no necesita tener fallas.",
      },
      {
        pregunta: "¿Aplica el retracto a compras hechas en la tienda física?",
        respuesta:
          "Por regla general el retracto aplica a compras a distancia (internet, teléfono, catálogo) y a ciertos casos especiales. Las compras presenciales normales no dan derecho a retracto, salvo que el vendedor lo ofrezca.",
      },
      {
        pregunta: "¿Me tienen que devolver el dinero si me retracto?",
        respuesta:
          "Sí. Ejercido el retracto a tiempo, la empresa debe restituir las sumas pagadas, y tú devolver el producto en buen estado. Guarda los comprobantes del aviso y la devolución.",
      },
    ],
  },
  {
    slug: "mis-derechos-como-consumidor-en-chile",
    titulo: "¿Cuáles son mis derechos como consumidor en Chile?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Tus derechos como consumidor en Chile | Ley Chilena",
    descripcion:
      "Tus derechos básicos como consumidor en Chile: información veraz, libre elección, seguridad, no discriminación, garantía y reparación. Qué hacer si te los vulneran.",
    fecha: "2026-06-19",
    respuestaCorta:
      "La **Ley 19.496** te garantiza, entre otros, el derecho a la **libre elección**, a una **información veraz y oportuna**, a la **seguridad** en el consumo, a **no ser discriminado** arbitrariamente, y a la **reparación e indemnización** si te vulneran ([artículo 3 de la Ley del Consumidor](/leyes/1160403?art=138511)). El proveedor que actúa con **negligencia** y te causa un daño comete infracción ([artículo 23](/leyes/1160403?art=138560)).",
    contenido: `
## Tus derechos básicos
La **Ley 19.496 (del Consumidor)** reconoce derechos que **no puedes renunciar**. Los principales ([artículo 3 de la Ley del Consumidor](/leyes/1160403?art=138511)):

- **Libre elección** del bien o servicio (y el silencio no es aceptación).
- **Información veraz y oportuna** sobre el precio, las condiciones y las características.
- **No ser discriminado** arbitrariamente por el proveedor.
- **Seguridad** en el consumo y protección de tu salud.
- **Reparación e indemnización** adecuada si se vulneran tus derechos.
- **Educación** para un consumo responsable.

## Cuando el proveedor falla
Comete infracción el proveedor que, en la venta de un bien o en un servicio, actúa con **negligencia** y causa **menoscabo** al consumidor por deficiencias de calidad, seguridad o por no entregar lo ofrecido ([artículo 23](/leyes/1160403?art=138560)). Además, la **publicidad engañosa** y las **cláusulas abusivas** están prohibidas.

## ¿Y los cobros y el crédito?
Si te venden con **crédito directo**, deben informarte de forma **clara y oportuna** el costo total, la tasa y las condiciones ([artículo 37](/leyes/1160403?art=138579)). Los cobros que no se ajustan a lo pactado puedes reclamarlos.

## ¿Qué hacer si te vulneran un derecho?
1. **Reclama primero al proveedor** y guarda copia (correo, formulario, ticket).
2. Si no responden, **reclama en el SERNAC** (sernac.cl): es gratis y media con la empresa.
3. Para indemnización, puedes demandar en el **Juzgado de Policía Local**.
4. En compras masivas afectadas, existen las **demandas colectivas** que impulsa el SERNAC.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Cuáles son los derechos básicos del consumidor?",
        respuesta:
          "Libre elección, información veraz y oportuna, no ser discriminado arbitrariamente, seguridad en el consumo, reparación e indemnización, y educación para el consumo, entre otros (artículo 3 de la Ley 19.496). Son irrenunciables.",
      },
      {
        pregunta: "¿Qué hago si una empresa no respeta mis derechos?",
        respuesta:
          "Reclama primero al proveedor por escrito; si no resuelve, reclama gratis en el SERNAC, que media con la empresa. Para indemnización puedes demandar en el Juzgado de Policía Local.",
      },
      {
        pregunta: "¿La publicidad engañosa es ilegal?",
        respuesta:
          "Sí. Inducir a error con publicidad falsa o engañosa infringe la Ley del Consumidor, igual que las cláusulas abusivas en los contratos. Puedes denunciarlo ante el SERNAC.",
      },
      {
        pregunta: "¿El SERNAC puede obligar a la empresa a pagarme?",
        respuesta:
          "El SERNAC media y puede iniciar acciones, pero la indemnización la ordena el tribunal (Juzgado de Policía Local) o se logra en un acuerdo. El SERNAC también impulsa demandas colectivas cuando hay muchos afectados.",
      },
    ],
  },
  {
    slug: "divorcio-en-chile-tipos-y-requisitos",
    titulo: "Divorcio en Chile: tipos, requisitos y cómo se pide",
    categoria: "familia",
    destacada: true,
    metaTitle: "Divorcio en Chile: tipos y requisitos | Ley Chilena",
    descripcion:
      "Tipos de divorcio en Chile: de común acuerdo (cese de 1 año), unilateral (cese de 3 años) y por culpa. Requisitos, el acuerdo regulador y cómo se tramita.",
    fecha: "2026-06-19",
    respuestaCorta:
      "En Chile hay tres caminos: **de común acuerdo** (ambos lo piden, acreditando **más de 1 año** de cese de convivencia, [artículo 55 de la Ley de Matrimonio Civil](/leyes/225128?art=11085)); **unilateral** (uno lo demanda tras **3 años** de cese); y **por culpa** (por una falta grave del otro, como violencia, [artículo 54](/leyes/225128?art=11084)). El divorcio **pone término al matrimonio** pero no afecta la filiación de los hijos ([artículo 53](/leyes/225128?art=11083)).",
    contenido: `
## ¿Cuándo termina un matrimonio?
El matrimonio termina por muerte, por nulidad o por **divorcio**, entre otras causas ([artículo 42 de la Ley de Matrimonio Civil](/leyes/225128?art=11072)). El divorcio lo decreta un **juez de familia** y **pone fin al matrimonio**, pero **no afecta** la relación con los hijos ni la filiación ya determinada ([artículo 53](/leyes/225128?art=11083)).

## Los 3 tipos de divorcio
1. **De común acuerdo (de mutuo acuerdo):** ambos cónyuges lo solicitan juntos y acreditan que la **convivencia cesó por más de 1 año**. Deben acompañar un **acuerdo regulador** completo y suficiente ([artículo 55](/leyes/225128?art=11085)).
2. **Unilateral:** uno de los cónyuges lo demanda cuando la **convivencia cesó por al menos 3 años**, aunque el otro no esté de acuerdo.
3. **Por culpa:** uno lo demanda por una **falta grave** del otro que hace intolerable la vida en común —por ejemplo, **violencia** contra el cónyuge o los hijos, o transgresión grave de los deberes del matrimonio ([artículo 54](/leyes/225128?art=11084)). Aquí **no se exige** un plazo de cese.

## El "acuerdo regulador"
En el divorcio de común acuerdo deben presentar un acuerdo que regule **todas** sus relaciones: **pensión de alimentos**, **cuidado personal** de los hijos, **relación directa y regular** (visitas) y, si corresponde, la **compensación económica**. El juez revisa que **resguarde el interés de los hijos** y sea equitativo.

## ¿Y la compensación económica?
Si uno de los cónyuges se dedicó al hogar o a los hijos y por eso no pudo desarrollarse laboralmente, puede tener derecho a una **compensación económica**. Se acuerda o la fija el juez.

## ¿Cómo se pide?
1. Reúne tu **certificado de matrimonio** y los antecedentes de los hijos y bienes.
2. Para el **común acuerdo**, preparen juntos el **acuerdo regulador**.
3. Se presenta la demanda en el **Tribunal de Familia**. Conviene asesorarte con un **abogado de familia**; si no puedes pagarlo, acude gratis a la **Corporación de Asistencia Judicial**.
4. El juez cita a audiencia y, cumplidos los requisitos, decreta el divorcio.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Cuánto tiempo separados se necesita para divorciarse en Chile?",
        respuesta:
          "Para el divorcio de común acuerdo, más de 1 año de cese de convivencia; para el unilateral (sin acuerdo del otro), al menos 3 años. El divorcio por culpa no exige plazo de cese (artículos 54 y 55 de la Ley de Matrimonio Civil).",
      },
      {
        pregunta: "¿Puedo divorciarme si el otro no quiere?",
        respuesta:
          "Sí. Puedes pedir el divorcio unilateral acreditando 3 años de cese de convivencia, aunque el otro cónyuge se oponga, o el divorcio por culpa si hubo una falta grave (artículo 54).",
      },
      {
        pregunta: "¿El divorcio afecta a los hijos?",
        respuesta:
          "El divorcio pone término al matrimonio pero no afecta la filiación ni los derechos y deberes con los hijos (artículo 53). Igual deben regularse alimentos, cuidado personal y la relación directa y regular.",
      },
      {
        pregunta: "¿Necesito abogado para divorciarme?",
        respuesta:
          "Sí, el juicio de divorcio requiere patrocinio de abogado. Si no puedes pagar uno, la Corporación de Asistencia Judicial atiende gratis. En el común acuerdo el trámite es más rápido.",
      },
    ],
  },
  {
    slug: "cuidado-personal-de-los-hijos-tras-la-separacion",
    titulo: "Cuidado personal de los hijos tras la separación: ¿con quién quedan?",
    categoria: "familia",
    destacada: false,
    metaTitle: "Cuidado personal de los hijos en Chile | Ley Chilena",
    descripcion:
      "Con quién quedan los hijos tras la separación en Chile: el cuidado personal, el acuerdo de los padres, el interés superior del niño y la relación directa y regular (visitas).",
    fecha: "2026-06-19",
    respuestaCorta:
      "Tras una separación, los padres pueden **acordar** con quién vive el hijo (el **cuidado personal**); si no hay acuerdo, decide el juez pensando siempre en el **interés superior del niño** ([artículo 225 del Código Civil](/leyes/172986?art=400)). El padre o madre que no tiene el cuidado conserva el derecho —y el deber— a una **relación directa y regular** (las visitas) ([artículo 229](/leyes/172986?art=405)).",
    contenido: `
## ¿Qué es el cuidado personal?
Es con quién **vive y se cría** el hijo día a día. Tras una separación, **ambos padres siguen siendo responsables**; lo que se define es quién ejerce el cuidado personal y cómo se mantiene el vínculo con el otro ([artículo 224 del Código Civil](/leyes/172986?art=399)).

## ¿Quién decide?
1. **Por acuerdo de los padres:** pueden pactar quién tiene el cuidado personal (incluso compartido), por escrito. Es lo ideal.
2. **Si no hay acuerdo:** decide el **juez de familia**, guiándose **siempre por el interés superior del niño**, no por el sexo del padre o madre ([artículo 225](/leyes/172986?art=400)).

El juez puede entregar el cuidado a quien ofrezca mejores condiciones para el desarrollo del niño, y puede modificarlo si las circunstancias cambian.

## La relación directa y regular (las "visitas")
El padre o madre que **no** tiene el cuidado personal mantiene el derecho y el deber a una **relación directa y regular** con su hijo: verlo, compartir y mantener el vínculo ([artículo 229](/leyes/172986?art=405)). Esto **no depende** de si está al día con la pensión: son cosas distintas (aunque la deuda de alimentos tiene sus propias consecuencias).

## ¿Y la pensión de alimentos?
El cuidado personal y los **alimentos** van de la mano pero son distintos: quien no vive con el hijo normalmente debe contribuir con una **pensión**. Revisa nuestra guía de pensión de alimentos para el detalle.

## ¿Qué hacer ahora?
1. **Intenten un acuerdo** por el bien del niño (cuidado personal + visitas + alimentos); pueden formalizarlo ante el Tribunal de Familia.
2. Si no hay acuerdo, **demanda en el Tribunal de Familia**; pide ayuda gratis en la **Corporación de Asistencia Judicial**.
3. Recuerda: las decisiones se toman por el **interés superior del niño**, no como "premio o castigo" entre los padres.
4. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Con quién quedan los hijos si los padres se separan?",
        respuesta:
          "Con quien los padres acuerden; si no hay acuerdo, lo decide el juez de familia según el interés superior del niño, no por el sexo del padre o madre (artículo 225 del Código Civil).",
      },
      {
        pregunta: "¿El padre que no tiene el cuidado puede ver a sus hijos?",
        respuesta:
          "Sí. Tiene derecho y deber a una relación directa y regular con el hijo (artículo 229 del Código Civil). Este derecho no depende de estar al día con la pensión de alimentos.",
      },
      {
        pregunta: "¿Existe el cuidado personal compartido en Chile?",
        respuesta:
          "Sí, los padres pueden acordar el cuidado personal compartido. A falta de acuerdo, el juez determina el régimen que mejor resguarde el interés superior del niño.",
      },
      {
        pregunta: "¿Si no me pagan la pensión puedo negar las visitas?",
        respuesta:
          "No. La relación directa y regular y la pensión de alimentos son obligaciones distintas: no se puede condicionar una a la otra. La deuda de alimentos se cobra por las vías legales (Registro de Deudores, retención, apremios).",
      },
    ],
  },
  {
    slug: "cobranza-extrajudicial-que-pueden-hacer-y-que-no",
    titulo: "Cobranza extrajudicial: ¿qué pueden hacer y qué no en Chile?",
    categoria: "deudas",
    destacada: true,
    metaTitle: "Cobranza extrajudicial: qué es legal y qué no | Ley Chilena",
    descripcion:
      "Qué pueden y qué no pueden hacer las empresas de cobranza en Chile: límites a los gastos de cobranza y prácticas prohibidas como amenazas, llamados a horas indebidas o avisar a tu trabajo.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Cobrarte una deuda es legal, pero la **cobranza extrajudicial** tiene límites: la ley topa los **gastos de cobranza** que te pueden sumar y **prohíbe métodos abusivos** ([artículo 37 de la Ley del Consumidor](/leyes/1160403?art=138579)). No pueden **amenazarte**, llamarte a **horas inhábiles**, mandarte documentos que **aparenten ser una demanda** sin serlo, ni avisar de tu deuda a tu **empleador, familia o vecinos** para presionarte.",
    contenido: `
## ¿Es legal que me cobren?
Sí: si debes, te pueden cobrar. Pero la **cobranza extrajudicial** (la que hace la empresa o una agencia **antes** de un juicio) está **regulada** por la Ley del Consumidor para que no se transforme en hostigamiento ([artículo 37 de la Ley 19.496](/leyes/1160403?art=138579)).

## Lo que NO pueden hacer (prácticas prohibidas)
- **Amenazarte, insultarte o presionarte** de forma abusiva.
- Llamarte o visitarte a **horas inhábiles** (muy temprano, muy tarde, domingos y festivos).
- Enviar documentos que **simulen ser escritos judiciales** (una "demanda" falsa) para asustarte.
- **Comunicar tu deuda a terceros** —tu **empleador, familia, vecinos**— para presionarte (salvo a un garante/aval).
- Afectar tu **privacidad, tu trabajo o la educación** con la cobranza.

## Los gastos de cobranza tienen tope
No te pueden cargar cualquier monto por "gastos de cobranza": la ley fija **límites** según el tamaño de la deuda, y solo se pueden cobrar **después** de transcurridos los días que la ley señala desde el atraso ([artículo 37](/leyes/1160403?art=138579)). Cualquier cobro por sobre eso es **reclamable**.

## Ojo: cobranza extrajudicial NO es embargo
La empresa de cobranza **no puede** embargar tus bienes, descontarte el sueldo ni sacarte cosas. El **embargo** solo ocurre tras un **juicio** y lo ordena un **tribunal**. Si te amenazan con "embargarte mañana" por teléfono, es presión indebida.

## ¿Qué hacer ante cobranzas abusivas?
1. **Guarda todo**: mensajes, llamadas, cartas, horarios. Es tu prueba.
2. Pide por escrito el **detalle de la deuda** y de los **gastos de cobranza**.
3. **Reclama en el SERNAC** (sernac.cl) las prácticas abusivas y los cobros excesivos.
4. Si la deuda es antigua, evalúa si está **prescrita** (ver nuestra guía). Y nunca ignores una **demanda** real.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Pueden llamar a mi trabajo o a mi familia por una deuda?",
        respuesta:
          "No para presionarte. La cobranza no puede comunicar tu deuda a terceros como tu empleador, familia o vecinos (salvo a un garante). Tampoco puede afectar tu actividad laboral. Es una práctica prohibida (artículo 37 de la Ley 19.496).",
      },
      {
        pregunta: "¿Cuánto me pueden cobrar por gastos de cobranza?",
        respuesta:
          "La ley fija topes según el monto de la deuda y solo se pueden cobrar tras los días de atraso que ella señala (artículo 37). Cobros por sobre esos límites son reclamables ante el SERNAC.",
      },
      {
        pregunta: "¿Una empresa de cobranza puede embargarme?",
        respuesta:
          "No. El embargo solo procede tras un juicio y lo ordena un tribunal. Una agencia de cobranza extrajudicial no puede embargar, descontar tu sueldo ni retirar tus bienes. Amenazar con eso es presión indebida.",
      },
      {
        pregunta: "¿Pueden mandarme una 'demanda' que en realidad no lo es?",
        respuesta:
          "No. Está prohibido enviar documentos que aparenten ser escritos judiciales sin serlo, para inducir a temor o error. Si recibes algo así, guárdalo y denúncialo al SERNAC.",
      },
    ],
  },
  {
    slug: "renegociar-deudas-ley-de-insolvencia",
    titulo: "Renegociar tus deudas: la Ley de Insolvencia (Ley 20.720)",
    categoria: "deudas",
    destacada: false,
    metaTitle: "Renegociar deudas: Ley de Insolvencia en Chile | Ley Chilena",
    descripcion:
      "Si no puedes pagar tus deudas, el Procedimiento de Renegociación de la Ley 20.720 (ante la Superir) te permite ordenarlas y rebajarlas, gratis y sin abogado, con protección frente a cobros.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Si tienes varias deudas vencidas y no puedes pagarlas, la **Ley 20.720 de Insolvencia** ofrece un **Procedimiento Concursal de Renegociación** para personas: es **gratis, sin abogado**, se hace ante la **Superintendencia de Insolvencia (Superir)** y busca un **acuerdo** con tus acreedores para reordenar o rebajar tus deudas ([artículo 260](/leyes/1058072?art=10390) y [261](/leyes/1058072?art=10391)).",
    contenido: `
## ¿Qué es la renegociación de la Ley 20.720?
Es un procedimiento para **personas sobreendeudadas** que ya no pueden pagar. Permite **ordenar todas tus deudas** y llegar a un **acuerdo** con tus acreedores (rebajar montos, alargar plazos, condonar intereses), ante la **Superintendencia de Insolvencia y Reemprendimiento (Superir)** ([artículo 260 de la Ley 20.720](/leyes/1058072?art=10390)).

Lo bueno: es **gratuito** y **no necesitas abogado** para iniciarlo.

## ¿Quién puede usarlo?
La "**Persona Deudora**" que tiene **dos o más deudas vencidas** (con distintos acreedores), impagas por un tiempo, que superen el monto mínimo que fija la ley, y que no esté ya en otro procedimiento concursal ([artículo 260](/leyes/1058072?art=10390)). Conviene confirmar los requisitos vigentes en la **Superir** antes de postular.

## ¿Cómo funciona?
1. Presentas la **solicitud** ante la Superir, con la lista de tus deudas y tus ingresos ([artículo 261](/leyes/1058072?art=10391)).
2. Si es admisible, se **publica** y, desde ese momento, tienes una **protección**: no te pueden iniciar nuevas ejecuciones ni embargos por esas deudas mientras dura el proceso.
3. La Superir cita a **audiencias** donde tú y tus acreedores buscan un **acuerdo de renegociación** (o de ejecución).
4. Aprobado el acuerdo, **se cumple** y vuelves a quedar al día según lo pactado.

## ¿Y si no hay acuerdo?
Si no se logra un acuerdo, la ley contempla otras salidas (como la **liquidación** de bienes para extinguir las deudas y "reemprender"). Es un último recurso, pero ordena tu situación.

## ¿Qué hacer ahora?
1. **Junta el detalle de todas tus deudas** (montos, acreedores, atrasos) y tus ingresos.
2. Entra a la **Superir** (superir.gob.cl) y revisa el procedimiento de **renegociación de la persona deudora**.
3. Evalúa también si alguna deuda está **prescrita** o si te conviene primero un acuerdo directo.
4. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿La renegociación de la Ley 20.720 tiene costo o necesito abogado?",
        respuesta:
          "El Procedimiento Concursal de Renegociación de la persona deudora es gratuito y no requiere abogado: se inicia directamente ante la Superintendencia de Insolvencia (artículos 260 y 261 de la Ley 20.720).",
      },
      {
        pregunta: "¿Me protegen de los embargos mientras renegocio?",
        respuesta:
          "Sí. Una vez admitida la solicitud, se aplica una protección que impide iniciar nuevas ejecuciones o embargos por esas deudas mientras dura el procedimiento, para poder negociar con calma.",
      },
      {
        pregunta: "¿Quién puede pedir la renegociación?",
        respuesta:
          "La persona deudora con dos o más deudas vencidas con distintos acreedores, impagas, que superen el monto mínimo legal y que no esté en otro procedimiento concursal. Conviene confirmar los requisitos vigentes en la Superir (artículo 260).",
      },
      {
        pregunta: "¿Qué pasa si no llego a acuerdo con mis acreedores?",
        respuesta:
          "Si no hay acuerdo de renegociación, la ley contempla la liquidación de bienes para extinguir las deudas y poder reemprender. Ordena tu situación financiera aunque sea como último recurso.",
      },
    ],
  },
  {
    slug: "mes-de-garantia-de-arriendo-cuando-me-lo-devuelven",
    titulo: "Mes de garantía de arriendo: ¿cuándo y cómo me lo devuelven?",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "Garantía de arriendo: cuándo te la devuelven | Ley Chilena",
    descripcion:
      "Cuándo te devuelven el mes de garantía del arriendo en Chile: para qué sirve, qué pueden descontar (daños o rentas impagas) y qué hacer si el dueño no te lo devuelve.",
    fecha: "2026-06-19",
    respuestaCorta:
      "El **mes de garantía** es un respaldo por **daños** o **rentas/cuentas impagas**. Si entregas la propiedad **en buen estado** (descontando el desgaste normal por el uso) y sin deudas, el dueño debe **devolvértelo** ([artículo 1947 del Código Civil](/leyes/172986?art=2160)). La ley permite al arrendador **retenerlo** solo para cubrir lo que realmente le debas ([artículo 1942](/leyes/172986?art=2155)); no es un mes extra de arriendo.",
    contenido: `
## ¿Para qué sirve el mes de garantía?
Es una **caución**: un dinero que dejas al inicio para responder por eventuales **daños** a la propiedad o **deudas** (rentas, gastos comunes, cuentas de servicios) al terminar el arriendo. **No es** un pago extra ni "el último mes" automático: es un respaldo que, si todo está en orden, **te lo deben devolver**.

## ¿Cuándo me lo devuelven?
Al terminar el contrato y **restituir la propiedad**, si la dejas **en el estado en que la recibiste** —descontando el **deterioro normal** por el uso legítimo— y sin deudas pendientes, el arrendador debe **devolverte la garantía** ([artículo 1947 del Código Civil](/leyes/172986?art=2160)). El plazo suele pactarse en el contrato (revisa esa cláusula).

## ¿Qué pueden descontar?
La ley deja al arrendador **retener** lo necesario para cubrir lo que efectivamente le debas ([artículo 1942](/leyes/172986?art=2155)): por ejemplo, **reparar daños** que causaste (más allá del desgaste normal) o **rentas y cuentas impagas**. Lo que sobre, te lo deben devolver. El desgaste normal (pintura gastada, marcas de muebles) **no** se puede descontar.

## ¿Y si no me la devuelven?
1. **Pide por escrito** la devolución y un **detalle** de cualquier descuento (con respaldo: fotos, boletas de reparación).
2. Junta tu **contrato**, el **acta de entrega/recepción** (si la hay) y fotos de cómo dejaste la propiedad.
3. Si se niegan sin justificación, puedes **demandar la restitución** en el tribunal correspondiente.
4. Para evitar conflictos: al entrar y al salir, **deja registro con fotos y un acta firmada** del estado de la propiedad.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿El mes de garantía sirve como último mes de arriendo?",
        respuesta:
          "No automáticamente. La garantía responde por daños y deudas al final del arriendo; no es un pago de renta. Usarla como 'último mes' sin acuerdo puede generar un conflicto. Devuélvela el dueño una vez verificado el estado y las cuentas.",
      },
      {
        pregunta: "¿Qué pueden descontarme de la garantía?",
        respuesta:
          "Solo lo que realmente debas: reparación de daños que causaste (más allá del desgaste normal) y rentas o cuentas impagas (artículo 1942 del Código Civil). El desgaste normal por el uso no se descuenta.",
      },
      {
        pregunta: "¿En cuánto tiempo deben devolver la garantía?",
        respuesta:
          "En el plazo que diga tu contrato; si no lo fija, debe ser dentro de un tiempo razonable tras la restitución y la revisión del estado y las cuentas. Pide siempre el detalle por escrito de cualquier descuento.",
      },
      {
        pregunta: "¿Cómo evito que no me devuelvan la garantía?",
        respuesta:
          "Deja registro con fotos y un acta firmada del estado de la propiedad al entrar y al salir, paga todas las cuentas y entrega en buen estado. Así tienes prueba para exigir la devolución (artículo 1947).",
      },
    ],
  },
  {
    slug: "puedo-subarrendar-la-propiedad-que-arriendo",
    titulo: "¿Puedo subarrendar la propiedad que arriendo en Chile?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "¿Se puede subarrendar en Chile? | Ley Chilena",
    descripcion:
      "Subarrendar en Chile: por regla general necesitas autorización expresa del dueño. Qué pasa si subarriendas sin permiso y cómo dejarlo bien en el contrato.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Por regla general **no puedes subarrendar ni ceder el arriendo** salvo que el dueño te lo **autorice expresamente** ([artículo 1946 del Código Civil](/leyes/172986?art=2159)). Si subarriendas sin permiso, el arrendador puede pedir el **término del contrato**. Si te autoriza, el subarrendatario debe usar la propiedad **solo según lo pactado** en tu contrato.",
    contenido: `
## La regla general
El arrendatario **no tiene la facultad de ceder el arriendo ni de subarrendar**, a menos que se le haya **concedido expresamente** esa facultad ([artículo 1946 del Código Civil](/leyes/172986?art=2159)). Es decir: para subarrendar necesitas que el **dueño lo autorice**, idealmente **por escrito**.

## ¿Qué pasa si subarriendo sin permiso?
Es un **incumplimiento del contrato**. El arrendador puede **poner término al arriendo** y pedir la restitución de la propiedad, además de las indemnizaciones que correspondan. No vale la pena arriesgarse.

## Si el dueño te autoriza
- Que la autorización quede **por escrito** (en el contrato o en un anexo firmado).
- El **subarrendatario** solo puede usar la propiedad **en los términos** que tú pactaste con el dueño ([artículo 1946](/leyes/172986?art=2159)).
- Tú sigues siendo **responsable** ante el dueño por el cuidado de la propiedad y el pago de la renta.

## ¿Y el arriendo por días (tipo Airbnb)?
Arrendar por días a turistas suele ser una forma de subarriendo o de cambio de destino del inmueble: revisa tu contrato y el **reglamento de copropiedad** del edificio, que muchas veces lo **prohíbe**. Hacerlo sin permiso puede terminar tu contrato y traerte multas de la comunidad.

## ¿Qué hacer?
1. **Revisa tu contrato**: ¿dice algo sobre subarriendo o cesión?
2. Si quieres subarrendar, **pide autorización por escrito** al dueño.
3. Deja claro por escrito quién responde por daños y pagos.
4. ¿Tu caso es distinto? Cuéntaselo a **AbogaBot** y te orienta.
`,
    faq: [
      {
        pregunta: "¿Necesito permiso para subarrendar?",
        respuesta:
          "Sí. Por regla general no puedes subarrendar ni ceder el arriendo salvo autorización expresa del arrendador (artículo 1946 del Código Civil). Conviene que esa autorización quede por escrito.",
      },
      {
        pregunta: "¿Qué pasa si subarriendo sin autorización?",
        respuesta:
          "Es un incumplimiento del contrato: el dueño puede pedir el término del arriendo, la restitución de la propiedad y las indemnizaciones que correspondan.",
      },
      {
        pregunta: "¿Puedo arrendar por días en Airbnb si yo arriendo?",
        respuesta:
          "Solo con autorización del dueño y si el reglamento de copropiedad lo permite. Muchos contratos y reglamentos lo prohíben; hacerlo sin permiso puede terminar tu contrato y generar multas.",
      },
      {
        pregunta: "Si subarriendo con permiso, ¿dejo de ser responsable?",
        respuesta:
          "No. Aunque te autoricen, sigues respondiendo ante el dueño por el cuidado de la propiedad y el pago de la renta. El subarrendatario solo puede usarla en los términos de tu contrato (artículo 1946).",
      },
    ],
  },
  {
    slug: "no-pago-de-arriendo-juicio-de-arrendamiento",
    titulo: "No pago de arriendo: ¿cómo es el juicio de arrendamiento?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Juicio de arrendamiento por no pago | Ley Chilena",
    descripcion:
      "Qué pasa si no se paga el arriendo en Chile: el dueño debe ir a un juicio de arrendamiento para terminar el contrato y recuperar la propiedad. Plazos y derechos de ambas partes.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Si no se paga la renta, el arrendador **no puede echarte por su cuenta**: debe iniciar un **juicio de arrendamiento** ante el tribunal para terminar el contrato y recuperar la propiedad ([artículo 7 de la Ley 18.101](/leyes/29526?art=9611)). Mientras no restituyas, sigues **obligado a pagar la renta y las cuentas** ([artículo 6](/leyes/29526?art=9610)). Cortarte servicios o cambiar la chapa por la fuerza es ilegal.",
    contenido: `
## El dueño no puede echarte "por las suyas"
Aunque debas renta, el arrendador **no puede** cambiar la cerradura, sacar tus cosas ni cortarte la luz o el agua para obligarte a salir. Para terminar el contrato y recuperar la propiedad debe pasar por un **juicio de arrendamiento** ante el tribunal ([artículo 7 de la Ley 18.101](/leyes/29526?art=9611)), que regula los juicios de **desahucio, terminación y restitución**.

## ¿Cómo es el juicio?
1. El arrendador presenta una **demanda** (por ejemplo, de terminación por no pago).
2. Te **notifican** y tienes derecho a **defenderte** (por ejemplo, acreditar que sí pagaste o llegar a un acuerdo).
3. El juez resuelve y, si corresponde, ordena la **restitución** del inmueble en un plazo.
4. Es un procedimiento **especial y más rápido** que un juicio común, pero igual respeta tus derechos.

## Mientras tanto, sigues debiendo la renta
Hasta que **restituyas** efectivamente la propiedad, sigues **obligado a pagar la renta y los gastos** (servicios, gastos comunes) que correspondan ([artículo 6](/leyes/29526?art=9610)). Por eso conviene resolver pronto: la deuda sigue creciendo.

## Consejos para ambos lados
- **Si eres arrendatario y no pudiste pagar:** habla con el dueño y busca un **acuerdo de pago** por escrito antes de que escale; guarda tus comprobantes.
- **Si eres arrendador:** no te tomes la justicia por tu mano; el camino legal es el juicio. Cortar servicios o sacar cosas puede volverse en tu contra.

## ¿Qué hacer?
1. Reúne el **contrato** y los **comprobantes** de pago o de la deuda.
2. Intenta un **acuerdo** por escrito; muchas veces evita el juicio.
3. Si hay juicio, pide orientación gratis en la **Corporación de Asistencia Judicial**.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Me pueden echar del arriendo por no pagar sin juicio?",
        respuesta:
          "No. El término por no pago y la recuperación de la propiedad deben pasar por un juicio de arrendamiento (artículo 7 de la Ley 18.101). Cambiar la chapa, sacar tus cosas o cortar servicios por la fuerza es ilegal.",
      },
      {
        pregunta: "Si dejo de pagar, ¿sigo debiendo la renta?",
        respuesta:
          "Sí. Mientras no restituyas la propiedad sigues obligado a pagar la renta y los gastos que correspondan (artículo 6 de la Ley 18.101). La deuda se acumula hasta que entregues el inmueble.",
      },
      {
        pregunta: "¿El juicio de arrendamiento es rápido?",
        respuesta:
          "Es un procedimiento especial más ágil que un juicio común, pero respeta el derecho a defensa de ambas partes. Llegar a un acuerdo de pago por escrito suele ser más rápido y barato que litigar.",
      },
      {
        pregunta: "El dueño me cortó la luz para que me fuera, ¿es legal?",
        respuesta:
          "No. Cortar servicios o cambiar la cerradura para forzar la salida es ilegal, aunque debas renta. Puedes reclamarlo; el camino correcto del arrendador es el juicio de arrendamiento.",
      },
    ],
  },
  {
    slug: "violencia-intrafamiliar-medidas-de-proteccion",
    titulo: "Violencia intrafamiliar: cómo pedir medidas de protección en Chile",
    categoria: "familia",
    destacada: true,
    metaTitle: "Violencia intrafamiliar: medidas de protección | Ley Chilena",
    descripcion:
      "Qué es la violencia intrafamiliar en Chile y cómo pedir medidas de protección: denuncia, medidas cautelares y accesorias de la Ley 20.066. Teléfonos de ayuda 24/7.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Si estás en peligro **ahora**, llama al **133** (Carabineros). Para orientación gratuita en violencia, al **1455** (SernamEG, 24/7). La **Ley 20.066** protege a quien sufre maltrato de un familiar o pareja: puedes **denunciar** y el juez puede dictar **medidas cautelares y de protección** —como prohibir al agresor acercarse— en cualquier etapa ([artículo 15](/leyes/242648?art=11594) y [artículo 9](/leyes/242648?art=11584)).",
    contenido: `
> ⚠️ **Si estás en peligro ahora, llama al 133 (Carabineros).** Orientación gratuita 24/7 en violencia contra la mujer: **1455** (SernamEG) o WhatsApp **+56 9 9700 7000**. Denuncias: **149** (Fono Familia de Carabineros) o en cualquier comisaría, Fiscalía o Tribunal de Familia. **No estás solo/a.**

## ¿Qué es la violencia intrafamiliar?
Es **todo maltrato** que afecte la **vida o la integridad física o psíquica** de quien tenga o haya tenido la calidad de **cónyuge o conviviente**, de un **pariente**, o de los hijos, entre otros ([artículo 5 de la Ley 20.066](/leyes/242648?art=11580)). No es solo el golpe: también el **maltrato psicológico** (amenazas, humillación, control) es violencia.

## ¿Dónde denuncio?
Puedes denunciar en **Carabineros (133 / 149)**, la **PDI**, la **Fiscalía** o el **Tribunal de Familia**. La denuncia es **gratuita** y puede hacerla la víctima u **otra persona** que sepa de los hechos. Si hay delito (lesiones, amenazas), el caso va a la **Fiscalía**.

## Las medidas de protección
La ley permite proteger a la víctima rápido. El juez puede dictar **medidas cautelares en cualquier etapa**, incluso al inicio ([artículo 15](/leyes/242648?art=11594)), y **medidas accesorias** en la sentencia ([artículo 9](/leyes/242648?art=11584)), como:
- **Prohibir al agresor acercarse** a la víctima, su casa, trabajo o estudio.
- **Salida del agresor** del hogar común.
- Prohibición de **porte y tenencia de armas**.
- Retención de armas, y en ciertos casos **monitoreo telemático** (tobillera).

Frente a **riesgo inminente**, el tribunal debe actuar aunque aún no haya una denuncia formal completa ([artículo 7](/leyes/242648?art=11582)).

## ¿Qué hacer ahora?
1. Si hay peligro inmediato, **llama al 133**. Ponte a salvo primero.
2. **Denuncia** (133/149, comisaría, Fiscalía o Tribunal de Familia) y pide **medidas de protección**.
3. Guarda **pruebas**: mensajes, fotos de lesiones, testigos, constancias médicas.
4. Pide apoyo gratuito en **SernamEG (1455)** y orientación legal en la **Corporación de Asistencia Judicial**.
5. ¿Necesitas entender un paso? Pregúntale a **AbogaBot** —pero tu seguridad va primero.
`,
    faq: [
      {
        pregunta: "¿A qué número llamo por violencia intrafamiliar en Chile?",
        respuesta:
          "Si estás en peligro ahora, al 133 (Carabineros). Para orientación 24/7, al 1455 (SernamEG) o WhatsApp +56 9 9700 7000. Para denunciar, al 149 (Fono Familia) o en cualquier comisaría, Fiscalía o Tribunal de Familia.",
      },
      {
        pregunta: "¿El maltrato psicológico también es violencia intrafamiliar?",
        respuesta:
          "Sí. La Ley 20.066 considera violencia intrafamiliar todo maltrato que afecte la integridad física o psíquica (artículo 5). Amenazas, humillaciones y control también cuentan, no solo la agresión física.",
      },
      {
        pregunta: "¿Qué medidas de protección puede ordenar el juez?",
        respuesta:
          "Entre otras, prohibir al agresor acercarse a la víctima o su hogar, ordenar su salida del hogar común, prohibir el porte de armas y, en ciertos casos, el monitoreo telemático. Puede hacerlo como medida cautelar en cualquier etapa (artículos 9 y 15).",
      },
      {
        pregunta: "¿Puedo pedir protección antes de que pase algo grave?",
        respuesta:
          "Sí. Ante una situación de riesgo inminente, el tribunal debe adoptar medidas de protección aunque la investigación recién comience (artículo 7 de la Ley 20.066). No esperes a que escale.",
      },
    ],
  },
  {
    slug: "compensacion-economica-en-el-divorcio",
    titulo: "Compensación económica en el divorcio: ¿qué es y cuándo me corresponde?",
    categoria: "familia",
    destacada: false,
    metaTitle: "Compensación económica en el divorcio | Ley Chilena",
    descripcion:
      "Qué es la compensación económica en el divorcio en Chile, cuándo te corresponde si te dedicaste al hogar o los hijos, cómo se calcula y cómo se paga.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Si durante el matrimonio te **dedicaste al hogar o a los hijos** y por eso **no pudiste trabajar o desarrollarte** como el otro, al divorciarte (o anularse el matrimonio) puedes tener derecho a una **compensación económica** ([artículo 61 de la Ley de Matrimonio Civil](/leyes/225128?art=11091)). El monto lo **acuerdan** o lo fija el **juez**, considerando la duración del matrimonio, tu situación y la del otro ([artículo 62](/leyes/225128?art=11092)).",
    contenido: `
## ¿Qué es la compensación económica?
Es un **resarcimiento** que la ley reconoce a quien, por **dedicarse al cuidado de los hijos o a las labores del hogar**, no pudo desarrollar una actividad remunerada o lo hizo en menor medida de lo que quería o podía ([artículo 61 de la Ley de Matrimonio Civil](/leyes/225128?art=11091)). Busca **equilibrar** el menoscabo económico que deja la ruptura.

No es una pensión de alimentos ni un "castigo": es reconocer el **aporte no remunerado** que hiciste al matrimonio.

## ¿Cuándo me corresponde?
Cuando, al **divorciarte** o al declararse la **nulidad**, se da que uno de los cónyuges quedó en **desventaja económica** por haberse dedicado a la familia. Se evalúa caso a caso.

## ¿Cómo se determina el monto?
Para fijar si hay menoscabo y cuánto, el juez considera **especialmente** ([artículo 62](/leyes/225128?art=11092)):
- La **duración del matrimonio** y de la vida en común.
- La **situación patrimonial** de ambos.
- La **edad y estado de salud** del que pide la compensación.
- Su situación **previsional** y de **salud**.
- Su **calificación profesional** y posibilidades de acceder al **trabajo**.
- La **colaboración** que prestó a las actividades del otro cónyuge.

## ¿Cómo se paga?
Puede pagarse en **dinero** (de una vez o en cuotas), o entregando **bienes** o derechos. Si se paga en cuotas, se consideran **alimentos** para efectos de su cobro, lo que refuerza su pago.

## ¿Qué hacer?
1. Reúne antecedentes de tu **aporte al hogar** y de tu **situación laboral/previsional**.
2. En el **divorcio de común acuerdo**, inclúyela en el **acuerdo regulador**.
3. Si no hay acuerdo, **pídela en el juicio de divorcio** (debes solicitarla; el juez no la otorga de oficio sin petición). Asesórate con un **abogado de familia** (o la Corporación de Asistencia Judicial, gratis).
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Quién tiene derecho a compensación económica?",
        respuesta:
          "El cónyuge que, por dedicarse al cuidado de los hijos o al hogar, no pudo trabajar o desarrollarse laboralmente como hubiera querido, y queda en desventaja económica al divorciarse o anularse el matrimonio (artículo 61 de la Ley de Matrimonio Civil).",
      },
      {
        pregunta: "¿Cómo se calcula la compensación económica?",
        respuesta:
          "No hay una fórmula fija: el juez considera la duración del matrimonio, la situación patrimonial, la edad y salud, lo previsional, la calificación profesional y las posibilidades de trabajo del solicitante (artículo 62).",
      },
      {
        pregunta: "¿Es lo mismo que la pensión de alimentos?",
        respuesta:
          "No. La pensión de alimentos cubre las necesidades de los hijos (o del cónyuge en ciertos casos); la compensación económica resarce el menoscabo de quien se dedicó al hogar. Son cosas distintas, aunque la compensación en cuotas se cobra como alimentos.",
      },
      {
        pregunta: "¿Debo pedirla o me la dan automáticamente?",
        respuesta:
          "Debes solicitarla: en el acuerdo regulador (divorcio de común acuerdo) o en la demanda/contestación del juicio de divorcio. Conviene asesorarte para acreditar el menoscabo económico.",
      },
    ],
  },
  {
    slug: "publicidad-enganosa-que-puedo-hacer",
    titulo: "Publicidad engañosa: ¿qué puedo hacer en Chile?",
    categoria: "consumidor",
    destacada: true,
    metaTitle: "Publicidad engañosa: tus derechos | Ley Chilena",
    descripcion:
      "La publicidad engañosa es ilegal en Chile. Si te indujeron a error con un anuncio falso sobre precio, características o condiciones, puedes reclamar en el SERNAC. Cómo hacerlo.",
    fecha: "2026-06-19",
    respuestaCorta:
      "La **publicidad engañosa o falsa es una infracción** a la Ley del Consumidor: comete falta quien, **a sabiendas**, induce a error con un mensaje publicitario sobre el precio, las características, la utilidad o las condiciones de un producto o servicio ([artículo 28 de la Ley 19.496](/leyes/1160403?art=138568)). Puedes **reclamar en el SERNAC** y, además, lo que se promete en la publicidad **obliga** al proveedor.",
    contenido: `
## ¿Qué es la publicidad engañosa?
Es cuando un anuncio te **induce a error** sobre lo que realmente vas a recibir: el **precio**, las **características**, la **utilidad**, la **marca**, el **origen** o las **condiciones** del producto o servicio. Comete infracción quien lo hace **a sabiendas o debiendo saberlo** ([artículo 28 de la Ley 19.496](/leyes/1160403?art=138568)).

## Lo importante: la publicidad OBLIGA
Lo que el proveedor **promete o informa en su publicidad forma parte del contrato**. Si te ofrecieron algo en el anuncio (un precio, una característica, un regalo), **te lo deben cumplir**, aunque después digan que "era un error". Guarda el aviso como prueba.

## Ojo con las "ofertas" y promociones
En toda **promoción u oferta** te deben informar las **bases** y el **plazo** de duración ([artículo 35](/leyes/1160403?art=138577)). Si no lo hacen, o cambian las reglas a mitad de camino, puedes reclamar.

## ¿Qué hacer ante publicidad engañosa?
1. **Guarda la prueba**: captura de pantalla, foto del cartel, el correo o el folleto con la oferta.
2. Exige al proveedor que **cumpla lo publicitado** o te devuelva el dinero.
3. Si se niegan, **reclama en el SERNAC** (sernac.cl): es gratis y media con la empresa.
4. Para indemnización, puedes demandar en el **Juzgado de Policía Local**; si afecta a muchos, el SERNAC puede impulsar una **demanda colectiva**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿La publicidad engañosa es ilegal en Chile?",
        respuesta:
          "Sí. Es una infracción a la Ley del Consumidor inducir a error, a sabiendas, con un mensaje publicitario sobre el precio, características, utilidad o condiciones de un producto o servicio (artículo 28 de la Ley 19.496).",
      },
      {
        pregunta: "Si el precio publicado era 'un error', ¿igual me lo deben respetar?",
        respuesta:
          "Lo que se promete en la publicidad obliga al proveedor y forma parte del contrato. Guarda la prueba del anuncio y exige que lo cumplan; si se niegan, reclama en el SERNAC.",
      },
      {
        pregunta: "¿Qué pasa si una oferta no informa sus bases o plazo?",
        respuesta:
          "Toda promoción u oferta debe informar sus bases y el plazo de duración (artículo 35). Si no lo hace, es reclamable ante el SERNAC.",
      },
      {
        pregunta: "¿Dónde reclamo por publicidad engañosa?",
        respuesta:
          "Primero al proveedor; si no resuelve, en el SERNAC (gratis), que media con la empresa. Para indemnización puedes ir al Juzgado de Policía Local, y el SERNAC puede impulsar demandas colectivas si hay muchos afectados.",
      },
    ],
  },
  {
    slug: "clausulas-abusivas-en-contratos",
    titulo: "Cláusulas abusivas en contratos: ¿qué son y cómo me protegen?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Cláusulas abusivas en contratos | Ley Chilena",
    descripcion:
      "Las cláusulas abusivas en los contratos de adhesión no tienen efecto en Chile. Qué son, ejemplos, y cómo reclamar si una empresa te las quiere aplicar.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Las **cláusulas abusivas** en los contratos de adhesión (esos que firmas sin poder negociar) **no producen ningún efecto** ([artículo 16 de la Ley 19.496](/leyes/1160403?art=138537)). Por ejemplo, las que dejan que la empresa cambie el contrato a su antojo o te cargan todos los riesgos. Además, el contrato debe estar **escrito de forma legible** ([artículo 17](/leyes/1160403?art=138541)). Si te aplican una cláusula abusiva, puedes pedir su **nulidad**.",
    contenido: `
## ¿Qué es un contrato de adhesión?
Es el contrato que la empresa **redacta de antemano** y tú solo **firmas o aceptas** sin poder negociar (planes de telefonía, cuentas bancarias, gimnasios, etc.). Para equilibrar esa desigualdad, la ley **prohíbe ciertas cláusulas**.

## Cláusulas que NO tienen efecto (abusivas)
No producen efecto alguno, entre otras, las cláusulas que ([artículo 16 de la Ley 19.496](/leyes/1160403?art=138537)):
- Permiten a la **empresa** dejar sin efecto o **modificar el contrato a su sola voluntad**.
- Te hacen cargar **todos los riesgos** o te quitan responsabilidad a la empresa por sus fallas.
- Invierten la **carga de la prueba** en tu perjuicio.
- Contienen **espacios en blanco** que no firmaste.
- En general, las que generan un **desequilibrio importante** en tus derechos, contra la buena fe.

## El contrato debe ser legible
Los contratos de adhesión deben estar **escritos de modo claramente legible**, con un tamaño de letra adecuado y en español ([artículo 17](/leyes/1160403?art=138541)). La "letra chica" ilegible juega a tu favor para reclamar.

## ¿Qué hacer?
1. **Guarda tu copia** del contrato (te la deben entregar).
2. Si una cláusula te parece abusiva, puedes **pedir su nulidad**: no te obliga.
3. **Reclama en el SERNAC** (sernac.cl); también existe un procedimiento para **declarar nulas** esas cláusulas.
4. No firmes **espacios en blanco** y exige que te expliquen lo que no entiendas.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta.
`,
    faq: [
      {
        pregunta: "¿Qué es una cláusula abusiva?",
        respuesta:
          "Una estipulación de un contrato de adhesión que genera un desequilibrio importante en tu perjuicio, contra la buena fe: por ejemplo, dejar que la empresa modifique el contrato a su antojo o cargarte todos los riesgos. No producen efecto (artículo 16 de la Ley 19.496).",
      },
      {
        pregunta: "¿Me obliga la 'letra chica' que no se entiende?",
        respuesta:
          "Los contratos de adhesión deben estar escritos de forma claramente legible (artículo 17). Una cláusula ilegible o abusiva puede declararse sin efecto; guarda tu copia y reclama.",
      },
      {
        pregunta: "¿Puede la empresa cambiar el contrato cuando quiera?",
        respuesta:
          "No de forma unilateral y arbitraria: una cláusula que permita a la empresa dejar sin efecto o modificar el contrato a su sola voluntad es abusiva y no produce efecto (artículo 16).",
      },
      {
        pregunta: "¿Qué hago si me aplican una cláusula abusiva?",
        respuesta:
          "Puedes alegar su nulidad (no te obliga) y reclamar en el SERNAC. Existe además un procedimiento para declarar nulas las cláusulas abusivas de los contratos de adhesión.",
      },
    ],
  },
  {
    slug: "cobros-indebidos-e-intereses-excesivos",
    titulo: "Cobros indebidos e intereses excesivos: ¿cómo me defiendo?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Cobros indebidos e intereses excesivos | Ley Chilena",
    descripcion:
      "Cobrar intereses sobre el máximo legal o cargos no pactados es infracción en Chile. Conoce el interés máximo convencional, los cobros prohibidos y cómo reclamar.",
    fecha: "2026-06-19",
    respuestaCorta:
      "Cobrarte **intereses por sobre el máximo legal** (el interés máximo convencional) es **infracción** a la Ley del Consumidor ([artículo 39 de la Ley 19.496](/leyes/1160403?art=138581)). Tampoco te pueden cargar montos **no pactados** ni gastos de cobranza por sobre los topes ([artículo 37](/leyes/1160403?art=138579)). Si te hacen un cobro indebido, **reclama en el SERNAC** y exige la devolución.",
    contenido: `
## Hay un tope legal a los intereses
En Chile existe el **interés máximo convencional**: nadie te puede cobrar intereses por sobre ese límite. El proveedor que lo hace **comete infracción** a la Ley del Consumidor ([artículo 39 de la Ley 19.496](/leyes/1160403?art=138581)). Si tu crédito o tarjeta te cobra intereses desproporcionados, revísalo.

## Cobros que no te pueden hacer
- **Cargos o servicios no pactados** expresamente por ti (no vale el "silencio" como aceptación).
- **Gastos de cobranza** por sobre los topes legales, o antes de los días que la ley señala ([artículo 37](/leyes/1160403?art=138579)).
- Cobros por productos o servicios que **no contrataste** ("ventas atadas" o adicionales que no aceptaste).

## Información clara en el crédito
Cuando te dan crédito, deben informarte de forma **clara y oportuna** el **precio al contado**, la **tasa de interés**, el **costo total del crédito (CTC)** y el detalle de las cuotas ([artículo 37](/leyes/1160403?art=138579)). Si no te informaron bien, es reclamable.

## ¿Qué hacer ante un cobro indebido?
1. **Revisa tu cartola o boleta** y marca el cobro que no reconoces.
2. **Pide por escrito** al proveedor el detalle y la **devolución** de lo cobrado de más.
3. Si no resuelven, **reclama en el SERNAC** (sernac.cl).
4. Para recuperar lo pagado de más o indemnización, puedes demandar en el **Juzgado de Policía Local**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Me pueden cobrar cualquier interés?",
        respuesta:
          "No. Existe el interés máximo convencional, un tope legal. Cobrar intereses por sobre ese máximo es una infracción a la Ley del Consumidor (artículo 39 de la Ley 19.496) y puedes reclamarlo.",
      },
      {
        pregunta: "¿Pueden cobrarme un servicio que no contraté?",
        respuesta:
          "No. No te pueden cargar productos o servicios no pactados expresamente; el silencio no es aceptación. Reclama la devolución al proveedor y, si no resuelve, al SERNAC.",
      },
      {
        pregunta: "¿Cuánto me pueden cobrar de gastos de cobranza?",
        respuesta:
          "Solo dentro de los topes legales y tras los días de atraso que la ley señala (artículo 37). Cobros por sobre eso son indebidos y reclamables.",
      },
      {
        pregunta: "¿Qué hago si me hicieron un cobro indebido?",
        respuesta:
          "Pide por escrito el detalle y la devolución al proveedor; si no resuelve, reclama en el SERNAC. Para recuperar lo pagado de más o indemnización puedes demandar en el Juzgado de Policía Local.",
      },
    ],
  },
  {
    slug: "heredo-las-deudas-de-un-familiar",
    titulo: "¿Heredo las deudas de un familiar fallecido en Chile?",
    categoria: "deudas",
    destacada: true,
    metaTitle: "¿Se heredan las deudas en Chile? | Ley Chilena",
    descripcion:
      "En Chile heredas bienes y deudas, pero puedes protegerte: aceptando con beneficio de inventario respondes solo hasta lo que heredas, o puedes renunciar a la herencia. Cómo hacerlo.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Al heredar, en principio recibes el patrimonio del fallecido: **bienes y también deudas**. Pero puedes **protegerte**: si aceptas la herencia **con beneficio de inventario**, **solo respondes de las deudas hasta el monto de lo que heredas**, nunca con tu propio patrimonio ([artículo 1247 del Código Civil](/leyes/172986?art=1433)). Y si las deudas superan los bienes, puedes **renunciar** a la herencia.",
    contenido: `
## ¿Se heredan las deudas?
Sí: la herencia incluye el **activo (bienes) y el pasivo (deudas)** del fallecido. Pero la ley te da herramientas para **no arriesgar tu propio patrimonio**. No estás obligado a "pagar de tu bolsillo" las deudas de un familiar.

## La protección clave: beneficio de inventario
Si aceptas la herencia **con beneficio de inventario**, **no respondes** de las deudas más allá del **valor de lo que heredas** ([artículo 1247 del Código Civil](/leyes/172986?art=1433)). Es decir: si heredas $5 millones y había $8 millones de deudas, solo respondes hasta esos $5 millones; el resto **no lo pagas tú**.

Para esto se hace un **inventario** de los bienes y deudas. Conviene declararlo expresamente al aceptar.

## ¿Y si las deudas son más que los bienes?
Puedes **renunciar a la herencia**: si renuncias, **no recibes nada** pero **tampoco respondes** de las deudas. Es lo razonable cuando la herencia está "en rojo".

> Ojo: si **usas o dispones** de los bienes del fallecido como dueño antes de decidir, podrías entenderse que aceptaste pura y simplemente (sin beneficio). Por eso conviene **no tocar nada** hasta asesorarte.

## ¿Qué pasa con las deudas con aval o garantía?
Si la deuda tenía un **aval, fiador o codeudor**, el acreedor puede cobrarles a ellos. Y las deudas con **garantía** (hipoteca, prenda) se pagan con ese bien.

## ¿Qué hacer?
1. **No dispongas de los bienes** del fallecido hasta tener claro el panorama.
2. Haz un **inventario** de bienes y deudas.
3. Decide: **aceptar con beneficio de inventario** (si hay más bienes que deudas) o **renunciar** (si hay más deudas).
4. Tramita la **posesión efectiva** de la herencia; asesórate con un abogado o en la **Corporación de Asistencia Judicial** (gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Tengo que pagar las deudas de un familiar fallecido?",
        respuesta:
          "No con tu propio patrimonio si aceptas con beneficio de inventario: respondes solo hasta el valor de lo que heredas (artículo 1247 del Código Civil). Si las deudas superan los bienes, puedes renunciar a la herencia.",
      },
      {
        pregunta: "¿Qué es el beneficio de inventario?",
        respuesta:
          "Es aceptar la herencia limitando tu responsabilidad por las deudas al valor de los bienes heredados. Así nunca pagas las deudas con tu patrimonio personal (artículo 1247 del Código Civil).",
      },
      {
        pregunta: "¿Puedo rechazar una herencia llena de deudas?",
        respuesta:
          "Sí. Puedes renunciar a la herencia: no recibes los bienes, pero tampoco respondes de las deudas. Conviene hacerlo cuando las deudas superan claramente al patrimonio.",
      },
      {
        pregunta: "¿Conviene usar los bienes del fallecido antes de decidir?",
        respuesta:
          "No. Disponer de los bienes como dueño puede interpretarse como aceptación pura y simple, perdiendo el beneficio de inventario. No toques nada hasta asesorarte y hacer el inventario.",
      },
    ],
  },
  {
    slug: "ser-aval-o-fiador-que-riesgo-corro",
    titulo: "Ser aval o fiador: ¿qué riesgo corro al garantizar una deuda?",
    categoria: "deudas",
    destacada: false,
    metaTitle: "Ser aval o fiador: el riesgo | Ley Chilena",
    descripcion:
      "Ser aval, fiador o codeudor solidario significa responder por la deuda de otro con tu propio patrimonio. Qué riesgo corres en Chile y qué revisar antes de firmar.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Ser **aval o fiador** es comprometerte a **responder por la deuda de otra persona** si esta no paga ([artículo 2335 del Código Civil](/leyes/172986?art=2548)). El riesgo es real: el acreedor puede **cobrarte a ti** con tu propio patrimonio (sueldo embargable, bienes). Si firmas como **codeudor solidario**, te pueden cobrar el **total** directamente, sin perseguir primero al deudor principal.",
    contenido: `
## ¿Qué significa ser aval o fiador?
La **fianza** es una obligación accesoria: te comprometes a **responder de una deuda ajena** si el deudor principal no cumple ([artículo 2335 del Código Civil](/leyes/172986?art=2548)). En palabras simples: si tu amigo o familiar no paga, **te pueden cobrar a ti**.

## Aval, fiador, codeudor solidario: ¡no es lo mismo!
- **Fiador simple**: respondes si el deudor no paga, pero podrías exigir que primero le cobren a él (beneficio de excusión), salvo que hayas renunciado a ese derecho.
- **Codeudor solidario / "aval"**: lo más común en créditos y arriendos. Aquí **te pueden cobrar el total directamente**, sin perseguir primero al deudor principal. Es el más riesgoso.

Lee bien el contrato: la mayoría de los créditos te hacen firmar como **codeudor solidario**.

## El riesgo concreto
Si el deudor no paga, el acreedor puede **demandarte a ti**: cobrarte la deuda, sumar intereses y, con sentencia, **embargar** la parte de tu sueldo sobre 56 UF u otros bienes. Tu nombre puede ir a **DICOM**. Y todo por una deuda que **no era tuya**.

## Antes de firmar como aval, revisa
1. **¿De cuánto es la deuda y en qué condiciones?** Vas a responder por todo eso.
2. **¿Firmas como fiador simple o codeudor solidario?** El solidario es mucho más riesgoso.
3. **¿Confías realmente** en que la persona pagará? Si no paga, el problema será tuyo.
4. Si ya eres aval y el deudor dejó de pagar, **habla con el acreedor** y busca una solución; si te pagas tú la deuda, puedes **cobrarle después** al deudor principal.
5. ¿Dudas con tu caso? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Qué riesgo corro al ser aval de alguien?",
        respuesta:
          "Que te cobren a ti la deuda si la persona no paga (artículo 2335 del Código Civil): pueden demandarte, embargar parte de tu sueldo o bienes y dejarte en DICOM, por una deuda que no era tuya.",
      },
      {
        pregunta: "¿Es lo mismo aval que codeudor solidario?",
        respuesta:
          "No. El codeudor solidario (lo más común en créditos) responde por el total de inmediato, sin que cobren primero al deudor principal. El fiador simple puede, en ciertos casos, exigir que primero le cobren al deudor.",
      },
      {
        pregunta: "Si pago como aval, ¿puedo recuperar la plata?",
        respuesta:
          "Sí. Si pagas la deuda como aval o fiador, tienes derecho a cobrarle (repetir) al deudor principal lo que pagaste por él. Guarda los comprobantes del pago.",
      },
      {
        pregunta: "¿Pueden embargarme por ser aval?",
        respuesta:
          "Sí, tras un juicio el acreedor puede embargar la parte de tu sueldo sobre 56 UF u otros bienes, igual que a un deudor directo. Por eso ser aval debe tomarse con seriedad.",
      },
    ],
  },
  {
    slug: "deudas-del-conyuge-respondo-yo",
    titulo: "Deudas del cónyuge: ¿respondo por las deudas de mi pareja?",
    categoria: "deudas",
    destacada: false,
    metaTitle: "¿Respondo por las deudas de mi cónyuge? | Ley Chilena",
    descripcion:
      "Si respondes por las deudas de tu cónyuge en Chile depende del régimen patrimonial: sociedad conyugal, separación de bienes o participación en los gananciales. Diferencias clave.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Depende del **régimen de bienes** del matrimonio. En **separación de bienes**, cada uno responde solo por **sus propias deudas**. En **sociedad conyugal**, muchas deudas las paga la **sociedad** (el patrimonio común) ([artículo 1740 del Código Civil](/leyes/172986?art=1926)), y el marido administra esos bienes ([artículo 1750](/leyes/172986?art=1936)). Las deudas personales anteriores al matrimonio, en general, las paga quien las contrajo.",
    contenido: `
## La respuesta corta: depende del régimen
En Chile, si respondes o no por las deudas de tu cónyuge depende del **régimen patrimonial** que eligieron al casarse:

### Separación total de bienes
Cada cónyuge tiene su **propio patrimonio** y responde **solo por sus propias deudas**. Si tu pareja contrae una deuda a su nombre, **tus bienes no responden** (salvo que hayas firmado como aval o codeudor).

### Sociedad conyugal (régimen por defecto si no eligen otro)
Existe un **patrimonio común** (la "sociedad"). Muchas deudas contraídas durante el matrimonio las paga **la sociedad** con los bienes comunes ([artículo 1740 del Código Civil](/leyes/172986?art=1926)). El **marido administra** los bienes sociales frente a terceros ([artículo 1750](/leyes/172986?art=1936)). Las **deudas personales** anteriores al matrimonio, en general, las paga quien las contrajo, no la sociedad.

### Participación en los gananciales
Durante el matrimonio funciona como **separación** (cada uno con su patrimonio y sus deudas); al terminar, se reparten las ganancias.

## ¿Pueden cobrarme a mí?
Solo si: (a) **firmaste** la deuda (como deudor, aval o codeudor), o (b) en sociedad conyugal, la deuda es de aquellas que responde la **sociedad**. Una deuda **personal** de tu cónyuge, que tú no firmaste, en separación de bienes **no te alcanza**.

## ¿Qué hacer?
1. **Averigua tu régimen**: lo dice tu certificado de matrimonio (sociedad conyugal, separación o participación).
2. Si te cobran por una deuda que **no firmaste** y estás en separación de bienes, **reclámalo**: no corresponde.
3. Si están en sociedad conyugal y te preocupa, evalúa **cambiar de régimen** (se puede pactar separación durante el matrimonio).
4. Asesórate con un abogado de familia o en la **Corporación de Asistencia Judicial** (gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta.
`,
    faq: [
      {
        pregunta: "¿Respondo por las deudas de mi esposo o esposa?",
        respuesta:
          "Depende del régimen. En separación de bienes, solo respondes por tus propias deudas. En sociedad conyugal, muchas deudas del matrimonio las paga el patrimonio común (artículo 1740 del Código Civil). Si no firmaste la deuda y están separados de bienes, no te alcanza.",
      },
      {
        pregunta: "¿Cómo sé qué régimen de bienes tengo?",
        respuesta:
          "Aparece en tu certificado de matrimonio: sociedad conyugal (el régimen por defecto), separación total de bienes o participación en los gananciales. Puedes pedirlo en el Registro Civil.",
      },
      {
        pregunta: "¿Pueden embargar mis bienes por una deuda de mi cónyuge?",
        respuesta:
          "Solo si firmaste esa deuda o si, en sociedad conyugal, es una deuda que responde la sociedad. Una deuda personal de tu cónyuge, que tú no firmaste, no afecta tus bienes en separación de bienes.",
      },
      {
        pregunta: "¿Puedo cambiar de sociedad conyugal a separación de bienes?",
        respuesta:
          "Sí. Durante el matrimonio se puede pactar la separación total de bienes mediante escritura pública, subinscrita al margen del matrimonio. Conviene asesorarse con un abogado.",
      },
    ],
  },
  {
    slug: "reconocer-un-hijo-y-demanda-de-paternidad",
    titulo: "Reconocer un hijo y demanda de paternidad en Chile",
    categoria: "familia",
    destacada: true,
    metaTitle: "Reconocimiento de hijo y demanda de paternidad | Ley Chilena",
    descripcion:
      "Cómo se reconoce a un hijo en Chile y cómo demandar la paternidad si el padre no reconoce. La prueba de ADN, los derechos del hijo y dónde acudir.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Un hijo se reconoce legalmente por el **reconocimiento** de uno o ambos progenitores ([artículo 186 del Código Civil](/leyes/172986?art=360)). Si el padre **no reconoce**, puedes **demandar la paternidad** ante el Tribunal de Familia ([artículo 195](/leyes/172986?art=369)), y la **prueba de ADN** (que realiza el Servicio Médico Legal) es clave ([artículo 199](/leyes/172986?art=373)). Determinada la filiación, el hijo tiene derecho a **apellido, alimentos y herencia**.",
    contenido: `
## ¿Cómo se reconoce a un hijo?
La filiación no matrimonial queda determinada por el **reconocimiento** de uno de los progenitores o de ambos ([artículo 186 del Código Civil](/leyes/172986?art=360)). El reconocimiento se hace, por ejemplo, al **inscribir** al hijo en el Registro Civil o por declaración ante notario.

## Si el padre no reconoce: la demanda de paternidad
La ley permite **investigar la paternidad o maternidad** ([artículo 195 del Código Civil](/leyes/172986?art=369)). Puedes presentar una **demanda de reclamación de filiación** en el **Tribunal de Familia** para que se declare quién es el padre (o la madre).

## La prueba de ADN
La **prueba pericial biológica (ADN)** la realiza el **Servicio Médico Legal** o laboratorios idóneos ([artículo 199](/leyes/172986?art=373)). Es la prueba más potente. Importante: si el demandado **se niega injustificadamente** a hacerse el examen, esa negativa puede tomarse como un **indicio en su contra**.

## ¿Qué gana el hijo al determinarse la filiación?
- El **apellido** del padre o madre.
- Derecho a **pensión de alimentos**.
- Derechos **hereditarios** (es heredero).
- El vínculo legal completo (cuidado, relación directa y regular, etc.).

## ¿Qué hacer?
1. Si el padre **está de acuerdo**, basta el **reconocimiento** en el Registro Civil o ante notario.
2. Si **no reconoce**, presenta una **demanda de reclamación de paternidad** en el Tribunal de Familia (puedes pedir alimentos en el mismo juicio).
3. Pide la **prueba de ADN**; la negativa injustificada juega en contra del demandado.
4. No necesitas pagar abogado si acudes a la **Corporación de Asistencia Judicial** (gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Cómo demando la paternidad de mi hijo?",
        respuesta:
          "Con una demanda de reclamación de filiación en el Tribunal de Familia (artículo 195 del Código Civil). La prueba de ADN del Servicio Médico Legal es clave (artículo 199). Puedes pedir alimentos en el mismo juicio.",
      },
      {
        pregunta: "¿Qué pasa si el padre se niega al examen de ADN?",
        respuesta:
          "La negativa injustificada a someterse a la prueba biológica puede ser considerada por el juez como un indicio en contra del demandado (artículo 199 del Código Civil).",
      },
      {
        pregunta: "¿Qué derechos gana el hijo al reconocerse la paternidad?",
        respuesta:
          "Apellido del padre, derecho a pensión de alimentos, derechos hereditarios y el vínculo legal completo (cuidado personal, relación directa y regular). La filiación da plenos derechos al hijo.",
      },
      {
        pregunta: "¿Necesito abogado para demandar la paternidad?",
        respuesta:
          "El juicio requiere patrocinio de abogado, pero la Corporación de Asistencia Judicial atiende gratis. El reconocimiento voluntario, en cambio, se hace directamente en el Registro Civil o ante notario.",
      },
    ],
  },
  {
    slug: "acuerdo-de-union-civil-que-es-y-que-derechos-da",
    titulo: "Acuerdo de Unión Civil (AUC): ¿qué es y qué derechos da?",
    categoria: "familia",
    destacada: false,
    metaTitle: "Acuerdo de Unión Civil (AUC) en Chile | Ley Chilena",
    descripcion:
      "Qué es el Acuerdo de Unión Civil en Chile, qué derechos da (herencia, salud, bienes) a los convivientes civiles, en qué se diferencia del matrimonio y cómo se hace.",
    fecha: "2026-06-20",
    respuestaCorta:
      "El **Acuerdo de Unión Civil (AUC)** es un contrato entre **dos personas** —del mismo o distinto sexo— que comparten un hogar, para regular su vida en común ([artículo 1 de la Ley 20.830](/leyes/1075210?art=11140)). Da derechos importantes: el conviviente civil es **heredero y legitimario** del otro ([artículo 16](/leyes/1075210?art=11155)), accede a salud como carga, y cada uno conserva sus bienes salvo que pacten lo contrario ([artículo 15](/leyes/1075210?art=11154)).",
    contenido: `
## ¿Qué es el Acuerdo de Unión Civil?
Es un **contrato** entre **dos personas que comparten un hogar**, del mismo o distinto sexo, para **regular los efectos jurídicos** de su vida afectiva en común ([artículo 1 de la Ley 20.830](/leyes/1075210?art=11140)). Quienes lo celebran se llaman **convivientes civiles**. Se celebra en el **Registro Civil**.

## ¿Qué derechos da?
- **Herencia**: el conviviente civil es **heredero intestado y legitimario** del otro, con los mismos derechos que un cónyuge ([artículo 16](/leyes/1075210?art=11155)). Es uno de los efectos más importantes.
- **Salud y previsión**: puede ser **carga** del otro en el sistema de salud y acceder a ciertos beneficios.
- **Estado civil**: pasas a tener el estado civil de "conviviente civil".
- **Bienes**: por regla general, **cada uno conserva sus propios bienes** ([artículo 15](/leyes/1075210?art=11154)), salvo que pacten un régimen de comunidad al celebrarlo.

## ¿En qué se diferencia del matrimonio?
El AUC da muchos derechos parecidos (herencia, salud, bienes), pero **no es idéntico al matrimonio** en todos sus efectos (por ejemplo, en materia de filiación y algunos beneficios). Es una opción más **simple** de formalizar la pareja y proteger derechos.

## ¿Cómo se hace y cómo termina?
- Se **celebra** en el Registro Civil, presentando los documentos requeridos.
- **Termina** por mutuo acuerdo, por voluntad unilateral (notificada), por matrimonio de los convivientes entre sí, o por muerte, entre otras causas.

## ¿Qué hacer?
1. Reúnan sus **documentos de identidad** y agenden hora en el **Registro Civil**.
2. Decidan si quieren un **régimen de comunidad** de bienes o conservar cada uno los suyos.
3. Si les interesa la **protección hereditaria**, el AUC es una vía sencilla para lograrla.
4. ¿Dudas con su caso? Pregúntenle a **AbogaBot** y les explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Qué es el Acuerdo de Unión Civil?",
        respuesta:
          "Un contrato entre dos personas, del mismo o distinto sexo, que comparten un hogar, para regular los efectos jurídicos de su vida en común (artículo 1 de la Ley 20.830). Se celebra en el Registro Civil y crea el estado civil de conviviente civil.",
      },
      {
        pregunta: "¿El conviviente civil hereda?",
        respuesta:
          "Sí. El conviviente civil es heredero intestado y legitimario del otro, con los mismos derechos que tendría un cónyuge (artículo 16 de la Ley 20.830). Es uno de los efectos más relevantes del AUC.",
      },
      {
        pregunta: "¿Qué pasa con los bienes en el AUC?",
        respuesta:
          "Por regla general cada conviviente conserva la propiedad y administración de sus bienes (artículo 15), salvo que al celebrar el acuerdo pacten un régimen de comunidad.",
      },
      {
        pregunta: "¿Es lo mismo que casarse?",
        respuesta:
          "No exactamente. El AUC otorga muchos derechos similares (herencia, salud, bienes), pero no es idéntico al matrimonio en todos sus efectos. Es una forma más simple de formalizar la pareja y proteger derechos.",
      },
    ],
  },
  {
    slug: "gastos-comunes-morosos-pueden-cortar-servicios",
    titulo: "Gastos comunes morosos: ¿pueden cortarme la luz o el agua?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "¿Cortan servicios por gastos comunes impagos? | Ley Chilena",
    descripcion:
      "La Ley de Copropiedad permite suspender la electricidad o telecomunicaciones a quien debe 3 o más cuotas de gastos comunes. Cuándo procede y cómo evitarlo.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Sí, bajo condiciones. Si el condominio **no tiene sistemas propios** para cortar el servicio, las empresas de **electricidad o telecomunicaciones** deben **suspender** el suministro a la unidad cuyo propietario adeude **3 o más cuotas** (seguidas o no) de **gastos comunes**, a solicitud escrita del administrador ([artículo 36 de la Ley 21.442](/leyes/1174663?art=10644)). Por eso conviene **ponerte al día** o acordar un plan de pago antes de llegar a las 3 cuotas.",
    contenido: `
## ¿Pueden cortarme los servicios por no pagar gastos comunes?
Sí, la **Ley de Copropiedad (21.442)** lo permite, pero **solo cumpliendo requisitos**. No es un corte arbitrario: la administración debe seguir el procedimiento legal.

## ¿Cuándo procede el corte?
Según el [artículo 36 de la Ley 21.442](/leyes/1174663?art=10644), si el condominio **no dispone de sistemas propios de control** del paso de los servicios, las **empresas** de **electricidad o telecomunicaciones** deben **suspender** el suministro a las unidades cuyos propietarios estén **morosos en 3 o más cuotas** de gastos comunes (continuas o discontinuas), a **requerimiento escrito del administrador**.

En la práctica, muchos condominios cortan **agua caliente, gas central o el acceso a estacionamientos** cuando hay un sistema centralizado, según su reglamento.

## ¿Es legal que me corten el agua potable?
El corte de servicios básicos es un tema sensible. La norma habla de electricidad y telecomunicaciones a través de las empresas proveedoras; los cortes que haga directamente la administración deben ajustarse al **reglamento de copropiedad** y a la ley. Si crees que el corte es **abusivo o mal hecho**, puedes reclamar.

## ¿Qué hacer si estás moroso (o te cortaron)?
1. **Habla con la administración** antes de llegar a 3 cuotas: pide un **plan o convenio de pago**.
2. Revisa el **reglamento de copropiedad**: ahí están las reglas de cobro y corte de tu condominio.
3. Si te cortaron y pagas o repactas, exige la **reposición** del servicio.
4. Si el corte fue **arbitrario** o sin cumplir el artículo 36, puedes reclamar ante el **Juzgado de Policía Local** o un tribunal.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Desde cuántas cuotas impagas pueden cortar el servicio?",
        respuesta:
          "Desde 3 o más cuotas de gastos comunes, continuas o discontinuas (artículo 36 de la Ley 21.442). La suspensión la hacen las empresas de electricidad o telecomunicaciones a requerimiento escrito del administrador.",
      },
      {
        pregunta: "¿Pueden cortarme el agua por gastos comunes?",
        respuesta:
          "La ley se refiere expresamente a electricidad y telecomunicaciones vía las empresas proveedoras. Otros cortes (agua caliente, gas central) dependen del reglamento de copropiedad y deben ajustarse a la ley; si es abusivo, puedes reclamar.",
      },
      {
        pregunta: "Me cortaron el servicio y ya pagué, ¿deben reponerlo?",
        respuesta:
          "Sí. Si te pusiste al día o firmaste un convenio de pago, debes exigir la reposición del servicio. Si no lo reponen, puedes reclamar ante el Juzgado de Policía Local.",
      },
      {
        pregunta: "¿Cómo evito que me corten los servicios?",
        respuesta:
          "Hablando con la administración antes de acumular 3 cuotas y acordando un plan de pago. Revisa el reglamento de copropiedad de tu condominio, donde están las reglas de cobranza y corte.",
      },
    ],
  },
  {
    slug: "mi-ex-no-me-deja-ver-a-mi-hijo-relacion-directa-y-regular",
    titulo: "Mi ex no me deja ver a mi hijo: relación directa y regular",
    categoria: "familia",
    destacada: true,
    metaTitle: "Mi ex no me deja ver a mi hijo: qué hacer | Ley Chilena",
    descripcion:
      "Si no tienes el cuidado personal de tu hijo, igual tienes derecho a mantener una relación directa y regular (visitas). Qué hacer si tu ex no te deja verlo, según el Código Civil.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Aunque no tengas el cuidado personal, tienes el **derecho y el deber** de mantener una **relación directa y regular** con tu hijo —lo que se conoce como \"visitas\"— ([artículo 229 del Código Civil](/leyes/172986?art=405)). Si tu ex no te deja verlo, puedes pedir al **Tribunal de Familia** que **fije un régimen** de relación directa y regular, y si ya existe uno y no se cumple, exigir su **cumplimiento**.",
    contenido: `
## Tengo derecho a ver a mi hijo aunque no viva con él
Sí. El padre o la madre que **no tiene el cuidado personal** del hijo conserva el **derecho y el deber** de mantener con él una **relación directa y regular** ([artículo 229 del Código Civil](/leyes/172986?art=405)). Es un derecho del **hijo** tanto como del padre o madre: nadie debería impedir ese vínculo sin una razón grave.

## ¿Qué es la "relación directa y regular"?
Es lo que antes se llamaba "régimen de visitas": el contacto periódico (días, horarios, fines de semana, vacaciones) entre el hijo y el progenitor con quien no vive. Se ejerce con la **frecuencia y libertad** acordadas o las que fije el tribunal, siempre pensando en el **bienestar del hijo**.

## Si mi ex no me deja verlo, ¿qué hago?
- Si **no hay un régimen fijado**, puedes pedir al **Tribunal de Familia** que **establezca** la relación directa y regular.
- Si **ya existe** un régimen (por acuerdo o sentencia) y no se cumple, puedes pedir su **cumplimiento** ante el mismo tribunal.
- Antes del juicio suele exigirse una **mediación familiar** (es gratuita en muchos casos): es la vía más rápida y menos desgastante.

## ¿Y si hay riesgo para el niño?
El derecho puede **limitarse o suspenderse** solo cuando sea necesario para **proteger al hijo** (por ejemplo, situaciones de violencia). Esa decisión la toma el **tribunal**, no el otro progenitor por su cuenta.

## ¿Qué hacer?
1. Intenta primero un **acuerdo** y, si no resulta, acude a **mediación familiar**.
2. Si no hay acuerdo, presenta una solicitud en el **Tribunal de Familia** para fijar o hacer cumplir la relación directa y regular.
3. Guarda pruebas de que se te ha impedido el contacto (mensajes, testigos).
4. Puedes pedir ayuda gratis en la **Corporación de Asistencia Judicial**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Tengo derecho a ver a mi hijo si no tengo su cuidado personal?",
        respuesta:
          "Sí. Tienes el derecho y el deber de mantener una relación directa y regular con él (artículo 229 del Código Civil). Es también un derecho del hijo. Nadie puede impedirlo sin una razón grave avalada por un tribunal.",
      },
      {
        pregunta: "¿Qué hago si mi ex no respeta el régimen de visitas?",
        respuesta:
          "Si ya hay un régimen fijado y no se cumple, puedes pedir su cumplimiento al Tribunal de Familia. Si no existe régimen, puedes solicitar que se establezca. Antes suele haber una mediación familiar gratuita.",
      },
      {
        pregunta: "¿Pueden quitarme la relación directa y regular?",
        respuesta:
          "Solo un tribunal puede limitarla o suspenderla, y únicamente cuando sea necesario para proteger al hijo (por ejemplo, riesgo de violencia). El otro progenitor no puede hacerlo por su cuenta.",
      },
      {
        pregunta: "¿Necesito ir a juicio para ver a mi hijo?",
        respuesta:
          "No siempre. Lo ideal es un acuerdo o una mediación familiar (gratuita en muchos casos). Solo si no hay acuerdo se acude al Tribunal de Familia para fijar o hacer cumplir el régimen.",
      },
    ],
  },
  {
    slug: "patria-potestad-quien-decide-y-administra-bienes-del-hijo",
    titulo: "Patria potestad: ¿quién decide y administra los bienes del hijo?",
    categoria: "familia",
    destacada: false,
    metaTitle: "Patria potestad en Chile: qué es y quién la tiene | Ley Chilena",
    descripcion:
      "La patria potestad es el conjunto de derechos y deberes sobre los bienes del hijo. Qué es, quién la ejerce y qué pasa cuando los padres viven separados, según el Código Civil.",
    fecha: "2026-06-20",
    respuestaCorta:
      "La **patria potestad** es el conjunto de **derechos y deberes** que tienen el padre o la madre sobre los **bienes** del hijo no emancipado ([artículo 243 del Código Civil](/leyes/172986?art=420)). Puede ejercerla el padre, la madre o **ambos**, según acuerden ([artículo 244](/leyes/172986?art=421)); y si los padres **viven separados**, la ejerce quien tiene el **cuidado personal** del hijo, o ambos ([artículo 245](/leyes/172986?art=422)).",
    contenido: `
## ¿Qué es la patria potestad?
Es el conjunto de **derechos y deberes** que la ley reconoce al padre o a la madre sobre los **bienes** de sus hijos **no emancipados** ([artículo 243 del Código Civil](/leyes/172986?art=420)). Ojo: la patria potestad se refiere sobre todo a los **bienes** del hijo (administrarlos, representarlo legalmente), distinta del **cuidado personal**, que es la crianza y el día a día.

## ¿Quién la ejerce?
La patria potestad la ejerce el **padre, la madre o ambos conjuntamente**, según lo que acuerden por escritura pública o acta ante el Registro Civil ([artículo 244 del Código Civil](/leyes/172986?art=421)). Si no hay acuerdo, la ley y, en su caso, el tribunal determinan a quién corresponde.

## ¿Y si los padres viven separados?
Si los padres están separados, la patria potestad la ejerce **quien tenga el cuidado personal** del hijo, o **ambos** si así lo acuerdan ([artículo 245 del Código Civil](/leyes/172986?art=422)). Es decir, suele seguir al progenitor con quien vive el niño, salvo pacto distinto.

## ¿Para qué sirve en la práctica?
Quien tiene la patria potestad:
- **Administra** los bienes del hijo (por ejemplo, una herencia o una propiedad a su nombre).
- Lo **representa legalmente** en actos que lo requieran.
- Tiene el **derecho legal de goce** sobre ciertos bienes del hijo, con los límites de la ley.

## ¿Qué hacer?
1. Si vas a **acordar** quién ejerce la patria potestad, hazlo por **escritura pública o acta** en el Registro Civil.
2. Si hay **conflicto**, el **Tribunal de Familia** puede resolver a quién corresponde.
3. Recuerda distinguir **patria potestad** (bienes) de **cuidado personal** (crianza) y de **relación directa y regular** (visitas): son cosas distintas.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Qué es la patria potestad?",
        respuesta:
          "Es el conjunto de derechos y deberes del padre o la madre sobre los bienes del hijo no emancipado (artículo 243 del Código Civil): administrarlos y representarlo legalmente. Es distinta del cuidado personal, que es la crianza.",
      },
      {
        pregunta: "¿Quién tiene la patria potestad si los padres están separados?",
        respuesta:
          "Por regla general, quien tiene el cuidado personal del hijo, o ambos padres si así lo acuerdan (artículo 245 del Código Civil). Se puede pactar de otra forma por escritura pública o acta en el Registro Civil.",
      },
      {
        pregunta: "¿Es lo mismo patria potestad que cuidado personal?",
        respuesta:
          "No. La patria potestad se refiere a los bienes del hijo y su representación legal. El cuidado personal es la crianza y el día a día. La relación directa y regular son las visitas. Son tres conceptos distintos.",
      },
      {
        pregunta: "¿Se puede acordar que ambos padres ejerzan la patria potestad?",
        respuesta:
          "Sí. El padre y la madre pueden acordar ejercerla conjuntamente mediante escritura pública o acta ante el Registro Civil (artículo 244 del Código Civil).",
      },
    ],
  },
  {
    slug: "que-regimen-patrimonial-me-conviene-al-casarme",
    titulo: "¿Qué régimen de bienes me conviene al casarme en Chile?",
    categoria: "familia",
    destacada: true,
    metaTitle: "Régimen de bienes del matrimonio: cuál elegir | Ley Chilena",
    descripcion:
      "Al casarte en Chile eliges entre sociedad conyugal, separación de bienes o participación en los gananciales. Diferencias clave para decidir cuál te conviene.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Al casarte eliges entre tres regímenes: **sociedad conyugal**, **separación total de bienes** o **participación en los gananciales**. Si **no eliges**, la ley aplica por defecto la **sociedad conyugal** ([artículo 1718 del Código Civil](/leyes/172986?art=1904)). En **separación** cada uno mantiene y administra lo suyo; en **sociedad conyugal** se forma un patrimonio común que administra el marido; la **participación** funciona como separación y al final se reparten las ganancias.",
    contenido: `
## Los tres regímenes patrimoniales del matrimonio
En Chile, al casarte defines cómo se manejan los **bienes y las deudas** del matrimonio. Hay tres opciones, y la decisión tiene efectos importantes.

### 1. Sociedad conyugal (régimen por defecto)
Si los novios **no dicen nada**, por el solo hecho del matrimonio queda contraída la **sociedad conyugal** ([artículo 1718 del Código Civil](/leyes/172986?art=1904)). Se forma un **patrimonio común** (la "sociedad"), que **administra el marido**. Muchos bienes adquiridos durante el matrimonio entran a ese patrimonio común.

### 2. Separación total de bienes
Cada cónyuge **mantiene, administra y dispone** libremente de **sus propios bienes**, y responde solo de **sus propias deudas**. Es el régimen que da más **independencia patrimonial** a cada uno.

### 3. Participación en los gananciales
Durante el matrimonio funciona como **separación** (cada uno con su patrimonio). Pero al **terminar**, se comparan las ganancias obtenidas por cada uno y se **reparten por igual** las diferencias. Combina independencia durante y reparto justo al final.

## ¿Cuál me conviene?
Depende de tu situación: si uno tiene **negocios o deudas** y quieren proteger el patrimonio del otro, la **separación** suele ser más segura. Si quieren **compartir** lo construido, la sociedad conyugal o la participación pueden encajar mejor. No hay una respuesta única.

## ¿Se puede cambiar después?
Sí. Durante el matrimonio se puede **cambiar de régimen** (por ejemplo, de sociedad conyugal a separación) mediante **escritura pública** subinscrita al margen del matrimonio.

## ¿Qué hacer?
1. Conversen qué buscan: **proteger** patrimonios separados o **compartir** lo construido.
2. Definan el régimen al **casarse** (en el Registro Civil) o cámbienlo después por escritura.
3. Si tienen dudas o patrimonios complejos, asesórense con un **abogado de familia**.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Qué régimen aplica si no elijo ninguno al casarme?",
        respuesta:
          "La sociedad conyugal. Por el solo hecho del matrimonio, a falta de pacto en contrario, queda contraída la sociedad conyugal (artículo 1718 del Código Civil).",
      },
      {
        pregunta: "¿Cuál es la diferencia entre separación y sociedad conyugal?",
        respuesta:
          "En separación total cada cónyuge mantiene y administra sus propios bienes y responde solo por sus deudas. En sociedad conyugal se forma un patrimonio común que administra el marido.",
      },
      {
        pregunta: "¿Qué es la participación en los gananciales?",
        respuesta:
          "Durante el matrimonio funciona como separación de bienes; al terminar, se comparan las ganancias de cada uno y se reparten por igual las diferencias. Combina independencia y reparto final.",
      },
      {
        pregunta: "¿Puedo cambiar de régimen después de casado?",
        respuesta:
          "Sí. Se puede cambiar durante el matrimonio (por ejemplo, de sociedad conyugal a separación total de bienes) mediante escritura pública subinscrita al margen del acta de matrimonio.",
      },
    ],
  },
  {
    slug: "el-acreedor-no-quiere-recibir-mi-pago-consignacion",
    titulo: "El acreedor no quiere recibir mi pago: el pago por consignación",
    categoria: "deudas",
    destacada: false,
    metaTitle: "El acreedor no acepta mi pago: consignación | Ley Chilena",
    descripcion:
      "Si quieres pagar una deuda y el acreedor se niega a recibir o no aparece, puedes liberarte con el pago por consignación, depositando lo que debes. Cómo funciona según el Código Civil.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Si quieres pagar y el acreedor **se niega a recibir** o **no aparece**, no quedas atrapado: puedes usar el **pago por consignación**, que es **depositar la cosa que debes** para liberarte de la obligación ([artículo 1599 del Código Civil](/leyes/172986?art=1785)). Así pagas válidamente aunque el acreedor no coopere, y evitas seguir acumulando intereses o caer en mora.",
    contenido: `
## ¿Qué pasa si quiero pagar y no me reciben?
A veces el acreedor **se niega a recibir** el pago (por ejemplo, para que sigas debiendo intereses o para alegar incumplimiento) o simplemente **no aparece**. La ley te protege: existe el **pago por consignación**.

## ¿Qué es el pago por consignación?
Es el **depósito de la cosa que se debe**, hecho ante la **repugnancia o no comparecencia del acreedor** a recibirla ([artículo 1599 del Código Civil](/leyes/172986?art=1785)). En la práctica, consignas (depositas) lo que debes —normalmente en la cuenta del tribunal o como la ley indique— y eso vale como **pago válido**, aunque el acreedor no lo reciba en persona.

## ¿Para qué me sirve?
- Te **liberas de la deuda** (extingues la obligación) aunque el acreedor no coopere.
- **Detienes los intereses** y evitas caer en **mora** por algo que no es culpa tuya.
- Te deja una **prueba** de que cumpliste con tu parte.

## ¿Cómo se hace?
El pago por consignación tiene un **procedimiento** (oferta del pago y luego la consignación). Por eso conviene **asesorarse**: un pequeño error de forma puede restarle efecto. Para montos o deudas relevantes, lo mejor es hacerlo con apoyo legal.

## ¿Qué hacer?
1. Deja por escrito tu **intención de pagar** y guarda la prueba de que el acreedor no recibió.
2. Infórmate del **procedimiento de consignación** (oferta + depósito) que corresponde a tu caso.
3. Para deudas importantes, pide apoyo en la **Corporación de Asistencia Judicial** (gratis) o con un abogado.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Qué hago si el acreedor no quiere recibir mi pago?",
        respuesta:
          "Puedes usar el pago por consignación: depositar lo que debes para liberarte de la obligación, aunque el acreedor se niegue a recibir o no aparezca (artículo 1599 del Código Civil).",
      },
      {
        pregunta: "¿La consignación me libera de la deuda?",
        respuesta:
          "Sí, hecha correctamente, el pago por consignación extingue la obligación y detiene los intereses, porque equivale a un pago válido aunque el acreedor no lo reciba en persona.",
      },
      {
        pregunta: "¿Puedo consignar yo solo o necesito ayuda?",
        respuesta:
          "Tiene un procedimiento (oferta y consignación) y un error de forma puede restarle efecto. Para deudas relevantes conviene asesorarse con la Corporación de Asistencia Judicial o un abogado.",
      },
      {
        pregunta: "¿Para qué me sirve consignar si igual puedo guardar la plata?",
        respuesta:
          "Porque guardar la plata no extingue la deuda ni detiene los intereses. La consignación sí: te libera de la obligación y deja prueba de que cumpliste, aunque el acreedor no coopere.",
      },
    ],
  },
  {
    slug: "me-vendieron-mi-deuda-a-otra-empresa-cesion-de-credito",
    titulo: "Me vendieron mi deuda a otra empresa: la cesión de crédito",
    categoria: "deudas",
    destacada: true,
    metaTitle: "Me vendieron mi deuda a otra empresa: qué hacer | Ley Chilena",
    descripcion:
      "Cuando una empresa vende tu deuda a otra (cobranza), esa cesión solo te afecta si te la notifican. Qué dice el Código Civil y cómo te protege.",
    fecha: "2026-06-20",
    respuestaCorta:
      "Es legal que una empresa **venda tu deuda** a otra (cesión de crédito), pero esa cesión **no produce efecto contra ti mientras no te sea notificada** o la aceptes ([artículo 1902 del Código Civil](/leyes/172986?art=2115)). Es decir: si nadie te avisó formalmente del cambio de acreedor, puedes **exigir que te lo notifiquen** antes de pagarle a la nueva empresa. Además, la nueva empresa **no puede cobrarte más** de lo que realmente debes.",
    contenido: `
## ¿Pueden vender mi deuda sin avisarme?
Sí pueden venderla, pero **para que te afecte deben notificarte**. La venta de una deuda se llama **cesión de crédito**: el acreedor original (cedente) traspasa el crédito a otro (cesionario), normalmente una empresa de cobranza.

## La regla que te protege: la notificación
La cesión **no produce efecto contra el deudor ni contra terceros mientras no haya sido notificada** por el nuevo acreedor al deudor, o aceptada por este ([artículo 1902 del Código Civil](/leyes/172986?art=2115)). Entre las empresas, la cesión vale con la **entrega del título** ([artículo 1901](/leyes/172986?art=2114)); pero **frente a ti**, solo cuenta cuando **te avisan formalmente**.

En la práctica: si una empresa nueva te cobra y **nunca te notificaron** el traspaso, puedes pedir que **acrediten la cesión** antes de pagarles.

## ¿Cambian las condiciones de mi deuda?
No. La nueva empresa **adquiere la misma deuda**, con las mismas condiciones: **no puede cobrarte más** de lo que debías, ni inventar intereses o gastos que no correspondían. Si la deuda ya estaba **prescrita**, sigue prescrita aunque la vendan.

## ¿Y la cobranza?
La empresa que compró la deuda debe respetar las **reglas de cobranza** (no acoso, horarios, no amenazas, no informar a terceros tu deuda). El cambio de acreedor **no le da más poderes** para cobrar.

## ¿Qué hacer?
1. Pide que te **notifiquen y acrediten** la cesión antes de pagarle a una empresa nueva.
2. Verifica el **monto**: debe ser el mismo que debías, sin cobros extra.
3. Revisa si la deuda pudo **prescribir**; la venta no reinicia el plazo.
4. Si hay **acoso de cobranza**, guarda evidencia y reclama (SERNAC si es un proveedor regulado).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Es legal que vendan mi deuda a otra empresa?",
        respuesta:
          "Sí, se llama cesión de crédito. Pero no produce efecto contra ti mientras no te la notifiquen o la aceptes (artículo 1902 del Código Civil). Puedes exigir que te acrediten la cesión antes de pagar.",
      },
      {
        pregunta: "¿La nueva empresa puede cobrarme más que la deuda original?",
        respuesta:
          "No. Adquiere la misma deuda con las mismas condiciones: no puede cobrarte más de lo que debías ni agregar intereses o gastos indebidos. Si la deuda estaba prescrita, sigue prescrita.",
      },
      {
        pregunta: "Me cobra una empresa que no conozco, ¿qué hago?",
        respuesta:
          "Pídele que acredite la cesión (que demuestre que te notificaron el traspaso) antes de pagarle. Verifica que el monto sea el que realmente debías y revisa si la deuda pudo prescribir.",
      },
      {
        pregunta: "¿La venta de la deuda reinicia el plazo de prescripción?",
        respuesta:
          "No. La cesión no reinicia el plazo de prescripción; la deuda conserva su antigüedad y condiciones. Si ya estaba prescrita, lo sigue estando aunque cambie de acreedor.",
      },
    ],
  },
  {
    slug: "semana-corrida-pago-del-domingo",
    titulo: "Semana corrida: ¿me deben pagar el domingo?",
    categoria: "laboral",
    destacada: false,
    metaTitle: "Semana corrida: el pago del día domingo | Ley Chilena",
    descripcion:
      "Si te pagan por día u hora, la semana corrida te da derecho a que también te paguen el domingo y los festivos. Cómo se calcula y a quién aplica, según el Código del Trabajo.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Si te remuneran **exclusivamente por día** (o por hora), tienes derecho a la **semana corrida**: que te paguen también el **domingo y los festivos** de esa semana, calculados como el **promedio de lo ganado** en los días trabajados ([artículo 45 del Código del Trabajo](/leyes/207436?art=3078)). Es plata que mucha gente no cobra por desconocerla.",
    contenido: `
## ¿Qué es la semana corrida?
Es el derecho de quien trabaja **remunerado por día** a que se le pague también el **descanso semanal** (domingo) y los **festivos**, aunque esos días no se trabajen ([artículo 45 del Código del Trabajo](/leyes/207436?art=3078)). La idea es que el descanso no signifique perder ingreso.

## ¿Cómo se calcula?
El pago del domingo/festivo equivale al **promedio de lo devengado** en los días efectivamente trabajados de la semana. Si ganas distinto cada día (por trato, comisiones por venta, etc.), se promedia.

También aplica, en lo pertinente, a la parte **variable** del sueldo de quienes tienen sueldo mensual más comisiones, respecto de esos componentes variables.

## ¿A quién aplica?
- Trabajadores con remuneración **exclusivamente por día**.
- En lo que corresponde, a los **componentes variables** (comisiones, tratos) de quienes además tienen sueldo base.

No aplica a quien ya tiene un **sueldo mensual fijo** que de por sí remunera el mes completo (incluidos domingos).

## ¿Qué hacer?
1. Revisa tu **liquidación**: ¿te están pagando el domingo y los festivos cuando te pagan por día o por comisiones?
2. Si no, reclámalo por escrito al empleador.
3. Si no resuelve, denuncia en la **Dirección del Trabajo** (dt.gob.cl) o demanda en el Juzgado del Trabajo.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Quién tiene derecho a semana corrida?",
        respuesta:
          "Quien es remunerado exclusivamente por día (artículo 45 del Código del Trabajo), y también, en lo pertinente, los componentes variables (comisiones, tratos) de quienes tienen sueldo base más variable.",
      },
      {
        pregunta: "¿Cómo se calcula el pago del domingo?",
        respuesta:
          "Como el promedio de lo devengado en los días efectivamente trabajados de la semana. Ese promedio se paga por el domingo y los festivos de esa semana.",
      },
      {
        pregunta: "Tengo sueldo mensual fijo, ¿me corresponde?",
        respuesta:
          "Por el sueldo fijo no, porque ya remunera el mes completo. Pero si además ganas comisiones o tratos, la semana corrida puede aplicar sobre esos componentes variables.",
      },
      {
        pregunta: "¿Dónde reclamo si no me la pagan?",
        respuesta:
          "Primero por escrito al empleador; si no resuelve, en la Dirección del Trabajo (dt.gob.cl) o demandando en el Juzgado del Trabajo.",
      },
    ],
  },
  {
    slug: "accidente-del-trabajo-obligaciones-del-empleador",
    titulo: "Accidente del trabajo: ¿qué debe hacer el empleador?",
    categoria: "laboral",
    destacada: true,
    metaTitle: "Accidente del trabajo: tus derechos | Ley Chilena",
    descripcion:
      "El empleador está obligado a proteger tu vida y salud en el trabajo. Qué pasa si sufres un accidente laboral, a qué tienes derecho y qué hacer, según el Código del Trabajo.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El empleador está **obligado por ley a tomar todas las medidas necesarias para proteger eficazmente la vida y salud** de sus trabajadores ([artículo 184 del Código del Trabajo](/leyes/207436?art=3353)). Si sufres un **accidente del trabajo**, tienes derecho a **atención médica gratuita** y a las prestaciones del seguro de accidentes laborales; si el accidente ocurrió por falta de medidas de seguridad, el empleador puede responder además por los **daños**.",
    contenido: `
## La obligación del empleador
El [artículo 184 del Código del Trabajo](/leyes/207436?art=3353) es claro: el empleador debe **proteger eficazmente la vida y la salud** de quienes trabajan, manteniendo condiciones adecuadas de higiene y seguridad y entregando los implementos necesarios para prevenir accidentes y enfermedades.

## ¿Qué es un accidente del trabajo?
Es toda lesión que sufres **a causa o con ocasión del trabajo** y que te produce incapacidad o muerte. También cuenta el **accidente de trayecto** (de ida o vuelta entre tu casa y el trabajo).

## ¿A qué tienes derecho?
Por el **seguro de accidentes del trabajo** (que paga el empleador), tienes derecho a:
- **Atención médica gratuita** hasta tu recuperación.
- **Subsidio** mientras dura la licencia (reemplaza tu sueldo).
- **Indemnización o pensión** si quedas con una incapacidad permanente.

Si el accidente ocurrió porque el empleador **no cumplió** las medidas de seguridad del artículo 184, además puedes **demandar los perjuicios** (daño moral, lucro cesante).

## ¿Qué hacer?
1. **Avisa de inmediato** y haz que te deriven al organismo del seguro (mutual o ISL).
2. Pide que el accidente quede **registrado** (DIAT — Declaración Individual de Accidente del Trabajo).
3. Guarda **constancia** de las condiciones inseguras si las hubo (fotos, testigos).
4. Si crees que hubo falta de seguridad, asesórate: puedes reclamar indemnización.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Qué obligación tiene el empleador en seguridad?",
        respuesta:
          "Tomar todas las medidas necesarias para proteger eficazmente la vida y salud de los trabajadores, con condiciones de higiene y seguridad e implementos de prevención (artículo 184 del Código del Trabajo).",
      },
      {
        pregunta: "¿El accidente de trayecto cuenta como accidente del trabajo?",
        respuesta:
          "Sí. El accidente ocurrido en el trayecto directo de ida o regreso entre tu casa y el trabajo se considera accidente del trabajo y da derecho a las prestaciones del seguro.",
      },
      {
        pregunta: "¿La atención médica la pago yo?",
        respuesta:
          "No. La atención médica por un accidente del trabajo es gratuita y la cubre el seguro de accidentes laborales (mutual o ISL), que financia el empleador.",
      },
      {
        pregunta: "¿Puedo demandar si hubo falta de seguridad?",
        respuesta:
          "Sí. Si el accidente ocurrió porque el empleador no cumplió su deber de protección (artículo 184), puedes demandar la indemnización de los perjuicios, además de las prestaciones del seguro.",
      },
    ],
  },
  {
    slug: "descanso-dominical-y-festivos-derechos",
    titulo: "Descanso dominical y festivos: ¿cuándo me deben dar libre?",
    categoria: "laboral",
    destacada: false,
    metaTitle: "Descanso dominical y festivos en Chile | Ley Chilena",
    descripcion:
      "Por regla general el domingo y los festivos son de descanso. Quiénes son la excepción (comercio, turnos) y qué compensación les corresponde, según el Código del Trabajo.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Por regla general, los **domingos y festivos son días de descanso** ([artículo 35 del Código del Trabajo](/leyes/207436?art=3058)). Hay **excepciones** (comercio, turnos continuos, etc.) en que sí se puede trabajar esos días ([artículo 38](/leyes/207436?art=3063)), pero a cambio corresponde un **día de descanso compensatorio** y, en el comercio, al menos **dos domingos libres al mes**.",
    contenido: `
## La regla general
Los **domingos** y los días que la ley declara **festivos** son de **descanso** ([artículo 35 del Código del Trabajo](/leyes/207436?art=3058)). Es la regla base: salvo excepción, no se trabaja esos días.

## Las excepciones (quiénes sí trabajan domingo)
El [artículo 38 del Código del Trabajo](/leyes/207436?art=3063) exceptúa a ciertas actividades que por su naturaleza no pueden parar: **comercio, turnos continuos, transporte, hotelería, salud, espectáculos**, entre otras.

Pero esas excepciones tienen **contrapartidas**:
- Un **día de descanso compensatorio** por cada domingo y festivo trabajado.
- En el **comercio**, derecho a que al menos **dos de los domingos** del mes sean de descanso.

## ¿Y si trabajo un festivo?
Si estás dentro de las excepciones, trabajar el domingo/festivo te da el **descanso compensatorio**. Además, según tu contrato y la actividad, puede corresponder un **recargo** en la remuneración por esas horas; revisa tu contrato y la normativa de tu rubro.

## ¿Qué hacer?
1. Verifica si tu actividad está dentro de las **excepciones** del artículo 38.
2. Lleva la cuenta de tus **domingos y festivos trabajados** y de los **compensatorios** que te dieron.
3. Si en el comercio no te dan los **2 domingos libres al mes**, reclámalo.
4. Denuncia incumplimientos en la **Dirección del Trabajo** (dt.gob.cl).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿El domingo es siempre día de descanso?",
        respuesta:
          "Por regla general sí (artículo 35 del Código del Trabajo). Pero hay actividades exceptuadas (comercio, turnos, transporte, salud, etc.) que pueden trabajar el domingo con descanso compensatorio (artículo 38).",
      },
      {
        pregunta: "Si trabajo en comercio, ¿cuántos domingos libres tengo?",
        respuesta:
          "Al menos dos domingos de descanso al mes, además del día compensatorio por cada domingo o festivo trabajado (artículo 38 del Código del Trabajo).",
      },
      {
        pregunta: "¿Me deben dar un día libre por trabajar el festivo?",
        respuesta:
          "Sí, si estás en las actividades exceptuadas: corresponde un día de descanso compensatorio por cada domingo y festivo trabajado.",
      },
      {
        pregunta: "¿Dónde reclamo si no respetan mi descanso?",
        respuesta:
          "En la Dirección del Trabajo (dt.gob.cl), que fiscaliza el cumplimiento de las normas de descanso y puede cursar multas al empleador.",
      },
    ],
  },
  {
    slug: "postnatal-y-permiso-parental-cuanto-dura",
    titulo: "Postnatal y permiso parental: ¿cuánto dura y quién puede tomarlo?",
    categoria: "laboral",
    destacada: true,
    metaTitle: "Postnatal y permiso parental en Chile | Ley Chilena",
    descripcion:
      "El descanso de maternidad y el permiso postnatal parental protegen a madres y, en parte, a padres. Cuánto duran, cómo se toman y el subsidio, según el Código del Trabajo.",
    fecha: "2026-06-21",
    respuestaCorta:
      "La trabajadora tiene **descanso de maternidad**: **6 semanas antes** del parto (prenatal) y **12 semanas después** (postnatal) ([artículo 195 del Código del Trabajo](/leyes/207436?art=3365)). A eso se suma el **permiso postnatal parental** de **12 semanas** adicionales (o 18 a media jornada), parte del cual puede traspasarse al **padre** ([artículo 197 bis](/leyes/207436?art=3368)). Durante estos descansos se paga un **subsidio** (no lo paga el empleador).",
    contenido: `
## El descanso de maternidad
Toda trabajadora tiene derecho a un **descanso de maternidad** de **6 semanas antes del parto (prenatal)** y **12 semanas después (postnatal)** ([artículo 195 del Código del Trabajo](/leyes/207436?art=3365)). Es **irrenunciable** y está protegido por el **fuero maternal**.

## El permiso postnatal parental
Terminado el postnatal de 12 semanas, viene el **permiso postnatal parental** de **12 semanas adicionales** ([artículo 197 bis del Código del Trabajo](/leyes/207436?art=3368)). Puedes tomarlo de dos formas:
- **12 semanas completas** con descanso total, o
- **18 semanas a media jornada** (trabajando media jornada, con medio subsidio).

## ¿El padre puede tomar parte?
Sí. A partir de la **séptima semana** del postnatal parental, la madre puede **traspasar semanas al padre**, que las toma con su propio fuero y subsidio. Es una forma de compartir el cuidado.

## ¿Quién paga durante el descanso?
No lo paga el empleador: se paga un **subsidio maternal** (con cargo al sistema), calculado sobre tus remuneraciones, con un tope. Por eso el empleador no "pierde" el sueldo de esos meses.

## ¿Qué hacer?
1. Presenta la **licencia médica** correspondiente para el prenatal/postnatal.
2. Decide cómo tomar el **postnatal parental** (completo o media jornada).
3. Si quieres compartir, coordina el **traspaso de semanas al padre** desde la semana 7.
4. Recuerda el **fuero**: no te pueden despedir sin autorización del juez.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Cuánto dura el postnatal en Chile?",
        respuesta:
          "El postnatal es de 12 semanas después del parto (artículo 195 del Código del Trabajo), más un permiso postnatal parental de 12 semanas adicionales (o 18 a media jornada) según el artículo 197 bis.",
      },
      {
        pregunta: "¿El padre puede usar parte del postnatal parental?",
        respuesta:
          "Sí. Desde la séptima semana del permiso postnatal parental, la madre puede traspasar semanas al padre, que las toma con su propio fuero y subsidio.",
      },
      {
        pregunta: "¿Quién me paga durante el postnatal?",
        respuesta:
          "Un subsidio maternal (no el empleador), calculado sobre tus remuneraciones con un tope. Por eso el descanso no implica perder tu ingreso.",
      },
      {
        pregunta: "¿Pueden despedirme estando con postnatal?",
        respuesta:
          "No sin autorización judicial: el fuero maternal protege a la trabajadora durante el embarazo y hasta un año después del postnatal. Un despido sin desafuero no produce efecto.",
      },
    ],
  },
  {
    slug: "contrato-a-plazo-fijo-cuando-pasa-a-indefinido",
    titulo: "Contrato a plazo fijo: ¿cuándo se transforma en indefinido?",
    categoria: "laboral",
    destacada: false,
    metaTitle: "Contrato a plazo fijo: cuándo pasa a indefinido | Ley Chilena",
    descripcion:
      "Un contrato a plazo fijo puede transformarse en indefinido si sigues trabajando tras el vencimiento o por la regla de las renovaciones. Cómo funciona, según el Código del Trabajo.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El contrato a plazo fijo **termina al vencer el plazo** ([artículo 159 N°4 del Código del Trabajo](/leyes/207436?art=3293)), pero se **transforma en indefinido** si: sigues trabajando **con conocimiento del empleador** después del vencimiento; o si te hacen una **segunda renovación**; o si en **15 meses** prestaste servicios por **12 meses o más** con dos o más contratos a plazo.",
    contenido: `
## ¿Cuánto puede durar un contrato a plazo fijo?
El plazo fijo es una excepción: por regla general no puede exceder de **un año** (dos años para gerentes o personas con título profesional). Vencido el plazo, el contrato **termina** ([artículo 159 N°4 del Código del Trabajo](/leyes/207436?art=3293)).

## ¿Cuándo se vuelve indefinido?
La ley evita el abuso del plazo fijo: el contrato **se transforma en indefinido** cuando ocurre cualquiera de estas situaciones:
- **Sigues trabajando** después del vencimiento **con conocimiento del empleador** (continuación de servicios).
- Te hacen una **segunda renovación** del contrato a plazo.
- En un período de **15 meses**, prestaste servicios por **12 meses o más** en virtud de **dos o más contratos** a plazo.

En esos casos, aunque el papel diga "plazo fijo", **legalmente eres indefinido**, con todos los derechos de un contrato indefinido (incluida la indemnización por años de servicio si te despiden por necesidades de la empresa).

## ¿Por qué importa?
Un contrato indefinido te da **más estabilidad** y derecho a **indemnización por años de servicio** si te despiden por el artículo 161. El plazo fijo, al terminar por vencimiento, **no genera** esa indemnización.

## ¿Qué hacer?
1. Cuenta tus **contratos y fechas**: ¿hubo segunda renovación o 12 meses en 15?
2. Si seguiste trabajando tras el vencimiento, guarda pruebas (asistencia, pagos).
3. Si te tratan como plazo fijo cuando ya eres indefinido, reclámalo (Dirección del Trabajo o tribunal).
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Cuánto puede durar un contrato a plazo fijo?",
        respuesta:
          "Por regla general hasta un año (dos años para gerentes o profesionales con título). Vencido el plazo, el contrato termina (artículo 159 N°4 del Código del Trabajo), salvo que se haya transformado en indefinido.",
      },
      {
        pregunta: "¿Cuándo un plazo fijo se vuelve indefinido?",
        respuesta:
          "Si sigues trabajando tras el vencimiento con conocimiento del empleador, si hay una segunda renovación, o si en 15 meses trabajaste 12 o más con dos o más contratos a plazo.",
      },
      {
        pregunta: "¿Tengo indemnización si termina mi plazo fijo?",
        respuesta:
          "Si termina por el solo vencimiento del plazo, en general no hay indemnización por años de servicio. Pero si el contrato ya se transformó en indefinido, sí tienes esos derechos.",
      },
      {
        pregunta: "¿Cómo pruebo que ya soy indefinido?",
        respuesta:
          "Con tus contratos y fechas, comprobantes de pago y registros de asistencia que muestren la continuación de servicios o el cumplimiento de la regla de las renovaciones / 12 meses en 15.",
      },
    ],
  },
  {
    slug: "contrato-de-arriendo-que-debe-tener",
    titulo: "Contrato de arriendo: qué debe tener y por qué hacerlo por escrito",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "Contrato de arriendo: qué debe incluir | Ley Chilena",
    descripcion:
      "Qué es un contrato de arriendo, qué cláusulas debe tener y por qué conviene escriturarlo. El arriendo es válido aunque sea de palabra, pero por escrito te protege mucho más.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El **arrendamiento** es el contrato en que una parte entrega el goce de una cosa y la otra paga un precio por ello ([artículo 1915 del Código Civil](/leyes/172986?art=2128)). Vale **aunque sea de palabra**, pero por escrito te protege: deja claros la **renta, el plazo, la garantía, el estado del inmueble y quién paga qué**. Sin contrato escrito, todo se vuelve «tu palabra contra la del otro».",
    contenido: `
## ¿Qué es el contrato de arriendo?
Es el acuerdo en que el **arrendador** entrega el uso y goce de una propiedad y el **arrendatario** paga una **renta** por ella ([artículo 1915 del Código Civil](/leyes/172986?art=2128)). Es válido aunque sea **verbal**, pero probar lo acordado sin papel es muy difícil.

## ¿Qué debería incluir?
Un buen contrato de arriendo deja por escrito al menos:
- **Identificación** de las partes y del **inmueble** (dirección, rol).
- **Renta**, fecha de pago y forma de **reajuste** (por ejemplo, según la UF o el IPC).
- **Plazo** (mes a mes, indefinido o plazo fijo) y condiciones de término.
- **Garantía** (cuántos meses) y cuándo se devuelve.
- **Estado del inmueble** al entregarlo (idealmente con un inventario y fotos).
- Quién paga **gastos comunes, servicios y reparaciones**.
- Si se permite **subarrendar** o tener mascotas.

## ¿Por qué por escrito?
Porque ante cualquier conflicto (no me devuelven la garantía, me quieren subir la renta, me acusan de daños), el **contrato es la prueba**. Sin él, todo queda al "dijo / no dijo". Además, para los juicios de arriendo, tener contrato facilita todo.

## ¿Qué hacer?
1. Exige un **contrato escrito** y léelo completo antes de firmar.
2. Saca **fotos del estado** del inmueble al entrar y guarda copia firmada.
3. Revisa la cláusula de **reajuste** (que no te suban la renta a voluntad).
4. Guarda los **comprobantes de pago** de cada mes.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Vale un arriendo sin contrato escrito?",
        respuesta:
          "Sí, el arrendamiento es válido aunque sea verbal (artículo 1915 del Código Civil). Pero sin documento es muy difícil probar lo acordado, por eso conviene siempre escriturarlo.",
      },
      {
        pregunta: "¿Qué cláusulas no pueden faltar?",
        respuesta:
          "Identificación de las partes y del inmueble, renta y su reajuste, plazo, garantía y su devolución, estado del inmueble, y quién paga gastos comunes, servicios y reparaciones.",
      },
      {
        pregunta: "¿Conviene un inventario del estado del inmueble?",
        respuesta:
          "Mucho. Un inventario con fotos al entrar y al salir evita discusiones sobre daños y descuentos de la garantía al término del arriendo.",
      },
      {
        pregunta: "¿Quién redacta el contrato?",
        respuesta:
          "Suele hacerlo el arrendador, pero el arrendatario debe leerlo y negociar. No es obligatorio ante notario, aunque autorizar las firmas ante notario da más certeza.",
      },
    ],
  },
  {
    slug: "promesa-de-compraventa-de-una-vivienda",
    titulo: "Promesa de compraventa: comprar o vender una casa antes de la escritura",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Promesa de compraventa de una vivienda | Ley Chilena",
    descripcion:
      "La promesa de compraventa compromete a comprar y vender una propiedad más adelante. Qué requisitos exige el Código Civil para que sea válida y te proteja.",
    fecha: "2026-06-21",
    respuestaCorta:
      "La **promesa de compraventa** es el contrato por el que dos personas se comprometen a **comprar y vender** una propiedad **más adelante**. Para que sirva y te obligue, debe cumplir requisitos del [artículo 1554 del Código Civil](/leyes/172986?art=1740): constar **por escrito**, que el contrato prometido no sea de los que la ley declara ineficaces, fijar un **plazo o condición** para celebrarlo y **especificar el contrato** de tal modo que solo falte firmarlo.",
    contenido: `
## ¿Qué es la promesa de compraventa?
Es un contrato **previo**: las partes se comprometen a celebrar **en el futuro** la compraventa de una propiedad (por ejemplo, mientras se aprueba el crédito hipotecario). No transfiere todavía la casa, pero **obliga** a comprar y vender cuando llegue el momento.

## Los 4 requisitos para que valga
El [artículo 1554 del Código Civil](/leyes/172986?art=1740) exige, para que la promesa produzca efecto:
1. Que conste **por escrito**.
2. Que el contrato prometido **no sea de aquellos que la ley declara ineficaces**.
3. Que contenga un **plazo o condición** que fije la época de la celebración.
4. Que se **especifique** de tal manera el contrato prometido, que solo falte la tradición o las solemnidades para perfeccionarlo.

Si falta alguno, la promesa **no obliga**. Por eso conviene hacerla con asesoría.

## ¿Qué pasa si la otra parte no cumple?
Si una parte se arrepiente, la otra puede **exigir el cumplimiento** (que se celebre la compraventa) o la **indemnización** de perjuicios. Es común pactar una **multa o arras** para ese caso.

## ¿Qué hacer?
1. Haz la promesa **por escrito** y, mejor, ante notario.
2. Verifica los **4 requisitos** del artículo 1554.
3. Define con claridad **precio, plazo y condiciones** (ej. "sujeto a aprobación del crédito").
4. Revisa los **títulos de la propiedad** antes de prometer comprar.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿La promesa de compraventa me obliga a comprar?",
        respuesta:
          "Sí, si cumple los requisitos del artículo 1554 del Código Civil. La promesa válida obliga a celebrar la compraventa; si una parte no cumple, la otra puede exigir el cumplimiento o la indemnización.",
      },
      {
        pregunta: "¿La promesa debe ser por escrito?",
        respuesta:
          "Sí. Constar por escrito es uno de los cuatro requisitos del artículo 1554. Una promesa solo verbal no produce efecto.",
      },
      {
        pregunta: "¿Qué pasa si el banco no aprueba el crédito?",
        respuesta:
          "Por eso conviene pactar la promesa sujeta a la condición de que se apruebe el crédito. Si la condición no se cumple, la compraventa no se celebra sin responsabilidad, según lo pactado.",
      },
      {
        pregunta: "¿Qué son las arras en una promesa?",
        respuesta:
          "Una suma que una parte entrega como señal o garantía. Sirve para asegurar el cumplimiento: si quien la dio se arrepiente la pierde, y si se arrepiente quien la recibió, suele devolverla doblada, según lo pactado.",
      },
    ],
  },
  {
    slug: "pueden-subirme-el-arriendo-durante-el-contrato",
    titulo: "¿Pueden subirme el arriendo durante el contrato?",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "¿Pueden subir el arriendo durante el contrato? | Ley Chilena",
    descripcion:
      "El arrendador no puede subir la renta cuando quiera: el contrato manda. Cuándo procede un reajuste y qué hacer si te suben el arriendo de forma unilateral, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "**No de forma unilateral.** Todo contrato legalmente celebrado es **ley para las partes** y no puede cambiarse sino por **acuerdo mutuo** ([artículo 1545 del Código Civil](/leyes/172986?art=1731)). Si tu contrato fija una **renta** y un **reajuste** (por ejemplo según la UF o el IPC), solo se aplica ese reajuste; el arrendador **no puede subir la renta a voluntad** durante el contrato vigente.",
    contenido: `
## La regla: el contrato manda
Un contrato de arriendo, una vez firmado, es **obligatorio para ambas partes** y no puede modificarse unilateralmente: solo cambia por **consentimiento mutuo** o por causas legales ([artículo 1545 del Código Civil](/leyes/172986?art=1731)). En palabras simples: **lo pactado se respeta**.

## ¿Cuándo sí puede subir la renta?
- Si el contrato incluye una **cláusula de reajuste** (lo más común: la renta se reajusta según la **UF** o el **IPC**). Ese reajuste **estaba pactado**, así que vale.
- Al **renovar** o firmar un **nuevo contrato**: ahí las partes pueden acordar una renta distinta (y tú puedes aceptar o no).
- En contratos **mes a mes**, el arrendador puede proponer un cambio, pero para imponerlo necesita poner término al contrato con el aviso legal correspondiente.

## ¿Cuándo NO puede?
Si tienes un contrato **vigente** con renta fija y sin cláusula de reajuste, el arrendador **no puede** subirte la renta a mitad de camino solo porque quiere. Si lo hace, puedes **negarte** y seguir pagando lo pactado.

## ¿Qué hacer?
1. Revisa tu **contrato**: ¿qué dice sobre renta y reajuste?
2. Si te exigen un alza no pactada, **recházala por escrito** y sigue pagando la renta del contrato.
3. Guarda los **comprobantes de pago** (te protegen de que aleguen no pago).
4. Si te presionan o te quieren echar por negarte, busca ayuda (Corporación de Asistencia Judicial, gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿El arrendador puede subir la renta cuando quiera?",
        respuesta:
          "No. El contrato es ley para las partes y no se cambia unilateralmente (artículo 1545 del Código Civil). Solo procede el reajuste pactado (UF/IPC) o un nuevo acuerdo al renovar.",
      },
      {
        pregunta: "¿Qué pasa si mi contrato no dice nada de reajuste?",
        respuesta:
          "Entonces la renta se mantiene durante la vigencia del contrato. El arrendador no puede subirla unilateralmente; necesitaría tu acuerdo o esperar a un nuevo contrato.",
      },
      {
        pregunta: "Tengo contrato mes a mes, ¿pueden subir la renta?",
        respuesta:
          "Para imponer un alza, el arrendador debería poner término al contrato con el aviso de desahucio legal y proponer uno nuevo. Tú decides si aceptas la nueva renta o no.",
      },
      {
        pregunta: "¿Qué hago si me suben el arriendo sin acuerdo?",
        respuesta:
          "Rechaza el alza por escrito, sigue pagando la renta pactada y guarda los comprobantes. Si te presionan o amenazan con echarte, acude a la Corporación de Asistencia Judicial (gratis).",
      },
    ],
  },
  {
    slug: "reglamento-de-copropiedad-que-te-obliga",
    titulo: "Reglamento de copropiedad: ¿qué me obliga y qué no?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Reglamento de copropiedad: qué te obliga | Ley Chilena",
    descripcion:
      "El reglamento de copropiedad fija las reglas de tu edificio o condominio. Qué puede regular, qué obliga a propietarios y arrendatarios, según la Ley de Copropiedad.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El **reglamento de copropiedad** es el conjunto de reglas que los copropietarios deben acordar para administrar el condominio ([artículo 8 de la Ley 21.442](/leyes/1174663?art=10616)). Obliga a **propietarios, arrendatarios y ocupantes**: define el uso de los bienes comunes, los gastos comunes, las normas de convivencia y las sanciones. Pero **no puede** imponer reglas contrarias a la ley.",
    contenido: `
## ¿Qué es el reglamento de copropiedad?
Es el "manual de reglas" del edificio o condominio. La ley obliga a los copropietarios a **acordar un reglamento** que regule la administración y la convivencia ([artículo 8 de la Ley 21.442](/leyes/1174663?art=10616)). Una vez vigente, **obliga a todos**: dueños, arrendatarios y ocupantes a cualquier título.

## ¿Qué puede regular?
- El **uso de los bienes comunes** (pasillos, estacionamientos de visita, áreas verdes, quincho) — los copropietarios, arrendatarios u ocupantes pueden usarlos según su destino ([artículo 4 de la Ley 21.442](/leyes/1174663?art=10612)).
- Los **gastos comunes** y cómo se reparten.
- Las **normas de convivencia** (ruidos, mascotas, horarios).
- Las **sanciones y multas** por incumplir.

## ¿Qué NO puede hacer?
- Imponer reglas **contrarias a la ley** (por ejemplo, privarte de derechos que la ley te garantiza).
- Discriminar o impedir el **uso legítimo** de tu unidad.
- Cobrar multas sin el **procedimiento** que el propio reglamento y la ley establecen.

## ¿Qué hacer?
1. Pide y **lee tu reglamento** de copropiedad (la administración debe tenerlo).
2. Antes de comprar o arrendar, revisa qué **permite y prohíbe** (mascotas, arriendo por días, etc.).
3. Si una multa o regla te parece **ilegal o arbitraria**, reclama en la **asamblea** o ante el **Juzgado de Policía Local**.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿El reglamento de copropiedad obliga a los arrendatarios?",
        respuesta:
          "Sí. El reglamento obliga a propietarios, arrendatarios y ocupantes a cualquier título. Conviene leerlo antes de arrendar para conocer las reglas del condominio.",
      },
      {
        pregunta: "¿El reglamento puede prohibir mascotas o arriendo por días?",
        respuesta:
          "Puede regular esos temas dentro de lo que permite la ley. Revisa tu reglamento: lo que ahí se acordó válidamente obliga a todos los ocupantes.",
      },
      {
        pregunta: "¿Pueden multarme por el reglamento?",
        respuesta:
          "Sí, si la conducta está sancionada y se sigue el procedimiento previsto. Si la multa es arbitraria o sin procedimiento, puedes reclamarla en la asamblea o en el Juzgado de Policía Local.",
      },
      {
        pregunta: "¿Dónde consigo el reglamento de mi condominio?",
        respuesta:
          "La administración o el comité de administración deben tenerlo y entregártelo. También suele estar inscrito en el Conservador de Bienes Raíces.",
      },
    ],
  },
  {
    slug: "ruidos-molestos-y-convivencia-en-el-condominio",
    titulo: "Ruidos molestos y convivencia en el condominio: ¿qué puedo hacer?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Ruidos molestos del vecino en condominio | Ley Chilena",
    descripcion:
      "Si un vecino hace ruidos molestos o usa mal los espacios comunes, la Ley de Copropiedad y el reglamento te dan herramientas. Qué hacer paso a paso.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Cada copropietario, arrendatario u ocupante puede **usar los bienes comunes según su destino y sin afectar a los demás** ([artículo 4 de la Ley 21.442](/leyes/1174663?art=10612)). Frente a **ruidos molestos** o mal uso de los espacios, primero recurre al **reglamento de copropiedad** y a la **administración**; si persiste, puedes denunciar a la **Municipalidad** o al **Juzgado de Policía Local**.",
    contenido: `
## La regla de convivencia
En un condominio, el uso de tu unidad y de los espacios comunes tiene un límite: **no perjudicar a los demás**. La ley permite usar los bienes comunes **según su destino y de forma ordenada** ([artículo 4 de la Ley 21.442](/leyes/1174663?art=10612)), y el **reglamento de copropiedad** fija las normas concretas (horarios, ruidos, mascotas, uso del quincho, etc.).

## ¿Qué cuenta como "ruido molesto"?
Sonidos que **superan lo razonable** y alteran la tranquilidad: fiestas a altas horas, música muy fuerte, ruidos constantes. Las **ordenanzas municipales** suelen fijar horarios de silencio (por ejemplo, de noche).

## Pasos para resolverlo
1. **Habla con el vecino**: muchas veces se soluciona conversando.
2. Si sigue, **avisa a la administración** o al comité por escrito, pidiendo que aplique el **reglamento**.
3. La administración puede **amonestar o multar** según el reglamento.
4. Si persiste, **denuncia a la Municipalidad** (fiscalización de ruidos) o al **Juzgado de Policía Local**.
5. En casos graves o reiterados, guarda **pruebas** (grabaciones con fecha, testigos).

## ¿Qué hacer?
1. Revisa tu **reglamento de copropiedad** (qué horarios y reglas fija).
2. Deja **constancia escrita** de los reclamos a la administración.
3. Junta **evidencia** del ruido (fecha, hora, duración).
4. Escala a **Municipalidad / Juzgado de Policía Local** si no cesa.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Qué hago si un vecino hace ruidos molestos?",
        respuesta:
          "Primero conversa; si sigue, reclama por escrito a la administración para que aplique el reglamento de copropiedad. Si persiste, denuncia a la Municipalidad o al Juzgado de Policía Local.",
      },
      {
        pregunta: "¿La administración puede multar por ruidos?",
        respuesta:
          "Sí, si el reglamento de copropiedad lo contempla y se sigue su procedimiento. El reglamento fija las normas de convivencia y las sanciones aplicables.",
      },
      {
        pregunta: "¿Quién fiscaliza los ruidos molestos?",
        respuesta:
          "Las Municipalidades, según sus ordenanzas de ruido, y el Juzgado de Policía Local. Conviene tener pruebas (grabaciones con fecha, testigos) para respaldar la denuncia.",
      },
      {
        pregunta: "¿Puedo usar libremente los espacios comunes?",
        respuesta:
          "Puedes usarlos según su destino y sin afectar a los demás (artículo 4 de la Ley 21.442), respetando el reglamento de copropiedad del condominio.",
      },
    ],
  },
  {
    slug: "declaracion-de-bien-familiar-proteger-la-casa",
    titulo: "Declaración de bien familiar: cómo proteger la casa de la familia",
    categoria: "familia",
    destacada: true,
    metaTitle: "Bien familiar: proteger la vivienda de la familia | Ley Chilena",
    descripcion:
      "Declarar la vivienda como bien familiar la protege: no se puede vender ni hipotecar sin el acuerdo del otro cónyuge. Cómo funciona y para qué sirve, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El inmueble que sirve de **residencia principal de la familia** (y los muebles que lo guarnecen) puede declararse **bien familiar** ([artículo 141 del Código Civil](/leyes/172986?art=315)). Su efecto: aunque pertenezca a uno solo de los cónyuges, **no se puede vender, hipotecar ni arrendar sin la autorización del otro**. Protege a la familia frente a decisiones unilaterales o deudas.",
    contenido: `
## ¿Qué es un bien familiar?
Es la **vivienda que es residencia principal de la familia** —y los muebles que la equipan— que se declara como tal para **protegerla** ([artículo 141 del Código Civil](/leyes/172986?art=315)). Aplica aunque la casa esté a nombre de **uno solo** de los cónyuges.

## ¿Para qué sirve?
Una vez declarada bien familiar, el dueño **no puede, por sí solo**:
- **Vender** la propiedad,
- **Hipotecarla** o darla en garantía,
- **Arrendarla** o ceder su uso,

sin la **autorización del otro cónyuge**. Así se evita que, por ejemplo, uno venda la casa donde vive la familia, o que un acreedor se la lleve fácilmente.

## ¿Cómo se declara?
- Puede declararla un cónyuge **pidiéndolo al tribunal de familia**; con la sola presentación de la demanda, el bien queda **provisoriamente** como familiar.
- También protege a los **hijos**: la declaración mira el interés de la familia, no solo de la pareja.

Importante: ser bien familiar **no cambia quién es el dueño**; solo limita su disposición para proteger el hogar.

## ¿Qué hacer?
1. Si temes que vendan o hipotequen la casa donde vive la familia, evalúa **declararla bien familiar** en el Tribunal de Familia.
2. Reúne los **antecedentes** del inmueble (que es la residencia principal).
3. Asesórate (un abogado o la **Corporación de Asistencia Judicial**, gratis).
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Qué protege la declaración de bien familiar?",
        respuesta:
          "La vivienda que es residencia principal de la familia: no se puede vender, hipotecar ni arrendar sin autorización del otro cónyuge (artículo 141 del Código Civil), aunque esté a nombre de uno solo.",
      },
      {
        pregunta: "¿Sirve si la casa está a nombre de mi pareja?",
        respuesta:
          "Sí. Justamente protege ese caso: aunque el inmueble pertenezca a uno solo de los cónyuges, al ser bien familiar no se puede disponer de él sin el acuerdo del otro.",
      },
      {
        pregunta: "¿La declaración me hace dueño de la casa?",
        respuesta:
          "No. No cambia quién es el propietario; solo limita su facultad de vender, hipotecar o arrendar sin autorización del otro cónyuge, para proteger el hogar familiar.",
      },
      {
        pregunta: "¿Cómo se declara bien familiar?",
        respuesta:
          "Pidiéndolo al Tribunal de Familia. Con la sola presentación de la demanda, el inmueble queda provisoriamente como bien familiar mientras el tribunal resuelve.",
      },
    ],
  },
  {
    slug: "testamento-como-dejar-mis-bienes",
    titulo: "Testamento: cómo dejar mis bienes ordenados en Chile",
    categoria: "familia",
    destacada: false,
    metaTitle: "Testamento en Chile: cómo hacerlo | Ley Chilena",
    descripcion:
      "El testamento te permite decidir qué pasa con tus bienes, dentro de los límites de la ley (legítimas). Qué es, cómo se hace y qué puedes y no puedes dejar, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El **testamento** es el acto en que una persona **dispone de sus bienes** para que tengan efecto después de su muerte ([artículo 999 del Código Civil](/leyes/172986?art=1185)). Te deja **ordenar tu herencia**, pero con un límite: debes respetar las **legítimas** de tus herederos forzosos (hijos, cónyuge y ascendientes). No puedes dejar libremente el 100% a quien quieras si tienes esos herederos.",
    contenido: `
## ¿Qué es un testamento?
Es un acto **solemne** y **personal** en que decides qué pasa con **tus bienes** después de fallecer ([artículo 999 del Código Civil](/leyes/172986?art=1185)). Puedes revocarlo o cambiarlo mientras vivas.

## ¿Para qué sirve?
- **Ordenar** quién recibe qué y evitar conflictos.
- Dejar bienes a personas que **no heredarían por ley** (un amigo, una fundación), dentro de la parte de libre disposición.
- Designar **albacea** (quien ejecuta el testamento).

## El límite: las legítimas
No puedes repartir **todo** a tu antojo si tienes **herederos forzosos**. La ley reserva una parte (la **legítima**) para ellos. La parte que puedes dejar libremente es menor cuando hay hijos o cónyuge (ver la guía de **herencia forzosa**).

## ¿Cómo se hace?
- **Testamento abierto**: ante notario y testigos (lo más común).
- **Testamento cerrado**: se entrega cerrado al notario.
- Hay formas especiales (testamento militar, marítimo) para casos excepcionales.

Un testamento **mal hecho** puede ser nulo; por eso conviene hacerlo ante notario y con asesoría.

## ¿Qué hacer?
1. Haz un **inventario** mental de tus bienes y a quién quieres dejarlos.
2. Considera las **legítimas** de tus herederos forzosos.
3. Otórgalo ante **notario** (testamento abierto) con testigos.
4. Guarda copia e informa a alguien de confianza dónde está.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Puedo dejar todos mis bienes a quien quiera?",
        respuesta:
          "No si tienes herederos forzosos (hijos, cónyuge, ascendientes): la ley reserva para ellos una parte llamada legítima. Solo puedes disponer libremente de la parte que queda.",
      },
      {
        pregunta: "¿Qué tipos de testamento hay?",
        respuesta:
          "Principalmente el testamento abierto (ante notario y testigos, el más usado) y el cerrado (se entrega cerrado al notario). Existen formas especiales para casos excepcionales.",
      },
      {
        pregunta: "¿Puedo cambiar mi testamento después?",
        respuesta:
          "Sí. El testamento es revocable: puedes modificarlo o hacer uno nuevo mientras vivas. El último testamento válido es el que rige.",
      },
      {
        pregunta: "¿Necesito notario para el testamento?",
        respuesta:
          "El testamento abierto se otorga ante notario y testigos. Es la forma más segura; un testamento mal otorgado puede ser declarado nulo.",
      },
    ],
  },
  {
    slug: "quien-hereda-si-no-hay-testamento",
    titulo: "¿Quién hereda si no hay testamento? El orden de la herencia",
    categoria: "familia",
    destacada: true,
    metaTitle: "¿Quién hereda sin testamento en Chile? | Ley Chilena",
    descripcion:
      "Sin testamento, la ley define quién hereda: primero los hijos y el cónyuge. Cómo es el orden de la sucesión intestada en Chile, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Si una persona muere **sin testamento**, hereda según el orden que fija la ley (sucesión intestada). En primer lugar, los **hijos**, que excluyen a los demás herederos; pero si hay **cónyuge sobreviviente**, este concurre junto con los hijos ([artículo 988 del Código Civil](/leyes/172986?art=1174)). Si no hay hijos, heredan los ascendientes y el cónyuge, y así sucesivamente.",
    contenido: `
## ¿Qué pasa si no hay testamento?
La ley reparte la herencia por ti, siguiendo un **orden de sucesión** (sucesión intestada). No queda al azar ni a la voluntad de los parientes: hay reglas claras.

## El primer orden: hijos y cónyuge
Los **hijos heredan y excluyen** a los demás parientes; pero si hay **cónyuge sobreviviente**, este **concurre junto con los hijos** ([artículo 988 del Código Civil](/leyes/172986?art=1174)). En palabras simples: primero la herencia es para los **hijos y el cónyuge**.

La parte del cónyuge tiene reglas especiales (en general recibe el doble de lo que recibe un hijo, con un mínimo garantizado).

## ¿Y si no hay hijos?
Si la persona **no tiene hijos**, heredan en órdenes siguientes:
- Los **ascendientes** (padres, abuelos) **y el cónyuge**.
- Si no hay ascendientes ni cónyuge, los **hermanos**.
- A falta de ellos, otros colaterales, y finalmente el **Fisco**.

## ¿Cómo se hace efectiva la herencia?
Hay que tramitar la **posesión efectiva**:
- Si **no hay testamento**, se pide en el **Registro Civil** (trámite administrativo).
- Si **hay testamento**, se tramita ante un **tribunal**.

## ¿Qué hacer?
1. Identifica a los **herederos** según el orden legal.
2. Tramita la **posesión efectiva** (Registro Civil si no hubo testamento).
3. Recuerda que también se heredan **deudas** (revisa la guía de heredar deudas: conviene el beneficio de inventario).
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Quién hereda primero si no hay testamento?",
        respuesta:
          "Los hijos, que excluyen a los demás herederos; pero si hay cónyuge sobreviviente, este concurre junto con los hijos (artículo 988 del Código Civil).",
      },
      {
        pregunta: "¿Cuánto hereda el cónyuge?",
        respuesta:
          "El cónyuge concurre con los hijos y, por regla general, recibe el doble de lo que recibe un hijo, con un mínimo garantizado por la ley. Hay reglas especiales según el número de hijos.",
      },
      {
        pregunta: "¿Qué pasa si la persona no tuvo hijos?",
        respuesta:
          "Heredan los ascendientes y el cónyuge; a falta de ellos, los hermanos y otros colaterales; y en último término, el Fisco.",
      },
      {
        pregunta: "¿Cómo se tramita la herencia sin testamento?",
        respuesta:
          "Con la posesión efectiva. Si no hubo testamento, se pide en el Registro Civil (trámite administrativo). Recuerda que también se heredan las deudas: conviene aceptar con beneficio de inventario.",
      },
    ],
  },
  {
    slug: "herencia-forzosa-la-legitima",
    titulo: "Herencia forzosa: ¿puedo desheredar a un hijo? La legítima",
    categoria: "familia",
    destacada: false,
    metaTitle: "Herencia forzosa y legítima en Chile | Ley Chilena",
    descripcion:
      "La ley obliga a dejar una parte de la herencia a ciertos herederos (legitimarios). Quiénes son y cuánto les corresponde, según el Código Civil. No puedes desheredar libremente.",
    fecha: "2026-06-21",
    respuestaCorta:
      "No puedes desheredar libremente. Hay **asignaciones forzosas** que el testador está **obligado** a respetar; si no las hace, la ley las suple ([artículo 1167 del Código Civil](/leyes/172986?art=1353)). Los **legitimarios** —los hijos, los ascendientes y el cónyuge— tienen derecho a su **legítima** ([artículo 1182](/leyes/172986?art=1368)). Solo en casos graves y por las causales legales se puede desheredar.",
    contenido: `
## ¿Qué es la herencia forzosa?
La libertad para repartir tu herencia **no es total**. Existen **asignaciones forzosas**: partes que el testador **debe** dejar a ciertos herederos, y que la ley **suple** si no las respeta, incluso en contra de lo que diga el testamento ([artículo 1167 del Código Civil](/leyes/172986?art=1353)).

## ¿Quiénes son los legitimarios?
Tienen derecho a una parte protegida (la **legítima**) los siguientes ([artículo 1182 del Código Civil](/leyes/172986?art=1368)):
1. Los **hijos** (personalmente o representados por su descendencia).
2. Los **ascendientes** (padres, abuelos).
3. El **cónyuge sobreviviente**.

A ellos no puedes dejarlos sin nada por simple voluntad.

## ¿Cuánto está protegido?
A grandes rasgos, **la mitad de la herencia** se reparte como legítima entre los legitimarios. De lo que queda, una parte es de **libre disposición** (puedes dejarla a quien quieras) y otra de "mejoras" (para favorecer a algunos legitimarios). Por eso, teniendo hijos o cónyuge, **no puedes dejar el 100% a un extraño**.

## ¿Se puede desheredar?
Solo **excepcionalmente** y por **causales legales graves** (por ejemplo, atentar contra la vida del causante), señaladas expresamente en el testamento y acreditadas. No basta con "no quiero dejarle nada".

## ¿Qué hacer?
1. Si vas a testar, considera las **legítimas** de tus legitimarios.
2. Si crees que en una herencia **se vulneró tu legítima**, puedes reclamarla.
3. Asesórate con un abogado: la sucesión tiene reglas técnicas.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Puedo dejar sin herencia a un hijo?",
        respuesta:
          "Por regla general no. Los hijos son legitimarios (artículo 1182 del Código Civil) y tienen derecho a su legítima. Solo se puede desheredar por causales legales graves, señaladas y acreditadas.",
      },
      {
        pregunta: "¿Quiénes son los legitimarios?",
        respuesta:
          "Los hijos (personalmente o por su descendencia), los ascendientes y el cónyuge sobreviviente (artículo 1182 del Código Civil). Tienen derecho a una parte protegida de la herencia.",
      },
      {
        pregunta: "¿Qué parte de la herencia puedo dejar libremente?",
        respuesta:
          "Teniendo legitimarios, una porción menor: la mitad se reparte como legítima, y del resto hay una parte de mejoras y otra de libre disposición. No puedes dejar el total a un extraño.",
      },
      {
        pregunta: "¿Qué hago si no se respetó mi legítima?",
        respuesta:
          "Puedes reclamar tu legítima: la ley suple las asignaciones forzosas aunque el testamento disponga otra cosa (artículo 1167 del Código Civil). Conviene asesorarte con un abogado.",
      },
    ],
  },
  {
    slug: "me-cobraron-mas-caro-que-el-precio-publicado",
    titulo: "Me cobraron más caro que el precio publicado: ¿qué hago?",
    categoria: "consumidor",
    destacada: true,
    metaTitle: "Me cobraron más que el precio publicado | Ley Chilena",
    descripcion:
      "Si te cobran un precio mayor al exhibido o publicado (en góndola, web o vitrina), es infracción a la Ley del Consumidor. Qué exigir y cómo reclamar.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Es **infracción a la ley** cobrar un **precio superior al exhibido, informado o publicado** ([artículo 18 de la Ley 19.496](/leyes/1160403?art=138555)). Si en la caja te cobran más que el precio de la góndola, vitrina o sitio web, puedes **exigir que te respeten el precio publicado**, y si no lo hacen, reclamar en el SERNAC. Guarda foto del precio exhibido.",
    contenido: `
## La regla: te cobran lo que estaba publicado
La Ley del Consumidor es clara: cobrar un **precio superior al exhibido, informado o publicado** es una **infracción** ([artículo 18 de la Ley 19.496](/leyes/1160403?art=138555)). El precio que viste en la **góndola, la vitrina, el catálogo o la web** es el que te deben cobrar.

## Casos típicos
- El precio de la **góndola** es menor que el de la **caja**.
- La **web** muestra un precio y al pagar aparece otro mayor.
- Una **promoción** publicada que en la caja no aplican.

En todos, el proveedor debe **respetar el precio publicado** o, al menos, no cobrarte más que ese.

## ¿Qué puedes exigir?
- Que te **vendan al precio publicado**.
- Si ya pagaste de más, la **devolución** de la diferencia.
- En caso de mala fe o negativa, la **sanción** que aplique el tribunal.

> Atención: si se trata de un **error evidente y grosero** (un televisor a $100), los tribunales han matizado; pero el precio normal publicado **sí obliga**.

## ¿Qué hacer?
1. Saca **foto** del precio exhibido o del pantallazo de la web.
2. En el local, pide hablar con el **encargado** y exige el precio publicado.
3. Si no resuelven, reclama en el **SERNAC** (sernac.cl) con la evidencia.
4. Puedes demandar en el **Juzgado de Policía Local** para recuperar la diferencia y por la infracción.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Me deben respetar el precio de la góndola?",
        respuesta:
          "Sí. Cobrar un precio superior al exhibido, informado o publicado es infracción (artículo 18 de la Ley 19.496). Puedes exigir el precio publicado o la devolución de la diferencia.",
      },
      {
        pregunta: "La web me mostró un precio y me cobró otro, ¿qué hago?",
        respuesta:
          "Guarda el pantallazo del precio publicado y reclama. El proveedor debe respetar el precio informado; si te cobró más, puedes pedir la devolución de la diferencia y reclamar en el SERNAC.",
      },
      {
        pregunta: "¿Sirve de algo el error de precio muy bajo?",
        respuesta:
          "El precio normal publicado obliga. En casos de error evidente y grosero (un valor irrisorio por equivocación) los tribunales han matizado, pero la regla general protege el precio exhibido.",
      },
      {
        pregunta: "¿Dónde reclamo?",
        respuesta:
          "Primero con el encargado del local; si no resuelve, en el SERNAC (sernac.cl) con la foto del precio. También puedes demandar en el Juzgado de Policía Local.",
      },
    ],
  },
  {
    slug: "no-me-cumplieron-lo-ofrecido-incumplimiento",
    titulo: "No me cumplieron lo ofrecido: incumplimiento del proveedor",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "No cumplieron lo ofrecido: tus derechos | Ley Chilena",
    descripcion:
      "El proveedor está obligado a respetar las condiciones, plazos y características ofrecidas. Qué hacer si compraste algo y no te entregaron lo prometido, según la Ley del Consumidor.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Todo proveedor está **obligado a respetar los términos, condiciones y modalidades** conforme a los cuales ofreció o convino la entrega del bien o la prestación del servicio ([artículo 12 de la Ley 19.496](/leyes/1160403?art=138525)). Si no te cumplen lo ofrecido (características, plazo, condiciones), puedes **exigir que cumplan**, o la **devolución** y la **indemnización** de perjuicios.",
    contenido: `
## La obligación de cumplir lo ofrecido
La oferta no es un adorno: el proveedor **debe respetar lo que ofreció** —características, plazo, condiciones y modalidades— al venderte ([artículo 12 de la Ley 19.496](/leyes/1160403?art=138525)). Si prometió "entrega en 48 horas", "incluye instalación" o "modelo X", eso es **exigible**.

## Casos típicos
- Te entregan un **producto distinto** al ofrecido.
- El **plazo de entrega** prometido no se cumple.
- El servicio **no incluye** lo que decía la oferta.
- Las **condiciones** cambian respecto de lo pactado.

## ¿Qué puedes exigir?
- Que **cumplan** lo ofrecido (entreguen lo correcto, en el plazo, con lo incluido).
- Si ya no sirve o no quieres, la **devolución de lo pagado**.
- La **indemnización** de los perjuicios que el incumplimiento te causó.

## ¿Qué hacer?
1. Junta la **evidencia de lo ofrecido** (publicidad, correo, captura, contrato, comprobante).
2. Reclama por **escrito** al proveedor pidiendo que cumpla o te devuelva.
3. Si no resuelve, presenta el **reclamo en el SERNAC** (sernac.cl).
4. Puedes demandar en el **Juzgado de Policía Local** para el cumplimiento o la indemnización.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿El proveedor debe cumplir lo que ofreció?",
        respuesta:
          "Sí. Está obligado a respetar los términos, condiciones y modalidades conforme a los cuales ofreció o convino el bien o servicio (artículo 12 de la Ley 19.496).",
      },
      {
        pregunta: "No me entregaron en el plazo prometido, ¿qué hago?",
        respuesta:
          "Puedes exigir el cumplimiento, o la devolución de lo pagado y la indemnización de perjuicios. Guarda la evidencia del plazo ofrecido y reclama por escrito; si no resuelven, ve al SERNAC.",
      },
      {
        pregunta: "Me entregaron un producto distinto al ofrecido, ¿puedo devolverlo?",
        respuesta:
          "Sí. Al no cumplir lo ofrecido, puedes exigir el producto correcto o la devolución de lo pagado, más la indemnización de los perjuicios (artículo 12 de la Ley 19.496).",
      },
      {
        pregunta: "¿Qué evidencia necesito?",
        respuesta:
          "La que muestre lo ofrecido: publicidad, correos, capturas del sitio, catálogo o contrato, junto con tu comprobante de compra. Con eso reclamas en el SERNAC o en el Juzgado de Policía Local.",
      },
    ],
  },
  {
    slug: "promociones-y-ofertas-que-debe-informar-la-empresa",
    titulo: "Promociones y ofertas: ¿qué debe informar la empresa?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Promociones y ofertas: tus derechos | Ley Chilena",
    descripcion:
      "En toda promoción u oferta, la empresa debe informar las bases y el plazo de duración. Qué exigir si una promoción no se cumple o tiene letra chica, según la Ley del Consumidor.",
    fecha: "2026-06-21",
    respuestaCorta:
      "En **toda promoción u oferta**, el proveedor debe informarte las **bases** de la misma y el **tiempo o plazo de duración** ([artículo 35 de la Ley 19.496](/leyes/1160403?art=138577)). Si una promoción no se cumple, cambia las reglas a mitad de camino o esconde condiciones que no informó, puedes **reclamar** y exigir que se respete lo ofrecido.",
    contenido: `
## La regla de las promociones
Las promociones y ofertas tienen reglas: el proveedor debe **informar las bases** (condiciones, requisitos, límites) y el **plazo de duración** ([artículo 35 de la Ley 19.496](/leyes/1160403?art=138577)). No puede inventar condiciones después ni esconder lo importante en letra chica no informada.

## ¿Qué cuenta como problema?
- La promoción **no dice hasta cuándo** dura.
- Aparecen **condiciones nuevas** en la caja que no estaban informadas.
- El **stock** se agota sin que se haya advertido el límite.
- Cambian las **reglas** durante la promoción.

## ¿Qué puedes exigir?
- Que se **respeten las bases** informadas.
- Que se cumpla la **oferta** mientras esté vigente el plazo publicado.
- Si te indujeron a error, la **devolución** o **indemnización** según el caso.

## ¿Qué hacer?
1. **Guarda** la publicidad de la promoción (foto, captura, folleto) con su plazo.
2. Si no la respetan, reclama por **escrito** al proveedor.
3. Presenta el **reclamo en el SERNAC** (sernac.cl) con la evidencia.
4. Puedes demandar en el **Juzgado de Policía Local**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Qué debe informar una promoción?",
        respuesta:
          "Las bases de la promoción (condiciones, requisitos, límites) y el tiempo o plazo de duración (artículo 35 de la Ley 19.496). No puede esconder condiciones esenciales que no informó.",
      },
      {
        pregunta: "La promoción no decía hasta cuándo duraba, ¿es válido?",
        respuesta:
          "El proveedor debe informar el plazo de duración. Si no lo hizo y luego alega que terminó, puedes reclamar: la falta de información de las bases es infracción a la ley.",
      },
      {
        pregunta: "Cambiaron las reglas de la promoción a mitad de camino, ¿qué hago?",
        respuesta:
          "Guarda la publicidad original y reclama. Deben respetarse las bases informadas mientras esté vigente el plazo publicado; cambiarlas unilateralmente puede ser infracción.",
      },
      {
        pregunta: "¿Dónde reclamo por una promoción engañosa?",
        respuesta:
          "Primero al proveedor por escrito; si no resuelve, en el SERNAC (sernac.cl) con la evidencia. También puedes demandar en el Juzgado de Policía Local.",
      },
    ],
  },
  {
    slug: "sernac-como-y-donde-reclamar",
    titulo: "El SERNAC: qué hace y cómo reclamar paso a paso",
    categoria: "consumidor",
    destacada: true,
    metaTitle: "Cómo reclamar en el SERNAC | Ley Chilena",
    descripcion:
      "El SERNAC vela por los derechos de los consumidores y recibe tus reclamos contra empresas. Qué puede hacer, qué no, y cómo presentar un reclamo paso a paso.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El **Servicio Nacional del Consumidor (SERNAC)** debe **velar por el cumplimiento** de la Ley del Consumidor ([artículo 58 de la Ley 19.496](/leyes/1160403?art=138648)). Recibe tus **reclamos** contra empresas, gestiona una respuesta del proveedor y puede mediar; pero **no dicta sentencias ni fija indemnizaciones** (eso lo hace el Juzgado de Policía Local). Reclamar en el SERNAC es **gratis** y online.",
    contenido: `
## ¿Qué es el SERNAC?
Es el organismo del Estado que **vela por el cumplimiento** de la Ley del Consumidor y por los derechos de las personas frente a las empresas ([artículo 58 de la Ley 19.496](/leyes/1160403?art=138648)). Informa, recibe reclamos y puede iniciar acciones colectivas.

## ¿Qué puede y qué no puede hacer?
**Puede:** recibir tu reclamo, **trasladarlo al proveedor** para que responda, **mediar** para un acuerdo, fiscalizar y, en casos masivos, demandar colectivamente.

**No puede:** actuar como un juez de tu caso particular, **obligar** a la empresa a pagarte ni **fijar indemnizaciones**. Eso corresponde al **Juzgado de Policía Local**.

## Cómo reclamar (paso a paso)
1. Reúne la **evidencia**: comprobante de compra, contrato, correos, fotos, publicidad.
2. Entra a **sernac.cl** y presenta tu reclamo (es gratis y online), o llámalos / ve a una oficina.
3. El SERNAC **traslada** el reclamo a la empresa, que tiene un plazo para responder.
4. Si hay **acuerdo**, se cumple; si la empresa no responde o no resuelve, queda **registro** y puedes demandar.
5. Para indemnización o que se obligue a la empresa, demanda en el **Juzgado de Policía Local** (puedes hacerlo sin abogado en montos menores).

## ¿Qué hacer?
1. Primero reclama **directo a la empresa** (deja constancia escrita).
2. Si no resuelve, reclama en el **SERNAC**.
3. Si necesitas que te paguen o indemnicen, ve al **Juzgado de Policía Local**.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿El SERNAC puede obligar a la empresa a pagarme?",
        respuesta:
          "No. El SERNAC vela por el cumplimiento de la ley, traslada tu reclamo y media (artículo 58 de la Ley 19.496), pero no dicta sentencias ni fija indemnizaciones. Eso lo hace el Juzgado de Policía Local.",
      },
      {
        pregunta: "¿Reclamar en el SERNAC tiene costo?",
        respuesta:
          "No. Reclamar en el SERNAC es gratis y se puede hacer online en sernac.cl, por teléfono o en sus oficinas.",
      },
      {
        pregunta: "¿Qué necesito para reclamar?",
        respuesta:
          "La evidencia de tu caso: comprobante de compra o contrato, correos, fotos y la publicidad relevante. Conviene haber reclamado antes a la empresa y guardar esa constancia.",
      },
      {
        pregunta: "¿Y si la empresa no responde al SERNAC?",
        respuesta:
          "Queda registro del reclamo y puedes demandar en el Juzgado de Policía Local para exigir el cumplimiento o la indemnización de perjuicios.",
      },
    ],
  },
  {
    slug: "garantia-de-un-auto-usado",
    titulo: "Garantía de un auto usado: ¿qué derechos tengo si sale malo?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Garantía de auto usado en Chile | Ley Chilena",
    descripcion:
      "Comprar un auto usado en una automotora también tiene garantía legal. Qué puedes exigir si el vehículo sale con fallas y qué pasa con las ventas entre particulares.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Si compras un **auto usado a una automotora o empresa**, tienes la **garantía legal**: ante fallas, eliges entre **reparación gratis, cambio o devolución** ([artículo 20 de la Ley 19.496](/leyes/1160403?art=138557)). En **ventas entre particulares** la Ley del Consumidor no aplica, pero igual rige el Código Civil (vicios ocultos). Conviene revisar el auto antes y guardar todo por escrito.",
    contenido: `
## ¿El auto usado tiene garantía?
Sí, si lo compras a una **automotora o empresa** (proveedor): aplica la **garantía legal** de la Ley del Consumidor. Frente a una **falla** que afecte su uso, tienes el derecho a **optar** entre ([artículo 20 de la Ley 19.496](/leyes/1160403?art=138557)):
- **Reparación gratuita**,
- **Cambio** del vehículo, o
- **Devolución** de lo pagado.

La automotora **no puede** obligarte a quedarte solo con la reparación si tú prefieres otra opción.

## ¿Y si lo compré a un particular?
Si la venta es **entre particulares** (no una empresa), la **Ley del Consumidor no aplica**. Pero el **Código Civil** te protege frente a los **vicios ocultos** (defectos graves que no se veían y que el vendedor conocía o debía conocer): puedes pedir dejar sin efecto la venta o una rebaja del precio.

## Antes de comprar
- **Revisa** el auto con un mecánico de confianza.
- Pide el **historial** (mantenciones, multas, prendas, restricciones).
- Deja **por escrito** lo que la automotora promete (kilometraje, estado, garantía).

## ¿Qué hacer si salió malo?
1. Reclama de inmediato a la **automotora** y elige tu opción (reparación, cambio o devolución).
2. Guarda la **documentación** (factura, informe de la falla).
3. Si no responde, reclama en el **SERNAC** (sernac.cl).
4. Demanda en el **Juzgado de Policía Local** si es necesario.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Un auto usado de automotora tiene garantía?",
        respuesta:
          "Sí. Aplica la garantía legal: ante fallas puedes optar entre reparación gratis, cambio o devolución (artículo 20 de la Ley 19.496). La automotora no puede obligarte a aceptar solo la reparación.",
      },
      {
        pregunta: "¿Y si compré el auto a un particular?",
        respuesta:
          "La Ley del Consumidor no aplica entre particulares, pero el Código Civil te protege por los vicios ocultos: defectos graves no visibles que el vendedor conocía o debía conocer.",
      },
      {
        pregunta: "¿Cuánto plazo tengo para reclamar la garantía del auto?",
        respuesta:
          "La garantía legal se ejerce, por regla general, dentro de 6 meses desde la compra (artículo 21 de la Ley 19.496). Conviene reclamar apenas aparezca la falla y guardar la documentación.",
      },
      {
        pregunta: "¿Qué reviso antes de comprar un auto usado?",
        respuesta:
          "Llévalo a un mecánico de confianza, pide su historial (mantenciones, multas, prendas, restricciones) y deja por escrito lo que la automotora promete sobre estado, kilometraje y garantía.",
      },
    ],
  },
  {
    slug: "deuda-solidaria-varios-responden-por-todo",
    titulo: "Deuda solidaria: ¿por qué me cobran a mí toda la deuda?",
    categoria: "deudas",
    destacada: false,
    metaTitle: "Deuda solidaria: cuando te cobran el total | Ley Chilena",
    descripcion:
      "Si firmaste como codeudor solidario, te pueden cobrar el total de la deuda, no solo tu parte. Qué es la solidaridad y qué puedes hacer, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Cuando varias personas se obligan **solidariamente**, el acreedor puede **cobrarle el total a cualquiera** de ellas, no solo su parte ([artículo 1511 del Código Civil](/leyes/172986?art=1697)). Por eso, si firmaste un crédito como **codeudor solidario**, te pueden exigir **toda la deuda**. Si pagas el total, después puedes **cobrarles a los demás** su parte.",
    contenido: `
## ¿Qué es una deuda solidaria?
Por regla general, cuando varios deben algo, cada uno responde por **su parte**. Pero si la obligación se pactó **solidaria**, cambia: el acreedor puede exigir el **total a cualquiera** de los deudores ([artículo 1511 del Código Civil](/leyes/172986?art=1697)). La solidaridad no se presume: debe estar **pactada** (o establecida por ley).

## ¿Por qué me cobran todo a mí?
Porque firmaste como **codeudor solidario** (muy común en créditos y arriendos). Para el banco, da igual a quién le cobra: puede ir por el **total** contra el que tenga con qué pagar, aunque haya otros deudores.

## ¿Y mi "parte"?
Frente al acreedor respondes por **todo**. Pero entre los codeudores, la deuda se divide: si pagaste el total, tienes derecho a **cobrarles a los demás** la parte que les correspondía (acción de reembolso). Guarda el comprobante de lo que pagaste.

## ¿Qué hacer?
1. Revisa el contrato: ¿firmaste como **codeudor solidario** o como deudor por tu parte?
2. Si te cobran el total, puedes pagar y luego **repetir** contra los demás codeudores.
3. Si la deuda pudo **prescribir** o tiene cobros indebidos, revísalo antes de pagar.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Me pueden cobrar toda la deuda si éramos varios?",
        respuesta:
          "Sí, si la obligación es solidaria: el acreedor puede exigir el total a cualquiera de los deudores (artículo 1511 del Código Civil). La solidaridad debe estar pactada o establecida por ley.",
      },
      {
        pregunta: "Si pago el total, ¿puedo cobrarles a los demás?",
        respuesta:
          "Sí. Entre los codeudores la deuda se divide: quien pagó el total puede cobrar (repetir) a los demás la parte que les correspondía. Guarda el comprobante del pago.",
      },
      {
        pregunta: "¿La solidaridad se presume?",
        respuesta:
          "No. La solidaridad no se presume: debe estar expresamente pactada en el contrato o establecida por la ley. Si no lo está, cada deudor responde solo por su parte.",
      },
      {
        pregunta: "Firmé como aval, ¿es lo mismo que codeudor solidario?",
        respuesta:
          "Suelen confundirse. El codeudor solidario responde por el total de inmediato; el fiador simple puede, en ciertos casos, exigir que cobren primero al deudor principal. Revisa cómo firmaste.",
      },
    ],
  },
  {
    slug: "imputacion-del-pago-a-que-deuda-se-aplica",
    titulo: "Imputación del pago: ¿a qué se aplica lo que abono?",
    categoria: "deudas",
    destacada: false,
    metaTitle: "Imputación del pago: capital o intereses | Ley Chilena",
    descripcion:
      "Cuando abonas a una deuda con intereses, el pago se aplica primero a los intereses y luego al capital. Cómo funciona la imputación del pago, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Si debes **capital e intereses**, el pago se imputa **primero a los intereses** y luego al capital, salvo que el acreedor acepte lo contrario ([artículo 1595 del Código Civil](/leyes/172986?art=1781)). Por eso, cuando solo abonas montos pequeños, la deuda baja lento: gran parte se va en intereses. Conviene exigir que cada abono quede **claro** (cuánto a interés, cuánto a capital).",
    contenido: `
## ¿Qué es la imputación del pago?
Es la regla que define **a qué se aplica** lo que pagas cuando tienes una deuda con varios componentes. La ley es clara: si debes **capital e intereses**, el pago se imputa **primero a los intereses** ([artículo 1595 del Código Civil](/leyes/172986?art=1781)), salvo que el acreedor acepte imputarlo de otro modo.

## ¿Por qué importa?
Porque explica por qué una deuda **no baja** aunque pagues: si tus abonos apenas cubren los intereses, el **capital** casi no se reduce. Entender esto te ayuda a negociar y a pedir que se aplique parte al capital.

## ¿Y si tengo varias deudas con el mismo acreedor?
Cuando hay varias deudas, en general **el deudor puede elegir** cuál paga al momento de pagar (con ciertas reglas). Si no eliges, la ley y el recibo definen la imputación. Por eso conviene **dejar constancia** de qué deuda estás pagando.

## ¿Qué hacer?
1. Al abonar, **pide un detalle**: cuánto fue a interés y cuánto a capital.
2. Si quieres bajar el capital, **negócialo** expresamente con el acreedor.
3. Guarda todos los **comprobantes** de pago (te protegen y prueban lo abonado).
4. Si te cobran **intereses sobre el máximo legal**, eso es ilegal: revísalo.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Mi pago baja el capital o los intereses?",
        respuesta:
          "Si debes capital e intereses, el pago se imputa primero a los intereses y luego al capital (artículo 1595 del Código Civil), salvo que el acreedor acepte lo contrario.",
      },
      {
        pregunta: "¿Por qué mi deuda no baja aunque pago?",
        respuesta:
          "Porque tus abonos pueden estar cubriendo principalmente los intereses, no el capital. Pide un detalle de cada pago y negocia que parte se aplique al capital.",
      },
      {
        pregunta: "Tengo varias deudas con el mismo acreedor, ¿cuál pago primero?",
        respuesta:
          "Por regla general el deudor puede elegir qué deuda paga al momento de pagar, con ciertas reglas. Si no eliges, la ley y el recibo definen la imputación; conviene dejar constancia.",
      },
      {
        pregunta: "¿Pueden cobrarme cualquier interés?",
        respuesta:
          "No. Cobrar intereses por sobre el interés máximo convencional es infracción. Si crees que te cobran de más, revisa la tasa y reclama; los intereses excesivos se pueden impugnar.",
      },
    ],
  },
  {
    slug: "no-pago-el-credito-hipotecario-pueden-rematar-mi-casa",
    titulo: "No pago el crédito hipotecario: ¿pueden rematar mi casa?",
    categoria: "deudas",
    destacada: true,
    metaTitle: "No pago el crédito hipotecario: ¿remate? | Ley Chilena",
    descripcion:
      "Si dejas de pagar un crédito con hipoteca, el banco puede rematar la propiedad para cobrarse. Cómo funciona, qué plazos tienes y cómo evitar el remate.",
    fecha: "2026-06-21",
    respuestaCorta:
      "La **hipoteca** es una garantía sobre tu propiedad: si no pagas el crédito, el banco puede **ejecutarla y rematar el inmueble** para cobrarse ([artículo 2407 del Código Civil](/leyes/172986?art=2620)). No es inmediato: hay un **juicio** con plazos en que puedes ponerte al día, repactar o defenderte. Si el remate cubre más que la deuda, el saldo es tuyo.",
    contenido: `
## ¿Qué es la hipoteca?
Es una **garantía** sobre un inmueble: la propiedad queda "respondiendo" por el crédito ([artículo 2407 del Código Civil](/leyes/172986?art=2620)). Sigues siendo dueño y la usas, pero si **no pagas**, el banco puede hacer **efectiva la garantía** rematando la casa.

## ¿Pueden rematarme la casa de inmediato?
No. El banco debe iniciar un **juicio ejecutivo** para cobrar. En ese juicio:
- Te **notifican** la demanda y se traba el embargo sobre el inmueble.
- Tienes **plazos para pagar, repactar o defenderte** (oponer excepciones).
- Solo después, si no se resuelve, se ordena el **remate** (subasta pública).

## ¿Qué pasa con lo que se obtiene en el remate?
Con el dinero del remate se paga la **deuda, intereses y costas**. Si **sobra**, ese saldo te corresponde a ti. Si **no alcanza**, en principio sigues debiendo el resto (salvo pacto distinto).

## Cómo evitar el remate
- **Habla con el banco apenas** te atrases: repactar o reprogramar suele ser posible.
- Si ya hay juicio, puedes **ponerte al día** dentro de los plazos.
- Evalúa **vender tú mismo** la propiedad antes del remate (suele obtenerse más que en subasta).

## ¿Qué hacer?
1. **No ignores** las cartas ni la demanda: los plazos corren.
2. Contacta al banco para **repactar** antes de que escale.
3. Si te demandan, busca asesoría (un abogado o la **Corporación de Asistencia Judicial**, gratis).
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Pueden rematar mi casa si no pago el crédito hipotecario?",
        respuesta:
          "Sí, el banco puede ejecutar la hipoteca y rematar el inmueble para cobrarse (artículo 2407 del Código Civil), pero mediante un juicio con plazos en que puedes pagar, repactar o defenderte.",
      },
      {
        pregunta: "¿El remate es inmediato?",
        respuesta:
          "No. Requiere un juicio ejecutivo: notificación, embargo y plazos para oponerte o ponerte al día. Solo si no se resuelve se ordena el remate en subasta pública.",
      },
      {
        pregunta: "Si rematan mi casa y sobra dinero, ¿es mío?",
        respuesta:
          "Sí. Con el remate se paga la deuda, intereses y costas; si sobra, ese saldo te corresponde. Si no alcanza, en principio sigues debiendo el resto, salvo pacto distinto.",
      },
      {
        pregunta: "¿Cómo evito que rematen mi propiedad?",
        respuesta:
          "Hablando con el banco apenas te atrasas (repactar/reprogramar), poniéndote al día dentro de los plazos del juicio, o vendiendo tú mismo la propiedad antes del remate.",
      },
    ],
  },
  {
    slug: "novacion-y-repactar-ojo-con-reconocer-la-deuda",
    titulo: "Repactar una deuda: ojo con la novación y reconocer la deuda",
    categoria: "deudas",
    destacada: false,
    metaTitle: "Repactar deuda y novación: lo que debes saber | Ley Chilena",
    descripcion:
      "Repactar puede aliviar tus cuotas, pero también puede revivir una deuda prescrita o cambiar tus condiciones. Qué es la novación y qué revisar antes de firmar, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Repactar es renegociar tu deuda (nuevas cuotas o plazo). Cuidado: si se **sustituye la deuda anterior por una nueva**, eso es una **novación** ([artículo 1628 del Código Civil](/leyes/172986?art=1814)) y puede hacerte **reconocer** una deuda incluso **prescrita** o cambiar tus garantías. Antes de repactar, revisa el **monto total**, la **tasa** y si la deuda ya pudo prescribir.",
    contenido: `
## ¿Qué es repactar?
Es **renegociar** una deuda: bajar la cuota, ampliar el plazo o juntar varias deudas en una. Puede aliviar, pero **no siempre conviene**: a veces alarga el pago y suma intereses, o cambia tus condiciones.

## ¿Qué es la novación?
La **novación** es **sustituir una obligación anterior por una nueva**, que extingue la antigua ([artículo 1628 del Código Civil](/leyes/172986?art=1814)). Si tu repactación es una novación, nace una **deuda nueva**: eso puede afectar **garantías, plazos y la prescripción**.

## Los riesgos al repactar
- **Revivir una deuda prescrita**: si firmas una repactación reconociendo una deuda que ya estaba **prescrita**, puedes perder esa defensa.
- **Más intereses**: alargar el plazo puede significar pagar mucho más al final.
- **Capitalizar intereses**: ojo con que te sumen los intereses atrasados al capital.

## ¿Qué revisar antes de firmar?
1. El **monto total** que terminarás pagando (no solo la cuota).
2. La **tasa de interés** (que no supere el máximo legal).
3. Si la deuda **ya pudo prescribir** (puede que no debas firmar nada).
4. Qué **garantías** quedan involucradas.

## ¿Qué hacer?
1. Pide la **propuesta por escrito** y compárala con tu deuda actual.
2. Calcula el **costo total**, no solo la cuota mensual.
3. Si la deuda es antigua, revisa la **prescripción** antes de repactar.
4. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Repactar una deuda me conviene siempre?",
        respuesta:
          "No siempre. Puede bajar la cuota pero alargar el pago y sumar intereses. Compara el costo total, no solo la cuota mensual, antes de firmar.",
      },
      {
        pregunta: "¿Repactar puede revivir una deuda prescrita?",
        respuesta:
          "Sí. Si firmas una repactación reconociendo una deuda ya prescrita, puedes perder esa defensa. Por eso conviene revisar la prescripción antes de repactar.",
      },
      {
        pregunta: "¿Qué es la novación?",
        respuesta:
          "Sustituir una obligación anterior por una nueva, que extingue la antigua (artículo 1628 del Código Civil). Si la repactación es una novación, nace una deuda nueva que puede cambiar garantías y plazos.",
      },
      {
        pregunta: "¿Qué reviso antes de repactar?",
        respuesta:
          "El monto total a pagar, la tasa de interés (que no supere el máximo legal), si la deuda pudo prescribir y qué garantías quedan involucradas. Pide siempre la propuesta por escrito.",
      },
    ],
  },
  {
    slug: "cambiar-a-separacion-de-bienes-durante-el-matrimonio",
    titulo: "Cambiar a separación de bienes durante el matrimonio",
    categoria: "familia",
    destacada: false,
    metaTitle: "Cambiar de sociedad conyugal a separación de bienes | Ley Chilena",
    descripcion:
      "Estando casados pueden cambiar el régimen de bienes: de sociedad conyugal a separación total o a participación en los gananciales. Cómo se hace, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Sí se puede. **Durante el matrimonio**, los cónyuges pueden **sustituir** el régimen de sociedad de bienes por el de **participación en los gananciales** o por el de **separación total de bienes** ([artículo 1723 del Código Civil](/leyes/172986?art=1909)). Se hace por **escritura pública** que debe **subinscribirse** al margen del acta de matrimonio dentro de 30 días.",
    contenido: `
## ¿Se puede cambiar el régimen estando casados?
Sí. Aunque al casarse hayan quedado en **sociedad conyugal**, la ley permite **cambiar de régimen durante el matrimonio**: sustituirlo por **separación total de bienes** o por **participación en los gananciales** ([artículo 1723 del Código Civil](/leyes/172986?art=1909)).

## ¿Para qué sirve cambiar a separación de bienes?
- **Proteger el patrimonio** de un cónyuge frente a las **deudas** del otro (por ejemplo, si uno emprende un negocio).
- Que **cada uno administre lo suyo** con independencia.
- Ordenar el patrimonio antes de un eventual conflicto.

Recuerda: el cambio **no es retroactivo** y no puede hacerse en **perjuicio de terceros** (acreedores que ya existían).

## ¿Cómo se hace?
1. Se otorga una **escritura pública** ante notario, donde ambos acuerdan el nuevo régimen.
2. Esa escritura debe **subinscribirse al margen de la inscripción del matrimonio** en el Registro Civil, **dentro de 30 días** desde la escritura.
3. Al liquidar la sociedad conyugal, se reparten los bienes según corresponda.

## ¿Qué hacer?
1. Conversen qué régimen les conviene (separación da más independencia).
2. Vayan a una **notaría** a otorgar la escritura de cambio.
3. **Subinscríbanla** en el Registro Civil dentro del plazo (clave para que valga).
4. Asesórense con un abogado de familia si hay patrimonio importante.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Puedo cambiar de sociedad conyugal a separación de bienes?",
        respuesta:
          "Sí. Durante el matrimonio pueden sustituir la sociedad de bienes por separación total o por participación en los gananciales (artículo 1723 del Código Civil), por escritura pública subinscrita al margen del matrimonio.",
      },
      {
        pregunta: "¿Para qué sirve pasar a separación de bienes?",
        respuesta:
          "Para proteger el patrimonio de un cónyuge frente a las deudas del otro y para que cada uno administre sus bienes con independencia. Útil si uno emprende o tiene riesgo patrimonial.",
      },
      {
        pregunta: "¿El cambio afecta a los acreedores anteriores?",
        respuesta:
          "No puede hacerse en perjuicio de terceros: los acreedores que ya existían conservan sus derechos. El cambio de régimen no es retroactivo.",
      },
      {
        pregunta: "¿Qué pasa si no subinscribo la escritura a tiempo?",
        respuesta:
          "La subinscripción al margen del matrimonio dentro de 30 días es esencial para que el cambio produzca efecto. Sin ella, el cambio de régimen no se perfecciona.",
      },
    ],
  },
  {
    slug: "que-bienes-responden-por-mis-deudas",
    titulo: "¿Qué bienes me pueden quitar por una deuda?",
    categoria: "deudas",
    destacada: false,
    metaTitle: "Qué bienes responden por mis deudas | Ley Chilena",
    descripcion:
      "Por una deuda, el acreedor puede perseguir tus bienes, pero no todos: hay bienes inembargables. Qué responde y qué está protegido, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Toda obligación da al acreedor el derecho de **perseguir su pago sobre todos los bienes** del deudor, presentes o futuros, salvo los **inembargables** ([artículo 2465 del Código Civil](/leyes/172986?art=2678)). En la práctica: te pueden embargar bienes para pagar una deuda, pero **no todo** — hay cosas protegidas (parte del sueldo, bienes esenciales del hogar y de tu trabajo).",
    contenido: `
## La regla general: tu patrimonio responde
Cuando debes, el acreedor puede **perseguir el pago sobre tus bienes** —los que tienes y los que adquieras— ([artículo 2465 del Código Civil](/leyes/172986?art=2678)). Es lo que se llama el "derecho de prenda general": tu **patrimonio** es la garantía de tus deudas.

## Pero NO todo es embargable
La ley protege bienes **inembargables**, para que nadie quede en la indigencia. En general, **no se pueden embargar**, entre otros:
- La parte del **sueldo** que la ley protege (en general, hasta **56 UF mensuales** del ingreso).
- El **lecho del deudor y su familia**, ropa y artículos esenciales del hogar.
- Los **libros y herramientas** necesarios para tu trabajo o profesión.
- Ciertos **beneficios sociales** y pensiones.

Estos límites buscan que una deuda no te deje sin lo básico para vivir y trabajar.

## ¿Cómo se hace efectivo el cobro?
El acreedor debe ir a un **juicio**: con sentencia, se ordena el **embargo** de bienes embargables y, si no pagas, su **remate** para pagar la deuda. No puede simplemente "llevarse" tus cosas por su cuenta.

## ¿Qué hacer?
1. Si te demandan, **no ignores** el juicio: hay plazos para defenderte o pagar.
2. Si te embargan **bienes inembargables**, **reclámalo** en el tribunal.
3. Revisa si la deuda **prescribió** o tiene cobros indebidos antes de pagar.
4. Busca asesoría (un abogado o la **Corporación de Asistencia Judicial**, gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Pueden quitarme cualquier bien por una deuda?",
        respuesta:
          "El acreedor puede perseguir el pago sobre tus bienes (artículo 2465 del Código Civil), pero no los inembargables: parte del sueldo, lecho y artículos esenciales del hogar, y herramientas de trabajo, entre otros.",
      },
      {
        pregunta: "¿Cuánto de mi sueldo es inembargable?",
        respuesta:
          "Por regla general, el sueldo es inembargable hasta 56 UF mensuales; sobre ese monto puede embargarse una parte. Hay excepciones, como las deudas por pensión de alimentos.",
      },
      {
        pregunta: "¿El acreedor puede llevarse mis cosas sin juicio?",
        respuesta:
          "No. Para embargar y rematar bienes se requiere un juicio con sentencia. Nadie puede sacarte tus cosas por su cuenta; si lo hacen, es ilegal y puedes denunciarlo.",
      },
      {
        pregunta: "Me embargaron algo inembargable, ¿qué hago?",
        respuesta:
          "Reclámalo en el tribunal del juicio: puedes pedir que se excluya del embargo el bien inembargable (parte del sueldo, herramientas de trabajo, artículos esenciales del hogar).",
      },
    ],
  },
  {
    slug: "no-pueden-negarte-la-venta-ni-condicionarla",
    titulo: "¿Pueden negarme la venta o condicionarla? Tus derechos",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "No pueden negarte la venta injustificadamente | Ley Chilena",
    descripcion:
      "Un proveedor no puede negarte injustificadamente la venta de un producto o servicio disponible. Qué dice la Ley del Consumidor y qué hacer si te discriminan o condicionan.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Los proveedores **no pueden negar injustificadamente** la venta de bienes o la prestación de servicios que tengan disponibles ([artículo 13 de la Ley 19.496](/leyes/1160403?art=138530)). Tampoco pueden **condicionar** la venta a comprar otra cosa o discriminar sin razón. Si te niegan la atención teniendo stock, puedes reclamar en el SERNAC.",
    contenido: `
## La regla: no te pueden negar la venta sin razón
La Ley del Consumidor lo dice claro: el proveedor **no puede negar injustificadamente** la venta de un bien o la prestación de un servicio que ofrece y tiene disponible ([artículo 13 de la Ley 19.496](/leyes/1160403?art=138530)). Si está en stock y a la venta, deben vendértelo.

## ¿Qué cuenta como negativa injustificada?
- No venderte un producto que **está en góndola** o publicado, sin motivo válido.
- **Discriminarte** (por apariencia, origen u otra razón arbitraria).
- **Condicionar** la venta a que compres **otra cosa** ("solo si llevas también esto").
- Poner trabas que no aplican a otros clientes.

> Sí pueden negarse por motivos **legítimos**: falta de stock real, que el producto sea para mayores de edad, riesgo de seguridad, etc.

## ¿Qué puedes exigir?
- Que te **vendan** en igualdad de condiciones.
- Si hubo discriminación o daño, la **sanción** e **indemnización** que corresponda.

## ¿Qué hacer?
1. Pide hablar con el **encargado** y que te expliquen el motivo.
2. Deja **constancia** (testigos, fecha, lo que te dijeron).
3. Si la negativa es injustificada, reclama en el **SERNAC** (sernac.cl).
4. Puedes demandar en el **Juzgado de Policía Local**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Pueden negarme la venta de un producto disponible?",
        respuesta:
          "No injustificadamente. El proveedor no puede negar la venta de un bien o servicio que tiene disponible (artículo 13 de la Ley 19.496), salvo motivos legítimos como falta de stock o restricciones legales del producto.",
      },
      {
        pregunta: "¿Pueden condicionar la venta a comprar otra cosa?",
        respuesta:
          "No. Condicionar la venta de un producto a la compra de otro es una práctica que la ley no permite. Puedes exigir la venta del producto que quieres en igualdad de condiciones.",
      },
      {
        pregunta: "¿Y si me discriminan al atenderme?",
        respuesta:
          "La discriminación arbitraria en la atención puede dar lugar a sanción e indemnización. Deja constancia de lo ocurrido y reclama en el SERNAC o en el Juzgado de Policía Local.",
      },
      {
        pregunta: "¿Cuándo sí pueden negarse a venderme?",
        respuesta:
          "Por motivos legítimos: falta de stock real, productos con restricción de edad o por seguridad, entre otros. La negativa debe ser justificada, no arbitraria.",
      },
    ],
  },
  {
    slug: "contrato-de-adhesion-letra-legible-y-copia",
    titulo: "Contrato de adhesión: tu derecho a letra legible y a una copia",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Contrato de adhesión: letra legible y copia | Ley Chilena",
    descripcion:
      "Los contratos de adhesión (los que firmas sin negociar) deben estar en español, con letra legible y entregándote una copia. Qué exige la Ley del Consumidor.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Los **contratos de adhesión** (los que te dan ya redactados, sin que puedas negociar) tienen reglas de forma: deben estar redactados de manera **legible** y entregarte una **copia** ([artículo 17 de la Ley 19.496](/leyes/1160403?art=138541)). Una cláusula en letra ilegible o un contrato del que no te dan copia incumple la ley y puede reclamarse.",
    contenido: `
## ¿Qué es un contrato de adhesión?
Es el contrato **predispuesto** por la empresa, que tú solo **aceptas o rechazas** sin poder negociar sus cláusulas (créditos, telefonía, seguros, gimnasios, etc.). Justamente porque no lo negocias, la ley exige **requisitos de forma** para protegerte.

## Tus derechos de forma
Según el [artículo 17 de la Ley 19.496](/leyes/1160403?art=138541), el contrato de adhesión debe:
- Estar redactado de forma **legible** y comprensible (no letra chica imposible de leer).
- Entregarte una **copia** del contrato firmado.
- Estar en **español** (la información comercial básica debe entregarse en idioma español, art. 32).

Si una cláusula está en condiciones que **no permiten leerla**, no produce efecto.

## ¿Por qué importa?
Porque muchas veces los problemas (cobros, renovaciones automáticas, penalidades) están escondidos en cláusulas que **no se entienden** o que el consumidor **nunca recibió**. Tener la copia y exigir legibilidad te protege.

## ¿Qué hacer?
1. **Exige una copia** del contrato que firmaste (es tu derecho).
2. Si hay **letra ilegible** o cláusulas incomprensibles, déjalo por escrito.
3. Guarda el contrato; te servirá ante cualquier cobro o conflicto.
4. Si te niegan la copia o el contrato es ilegible, reclama en el **SERNAC** (sernac.cl).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Tengo derecho a una copia del contrato que firmé?",
        respuesta:
          "Sí. En los contratos de adhesión, el proveedor debe entregarte una copia del contrato (artículo 17 de la Ley 19.496). Exígela: te protege ante cobros y conflictos.",
      },
      {
        pregunta: "¿Vale una cláusula en letra ilegible?",
        respuesta:
          "El contrato debe ser legible. Una cláusula redactada en condiciones que no permiten leerla o entenderla puede no producir efecto. Conviene reclamar y conservar el contrato.",
      },
      {
        pregunta: "¿El contrato debe estar en español?",
        respuesta:
          "Sí. La información básica comercial debe entregarse en idioma español (artículo 32 de la Ley 19.496), de forma clara y comprensible para el consumidor.",
      },
      {
        pregunta: "¿Dónde reclamo si no me dan copia o es ilegible?",
        respuesta:
          "En el SERNAC (sernac.cl). Guarda evidencia (fotos del contrato, correos) y, si corresponde, demanda en el Juzgado de Policía Local.",
      },
    ],
  },
  {
    slug: "negligencia-del-proveedor-responde-por-los-danos",
    titulo: "Negligencia del proveedor: ¿responde por los daños que me causó?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Negligencia del proveedor y daños | Ley Chilena",
    descripcion:
      "Si por negligencia del proveedor en la venta de un producto o servicio sufres un daño, la Ley del Consumidor lo hace responder. Qué puedes exigir y cómo.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Comete infracción el proveedor que, en la venta de un bien o la prestación de un servicio, actúa con **negligencia** y causa **menoscabo** al consumidor por deficiencias en la calidad, cantidad, seguridad o aptitud del producto ([artículo 23 de la Ley 19.496](/leyes/1160403?art=138560)). Si te dañó por su descuido, puedes exigir la **reparación del perjuicio**, además de las sanciones.",
    contenido: `
## La responsabilidad por negligencia
La Ley del Consumidor no solo cubre el cambio o la devolución: también responsabiliza al proveedor que, **actuando con negligencia**, causa un **menoscabo** al consumidor por deficiencias en la **calidad, cantidad, identidad, sustancia, seguridad o aptitud** del bien o servicio ([artículo 23 de la Ley 19.496](/leyes/1160403?art=138560)).

## Ejemplos
- Un producto que, por mal estado, te causa un **daño** (alimento en mal estado, aparato que falla y provoca un perjuicio).
- Un servicio prestado con **descuido** que te genera pérdidas.
- Información o seguridad deficiente que termina en un **daño** real.

## ¿Qué puedes exigir?
- La **reparación del perjuicio** sufrido (daño material y, según el caso, moral).
- Las **sanciones** que aplique el tribunal por la infracción.
- Y, si corresponde, la **garantía legal** (cambio, reparación o devolución) por la falla.

## ¿Qué hacer?
1. **Documenta el daño**: fotos, boletas, informes médicos o técnicos, testigos.
2. Reclama por **escrito** al proveedor.
3. Si no resuelve, presenta el **reclamo en el SERNAC** (sernac.cl).
4. Para la indemnización, demanda en el **Juzgado de Policía Local**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿El proveedor responde si su negligencia me causó un daño?",
        respuesta:
          "Sí. Comete infracción el proveedor que con negligencia causa menoscabo al consumidor por deficiencias en la calidad, seguridad o aptitud del producto o servicio (artículo 23 de la Ley 19.496). Puedes exigir la reparación del perjuicio.",
      },
      {
        pregunta: "¿Puedo pedir indemnización además del cambio?",
        respuesta:
          "Sí. La garantía legal (cambio, reparación o devolución) es independiente de la indemnización de los perjuicios que la negligencia te haya causado. Puedes reclamar ambas cosas.",
      },
      {
        pregunta: "¿Qué pruebas necesito?",
        respuesta:
          "Documenta el daño y su origen: fotos, boletas, informes médicos o técnicos y testigos. Esa evidencia respalda tu reclamo en el SERNAC y tu demanda por indemnización.",
      },
      {
        pregunta: "¿Dónde demando la indemnización?",
        respuesta:
          "En el Juzgado de Policía Local, que conoce las infracciones a la Ley del Consumidor y puede ordenar la indemnización de los perjuicios además de sancionar al proveedor.",
      },
    ],
  },
  {
    slug: "informacion-en-espanol-y-rotulado-de-productos",
    titulo: "Información en español y rotulado: ¿qué deben informarte del producto?",
    categoria: "consumidor",
    destacada: false,
    metaTitle: "Información comercial en español y rotulado | Ley Chilena",
    descripcion:
      "La información básica de un producto o servicio debe entregarse en español y de forma clara. Qué te deben informar (precio, condiciones, características) según la Ley del Consumidor.",
    fecha: "2026-06-21",
    respuestaCorta:
      "La **información básica comercial** de los productos y servicios debe entregarse en **idioma español**, de forma clara y comprensible ([artículo 32 de la Ley 19.496](/leyes/1160403?art=138574)). Eso incluye el **precio, las características, las condiciones de contratación, la garantía y las instrucciones**. Si te venden algo sin información en español o engañosa, puedes reclamar.",
    contenido: `
## Tu derecho a estar informado
Antes de comprar, tienes derecho a saber **qué estás comprando y en qué condiciones**. Por eso la ley exige que la **información básica comercial** de los productos y servicios se entregue en **idioma español**, de manera clara y comprensible ([artículo 32 de la Ley 19.496](/leyes/1160403?art=138574)).

## ¿Qué información te deben dar?
- El **precio** y la forma de pago.
- Las **características** del producto o servicio.
- Las **condiciones de contratación** (plazos, vigencia, restricciones).
- La **garantía** y el **rotulado** (instrucciones de uso, advertencias, contenido).

En productos importados, las **instrucciones y advertencias** relevantes deben estar en español.

## ¿Por qué importa?
Porque comprar sin información clara te expone a errores y abusos: no saber el precio real, las condiciones de un contrato o cómo usar un producto de forma segura. La información veraz y en español es un **derecho del consumidor**.

## ¿Qué hacer?
1. Exige la **información en español**, sobre todo en productos importados.
2. Si la información fue **falsa o no la entregaron**, guarda evidencia (foto, empaque, publicidad).
3. Reclama en el **SERNAC** (sernac.cl) si te indujeron a error.
4. Puedes demandar en el **Juzgado de Policía Local**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿La información del producto debe estar en español?",
        respuesta:
          "Sí. La información básica comercial de productos y servicios debe entregarse en idioma español, de forma clara y comprensible (artículo 32 de la Ley 19.496), incluidas instrucciones y advertencias.",
      },
      {
        pregunta: "¿Qué información me deben dar antes de comprar?",
        respuesta:
          "El precio, las características, las condiciones de contratación, la garantía y el rotulado o instrucciones de uso. Todo de manera veraz y comprensible.",
      },
      {
        pregunta: "Compré algo importado sin instrucciones en español, ¿qué hago?",
        respuesta:
          "Puedes reclamar: las instrucciones y advertencias relevantes deben estar en español. Guarda el empaque como evidencia y reclama en el SERNAC.",
      },
      {
        pregunta: "¿Y si la información era falsa?",
        respuesta:
          "Si te indujeron a error con información falsa, además de esta norma puede haber publicidad engañosa. Reclama en el SERNAC y, para indemnización, en el Juzgado de Policía Local.",
      },
    ],
  },
  {
    slug: "servidumbre-de-transito-acceso-a-un-predio-sin-salida",
    titulo: "Servidumbre de tránsito: acceso a un terreno sin salida",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Servidumbre de tránsito: derecho de paso | Ley Chilena",
    descripcion:
      "Si tu terreno no tiene salida al camino público, tienes derecho a exigir un paso por el predio vecino (servidumbre de tránsito), pagando la indemnización. Cómo funciona.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Si un terreno está **sin comunicación con el camino público** por estar rodeado de otros predios, su dueño tiene **derecho a exigir paso** por los predios vecinos para acceder a él, pagando la **indemnización** correspondiente ([artículo 847 del Código Civil](/leyes/172986?art=1033)). Es la **servidumbre legal de tránsito**: el vecino no puede dejarte sin acceso.",
    contenido: `
## El problema: un terreno sin salida
A veces un predio queda **rodeado** por otros y **sin acceso** al camino público. La ley resuelve esto: el dueño del terreno encerrado tiene derecho a **exigir un paso** por los predios vecinos ([artículo 847 del Código Civil](/leyes/172986?art=1033)). Es la **servidumbre de tránsito**.

## ¿Cómo funciona?
- El predio **sin salida** (predio dominante) puede exigir paso por el **predio vecino** (predio sirviente).
- Se debe **pagar una indemnización** al vecino por el paso y los perjuicios.
- El paso debe fijarse por el lugar **menos perjudicial** para el predio que lo soporta.

Si no hay acuerdo, lo fija el **juez**, que determina el trazado y la indemnización.

## ¿Y si ya teníamos un acuerdo?
Las servidumbres pueden ser **voluntarias** (pactadas, idealmente por escritura inscrita) o **legales** (impuestas por la ley, como esta de tránsito). Conviene **dejarla por escrito e inscrita** en el Conservador de Bienes Raíces para que conste.

## ¿Qué hacer?
1. Verifica si tu predio realmente **carece de acceso** al camino público.
2. Intenta un **acuerdo** con el vecino (trazado e indemnización) y formalízalo por escritura.
3. Si no hay acuerdo, pide al **tribunal** que constituya la servidumbre de tránsito.
4. Inscríbela en el **Conservador de Bienes Raíces**.
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "Mi terreno no tiene salida, ¿pueden dejarme sin acceso?",
        respuesta:
          "No. Si tu predio está sin comunicación con el camino público, tienes derecho a exigir paso por los predios vecinos, pagando la indemnización (artículo 847 del Código Civil). Es la servidumbre de tránsito.",
      },
      {
        pregunta: "¿Tengo que pagarle al vecino por el paso?",
        respuesta:
          "Sí. La servidumbre de tránsito se establece pagando una indemnización al dueño del predio que soporta el paso, por el uso y los perjuicios. El paso debe fijarse por el lugar menos dañino.",
      },
      {
        pregunta: "¿Quién decide por dónde pasa la servidumbre?",
        respuesta:
          "Idealmente las partes de común acuerdo. Si no hay acuerdo, lo resuelve el juez, fijando el trazado menos perjudicial y la indemnización que corresponde.",
      },
      {
        pregunta: "¿Conviene inscribir la servidumbre?",
        respuesta:
          "Sí. Dejarla por escritura pública e inscrita en el Conservador de Bienes Raíces le da certeza y la hace oponible a futuros dueños del predio.",
      },
    ],
  },
  {
    slug: "cerco-y-deslinde-con-el-vecino",
    titulo: "Cercos y deslindes con el vecino: ¿quién paga y dónde va el límite?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Cercos y deslindes con el vecino | Ley Chilena",
    descripcion:
      "Tienes derecho a cerrar tu terreno y, en los límites con el vecino, a compartir el cerco. Cómo funcionan el cerramiento y los deslindes, según el Código Civil.",
    fecha: "2026-06-21",
    respuestaCorta:
      "Todo dueño tiene **derecho a cerrar o cercar su terreno** por todas partes ([artículo 844 del Código Civil](/leyes/172986?art=1030)). En el **límite con el vecino**, el cerco divisorio puede ser **medianero** (compartido) y, en ese caso, los costos de construirlo y mantenerlo se reparten. Para fijar el **deslinde** exacto, se puede pedir la demarcación.",
    contenido: `
## Tu derecho a cerrar tu terreno
La ley reconoce que el dueño de un predio puede **cerrarlo o cercarlo** por todos sus lados (con muros, rejas, setos), como expresión de su propiedad ([artículo 844 del Código Civil](/leyes/172986?art=1030)).

## El cerco con el vecino (medianería)
Cuando el cerco está **en el límite** entre dos predios, puede ser **medianero**: pertenece a ambos vecinos. En ese caso:
- Los **costos** de construirlo y mantenerlo se **reparten** entre los dueños colindantes.
- Ninguno puede destruirlo o usarlo en perjuicio del otro sin acuerdo.

## El deslinde (dónde va el límite)
Si no está claro **por dónde pasa el límite** entre tu terreno y el del vecino, puedes pedir la **demarcación**: fijar y marcar el deslinde, con planos y, si es necesario, un perito. Esto evita conflictos por metros, cercos corridos o construcciones que invaden.

## ¿Qué hacer?
1. Para cercar, respeta el **deslinde real** (no invadas el predio vecino).
2. Si el cerco es **compartido**, acuerda con el vecino el reparto de costos.
3. Si hay **duda del límite**, revisa los **títulos y planos** y pide la demarcación.
4. Ante conflicto, asesórate (un abogado o la **Corporación de Asistencia Judicial**, gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Puedo cerrar mi terreno con reja o muro?",
        respuesta:
          "Sí. El dueño tiene derecho a cerrar o cercar su predio por todas partes (artículo 844 del Código Civil), respetando el deslinde con el vecino y las normas municipales de construcción.",
      },
      {
        pregunta: "¿Quién paga el cerco entre dos casas?",
        respuesta:
          "Si el cerco es medianero (en el límite y compartido), los costos de construirlo y mantenerlo se reparten entre los dueños colindantes. Conviene acordarlo por escrito.",
      },
      {
        pregunta: "No sabemos dónde está el límite exacto, ¿qué hacemos?",
        respuesta:
          "Pueden pedir la demarcación del deslinde: revisar títulos y planos y, si es necesario, un perito que fije y marque el límite. Así se evitan conflictos por invasiones o cercos corridos.",
      },
      {
        pregunta: "El vecino corrió el cerco hacia mi terreno, ¿qué hago?",
        respuesta:
          "Revisa tus títulos y planos; si invadió tu propiedad, puedes exigir que se restituya el deslinde correcto. Si no hay acuerdo, el tribunal puede ordenar la demarcación y la restitución.",
      },
    ],
  },
  {
    slug: "comodato-prestar-una-propiedad-o-cosa-gratis",
    titulo: "Comodato: prestar gratis una casa o una cosa, ¿cómo me protejo?",
    categoria: "vivienda",
    destacada: false,
    metaTitle: "Comodato: préstamo de uso gratuito | Ley Chilena",
    descripcion:
      "Prestar gratis una propiedad o una cosa es un comodato. Qué obligaciones tiene quien la recibe y cómo recuperarla, según el Código Civil. Conviene dejarlo por escrito.",
    fecha: "2026-06-21",
    respuestaCorta:
      "El **comodato** o préstamo de uso es el contrato en que una persona entrega **gratuitamente** una cosa para que otra la use y luego la devuelva ([artículo 2174 del Código Civil](/leyes/172986?art=2387)). Quien la recibe debe **cuidarla y devolverla**; no se vuelve dueño. Prestar una casa a un familiar es un comodato: conviene dejarlo por escrito para poder **recuperarla** sin problemas.",
    contenido: `
## ¿Qué es el comodato?
Es el **préstamo de uso gratuito**: una parte (comodante) entrega una cosa —una casa, un auto, una herramienta— para que la otra (comodatario) la **use sin pagar** y después la **devuelva** ([artículo 2174 del Código Civil](/leyes/172986?art=2387)). Es **gratuito**: si se paga, ya no es comodato (sería arriendo).

## ¿Qué obligaciones tiene quien recibe la cosa?
- **Usarla** solo para lo acordado (o su uso natural).
- **Cuidarla** como un buen padre de familia y responder por los daños por su culpa.
- **Devolverla** cuando se acabe el uso o el plazo, o cuando el dueño la pida según lo pactado.

Importante: quien recibe en comodato **no se hace dueño**; solo tiene el uso temporal.

## Prestar una casa a un familiar
Es muy común "prestar" una casa a un hijo o pariente. Eso es un **comodato**. El riesgo: si no quedó **por escrito**, puede ser difícil pedir la devolución cuando la necesitas. Por eso conviene un **contrato de comodato** simple que diga qué se presta, por cuánto tiempo y cómo se devuelve.

## ¿Qué hacer?
1. Deja el comodato **por escrito** (qué cosa, plazo o condición, estado en que se entrega).
2. Si prestas una **propiedad**, define cuándo y cómo la recuperas.
3. Guarda **fotos del estado** al entregar y al devolver.
4. Si no te la devuelven, puedes **exigir la restitución** (es tuya, no del que la usa).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te orienta con la ley.
`,
    faq: [
      {
        pregunta: "¿Prestar una casa gratis es un contrato?",
        respuesta:
          "Sí, es un comodato o préstamo de uso (artículo 2174 del Código Civil): entregas gratis una cosa para que otro la use y la devuelva. Conviene dejarlo por escrito para poder recuperarla.",
      },
      {
        pregunta: "¿Quien recibe la casa en comodato se vuelve dueño?",
        respuesta:
          "No. El comodatario solo tiene el uso temporal y gratuito; no se hace dueño. Debe cuidar la cosa y devolverla cuando corresponda según lo pactado.",
      },
      {
        pregunta: "Le presté mi casa a un familiar y no me la devuelve, ¿qué hago?",
        respuesta:
          "Como sigues siendo dueño, puedes exigir la restitución. Tener un contrato de comodato por escrito (con plazo o condición de devolución) facilita mucho recuperarla.",
      },
      {
        pregunta: "¿Si cobro algo por el préstamo sigue siendo comodato?",
        respuesta:
          "No. El comodato es esencialmente gratuito. Si hay un pago por el uso, el contrato pasa a ser un arrendamiento, con otras reglas.",
      },
    ],
  }
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}

export function guiasDestacadas(): Guia[] {
  return guias.filter((g) => g.destacada);
}

/** Macro-grupos que ya tienen al menos una guía (en orden de CATEGORIAS). */
export function categoriasConGuias(): { clave: CategoriaGuia; etiqueta: string; emoji: string; guias: Guia[] }[] {
  return (Object.keys(CATEGORIAS) as CategoriaGuia[])
    .map((clave) => ({
      clave,
      etiqueta: CATEGORIAS[clave].etiqueta,
      emoji: CATEGORIAS[clave].emoji,
      guias: guias.filter((g) => g.categoria === clave),
    }))
    .filter((c) => c.guias.length > 0);
}
