import { NextResponse } from "next/server";

// Inicio del flujo de pago de Premium. Hoy es un STUB: cuando se configure una pasarela
// chilena (Flow, Mercado Pago o Webpay/Transbank), aquí se crea la orden de suscripción y
// se devuelve { url } con el link de pago al que el front redirige.
//
// Para activarlo se necesita (del usuario): cuenta de comercio + credenciales (API key /
// secret) en variables de entorno, y elegir proveedor en PAGO_PROVEEDOR.
export async function POST() {
  const proveedor = process.env.PAGO_PROVEEDOR; // "flow" | "mercadopago" | "webpay"

  if (!proveedor) {
    return NextResponse.json({ ok: false, mensaje: "Pagos en preparación (sin proveedor configurado)." });
  }

  // TODO: integrar el proveedor elegido.
  // - flow: POST https://www.flow.cl/api/payment/create (apiKey + firma) → devuelve url
  // - mercadopago: crear preference / preapproval → devuelve init_point
  // - webpay: Transbank SDK → crea transacción → devuelve url + token
  return NextResponse.json({ ok: false, mensaje: `Proveedor "${proveedor}" aún no implementado.` });
}
