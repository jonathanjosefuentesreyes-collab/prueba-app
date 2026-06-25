// Digital Asset Links para la TWA de Google Play (Trusted Web Activity).
// Declara que esta web y la app Android (mismo dominio) están vinculadas, para que la TWA
// verifique la propiedad del dominio y oculte la barra del navegador. Se sirve en
// https://leyesdechile.com/.well-known/assetlinks.json
//
// El package y el fingerprint SHA-256 se obtienen al empaquetar la TWA con Bubblewrap/
// PWABuilder (del keystore de firma). Se inyectan por variables de entorno en Render:
//   ANDROID_PACKAGE             = com.tuempresa.leyesdechile
//   ANDROID_SHA256_FINGERPRINT  = AA:BB:CC:...:ZZ   (el del keystore de subida)
// Mientras no estén configuradas, devuelve el package por defecto y lista de huellas vacía.
export const dynamic = "force-static";

export function GET() {
  const pkg = process.env.ANDROID_PACKAGE || "com.leyesdechile.twa";
  const fp = (process.env.ANDROID_SHA256_FINGERPRINT || "").trim();
  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: pkg,
        sha256_cert_fingerprints: fp ? [fp] : [],
      },
    },
  ];
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
