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
    slug: "me-pueden-echar-del-arriendo-plazos-de-desahucio",
    titulo: "¿Me pueden echar del arriendo? Plazos de desahucio en Chile",
    categoria: "vivienda",
    destacada: true,
    metaTitle: "¿Me pueden echar del arriendo? Plazos de aviso | Ley Chilena",
    descripcion:
      "Si el arrendador quiere que dejes el arriendo, debe darte aviso (desahucio) con plazos mínimos según la Ley 18.101: 2 meses y hasta 6. No te pueden echar de un día para otro.",
    fecha: "2026-06-20",
    respuestaCorta:
      "**No te pueden echar de un día para otro.** Si tu contrato es **mes a mes o indefinido**, el arrendador debe notificarte el **desahucio** por vía **judicial o por un notario**, con un plazo mínimo de **2 meses**, que aumenta **1 mes por cada año** arrendado, hasta un máximo de **6 meses** ([artículo 3 de la Ley 18.101](/leyes/29526?art=9607)). Si el contrato es a **plazo fijo de hasta un año**, tienes **2 meses** desde que te notifican la demanda ([artículo 4](/leyes/29526?art=9608)).",
    contenido: `
## ¿Me pueden echar del arriendo cuando quieran?
No. La Ley de Arrendamiento (18.101) protege al arrendatario con **plazos mínimos de aviso**. El arrendador **no puede** sacarte por su cuenta, cambiar la chapa ni cortarte los servicios: para recuperar el inmueble debe seguir el procedimiento legal.

## Contrato mes a mes o indefinido
El **desahucio** (el aviso de que debes dejar el inmueble) **solo** vale si se hace **judicialmente o mediante notificación de un notario** ([artículo 3 de la Ley 18.101](/leyes/29526?art=9607)). El plazo es de:
- **2 meses** mínimo desde la notificación, **+1 mes por cada año completo** que llevas arrendando,
- con un **tope de 6 meses**.

Ejemplo: si llevas 3 años arrendando, el plazo será de 5 meses (2 + 3).

## Contrato a plazo fijo de hasta un año
El arrendador **solo puede pedir judicialmente** la restitución, y tú tienes derecho a **2 meses** contados desde que te **notifican la demanda** ([artículo 4](/leyes/29526?art=9608)). Puedes devolver antes y pagar solo hasta esa fecha.

## ¿Y si no pago el arriendo?
La falta de pago es causa de término, pero **igual** requiere un **juicio de terminación de arriendo**; no te pueden echar sin sentencia. Lo mejor es regularizar o negociar antes de llegar a tribunales.

## ¿Qué hacer?
1. Revisa **qué tipo de contrato** tienes (mes a mes, indefinido o plazo fijo): de eso depende tu plazo.
2. Exige que el desahucio sea **por notario o tribunal**: un aviso verbal o un WhatsApp **no cumple** el artículo 3.
3. Cuenta tu plazo: **2 meses + 1 por año**, hasta 6.
4. Si te presionan para salir antes o te cortan servicios, acude al **Juzgado** o a la **Corporación de Asistencia Judicial** (gratis).
5. ¿Tu caso es distinto? Pregúntale a **AbogaBot** y te explica qué dice la ley.
`,
    faq: [
      {
        pregunta: "¿Con cuánto aviso me pueden pedir que deje el arriendo?",
        respuesta:
          "En contratos mes a mes o indefinidos, mínimo 2 meses desde la notificación del desahucio, más 1 mes por cada año arrendado, hasta un máximo de 6 meses (artículo 3 de la Ley 18.101). El aviso debe ser judicial o por notario.",
      },
      {
        pregunta: "¿Pueden echarme cambiando la chapa o cortando los servicios?",
        respuesta:
          "No. Eso es ilegal. El arrendador debe seguir el procedimiento de la Ley 18.101 (desahucio por notario o tribunal, o juicio de terminación). Si lo hace por su cuenta, puedes denunciarlo y reclamar en tribunales.",
      },
      {
        pregunta: "¿Cuánto plazo tengo si mi contrato es a plazo fijo de un año?",
        respuesta:
          "Tienes derecho a 2 meses contados desde que te notifican la demanda de restitución (artículo 4 de la Ley 18.101). Puedes devolver antes y pagar solo hasta la fecha de restitución.",
      },
      {
        pregunta: "Si no pagué el arriendo, ¿me pueden echar de inmediato?",
        respuesta:
          "No de inmediato. La falta de pago es causal de término, pero requiere un juicio de terminación de arriendo. No te pueden sacar sin sentencia judicial. Conviene regularizar o negociar antes.",
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
