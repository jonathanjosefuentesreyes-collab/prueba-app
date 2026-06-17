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
