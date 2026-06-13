# Imagen de producción de Leyes de Chile — lleva la app + la base de 20.000 leyes
# adentro. Multi-stage: compila con Node completo, corre con una imagen mínima.

# --- Etapa 1: compilar ---
FROM node:22-bookworm AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# La key NO se hornea en la imagen; se inyecta como secreto del host en runtime.
RUN npm run build

# --- Etapa 2: runtime mínimo ---
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Salida autocontenida de Next (incluye el binario nativo de better-sqlite3)
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# La base de datos de leyes (solo lectura en runtime)
COPY --from=build /app/data ./data

EXPOSE 3000
CMD ["node", "server.js"]
