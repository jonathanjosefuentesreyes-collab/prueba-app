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

export type CategoriaGuia = "laboral" | "familia" | "vivienda" | "consumidor";

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
    destacada: true,
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
    titulo: "Guía rápida: Cómo calcular tus horas extras",
    categoria: "laboral",
    descripcion: "Aprende la fórmula legal exacta para saber cuánto deben pagarte por cada hora extra trabajada en Chile.",
    fecha: "2026-06-10",
    contenido: `
Las horas extraordinarias son aquellas que exceden la jornada ordinaria de trabajo (actualmente con tope legal de 45 o 40 horas, dependiendo de la implementación de la nueva ley).

### El Recargo Legal
Según el Código del Trabajo (Artículo 32), las horas extras **se pagan con un recargo del 50%** sobre el sueldo convenido para la jornada ordinaria. Es decir, valen un 1.5 veces más que tu hora normal.

### La Fórmula
Para calcular cuánto vale tu hora extra si tienes un sueldo mensual:
1. Divide tu sueldo base mensual por 30 para obtener tu sueldo diario.
2. Multiplica el sueldo diario por 28 (los días de la jornada legal mensual).
3. Divide el resultado por 180 (el total de horas ordinarias del mes).
4. El resultado es el valor de tu hora normal.
5. Multiplica ese valor por 1.5 y obtendrás el valor exacto de tu hora extra.

Recuerda que las horas extras deben pactarse por escrito y solo para atender necesidades temporales de la empresa.
    `
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
