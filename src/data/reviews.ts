export interface Review {
  author:  string;
  rating:  number; // 1–5
  date:    string; // ISO 8601, p. ej. "2025-10-15"
  text:    string;
  source:  "google";
}

/**
 * Reseñas reales copiadas del perfil de Google Business.
 * REGLA DURA: no inventar ni modificar el texto. Solo lo que aparece en Google.
 * Fechas aproximadas a partir de "hace X años" (hoy: 2026-05-29).
 */
export const reviews: Review[] = [
  {
    author:  "Dan Cortijo",
    rating:  5,
    date:    "2023-05-01",
    text:    "Buenas instalaciones y felicitar a Javier Valero por su buena profesionalidad y saber estar.",
    source:  "google",
  },
  {
    author:  "Carlos Jesús Lozoya Gómez",
    rating:  5,
    date:    "2022-05-01",
    text:    "Excelente atención.",
    source:  "google",
  },
  {
    author:  "Javier Marin Sola",
    rating:  5,
    date:    "2018-05-01",
    text:    "Suelo reservarlo por horas para hacer reuniones de trabajo. Todas las comodidades, wifi, proyector, la sala limpia y con aire acondicionado. En pleno centro de Valencia se agradece un sitio con Parking al lado para poder mantener reuniones con clientes de fuera. Muy recomendable.",
    source:  "google",
  },
  {
    author:  "Ignacio Ballester Arrieta",
    rating:  5,
    date:    "2018-05-01",
    text:    "Reservé a dos días vista y no me pusieron ningún problema. El trámite de la reserva es rápido y cómodo. Se agradece tener servicio de parking al estar en pleno centro de Valencia.",
    source:  "google",
  },
  {
    author:  "Carlos Gascó",
    rating:  4,
    date:    "2020-05-01",
    text:    "Despachos en alquiler con buena presencia en el centro de Valencia.",
    source:  "google",
  },
];

export const googleSummary = {
  rating:      4.2,
  reviewCount: 34,
  businessUrl: "[PENDIENTE: URL del perfil de Google Business]",
} as const;
