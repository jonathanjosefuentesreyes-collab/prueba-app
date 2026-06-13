# Cómo publicar Leyes de Chile (para llevarla al trabajo)

La app es un servidor Node + base SQLite de 228 MB. Se publica como **contenedor
Docker** (todo va adentro: app + leyes). El `Dockerfile` ya está probado localmente
con el build `standalone` (binario nativo de better-sqlite3 incluido).

## Recomendado: Fly.io (despliega el contenedor directo, sin GitHub)

Lo que hace EL USUARIO (una vez):
1. Crear cuenta en https://fly.io/app/sign-up (pide tarjeta para verificar; el uso
   de esta app es mínimo y no debería generar cobro relevante).
2. Avisarle a Claude para que instale `flyctl` y haga `fly auth login`
   (se confirma en el navegador).

Lo que hace CLAUDE (desde `3-aplicacion/`):
```
fly deploy                      # construye y sube la imagen (incluye la DB)
fly secrets set GEMINI_API_KEY=<tu_key> GEMINI_MODEL=gemini-2.5-flash-lite
fly deploy                      # redeploy con el secreto
```
- Si el nombre `leyes-de-clile` está tomado: editar `fly.toml` o `fly deploy --name otro-nombre`.
- URL resultante: `https://<nombre>.fly.dev` → abrir en el teléfono →
  "Agregar a pantalla de inicio" → queda como app instalada (PWA).

## Alternativa sin tarjeta: Render (free, pero más lento)

Necesita el repo en GitHub. La DB de 228 MB excede el límite de GitHub (100 MB),
así que requiere **Git LFS** para el archivo `data/leyes.db`, o construir desde el
Dockerfile con la DB subida por LFS. El servicio free se "duerme" tras 15 min sin
uso (primer acceso tarda ~1 min). Más pasos que Fly.

## Notas de producción

- La `GEMINI_API_KEY` se inyecta como secreto del host, NUNCA en la imagen ni en git.
- `auto_stop_machines` apaga la app sin tráfico para ahorrar; arranca sola al entrar.
- Pendiente antes de uso público amplio: deduplicar refundidos (Código del Trabajo
  aparece también como "DFL 1"), límite de mensajes por visitante/día (costo Gemini),
  y registrar el dominio propio (apuntar a la URL del host).
