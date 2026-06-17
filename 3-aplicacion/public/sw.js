// Service worker mínimo de Leyes de Chile.
// Objetivo: que la app sea INSTALABLE (prompt "Agregar a pantalla de inicio") y abra
// con lo último visto si no hay conexión. Estrategia: network-first con respaldo en caché.
// NO intercepta /api/* ni métodos != GET (el chat es POST a Gemini y debe ir siempre a la red).
const CACHE = "leyes-de-chile-v2";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      const claves = await caches.keys();
      await Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.pathname.startsWith("/api/")) return;
  if (url.origin !== self.location.origin) return; // solo cachea lo nuestro

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && res.status === 200 && res.type === "basic") {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copia)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const enCache = await caches.match(e.request);
        if (enCache) return enCache;
        if (e.request.mode === "navigate") return caches.match("/");
        return new Response("", { status: 504, statusText: "Sin conexión" });
      })
  );
});
