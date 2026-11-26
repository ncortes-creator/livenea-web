# Livénea Lab · sitio web

Sitio de marca y lista de espera (fase 0), con la estructura de inicio inspirada en Vida Glow:
barra de anuncios, hero, franja de confianza, carrusel de productos, ingredientes, bloques destacados,
membresía, Journal y lista de espera.

- HTML, CSS y JavaScript sin dependencias: `index.html`, `styles.css`, `main.js`.
- Productos: se editan en el arreglo `PRODUCTS` al inicio de `main.js`.
- Lista de espera: `api/waitlist.js` (función de Vercel). Cada inscripción queda en los logs de Vercel.
  Para guardarlas en una planilla, define la variable de entorno `WAITLIST_WEBHOOK_URL` en Vercel.

## Publicar en Vercel
1. En vercel.com: Add New → Project → Import este repositorio.
2. Framework preset: "Other". Sin comando de build. Deploy.
Cada push a `main` se publica solo.

## Ver en local
`npx vercel dev` (o cualquier servidor estático, sin la lista de espera).
