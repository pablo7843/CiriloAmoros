# Brief de proyecto — Rediseño web Cirilo Amorós Centro Empresarial

> Documento de trabajo. Sirve como (1) referencia de la estrategia y (2) contexto para Claude Code
> (puede copiarse/adaptarse como `CLAUDE.md` del repositorio). Última actualización: 29/05/2026.

---

## 1. Contexto

- **Negocio:** Cirilo Amorós Centro Empresarial — centro de negocios en Valencia (SL constituida en 2000).
- **Dirección:** C/ Cirilo Amorós 6, entresuelo 1ª (entrada por pasaje Ruzafa), 46004 Valencia. Barrio El Pla del Remei / L'Eixample.
- **Web actual:** https://ciriloamoros.es/ (WordPress + Elementor). Existe además un dominio antiguo https://ciriloamoros.com/ (a confirmar / resolver).
- **Servicios:** despachos privados (desde 320 €/mes), salas de reuniones (desde 16 €/h), oficina virtual / domiciliación (desde 40 €/mes). Precios sin IVA.
- **Reputación:** ~4,2/5 en Google con ~34 reseñas. Reseña pública recurrente: buena atención y servicios, pero "le faltaría modernizarse, da sensación de ser un poco antiguo".
- **Situación de partida según el encargo:** despachos vacíos, pérdida de leads. La web actual tiene fallos: iconos gigantes que dificultan la navegación, formulario de contacto roto (error de servidor), página de tarifas sin funcionalidad real.

## 2. Objetivo principal

Convertir visitas en **leads reales**: solicitudes de alquiler de despachos, reservas de salas de reuniones y contrataciones de oficina virtual.

> Nota estratégica: la web es **una** palanca. Despachos vacíos en una ubicación prime suele ser tanto un problema de **visibilidad y captación** (SEO local, Google Business Profile, SEM) y de **seguimiento comercial** como de diseño. El rediseño debe ir acompañado de esas palancas para mover el negocio.

## 3. Público objetivo (personas)

1. **Autónomo / freelance** que quiere imagen profesional y dirección de prestigio sin gran coste.
2. **PYME o delegación** de empresa de fuera que necesita sede en Valencia.
3. **Empresa que solo necesita sala de reuniones / formación** puntual (por horas).
4. **Quien busca domiciliación fiscal** (oficina virtual) sin espacio físico.

## 4. Propuesta de valor / mensaje

- **Ubicación prime** como argumento #1: corazón de Valencia, junto a Calle Colón, a pasos del distrito financiero, Ayuntamiento, comercio, restauración y transporte. Hacerlo **concreto** (minutos andando, mapa).
- "Todo incluido, sin inversión inicial": entras y trabajas desde el primer día.
- Imagen y prestigio + flexibilidad (por horas, meses) + servicios (recepción, correo, limpieza, climatización, acceso 24/7).

## 5. Dirección de diseño

**Estética inspirada en Apple, pero orientada a conversión** (minimalismo que no esconde el CTA ni el precio).

- Mucho espacio en blanco, retícula amplia, jerarquía tipográfica clara.
- Tipografía limpia y moderna (p. ej. Inter / system-ui / similar). Pesos: regular para texto, semibold/bold para titulares.
- Paleta sobria: blancos/grises neutros + 1 color de acento. Evitar saturación. Fotografía real grande y de calidad como protagonista.
- Componentes con esquinas suaves, sombras sutiles, microinteracciones discretas.
- **Persistentes en todo momento:** teléfono, botón "Contactar/Reservar", WhatsApp. La elegancia no debe esconder la conversión.

## 6. Estructura del sitio (home + páginas)

**Home (orden propuesto):**
1. Hero: foto real + titular de ubicación/prestigio + CTA primario ("Reservar visita") + CTA secundario ("Ver tarifas").
2. Tira de confianza: valoración Google (4,2★) + nº reseñas + (si se verifican) logos de empresas/sectores.
3. Bloque ubicación: mapa + distancias a pie a Colón / Ayuntamiento / metro + entorno.
4. Los 3 servicios en tarjetas claras (despacho / sala / oficina virtual) con precio "desde" y CTA propio.
5. "Cómo funciona" en 3 pasos (contactas → visitas → entras a trabajar).
6. Galería de espacios reales.
7. Reseñas (ver §7).
8. FAQ (precios, IVA, permanencia, horarios, qué incluye).
9. CTA final + footer con datos, mapa y enlaces.

**Páginas:** Despachos, Salas de reuniones, Oficina virtual, Tarifas (con tabla real y comparativa), Contacto, Blog.

## 7. Reseñas (decisión de diseño)

- **Recomendado:** rejilla estática de 4–6 mejores reseñas + insignia con la nota media y enlace a Google. Más accesible y mejor para conversión que un carrusel automático.
- **Si se mantiene el carrusel automático** (deseo del cliente): hacerlo bien → movimiento lento, **pausa al pasar el ratón**, controles manuales, accesible por teclado, `prefers-reduced-motion` respetado, y **solo reseñas reales** (idealmente vía Google Places API o pegadas manualmente desde Google, nunca inventadas).
- Con ~34 reseñas y 4,2★, mostrar la nota con naturalidad (sin exagerar) y enlazar a Google para credibilidad.

## 8. Logos de empresas/partners

- **No inventar.** No hay un listado público verificable de empresas cliente. Antes de mostrar logos hace falta **lista confirmada por el centro + permiso de uso de marca**.
- Alternativa mientras tanto: mostrar **sectores/tipos de cliente** o testimonios con nombre y cargo (con consentimiento), que aportan confianza sin riesgo legal.

## 9. SEO (requisitos y riesgos)

- **Riesgo de migración:** si se reconstruye fuera de WordPress, conservar URLs o configurar **redirecciones 301**, replicar metadatos (title/description), H1/H2, contenido textual y datos estructurados. Una migración mal hecha hunde el posicionamiento.
- **Dos dominios (.es y .com):** resolver canibalización. Decidir dominio principal y redirigir el otro (301). Confirmar cuál tiene autoridad/histórico.
- **SEO local (prioritario):** optimizar y mantener **Google Business Profile** (fotos, horarios, reseñas, posts), NAP consistente (nombre/dirección/teléfono iguales en todas partes), datos estructurados `LocalBusiness`/`Organization`.
- Rendimiento (Core Web Vitals): imágenes optimizadas (WebP/AVIF, tamaños correctos), carga diferida, mínimo JS.
- Contenido orientado a búsquedas: "alquiler despacho Valencia centro", "sala de reuniones por horas Valencia", "oficina virtual domiciliación Valencia", etc.

## 10. Funcionalidades a añadir

- Formulario de contacto que **funcione** (validación + backend/servicio de email fiable + mensaje de éxito/error claro).
- Botón de WhatsApp / llamada directa.
- (Idealmente) reserva/solicitud de visita con selección de servicio y fecha preferida.
- Tabla de tarifas real y comparativa, con "qué incluye cada plan".
- Datos estructurados, sitemap, robots.

## 11. Competencia (referencias de Valencia centro)

- **Baum Negocios** (Calle Colón): competidor más directo; explota ubicación + equipo + reseñas con nombre. Tono cercano.
- **Aticco Colón:** coworking moderno, diseño cuidado, servicios listados con claridad.
- **Office Valencia** (varias sedes, incl. Colón 40): mucho detalle de servicios, "entra ya", descuentos.
- **Wayco:** diseño de marca fuerte, edificios con carácter, varios espacios.
- **Llum:** posicionamiento "luminoso/limpio", fotografía protagonista.
- **Geminis Center:** acceso 24h, servicios técnicos/administrativos.

**Patrones a adoptar:** ubicación concreta y visible, fotografía real grande, reseñas con nombre, claridad de servicios y "qué incluye", flexibilidad (por horas/días/meses), CTA directos.

## 12. Stack técnico (a decidir con el cliente)

- **Opción A — Mejorar el WordPress/Elementor actual:** menor riesgo SEO, el cliente puede seguir editando, más rápido. Menos control de diseño "Apple".
- **Opción B — Reconstruir (Astro / Next.js, estático o con CMS headless):** máximo control de diseño y rendimiento. Riesgo: migración SEO + el cliente no técnico no podrá editar sin CMS. Requiere plan de redirecciones.
- **Para el PITCH/propuesta:** un prototipo estático (Astro/Next/HTML) de alta calidad es ideal para enseñar "esto es lo que puedo hacer" sin tocar el sitio en producción.

## 13. Restricciones / avisos

- El centro **aún no sabe** de este rediseño. Construir como **propuesta/maqueta para presentar**; **no** desplegar nada en el sitio en producción ni representar al centro sin autorización clara (vía Alba / TBig Finance). Confirmar alcance y permiso antes de tocar dominios, DNS o GBP.
- Cualquier dato de cliente, logo o reseña debe estar **verificado y autorizado**.

## 14. Preguntas abiertas (confirmar con el cliente)

- ¿Dominio principal definitivo (.es o .com)?
- ¿Fotos reales nuevas disponibles? (clave para la estética).
- ¿Lista verificada de empresas/testimonios con permiso?
- ¿El cliente necesita editar la web por su cuenta? (decide stack/CMS).
- ¿Acceso al GBP y a los servicios actuales (hosting, email del formulario)?
