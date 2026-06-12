# Archivo maestro de leyes

Aquí vive la **fuente de verdad** de todas las leyes del sitio.

1. **`FORMATO-LEYES.md`** — la especificación exacta del archivo. Se le puede entregar
   tal cual a Antigravity (o a cualquier herramienta) como instrucción.
2. **`leyes.jsonl`** — el archivo maestro (una ley por línea, descargada de la BCN).
   **Guardarlo en esta carpeta** cuando esté generado. El importador de la app lo
   valida y lo carga a la base de datos.

Recordatorios clave (el detalle está en la spec):
- Todo texto legal sale de leychile.cl — jamás de la memoria de un modelo.
- Pausa de 15 segundos entre normas o la BCN bloquea la IP ~20 minutos.
- El `idNorma` es obligatorio: sin él no funciona el actualizador automático.
