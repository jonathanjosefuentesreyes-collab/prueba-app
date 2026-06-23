import type { Guia } from "./guias";

/**
 * Guías de la categoría "tránsito" (6ª macro-categoría).
 *
 * Todas las citas legales fueron VERIFICADAS contra data/leyes.db por TEXTO real
 * del artículo (no por número), porque la numeración de la Ley de Tránsito (norma
 * 29708) en la base no coincide siempre con el rótulo esperado. Cada enlace
 * /leyes/29708?art=ID y /leyes/29893?art=ID apunta a un artículo que existe y
 * pertenece a esa norma → pasa guias.test.ts.
 *
 * Montos: se expresan en UTM (como la ley). El valor en pesos de la UTM es dato
 * volátil → AbogaBot / tier pago deben mostrar el monto vigente (verificar).
 *
 * Normas citadas:
 *  - 29708 = Ley de Tránsito (18.290)
 *  - 29893 = Ley 18.490 (Seguro Obligatorio de Accidentes Personales, SOAP)
 */
export const guiasTransito: Guia[] = [
  {
    slug: "parte-de-transito-pagar-o-reclamar",
    titulo: "Me llegó un parte de tránsito: ¿lo pago o lo reclamo?",
    categoria: "tránsito",
    destacada: true,
    metaTitle: "Parte de tránsito: pagar o reclamar | Leyes de Chile",
    descripcion:
      "Qué hacer cuando te cursan un parte: cómo se clasifican las infracciones, ante quién se reclama y qué pasa si no pagas. Guía clara según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Un parte es una **denuncia** por infracción que Carabineros envía al **Juzgado de Policía Local** que corresponde a la comuna donde ocurrió ([artículo 185 de la Ley de Tránsito](/leyes/29708?art=9884)). Ahí puedes **pagar** la multa (allanarte) o **reclamar** presentando tus descargos. Cuánto arriesgas depende de si la infracción es leve, menos grave, grave o gravísima.",
    contenido: `
## ¿Qué es un parte y a dónde va?
El "parte" es una **denuncia por infracción**. Carabineros la cursa y la remite, junto con tus documentos, al **Juzgado de Policía Local (JPL)** de la comuna donde ocurrió el hecho ([artículo 185 de la Ley de Tránsito](/leyes/29708?art=9884)). No es una "boleta" que se paga en cualquier parte: es un proceso ante un tribunal.

## Las infracciones se clasifican (y eso define la multa)
La Ley de Tránsito ordena las infracciones en cuatro niveles:
- **Gravísimas**: por ejemplo, no detenerse ante luz roja o señal PARE, o conducir sin licencia ([artículo 197](/leyes/29708?art=9906)).
- **Graves**: como conducir en condiciones físicas o psíquicas deficientes, o con una licencia distinta a la que corresponde ([artículo 198](/leyes/29708?art=9907)).
- **Menos graves**: por ejemplo, estacionar o detenerse en lugares prohibidos ([artículo 199](/leyes/29708?art=9908)).
- **Leves**: todas las demás transgresiones que no estén en las categorías anteriores ([artículo 200](/leyes/29708?art=9909)).

A mayor gravedad, mayor multa (medida en UTM) y más riesgo de suspensión de licencia.

## ¿Pagar o reclamar?
1. **Pagar (allanarse)**: reconoces la infracción y pagas la multa que fije el tribunal. Es lo más rápido si el parte es correcto.
2. **Reclamar**: presentas tus descargos y pruebas ante el JPL dentro del plazo que indique la citación. Sirve si el parte tiene errores (patente equivocada, hora/lugar mal, señalización inexistente).
3. Revisa siempre los **datos del parte**: fecha, hora, lugar, patente y la infracción imputada. Un error de fondo puede ser motivo de reclamo.
4. Guarda **fotos y evidencia** del lugar si vas a impugnar.
5. ¿Tu caso es dudoso? Pregúntale a **AbogaBot** y te orienta con la ley antes de decidir.
`,
    faq: [
      {
        pregunta: "¿Dónde se paga o reclama un parte de tránsito?",
        respuesta:
          "En el Juzgado de Policía Local de la comuna donde ocurrió la infracción, que es donde Carabineros envía la denuncia (artículo 185 de la Ley de Tránsito). Ahí puedes allanarte y pagar, o presentar tus descargos.",
      },
      {
        pregunta: "¿Qué pasa si ignoro el parte y no hago nada?",
        respuesta:
          "El tribunal puede resolver igual y la multa queda impaga, lo que se anota en el Registro y puede acumularse con otras infracciones, derivando incluso en suspensión de la licencia. Conviene responder dentro de plazo.",
      },
      {
        pregunta: "¿Conviene siempre reclamar para no pagar?",
        respuesta:
          "No. Reclamar tiene sentido cuando el parte tiene errores o no corresponde. Si la infracción es real, allanarse suele ser más rápido y barato que un proceso que igual puedes perder.",
      },
    ],
  },
  {
    slug: "impugnar-parte-en-el-juzgado-de-policia-local",
    titulo: "¿Cómo impugno un parte en el Juzgado de Policía Local?",
    categoria: "tránsito",
    metaTitle: "Impugnar un parte en el JPL | Leyes de Chile",
    descripcion:
      "Pasos para reclamar una infracción de tránsito ante el Juzgado de Policía Local: dónde se tramita, qué presentar y cómo defenderte. Guía según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Las infracciones de tránsito se ven en el **Juzgado de Policía Local** de la comuna donde ocurrieron, porque ahí remite Carabineros la denuncia y tus documentos ([artículo 185 de la Ley de Tránsito](/leyes/29708?art=9884)). Para impugnar, comparece en el plazo de la citación, presenta tus descargos y la prueba que respalde tu versión.",
    contenido: `
## ¿Qué tribunal ve mi parte?
El **Juzgado de Policía Local (JPL)** de la comuna donde ocurrió la infracción. Carabineros le envía la denuncia y los documentos retenidos ([artículo 185 de la Ley de Tránsito](/leyes/29708?art=9884)). Por eso el reclamo no se hace "en línea con la municipalidad" sin más: es un trámite ante ese tribunal.

## Identifica la gravedad de lo que te imputan
Antes de impugnar, mira qué nivel de infracción es, porque cambia lo que arriesgas: gravísima ([artículo 197](/leyes/29708?art=9906)), grave ([artículo 198](/leyes/29708?art=9907)), menos grave ([artículo 199](/leyes/29708?art=9908)) o leve ([artículo 200](/leyes/29708?art=9909)). Una imputación mal clasificada también puede atacarse.

## Cómo defenderte
1. **Comparece en plazo**: la citación indica cuándo presentarte o cuándo vencen los descargos. Dejar pasar el plazo te juega en contra.
2. **Presenta tus descargos por escrito** explicando por qué el parte no corresponde (errores en patente, hora, lugar, señalización inexistente, etc.).
3. **Acompaña prueba**: fotos del lugar, testigos, documentos del vehículo, comprobantes.
4. Si el monto o la sanción te parecen desproporcionados, puedes pedir que se reconsidere según la clasificación legal.
5. ¿No sabes cómo redactar tus descargos? **AbogaBot** te orienta con la base legal para armar tu reclamo.
`,
    faq: [
      {
        pregunta: "¿Puedo reclamar un parte sin abogado?",
        respuesta:
          "Sí. Ante el Juzgado de Policía Local puedes comparecer personalmente y presentar tus descargos. Para casos complejos o con riesgo de suspensión de licencia, conviene asesoría.",
      },
      {
        pregunta: "¿Qué pasa si no me presento ni reclamo?",
        respuesta:
          "El tribunal puede fallar de todas formas y aplicar la multa. Además, la infracción queda registrada. Por eso conviene actuar dentro del plazo de la citación.",
      },
      {
        pregunta: "¿Sirve reclamar si el parte tiene un error en la patente?",
        respuesta:
          "Sí. Un error relevante en los datos (patente, fecha, lugar) puede ser fundamento para impugnar. Lleva evidencia que demuestre la inconsistencia.",
      },
    ],
  },
  {
    slug: "cuando-prescribe-una-multa-de-transito",
    titulo: "¿Cuándo prescribe una multa de tránsito y qué pasa si no pago?",
    categoria: "tránsito",
    metaTitle: "Prescripción de multas de tránsito | Leyes de Chile",
    descripcion:
      "Qué pasa con las multas de tránsito impagas, cómo se acumulan en el Registro y por qué pueden derivar en suspensión de licencia. Guía según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Una multa impaga no se borra sola: queda anotada en el **Registro** y, junto con otras infracciones gravísimas o graves, puede gatillar la **suspensión o cancelación de tu licencia** ([artículo 218 de la Ley de Tránsito](/leyes/29708?art=9929)). Conviene regularizarla antes de que se acumule.",
    contenido: `
## Una multa impaga no se borra sola
Las infracciones se denuncian al Juzgado de Policía Local ([artículo 185 de la Ley de Tránsito](/leyes/29708?art=9884)) y quedan anotadas en el Registro Nacional de Conductores. Mientras no pagues o no se resuelva, la deuda y la anotación siguen ahí.

## El riesgo real: la acumulación
El problema no es solo el monto. Cuando se **acumulan infracciones gravísimas o graves**, el Servicio de Registro Civil debe informarlo al Juez de Policía Local para que opere la **suspensión o cancelación de la licencia** ([artículo 218 de la Ley de Tránsito](/leyes/29708?art=9929)). Es decir: varias multas sin regularizar pueden costarte la licencia, no solo plata.

## Qué hacer
1. **Revisa tus anotaciones** en el Registro de Conductores para saber qué tienes pendiente.
2. **Regulariza** las multas antes de que se sumen y activen la suspensión.
3. Si crees que una multa no corresponde, **impúgnala** en el JPL en vez de dejarla impaga.
4. Si ya hay un proceso de suspensión por acumulación, **infórmate de los plazos** para reaccionar a tiempo.
5. ¿Dudas sobre tu situación? Pregúntale a **AbogaBot** y te orienta con la ley.

> Los plazos de prescripción y los montos en pesos son datos que conviene **verificar al día** según tu caso concreto.
`,
    faq: [
      {
        pregunta: "Si no pago una multa, ¿se borra con el tiempo?",
        respuesta:
          "No de forma automática. Queda anotada en el Registro y, junto con otras infracciones, puede derivar en suspensión o cancelación de la licencia (artículo 218 de la Ley de Tránsito). Conviene regularizar o impugnar.",
      },
      {
        pregunta: "¿Pueden quitarme la licencia por acumular multas?",
        respuesta:
          "Sí. La acumulación de infracciones gravísimas o graves puede gatillar la suspensión o cancelación de la licencia, que el Registro Civil informa al Juez de Policía Local.",
      },
      {
        pregunta: "¿Qué hago si una multa que me aparece no es mía?",
        respuesta:
          "Impúgnala ante el Juzgado de Policía Local con la evidencia correspondiente, en lugar de dejarla impaga. Dejarla acumular solo aumenta el riesgo de sanciones mayores.",
      },
    ],
  },
  {
    slug: "parte-por-camara-o-fotorradar",
    titulo: "Me llegó un parte por cámara o fotorradar: ¿es válido?",
    categoria: "tránsito",
    metaTitle: "Parte por cámara o fotorradar | Leyes de Chile",
    descripcion:
      "Qué pasa con los partes por cámaras de velocidad, la tolerancia legal de 5 km/h y quién responde si el auto está a nombre de otra persona. Según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Para denunciar infracciones de velocidad existe un **rango de tolerancia general de 5 km/h** ([artículo 200 bis de la Ley de Tránsito](/leyes/29708?art=9910)). Y ojo: el **propietario** del vehículo responde solidariamente por su uso, así que un parte por cámara puede llegarte aunque no manejaras tú ([artículo 174](/leyes/29708?art=9873)).",
    contenido: `
## La tolerancia de 5 km/h
La ley fija un **rango de tolerancia general de 5 kilómetros por hora** para efectos de denunciar o iniciar procesos por infracciones de velocidad ([artículo 200 bis de la Ley de Tránsito](/leyes/29708?art=9910)). No es un permiso para excederte, pero sí un margen técnico que el sistema debe considerar.

## ¿Por qué me llega si yo no manejaba?
Porque el **propietario** del vehículo, junto al conductor y al tenedor, es **solidariamente responsable** por los daños y el uso del auto, salvo que acredite que se usó contra su voluntad ([artículo 174 de la Ley de Tránsito](/leyes/29708?art=9873)). Como la cámara registra la patente y no al conductor, el parte suele dirigirse al dueño.

## Qué hacer
1. **Verifica los datos**: patente, fecha, hora, lugar y la velocidad registrada.
2. Considera la **tolerancia de 5 km/h** al evaluar si la medición corresponde.
3. Si **no eras el conductor**, puedes aportar antecedentes en el JPL sobre quién manejaba.
4. Si hay errores en la medición o en los datos, **impugna** dentro de plazo.
5. ¿No sabes cómo plantear tu defensa? **AbogaBot** te orienta con la base legal.
`,
    faq: [
      {
        pregunta: "¿Los partes por cámara tienen alguna tolerancia de velocidad?",
        respuesta:
          "Sí. La ley establece un rango de tolerancia general de 5 km/h para denunciar infracciones de velocidad (artículo 200 bis de la Ley de Tránsito).",
      },
      {
        pregunta: "Me llegó un parte por cámara pero manejaba otra persona, ¿qué hago?",
        respuesta:
          "El propietario responde solidariamente por el uso del vehículo (artículo 174 de la Ley de Tránsito), por eso el parte llega al dueño. Puedes aportar antecedentes en el Juzgado de Policía Local sobre quién conducía.",
      },
      {
        pregunta: "¿Puedo reclamar un parte de fotorradar?",
        respuesta:
          "Sí, ante el Juzgado de Policía Local, especialmente si hay errores en la patente, fecha, lugar o en la medición de velocidad. Lleva evidencia que respalde tu reclamo.",
      },
    ],
  },
  {
    slug: "manejar-con-alcohol-limites-y-sanciones",
    titulo: "Manejar con alcohol: ¿cuáles son los límites y qué arriesgo?",
    categoria: "tránsito",
    destacada: true,
    metaTitle: "Manejar con alcohol: límites y sanciones | Leyes de Chile",
    descripcion:
      "Diferencia entre conducir bajo la influencia del alcohol y en estado de ebriedad, los límites de 0,3 y 0,8 g/L y las sanciones reales según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Hay dos tramos: **bajo la influencia del alcohol** (desde 0,3 y menos de 0,8 g/L de alcohol en la sangre) y **estado de ebriedad** (0,8 g/L o más). Conducir bajo la influencia se castiga con multa y suspensión de licencia ([artículo 196 C de la Ley de Tránsito](/leyes/29708?art=9899)); en estado de ebriedad la pena sube a **presidio** y multa ([artículo 196 E](/leyes/29708?art=9902)).",
    contenido: `
## Los dos límites que tienes que conocer
La ley distingue según el alcohol en la sangre:
- **Bajo la influencia del alcohol**: desde **0,3** y menos de **0,8 gramos por litro**.
- **Estado de ebriedad**: **0,8 gramos por litro o más**.

Estos límites rigen desde la "tolerancia cero" (que bajó el umbral de la influencia de 0,5 a 0,3). Está prohibido conducir habiendo bebido por sobre esos niveles ([artículo 115 A de la Ley de Tránsito](/leyes/29708?art=9811)).

## Qué arriesgas en cada caso
- **Bajo la influencia**, sin causar daños o con daños/lesiones leves: **multa de 1 a 5 UTM** y **suspensión de la licencia por un mes**; si causas lesiones menos graves, la pena sube ([artículo 196 C](/leyes/29708?art=9899)).
- **En estado de ebriedad**, aunque no causes daños: **presidio menor en su grado mínimo** y **multa de 2 a 10 UTM**; con lesiones graves o muerte, las penas son mayores ([artículo 196 E](/leyes/29708?art=9902)).
- **Reincidencia**: ser responsable tres veces de conducir bajo la influencia en 12 meses, o tres veces en estado de ebriedad en 24 meses, lleva a la **cancelación de la licencia** ([artículo 209](/leyes/29708?art=9919)).

## El control de Carabineros
Carabineros puede someterte a una **prueba respiratoria** (alcotest) o de otra naturaleza para detectar alcohol ([artículo 189 de la Ley de Tránsito](/leyes/29708?art=9888)). Negarte tiene consecuencias propias.

## Qué hacer
1. Si bebiste, **no manejes**: el límite real para sanción parte en 0,3 g/L.
2. Si te controlan, **coopera** con el procedimiento y pide que quede registro de todo.
3. Si te imputan ebriedad, recuerda que es un **delito** con pena de presidio, no una simple multa.
4. ¿Necesitas entender tu situación exacta? Pregúntale a **AbogaBot** con los detalles de tu caso.

> Los montos en pesos de la UTM cambian mes a mes: conviene verificar el valor vigente.
`,
    faq: [
      {
        pregunta: "¿Desde cuántos gramos de alcohol es infracción manejar?",
        respuesta:
          "Desde 0,3 g/L se considera conducir bajo la influencia del alcohol; desde 0,8 g/L es estado de ebriedad. Bajo la influencia se sanciona con multa y suspensión (artículo 196 C de la Ley de Tránsito); la ebriedad, con presidio y multa (artículo 196 E).",
      },
      {
        pregunta: "¿Conducir ebrio es delito o solo multa?",
        respuesta:
          "Es delito. Conducir en estado de ebriedad (0,8 g/L o más) se castiga con presidio menor en su grado mínimo y multa, incluso sin causar daños (artículo 196 E de la Ley de Tránsito).",
      },
      {
        pregunta: "¿Pueden quitarme la licencia por manejar con alcohol?",
        respuesta:
          "Sí. Conducir bajo la influencia implica suspensión de la licencia, y la reincidencia (3 veces bajo la influencia en 12 meses o 3 veces ebrio en 24 meses) lleva a la cancelación (artículo 209 de la Ley de Tránsito).",
      },
    ],
  },
  {
    slug: "tolerancia-cero-cuanto-puedo-tomar-antes-de-manejar",
    titulo: "Tolerancia cero: ¿cuánto puedo tomar antes de manejar?",
    categoria: "tránsito",
    metaTitle: "Tolerancia cero al volante | Leyes de Chile",
    descripcion:
      "Qué significa la tolerancia cero, por qué el límite para sanción parte en 0,3 g/L y qué arriesgas si manejas tras beber. Guía clara según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "La tolerancia cero bajó el umbral de **conducir bajo la influencia del alcohol** a **0,3 g/L** (antes 0,5). En la práctica, ya con poco alcohol puedes quedar sancionado: multa y suspensión de licencia ([artículo 196 C de la Ley de Tránsito](/leyes/29708?art=9899)). Lo más seguro es no manejar si bebiste.",
    contenido: `
## ¿Qué cambió con la "tolerancia cero"?
La reforma conocida como tolerancia cero **redujo el límite** a partir del cual se entiende que conduces **bajo la influencia del alcohol**: pasó de 0,5 a **0,3 gramos por litro** de alcohol en la sangre. El estado de ebriedad se mantiene en **0,8 g/L o más**. La prohibición de conducir habiendo bebido sobre esos niveles está en la ley ([artículo 115 A de la Ley de Tránsito](/leyes/29708?art=9811)).

## "Cuánto puedo tomar" no tiene una respuesta segura
No existe una cantidad fija de tragos que garantice quedar bajo 0,3 g/L: depende del peso, el tiempo, lo que comiste y el tipo de bebida. Por eso la recomendación práctica es **no manejar si bebiste**.

## Qué arriesgas
- Entre 0,3 y menos de 0,8 g/L: **multa de 1 a 5 UTM** y **suspensión de licencia por un mes** ([artículo 196 C](/leyes/29708?art=9899)).
- 0,8 g/L o más: es **estado de ebriedad**, un delito con **presidio y multa** ([artículo 196 E](/leyes/29708?art=9902)).
- Carabineros puede hacerte el **alcotest** en cualquier control ([artículo 189](/leyes/29708?art=9888)).

## Qué hacer
1. Si vas a beber, **deja el auto** o designa un conductor que no tome.
2. Recuerda que el límite de sanción es **bajo** (0,3 g/L): "una copa" puede bastar.
3. Si te controlan, **coopera** y guarda registro del procedimiento.
4. ¿Dudas sobre una situación puntual? Pregúntale a **AbogaBot** con tu caso.
`,
    faq: [
      {
        pregunta: "¿Cuántas copas puedo tomar y manejar?",
        respuesta:
          "No hay un número seguro: depende de tu cuerpo, el tiempo y la bebida. El límite legal para sanción parte en 0,3 g/L (bajo la influencia), así que lo más prudente es no manejar si bebiste.",
      },
      {
        pregunta: "¿La tolerancia cero significa que con cualquier trago me sancionan?",
        respuesta:
          "El umbral de sanción es 0,3 g/L, no cero absoluto, pero es un límite bajo. Con poco alcohol puedes superarlo y quedar como conduciendo bajo la influencia (artículo 196 C de la Ley de Tránsito).",
      },
      {
        pregunta: "¿Puedo negarme al alcotest?",
        respuesta:
          "Carabineros está facultado para tomarte la prueba respiratoria (artículo 189 de la Ley de Tránsito) y negarse tiene consecuencias propias. Lo aconsejable es cooperar y dejar registro del procedimiento.",
      },
    ],
  },
  {
    slug: "ley-emilia-conduccion-en-estado-de-ebriedad",
    titulo: "Ley Emilia: ¿qué pasa si manejo ebrio y causo un accidente?",
    categoria: "tránsito",
    destacada: true,
    metaTitle: "Ley Emilia: conducción ebria con lesiones | Leyes de Chile",
    descripcion:
      "Qué sanciona la Ley Emilia: conducir en estado de ebriedad causando lesiones graves o muerte, el deber de detenerse y auxiliar, y por qué huir agrava todo.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Conducir en **estado de ebriedad** causando **lesiones graves o la muerte** tiene penas de cárcel agravadas ([artículo 196 E de la Ley de Tránsito](/leyes/29708?art=9902)). Además, ante un accidente con lesiones estás **obligado a detenerte y prestar ayuda** ([artículo 183](/leyes/29708?art=9882)): darse a la fuga se presume en tu contra y agrava tu situación.",
    contenido: `
## Qué castiga
La llamada "Ley Emilia" endureció las penas para quien conduce en **estado de ebriedad** (0,8 g/L o más) o bajo el efecto de drogas y, con ello, **causa lesiones graves o la muerte**. Las penas suben respecto del caso en que no hay resultado lesivo ([artículo 196 E de la Ley de Tránsito](/leyes/29708?art=9902)).

## El deber de detenerse y auxiliar
En **todo accidente con lesiones**, el conductor que participa está **obligado a detener su marcha, prestar la ayuda necesaria y dar cuenta a Carabineros** ([artículo 183 de la Ley de Tránsito](/leyes/29708?art=9882)). No es opcional.

## Huir agrava todo
Si hay daños, también debes dar cuenta de inmediato a la autoridad; **se presume la culpabilidad** de quien no lo hace y abandona el lugar, y la responsabilidad de quien incumple el deber de detenerse y huye ([artículo 173 de la Ley de Tránsito](/leyes/29708?art=9872)). Es decir, darse a la fuga juega legalmente en tu contra.

## Y la licencia
La reincidencia en conducción en estado de ebriedad lleva a la **cancelación de la licencia** ([artículo 209](/leyes/29708?art=9919)).

## Qué hacer
1. Si bebiste, **no manejes**: con un accidente de por medio, dejas de hablar de multa y pasas a un delito grave.
2. Ante cualquier accidente con lesiones, **detente, auxilia y llama a Carabineros**.
3. **Nunca te des a la fuga**: la ley lo presume en tu contra.
4. Si enfrentas una imputación bajo este escenario, **busca asesoría legal** sin demora.
5. Pregúntale a **AbogaBot** para entender la base legal de tu caso.
`,
    faq: [
      {
        pregunta: "¿Qué castiga exactamente la Ley Emilia?",
        respuesta:
          "Conducir en estado de ebriedad (o bajo el efecto de drogas) causando lesiones graves o muerte, con penas de cárcel agravadas (artículo 196 E de la Ley de Tránsito), además del deber de detenerse y auxiliar.",
      },
      {
        pregunta: "¿Estoy obligado a detenerme si causo un accidente con lesionados?",
        respuesta:
          "Sí. El conductor que participa en un accidente con lesiones debe detenerse, prestar la ayuda necesaria y dar cuenta a Carabineros (artículo 183 de la Ley de Tránsito).",
      },
      {
        pregunta: "¿Qué pasa si me doy a la fuga?",
        respuesta:
          "La ley presume tu culpabilidad y responsabilidad si abandonas el lugar sin dar cuenta o sin detenerte (artículo 173 de la Ley de Tránsito), lo que agrava tu situación legal.",
      },
    ],
  },
  {
    slug: "me-retuvieron-o-suspendieron-la-licencia",
    titulo: "Me suspendieron o cancelaron la licencia: ¿qué hago?",
    categoria: "tránsito",
    metaTitle: "Suspensión o cancelación de licencia | Leyes de Chile",
    descripcion:
      "Por qué te pueden suspender o cancelar la licencia, qué rol juega la acumulación de infracciones y por qué manejar suspendido es delito. Según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "La licencia puede **suspenderse o cancelarse** por acumulación de infracciones gravísimas o graves ([artículo 218 de la Ley de Tránsito](/leyes/29708?art=9929)) o por reincidencia en alcohol ([artículo 209](/leyes/29708?art=9919)). Mientras esté suspendida o cancelada, **no puedes manejar**: hacerlo es delito ([artículo 196 B](/leyes/29708?art=9898)).",
    contenido: `
## Por qué te la quitan
Dos causas frecuentes:
- **Acumulación de infracciones** gravísimas o graves: el Registro Civil informa al Juez de Policía Local para que opere la suspensión o cancelación ([artículo 218 de la Ley de Tránsito](/leyes/29708?art=9929)).
- **Reincidencia en alcohol**: tres veces responsable de conducir bajo la influencia en 12 meses, o tres veces en estado de ebriedad en 24 meses, lleva a la **cancelación** de la licencia ([artículo 209](/leyes/29708?art=9919)).

## Suspensión no es lo mismo que cancelación
- **Suspensión**: pierdes la licencia por un tiempo determinado.
- **Cancelación**: queda sin efecto y debes cumplir requisitos para volver a obtenerla.

## Cuidado: manejar suspendido es delito
Conducir con la licencia **cancelada o suspendida** (o con una falsa) se castiga con **presidio menor en su grado medio a máximo** e inhabilidad para obtenerla hasta por 5 años ([artículo 196 B de la Ley de Tránsito](/leyes/29708?art=9898)). No es "una multa más".

## Qué hacer
1. **Confirma la resolución**: qué tribunal la dictó, por qué causa y por cuánto tiempo.
2. Si la suspensión proviene de **acumulación**, revisa tus anotaciones y los plazos para reaccionar.
3. **No manejes** mientras dure: el riesgo penal es alto.
4. Para recuperarla, **cumple los requisitos** (plazos, trámites, exámenes según el caso).
5. Pregúntale a **AbogaBot** para entender tu situación específica.
`,
    faq: [
      {
        pregunta: "¿Por qué me pueden cancelar la licencia?",
        respuesta:
          "Por acumulación de infracciones gravísimas o graves (artículo 218 de la Ley de Tránsito) o por reincidencia en conducción con alcohol (artículo 209), entre otras causas.",
      },
      {
        pregunta: "¿Puedo manejar mientras tengo la licencia suspendida?",
        respuesta:
          "No. Conducir con la licencia suspendida o cancelada es delito y se castiga con presidio menor en su grado medio a máximo e inhabilidad (artículo 196 B de la Ley de Tránsito).",
      },
      {
        pregunta: "¿Cómo recupero la licencia cancelada?",
        respuesta:
          "Debes cumplir los requisitos legales según el caso (plazos, trámites y, a veces, exámenes). Conviene revisar la resolución que la canceló para saber qué exige tu situación.",
      },
    ],
  },
  {
    slug: "manejar-sin-licencia-multa-o-delito",
    titulo: "Manejar sin licencia: ¿es multa o delito?",
    categoria: "tránsito",
    metaTitle: "Manejar sin licencia: multa o delito | Leyes de Chile",
    descripcion:
      "Cuándo conducir sin licencia es una infracción gravísima y cuándo pasa a ser delito (licencia profesional, falsa o cancelada). Guía según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Conducir **sin licencia** es una infracción **gravísima** ([artículo 197 de la Ley de Tránsito](/leyes/29708?art=9906)). Pero hay casos en que pasa a **delito**: manejar un vehículo que requiere licencia **profesional** sin tenerla ([artículo 196 D](/leyes/29708?art=9900)) o hacerlo con licencia **falsa, cancelada o suspendida** ([artículo 196 B](/leyes/29708?art=9898)).",
    contenido: `
## La regla general: infracción gravísima
Conducir **sin haber obtenido licencia** es una infracción o contravención **gravísima** ([artículo 197 de la Ley de Tránsito](/leyes/29708?art=9906)). Implica multa alta y anotación, sin perjuicio de los casos que la propia ley trata como delito.

## Cuándo pasa a ser delito
- **Licencia profesional**: manejar un vehículo para cuya conducción se requiere una licencia profesional **sin tenerla** se castiga con **presidio menor en su grado mínimo a medio** ([artículo 196 D](/leyes/29708?art=9900)).
- **Licencia falsa, cancelada o suspendida**: usar una licencia falsificada, o conducir con la licencia cancelada o suspendida, se castiga con **presidio menor en su grado medio a máximo** e inhabilidad hasta por 5 años ([artículo 196 B](/leyes/29708?art=9898)).

## Conducir con una licencia que no corresponde
Manejar con una **licencia distinta** a la que corresponde al vehículo es una infracción **grave** ([artículo 198](/leyes/29708?art=9907)), salvo el caso de licencia profesional, que se trata aparte.

## Qué hacer
1. **No conduzcas** vehículos que requieran una licencia que no tienes (especialmente profesional).
2. Si te detienen sin licencia, recuerda que es **gravísima** y puede haber retención de documentos.
3. **Nunca** uses una licencia falsa ni manejes con la tuya cancelada: ahí ya hay riesgo penal.
4. Regulariza tu licencia antes de volver a manejar.
5. Pregúntale a **AbogaBot** para ubicar tu caso exacto en la ley.
`,
    faq: [
      {
        pregunta: "¿Manejar sin licencia es delito?",
        respuesta:
          "Por regla general es una infracción gravísima (artículo 197 de la Ley de Tránsito). Pasa a delito si conduces un vehículo que requiere licencia profesional sin tenerla (artículo 196 D) o con licencia falsa, cancelada o suspendida (artículo 196 B).",
      },
      {
        pregunta: "¿Qué pasa si manejo con una licencia que no corresponde al vehículo?",
        respuesta:
          "Es una infracción grave (artículo 198 de la Ley de Tránsito), salvo el caso especial de la licencia profesional, que se sanciona como delito.",
      },
      {
        pregunta: "¿Y si uso una licencia falsa?",
        respuesta:
          "Es delito: se castiga con presidio menor en su grado medio a máximo e inhabilidad para obtener licencia hasta por 5 años (artículo 196 B de la Ley de Tránsito).",
      },
    ],
  },
  {
    slug: "choque-de-transito-que-hacer-y-quien-paga",
    titulo: "Choque de tránsito: ¿qué hago en el lugar y quién paga?",
    categoria: "tránsito",
    metaTitle: "Choque de tránsito: qué hacer y quién paga | Leyes de Chile",
    descripcion:
      "Pasos tras un choque con solo daños materiales, a quién dar cuenta y por qué el dueño del vehículo también puede responder. Guía según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "En un accidente con daños debes **dar cuenta de inmediato** a la autoridad ([artículo 173 de la Ley de Tránsito](/leyes/29708?art=9872)); si solo hay daños materiales, los conductores dan cuenta a Carabineros ([artículo 184](/leyes/29708?art=9883)). El conductor responde, pero el **dueño y el tenedor** del vehículo también son solidariamente responsables de los daños ([artículo 174](/leyes/29708?art=9873)).",
    contenido: `
## En el lugar: da cuenta y no abandones
En todo accidente con daños, los participantes están **obligados a dar cuenta de inmediato** a la autoridad policial más próxima. **Se presume la culpabilidad** de quien no lo hace y abandona el lugar ([artículo 173 de la Ley de Tránsito](/leyes/29708?art=9872)). Si **solo hay daños materiales** y los conductores acuden a Carabineros, este recibe la cuenta del hecho ([artículo 184](/leyes/29708?art=9883)).

## ¿Quién paga los daños?
De las infracciones responde el **conductor**. Pero el **conductor, el propietario y el tenedor** del vehículo son **solidariamente responsables** de los daños o perjuicios causados con su uso, salvo que el dueño o tenedor acrediten que el auto fue usado **contra su voluntad** ([artículo 174 de la Ley de Tránsito](/leyes/29708?art=9873)). Por eso, si prestaste tu auto, también puedes terminar respondiendo.

## Qué hacer paso a paso
1. **No abandones el lugar**: la fuga se presume en tu contra.
2. **Da cuenta** a Carabineros y deja constancia del accidente.
3. **Registra todo**: fotos, datos de los involucrados, patentes, testigos y seguros.
4. Si hay **lesionados**, aplica además el deber de detenerse y auxiliar.
5. Para el cobro de daños, ten claro que pueden responder conductor y propietario.
6. ¿Dudas sobre responsabilidades? Pregúntale a **AbogaBot** con tu caso.
`,
    faq: [
      {
        pregunta: "Choqué y solo hubo daños materiales, ¿qué hago?",
        respuesta:
          "Da cuenta a Carabineros del sector y deja constancia (artículo 184 de la Ley de Tránsito). No abandones el lugar: la fuga se presume en tu contra (artículo 173).",
      },
      {
        pregunta: "Presté mi auto y la otra persona chocó, ¿respondo yo?",
        respuesta:
          "Puedes responder. El propietario es solidariamente responsable de los daños causados con el vehículo, salvo que acredite que se usó contra su voluntad (artículo 174 de la Ley de Tránsito).",
      },
      {
        pregunta: "¿Es obligatorio llamar a Carabineros en un choque?",
        respuesta:
          "En accidentes con daños existe el deber de dar cuenta de inmediato a la autoridad (artículo 173). No hacerlo y abandonar el lugar hace que se presuma tu culpabilidad.",
      },
    ],
  },
  {
    slug: "atropello-a-un-peaton-responsabilidad",
    titulo: "Atropellé a un peatón: ¿qué obligaciones tengo?",
    categoria: "tránsito",
    metaTitle: "Atropello a un peatón: responsabilidad | Leyes de Chile",
    descripcion:
      "Qué hacer tras atropellar a un peatón: el deber de detenerse y auxiliar, por qué la fuga agrava todo y quién responde por los daños. Según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Si hay lesiones, estás **obligado a detener tu marcha, prestar la ayuda necesaria y dar cuenta a Carabineros** ([artículo 183 de la Ley de Tránsito](/leyes/29708?art=9882)). Darte a la fuga **se presume en tu contra** ([artículo 173](/leyes/29708?art=9872)). Por los daños responden el conductor y también el dueño del vehículo ([artículo 174](/leyes/29708?art=9873)).",
    contenido: `
## Lo primero: detente y auxilia
En todo accidente con **lesiones**, el conductor que participa debe **detener su marcha, prestar la ayuda que sea necesaria y dar cuenta a Carabineros** ([artículo 183 de la Ley de Tránsito](/leyes/29708?art=9882)). Auxiliar a la víctima no es opcional: es una obligación legal.

## La fuga agrava todo
Si abandonas el lugar sin dar cuenta, **se presume tu culpabilidad y responsabilidad** ([artículo 173 de la Ley de Tránsito](/leyes/29708?art=9872)). Huir nunca mejora tu situación: la empeora legalmente.

## ¿Quién responde por los daños?
El conductor responde, y el **propietario y el tenedor** del vehículo son **solidariamente responsables** de los daños causados, salvo que acrediten uso contra su voluntad ([artículo 174 de la Ley de Tránsito](/leyes/29708?art=9873)). La responsabilidad puede ser civil (indemnizar) y penal según las lesiones.

## Qué hacer
1. **Detente de inmediato** y verifica el estado del peatón.
2. **Presta ayuda** y llama a emergencias y a Carabineros.
3. **Da cuenta** del hecho y deja constancia.
4. **No te des a la fuga**: la ley lo presume en tu contra.
5. Busca **asesoría legal** sin demora si hay lesiones graves.
6. Pregúntale a **AbogaBot** para entender la base legal de tu caso.
`,
    faq: [
      {
        pregunta: "¿Qué debo hacer si atropello a alguien?",
        respuesta:
          "Detener la marcha, prestar la ayuda necesaria y dar cuenta a Carabineros (artículo 183 de la Ley de Tránsito). Auxiliar a la víctima es una obligación legal.",
      },
      {
        pregunta: "¿Qué pasa si me asusto y me voy del lugar?",
        respuesta:
          "Darse a la fuga hace que se presuma tu culpabilidad y responsabilidad (artículo 173 de la Ley de Tránsito), agravando tu situación tanto civil como penal.",
      },
      {
        pregunta: "¿El dueño del auto también responde por un atropello?",
        respuesta:
          "El propietario es solidariamente responsable de los daños causados con el vehículo, salvo que acredite que se usó contra su voluntad (artículo 174 de la Ley de Tránsito).",
      },
    ],
  },
  {
    slug: "lesiones-en-un-accidente-como-reclamar-indemnizacion",
    titulo: "Me lesionaron en un accidente de tránsito: ¿cómo reclamo?",
    categoria: "tránsito",
    metaTitle: "Indemnización por accidente de tránsito | Leyes de Chile",
    descripcion:
      "Cómo reclamar los daños tras un accidente de tránsito, quiénes responden solidariamente y por qué el parte va al Juzgado de Policía Local. Según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Puedes reclamar la **indemnización de los daños** contra quienes responden solidariamente: el conductor, el propietario y el tenedor del vehículo ([artículo 174 de la Ley de Tránsito](/leyes/29708?art=9873)). En accidentes con daños o lesiones leves, la denuncia va al **Juzgado de Policía Local** ([artículo 185](/leyes/29708?art=9884)), sede donde suele tramitarse el cobro civil.",
    contenido: `
## Contra quién puedes reclamar
De los daños o perjuicios causados con un vehículo responden **solidariamente el conductor, el propietario y el tenedor**, salvo que estos últimos acrediten que el auto se usó contra su voluntad ([artículo 174 de la Ley de Tránsito](/leyes/29708?art=9873)). Esto te da más de un responsable a quién dirigir el cobro.

## Dónde se tramita
En accidentes con **daños o lesiones leves**, Carabineros envía la denuncia y los documentos al **Juzgado de Policía Local** correspondiente ([artículo 185 de la Ley de Tránsito](/leyes/29708?art=9884)). Ese tribunal es clave, porque en su sede suele plantearse la **demanda civil** por los perjuicios.

## El deber del otro conductor
Recuerda que, ante lesiones, el conductor estaba obligado a **detenerse, auxiliar y dar cuenta** ([artículo 183](/leyes/29708?art=9882)); su incumplimiento o fuga refuerza tu posición.

## Qué hacer
1. **Reúne prueba**: parte policial, fotos, atención médica, testigos y peritajes.
2. **Cuantifica** tus daños: gastos médicos, lucro cesante, daño moral, reparaciones.
3. Identifica a **todos los responsables** (conductor y propietario).
4. Plantea tu **reclamo o demanda** en la sede correspondiente, dentro de plazo.
5. Pregúntale a **AbogaBot** para ordenar tu caso y la base legal antes de demandar.

> La estrategia de cobro y los plazos dependen del caso concreto: conviene verificarlos.
`,
    faq: [
      {
        pregunta: "¿A quién le reclamo la indemnización por un accidente?",
        respuesta:
          "Puedes reclamar al conductor y también al propietario y tenedor del vehículo, que responden solidariamente por los daños (artículo 174 de la Ley de Tránsito), salvo uso contra su voluntad.",
      },
      {
        pregunta: "¿Dónde se demanda por los daños de un accidente?",
        respuesta:
          "En accidentes con daños o lesiones leves, la denuncia va al Juzgado de Policía Local (artículo 185 de la Ley de Tránsito), sede donde habitualmente se plantea el cobro civil.",
      },
      {
        pregunta: "¿Qué pruebas necesito para reclamar?",
        respuesta:
          "Parte policial, fotos del accidente, atención y certificados médicos, testigos, presupuestos de reparación y todo lo que acredite el daño y su monto.",
      },
    ],
  },
  {
    slug: "exceso-de-velocidad-limites-y-sanciones",
    titulo: "Exceso de velocidad: ¿qué arriesgo y hay tolerancia?",
    categoria: "tránsito",
    metaTitle: "Exceso de velocidad: sanciones | Leyes de Chile",
    descripcion:
      "La tolerancia legal de 5 km/h, cómo se clasifican las infracciones de velocidad y qué arriesgas. Guía clara según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Para denunciar infracciones de velocidad rige una **tolerancia general de 5 km/h** ([artículo 200 bis de la Ley de Tránsito](/leyes/29708?art=9910)). Según la gravedad, el exceso puede caer entre las infracciones leves ([artículo 200](/leyes/29708?art=9909)), menos graves ([artículo 199](/leyes/29708?art=9908)) o graves ([artículo 198](/leyes/29708?art=9907)).",
    contenido: `
## La tolerancia de 5 km/h
La ley establece un **rango de tolerancia general de 5 kilómetros por hora** para efectos de denunciar o iniciar procesos por infracciones de velocidad ([artículo 200 bis de la Ley de Tránsito](/leyes/29708?art=9910)). No es un permiso para correr, pero es un margen técnico que debe aplicarse.

## Cómo se clasifica el exceso
Las infracciones de velocidad se ubican según su gravedad: pueden ser **leves** —regla residual del [artículo 200](/leyes/29708?art=9909)—, **menos graves** ([artículo 199](/leyes/29708?art=9908)) o **graves**, como conducir en condiciones que pongan en riesgo la seguridad ([artículo 198](/leyes/29708?art=9907)). A mayor gravedad, mayor multa en UTM.

## Qué hacer
1. **Respeta los límites** señalizados de cada vía; varían entre zona urbana y rural.
2. Considera la **tolerancia de 5 km/h** al evaluar un parte por velocidad.
3. Si te cursan un parte por cámara, **revisa la medición y los datos**.
4. Si hay errores, **impugna** en el Juzgado de Policía Local dentro de plazo.
5. Pregúntale a **AbogaBot** si quieres ubicar tu caso en la clasificación legal.

> Los límites de velocidad por tipo de vía y los montos en pesos conviene verificarlos según tu situación.
`,
    faq: [
      {
        pregunta: "¿Hay un margen de tolerancia para la velocidad?",
        respuesta:
          "Sí. La ley fija un rango de tolerancia general de 5 km/h para denunciar infracciones de velocidad (artículo 200 bis de la Ley de Tránsito).",
      },
      {
        pregunta: "¿Qué tan grave es un exceso de velocidad?",
        respuesta:
          "Depende del caso: puede ser leve (artículo 200), menos grave (artículo 199) o grave (artículo 198), y la multa en UTM aumenta con la gravedad.",
      },
      {
        pregunta: "¿Puedo reclamar un parte por velocidad?",
        respuesta:
          "Sí, ante el Juzgado de Policía Local, sobre todo si hay errores en la medición o en los datos del parte, considerando la tolerancia de 5 km/h.",
      },
    ],
  },
  {
    slug: "revision-tecnica-permiso-de-circulacion-y-documentos",
    titulo: "Sin revisión técnica o permiso de circulación: ¿qué arriesgo?",
    categoria: "tránsito",
    metaTitle: "Documentos del vehículo: multas | Leyes de Chile",
    descripcion:
      "Qué pasa si circulas sin revisión técnica o permiso de circulación, cómo se clasifican estas infracciones y por qué el dueño responde. Según la Ley de Tránsito.",
    fecha: "2026-06-22",
    respuestaCorta:
      "Circular sin la documentación al día es una **infracción** a la Ley de Tránsito que cae, según el caso, entre las menos graves ([artículo 199](/leyes/29708?art=9908)) o las leves ([artículo 200](/leyes/29708?art=9909)). Además, las infracciones derivadas del **mal estado del vehículo** se presumen imputables a su **propietario** ([artículo 175](/leyes/29708?art=9874)).",
    contenido: `
## Documentos que debes llevar al día
Para circular necesitas la documentación vigente del vehículo (entre ella, **revisión técnica** y **permiso de circulación**) y tu licencia. Circular sin ella es una transgresión a la Ley de Tránsito que se sanciona según su clasificación.

## Cómo se clasifican estas faltas
Según el caso, pueden ser **menos graves** ([artículo 199](/leyes/29708?art=9908)) o caer en la regla residual de las **leves** ([artículo 200](/leyes/29708?art=9909)). La multa en UTM depende de esa categoría.

## El dueño responde por el estado del vehículo
Las infracciones que derivan del **mal estado y condiciones del vehículo** se presumen, salvo prueba en contrario, **imputables a su propietario** ([artículo 175 de la Ley de Tránsito](/leyes/29708?art=9874)). Por eso, mantener al día revisión técnica y mantención no es solo burocracia: es responsabilidad.

## Qué hacer
1. **Mantén vigentes** revisión técnica, permiso de circulación y SOAP.
2. Lleva la **documentación en el vehículo** para los controles.
3. Si te cursan un parte, verifica la **clasificación** y el monto.
4. Recuerda que como **dueño** respondes por el estado del auto.
5. Pregúntale a **AbogaBot** si necesitas claridad sobre tu caso.

> Los plazos y montos asociados a cada documento conviene verificarlos al día.
`,
    faq: [
      {
        pregunta: "¿Qué arriesgo si circulo sin revisión técnica?",
        respuesta:
          "Una infracción a la Ley de Tránsito que, según el caso, puede ser menos grave (artículo 199) o leve (artículo 200), con multa en UTM. Además, el dueño responde por el estado del vehículo (artículo 175).",
      },
      {
        pregunta: "¿El permiso de circulación vencido es infracción?",
        respuesta:
          "Sí. Circular sin la documentación al día es una transgresión a la Ley de Tránsito y se sanciona según su clasificación (artículos 199 o 200).",
      },
      {
        pregunta: "Si el auto está a mi nombre pero lo maneja otro, ¿quién responde por la documentación?",
        respuesta:
          "Las infracciones por el mal estado y condiciones del vehículo se presumen imputables al propietario, salvo prueba en contrario (artículo 175 de la Ley de Tránsito).",
      },
    ],
  },
  {
    slug: "soap-seguro-obligatorio-que-cubre",
    titulo: "SOAP: ¿qué cubre el seguro obligatorio y para qué sirve?",
    categoria: "tránsito",
    metaTitle: "SOAP: qué cubre el seguro obligatorio | Leyes de Chile",
    descripcion:
      "Qué es el SOAP, qué indemnizaciones cubre por persona y por qué la aseguradora puede después cobrarle al responsable del accidente. Según la Ley 18.490.",
    fecha: "2026-06-22",
    respuestaCorta:
      "El SOAP es un **seguro obligatorio de accidentes personales** que cubre indemnizaciones por muerte, invalidez y gastos médicos de las víctimas de accidentes de tránsito ([artículo 25 de la Ley 18.490](/leyes/29893?art=69944)). Cubre a las personas, no los daños al vehículo, y la aseguradora puede luego **cobrarle al civilmente responsable** ([artículo 16](/leyes/29893?art=69935)).",
    contenido: `
## ¿Qué es el SOAP?
El **Seguro Obligatorio de Accidentes Personales (SOAP)** es exigido por ley para los vehículos motorizados y existe para **cubrir a las víctimas** de accidentes de tránsito (conductor, pasajeros y terceros), no para reparar el auto.

## Qué cubre
El seguro garantiza un conjunto de **indemnizaciones** por persona afectada: por muerte, por incapacidad y por gastos médicos hospitalarios, con montos definidos en la ley ([artículo 25 de la Ley 18.490](/leyes/29893?art=69944)). El grado de incapacidad lo determina el médico tratante, con revisión posible por la aseguradora ([artículo 28](/leyes/29893?art=69947)).

## Importante: la aseguradora puede cobrarle al responsable
Que el SOAP pague **no libera al culpable**. El asegurador que paga las indemnizaciones puede **recuperar lo pagado de quien sea civilmente responsable** del accidente ([artículo 16 de la Ley 18.490](/leyes/29893?art=69935)). Y el SOAP es **compatible** con otros seguros voluntarios ([artículo 14](/leyes/29893?art=69933)).

## Qué hacer
1. **Mantén el SOAP vigente**: es obligatorio para circular.
2. Si eres víctima, **reclama las indemnizaciones** a la aseguradora del vehículo.
3. Guarda **certificados médicos y boletas** para acreditar gastos e incapacidad.
4. Recuerda que el SOAP **no cubre los daños materiales** del vehículo (eso es seguro voluntario).
5. Pregúntale a **AbogaBot** si necesitas entender qué te corresponde.

> Los montos de las coberturas se expresan en UF y conviene verificar las cifras vigentes.
`,
    faq: [
      {
        pregunta: "¿Qué cubre el SOAP?",
        respuesta:
          "Indemnizaciones a las personas por muerte, invalidez y gastos médicos en accidentes de tránsito (artículo 25 de la Ley 18.490). No cubre los daños materiales del vehículo.",
      },
      {
        pregunta: "Si el SOAP paga, ¿el culpable queda libre de responsabilidad?",
        respuesta:
          "No. La aseguradora que paga puede recuperar lo pagado de quien sea civilmente responsable del accidente (artículo 16 de la Ley 18.490).",
      },
      {
        pregunta: "¿El SOAP reemplaza a un seguro automotriz?",
        respuesta:
          "No. El SOAP cubre a las personas, no los daños del auto, y es compatible con seguros voluntarios (artículo 14 de la Ley 18.490). Para los daños materiales necesitas un seguro aparte.",
      },
    ],
  },
];
