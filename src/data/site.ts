/**
 * Configuración global del negocio.
 * ÚNICO punto de verdad para teléfono, email, dirección y datos clave.
 * Cambiar un dato aquí lo actualiza en toda la web.
 */
export const site = {
  name:      "Cirilo Amorós Centro Empresarial",
  shortName: "Cirilo Amorós",
  tagline:   "Oficinas en el corazón de Valencia",
  founded:   2000,

  contact: {
    phone:        "96 353 39 00",
    phoneHref:    "tel:+34963533900",
    whatsapp:     "[PENDIENTE: número WhatsApp sin espacios ni +]",
    whatsappHref: "https://wa.me/[PENDIENTE]",
    email:        "recepcion@ciriloamoros.com",
    emailHref:    "mailto:recepcion@ciriloamoros.com",
  },

  /** NAP — debe ser idéntico en toda la web y en Google Business */
  address: {
    street:       "C/ Cirilo Amorós 6, entresuelo 1ª",
    access:       "Entrada por pasaje Ruzafa",
    city:         "Valencia",
    postalCode:   "46004",
    neighborhood: "El Pla del Remei",
    country:      "ES",
    countryName:  "España",
    full:         "C/ Cirilo Amorós 6, entresuelo 1ª, 46004 Valencia, España",
    region:       "Valencia",
    /** Coordenadas reales del perfil de Google Business */
    lat:          39.4662458,
    lng:          -0.3737332,
  },

  schedule: {
    weekdays:     "L–J: 8:30–14:00 y 16:00–19:00 · V: 8:30–15:00",
    saturday:     "Cerrado",
    clientAccess: "Acceso 24/7 para clientes con contrato",
    /** Horario estructurado para schema LocalBusiness (openingHoursSpecification) */
    structured: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:30", closes: "14:00" },
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "16:00", closes: "19:00" },
      { days: ["Friday"], opens: "08:30", closes: "15:00" },
    ],
  },

  /** Rango de precios para schema (símbolo) y precio mínimo "desde" */
  pricing: {
    priceRange: "€€",
    fromAmount: 320,
    currency:   "EUR",
  },

  google: {
    rating:       4.2,
    reviewCount:  34,
    mapsUrl:      "https://maps.google.com/?q=C%2F+de+Ciril+Amor%C3%B3s,+6,+L%27Eixample,+46004+Val%C3%A8ncia,+Valencia",
    businessUrl:  "[PENDIENTE: URL del perfil de Google Business]",
    mapsEmbedSrc: "https://maps.google.com/maps?q=Ciril+Amor%C3%B3s+6%2C+46004+Val%C3%A8ncia&output=embed&z=16&hl=es",
  },

  meta: {
    titleSuffix: "| Cirilo Amorós · Valencia",
    description:
      "Alquiler de despachos privados, salas de reuniones y domiciliación empresarial en Valencia centro. Todo incluido, sin inversión inicial. Desde 320 €/mes.",
    ogImage: "/images/og-default.jpg",
    locale:  "es_ES",
  },

  /** Dominio principal — PENDIENTE confirmar .es vs .com */
  domain: "ciriloamoros.es",
} as const;

export type Site = typeof site;
