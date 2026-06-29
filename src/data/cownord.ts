/**
 * Datos de la marca Cownord (coworking del grupo Think Big Advisory).
 * Dos sedes: Museros (coworking) y Massamagrell (mixto despachos + coworking).
 * Datos reales tomados de cownord.es; lo no confirmado va como [PENDIENTE].
 * Cambiar un dato = tocar UN solo sitio (los componentes leen de aquí).
 */

export const cownord = {
  brand:    "Cownord",
  tagline:  "Una nueva forma de trabajar",
  claim:    "La verdadera innovación surge cuando el trabajo se encuentra con la flexibilidad.",
  url:      "https://cownord.es",
  // Web antigua a sustituir/redirigir cuando se publique esta (ver acuerdo con cliente).
  legacyUrl: "https://cownord.es",
  // [PENDIENTE: identidad de marca Cownord — logo y colores oficiales]
  // Hasta tenerlos se reutiliza el azul de acento del proyecto.
  // Atención de Cownord compartida con Cirilo (mismo equipo del grupo).
  contact: {
    emailHref: "mailto:recepcion@ciriloamoros.com",
    email:     "recepcion@ciriloamoros.com",
  },
  // Enlace cruzado a la otra marca del grupo
  cirilo: {
    name: "Cirilo Amorós Centro Empresarial",
    url:  "/",
    pitch: "¿Buscas un despacho privado en el centro de Valencia?",
  },
} as const;

export interface CownordCenter {
  id:       string;
  name:     string;
  city:     string;
  slug:     string;
  kind:     string;             // "Coworking" | "Despachos + Coworking"
  image:    string;             // foto de la sede (stock provisional)
  metaTitle:       string;
  metaDescription: string;
  headline:        string;
  intro:           string;
  address: {
    street:     string;
    city:       string;
    postalCode: string;
    region:     string;
    country:    string;
    mapsUrl:    string;
    mapsEmbedSrc: string;
  };
  contact: {
    phone:     string;
    phoneHref: string;
    phone2?:   string;
    phone2Href?: string;
    email:     string;
    emailHref: string;
  };
  schedule: string;
  access24h: boolean;
  /** Servicios — nombre + nota; precio "desde" si se conoce. */
  services: { name: string; desc: string; priceFrom?: string }[];
  features: string[];
  /** Reseñas reales pegadas a mano (PENDIENTE de recopilar de Google). */
  reviews: { author: string; text: string; rating: number; date: string }[];
  rating:      number | null;
  reviewCount: number | null;
}

export const cownordCenters: CownordCenter[] = [
  {
    id:   "museros",
    name: "Cownord Museros",
    city: "Museros",
    slug: "/cownord/museros",
    kind: "Coworking",
    image: "/images/cownord-museros.webp",
    metaTitle:
      "Coworking en Museros | Cownord — Espacios flexibles 24h",
    metaDescription:
      "Coworking en Museros (Valencia): puestos fijos y flexibles, salas de reuniones e internet de alta velocidad. Acceso 24/7. A 4 minutos del metro.",
    headline: "Coworking flexible en Museros.",
    intro:
      "Un espacio para trabajar a tu ritmo en Museros: puestos fijos, pases por días u horas y salas de reuniones. Acceso 24 horas y comunidad.",
    address: {
      street:     "Avenida de la Cruz 23",
      city:       "Museros",
      postalCode: "46136",
      region:     "Valencia",
      country:    "ES",
      mapsUrl:      "https://maps.google.com/?q=Avenida+de+la+Cruz+23,+46136+Museros,+Valencia",
      mapsEmbedSrc: "https://maps.google.com/maps?q=Avenida+de+la+Cruz+23,+46136+Museros&output=embed&z=16&hl=es",
    },
    contact: {
      phone:      "665 807 147",
      phoneHref:  "tel:+34665807147",
      phone2:     "963 533 900",
      phone2Href: "tel:+34963533900",
      email:      "recepcion@ciriloamoros.com",
      emailHref:  "mailto:recepcion@ciriloamoros.com",
    },
    schedule:  "Acceso 24/7 los 365 días",
    access24h: true,
    services: [
      { name: "Puesto fijo",        desc: "Tu sitio reservado con acceso los 365 días.", priceFrom: "129 €/mes" },
      { name: "Puesto flexible",    desc: "Pases por horas o por días, sin permanencia.", priceFrom: "12 €/día" },
      { name: "Sala de reuniones",  desc: "Con proyector, para reuniones y presentaciones.", priceFrom: "15 €/hora" },
    ],
    features: [
      "Acceso 24/7 con app móvil",
      "Internet de alta velocidad",
      "Salas de reuniones con proyector",
      "Café e infusiones",
      "Mobiliario ergonómico",
      "Aparcabicis",
      "A 4 minutos del metro",
      "Zonas comunes para networking",
    ],
    reviews: [
      { author: "Teresa BR",        text: "Lugar perfecto para trabajar, con todas las comodidades que se necesitan.", rating: 5, date: "2021" },
      { author: "Marcela Mersing",  text: "Un espacio genial para trabajar, con todos los servicios necesarios. Buen ambiente y gente estupenda.", rating: 5, date: "2021" },
      { author: "María Sánchez",    text: "Fantástico lugar de trabajo, con espacios abiertos y muy buena iluminación.", rating: 5, date: "2021" },
      { author: "Alberto Martínez", text: "Muy luminoso, con espacios comunes y salas, comedor y aire acondicionado. Muy recomendable.", rating: 5, date: "2021" },
      { author: "Marta Sánchez",    text: "Muy espacioso y cómodo para trabajar.", rating: 5, date: "2021" },
      { author: "Paula Antón",      text: "Amplio y luminoso. Muy buen clima de trabajo.", rating: 5, date: "2021" },
    ],
    rating:      4.8,     // aprox. — mayoría de reseñas de 5★ (verificar nota exacta en Google)
    reviewCount: 23,
  },
  {
    id:   "massamagrell",
    name: "Cownord Massamagrell",
    city: "Massamagrell",
    slug: "/cownord/massamagrell",
    kind: "Despachos + Coworking",
    image: "/images/cownord-massamagrell.webp",
    metaTitle:
      "Despachos y coworking en Massamagrell | Cownord",
    metaDescription:
      "Despachos privados (4–15 m²) y coworking en Massamagrell. Acceso 24/7, salas de reuniones e internet de alta velocidad. Centro recién abierto.",
    headline: "Despachos y coworking en Massamagrell.",
    intro:
      "Centro recién abierto en Massamagrell, a un paso del metro: despachos privados de 4 a 15 m² y espacio de coworking flexible. Acceso 24 horas.",
    address: {
      street:     "Avenida del Raval 3, bajo",
      city:       "Massamagrell",
      postalCode: "46130",
      region:     "Valencia",
      country:    "ES",
      mapsUrl:      "https://maps.google.com/?q=Avenida+del+Raval+3,+Massamagrell,+Valencia",
      mapsEmbedSrc: "https://maps.google.com/maps?q=Avenida+del+Raval+3,+Massamagrell&output=embed&z=16&hl=es",
    },
    contact: {
      phone:     "665 807 147",
      phoneHref: "tel:+34665807147",
      email:     "recepcion@ciriloamoros.com",
      emailHref: "mailto:recepcion@ciriloamoros.com",
    },
    schedule:  "Acceso 24/7 los 365 días",
    access24h: true,
    services: [
      { name: "Despacho privado",   desc: "Despachos de 4 a 15 m², listos para entrar a trabajar.", priceFrom: "199 €/mes" },
      { name: "Puesto de coworking",desc: "Puesto fijo o flexible en zona compartida.", priceFrom: "99 €/mes" },
      { name: "Sala de reuniones",  desc: "Para reuniones y presentaciones.", priceFrom: "15 €/hora" },
    ],
    features: [
      "Acceso 24/7 con app móvil",
      "Junto al metro de Massamagrell",
      "Despachos privados de 4–15 m²",
      "Internet de alta velocidad",
      "Salas de reuniones",
      "Café e infusiones",
      "Mobiliario ergonómico",
      "Zonas comunes para networking",
      "Centro recién abierto",
    ],
    reviews: [],          // [PENDIENTE: reseñas reales de Google de Massamagrell]
    rating:      null,
    reviewCount: null,
  },
];

export function getCownordCenter(id: string): CownordCenter | undefined {
  return cownordCenters.find((c) => c.id === id);
}
