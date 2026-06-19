import { ADSENSE_CLIENT } from "@/lib/adsense";

// ads.txt: autoriza a Google a vender tu inventario de anuncios. Se completa solo cuando
// pongas tu ID de AdSense en lib/adsense.ts. Google lo busca en https://tu-dominio/ads.txt
export const dynamic = "force-static";

export function GET() {
  const pub = ADSENSE_CLIENT.replace(/^ca-/, ""); // "pub-XXXXXXXXXXXXXXXX"
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt — se completará al aprobar AdSense (pon tu ID en lib/adsense.ts)\n";
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
