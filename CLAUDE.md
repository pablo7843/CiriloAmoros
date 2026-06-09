# CLAUDE.md — Web Cirilo Amorós Centro Empresarial

## Qué es este proyecto
Rediseño desde cero de la web de un centro de negocios en Valencia (despachos privados,
salas de reuniones, oficina virtual / domiciliación).
**Objetivo:** convertir visitas en leads reales (solicitud de despacho, reserva de sala, oficina virtual).
**Estado actual:** maqueta / propuesta para presentar al cliente. NO desplegar en producción,
NO tocar dominios/DNS, NO tocar el Google Business Profile sin autorización explícita.

> Contexto completo (negocio, personas, competencia, SEO, decisiones) en `BRIEF-cirilo-amoros.md`.
> Consúltalo cuando necesites detalle de negocio o estrategia; aquí solo van las reglas operativas.

## Stack técnico
- **Astro** — sitio estático, SEO-first, cero JS por defecto.
- **Tailwind CSS** — estilos.
- **Islas interactivas** en Svelte (o React) SOLO donde haga falta: formulario de contacto,
  menú móvil, lightbox de galería. El resto, HTML estático.
- **Formulario de contacto:** endpoint serverless de Astro que envía email con Resend
  (alternativa rápida: Formspree/Web3Forms). Con validación y estados claros de éxito/error.
  *Prioridad nº 1: el formulario de la web actual está roto; este tiene que funcionar.*
- **Despliegue:** Vercel / Netlify / Cloudflare Pages.
- Node 18+.

## Arquitectura de contenido (IMPORTANTE)
El cliente no edita por su cuenta; yo soy el mantenedor ("Plan B"). Para que el mantenimiento
sea fácil y para poder migrar a un CMS en el futuro sin reescribir nada:
- **Centraliza TODO el contenido editable** (textos largos, precios, FAQ, reseñas) en
  archivos de datos bajo `src/data/` o colecciones de contenido en `src/content/` (`.json`, `.md`).
- Datos de negocio únicos (teléfono, email, dirección, precios "desde") en un único
  archivo de config, p. ej. `src/data/site.ts`. Cambiar "320 €" debe ser tocar UN solo sitio.
- Los componentes LEEN de esos datos. Nunca hardcodear precios ni textos sueltos en el maquetado.

## Dirección de diseño (no negociable)
- Estética inspirada en Apple: mucho espacio en blanco, retícula amplia, tipografía limpia
  y moderna, fotografía real grande como protagonista, microinteracciones sutiles.
- **Minimalismo que NUNCA esconde la conversión:** teléfono, botón "Reservar/Contactar"
  y WhatsApp visibles en todo momento (header fijo + CTA repetidos a lo largo de la página).
- Paleta sobria: neutros + 1 color de acento. Esquinas suaves, sombras sutiles.
- Tokens de diseño (paleta, tipografía, escala de espaciados) definidos en `tailwind.config`.
  *(Pendientes de definir — pregúntame si no están fijados todavía.)*
- Accesibilidad: contraste AA, navegable por teclado, respetar `prefers-reduced-motion`.

## Estructura del sitio
**Home:** hero (foto real + titular de ubicación/prestigio + CTA) → franja de confianza
(4,2★ Google + nº reseñas) → ubicación (mapa + minutos andando a Calle Colón / Ayuntamiento /
metro) → 3 servicios en tarjetas con precio "desde" y CTA propio → "cómo funciona" en 3 pasos →
galería de espacios → reseñas → FAQ → CTA final + footer con datos y mapa.
**Páginas:** Despachos · Salas de reuniones · Oficina virtual · Tarifas (tabla comparativa real,
"qué incluye cada plan") · Contacto · Blog.

## Reseñas
Rejilla FIJA de 4–6 reseñas reales (pegadas a mano desde Google) + insignia con la nota media
(4,2★) enlazando al perfil de Google. Sin carrusel automático. Sin API.

## Reglas duras
- NO inventar reseñas, logos de clientes ni testimonios. Solo contenido real y verificado.
  Si falta un dato, déjalo como `[PENDIENTE: ...]` y avísame; no lo rellenes a ojo.
- Es una propuesta: NO desplegar a producción, NO configurar dominios reales, NO tocar GBP.
- SEO en cada página: `title` y `description` únicos, un solo `H1`, datos estructurados
  `LocalBusiness`/`Organization`, NAP (nombre/dirección/teléfono) idéntico en todo el sitio,
  `sitemap.xml` + `robots.txt`, imágenes en WebP/AVIF bien dimensionadas con lazy loading.
- Pendiente a nivel proyecto (no en la maqueta): resolver los dos dominios (.es vs .com) con
  redirecciones 301 al elegir el principal.

## Cómo trabajar conmigo (convenciones)
- Itera en bloques pequeños; tras cada bloque, resume en 2-3 líneas qué cambiaste.
- Pide confirmación antes de borrar archivos o instalar muchas dependencias.
- Commits de Git frecuentes y descriptivos.
- Si una decisión afecta al SEO o a la estructura de URLs, avísame ANTES de ejecutarla.
- Empieza siempre por leer este archivo y `BRIEF-cirilo-amoros.md` si necesitas contexto.
