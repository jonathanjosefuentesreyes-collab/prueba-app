# Imagen de producción de Leyes de Chile — lleva la app + la base de 20.000 leyes
# adentro. Multi-stage: compila con Node completo, corre con una imagen mínima.

# --- Etapa 1: compilar ---
FROM node:22-bookworm AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# En el deploy desde GitHub la base viene comprimida (data/leyes.db.gz, ~79MB para no
# pasar el límite de 100MB por archivo de GitHub); aquí la descomprimimos ANTES del build
# porque la home es SSG y lee la DB en tiempo de compilación. En un build local con la DB
# cruda ya presente, se omite. El .gz se elimina para no engordar la imagen final.
RUN if [ ! -f data/leyes.db ] && [ -f data/leyes.db.gz ]; then gunzip data/leyes.db.gz; fi \
    && rm -f data/leyes.db.gz
# La key NO se hornea en la imagen; se inyecta como variable de entorno del host en runtime.
# URL pública del sitio en www: la usan canonical, sitemap y robots, que se generan en BUILD
# (son estáticos/SSG). Sin esto quedarían en sin-www y no coincidirían con la propiedad www
# de Search Console. El apex igual redirige a www (Render), así que www es el dominio real.
ENV NEXT_PUBLIC_SITE_URL=https://www.leyesdechile.com
RUN npm run build

# --- Etapa 2: runtime mínimo ---
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# www también en runtime, para las rutas dinámicas (ej. /leyes/[id]).
ENV NEXT_PUBLIC_SITE_URL=https://www.leyesdechile.com

# Salida autocontenida de Next (incluye el binario nativo de better-sqlite3)
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# La base de datos de leyes (solo lectura en runtime)
COPY --from=build /app/data ./data

EXPOSE 3000
CMD ["node", "server.js"]
