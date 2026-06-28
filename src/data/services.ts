export interface Service {
  id:            string;
  name:          string;
  slug:          string;
  headline:      string;
  description:   string;
  priceFrom:     number;
  priceCurrency: string;
  priceUnit:     string;
  priceNote:     string;
  features:      string[];
  cta: {
    label: string;
    href:  string;
  };
  image:    string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id:          "despachos",
    name:        "Despachos privados",
    slug:        "/despachos",
    headline:    "Tu despacho en el corazón de Valencia",
    description:
      "Espacios privados totalmente equipados en una de las mejores ubicaciones de Valencia. Entra y trabaja desde el primer día, sin inversión inicial.",
    priceFrom:     320,
    priceCurrency: "EUR",
    priceUnit:     "mes",
    priceNote:     "Precio sin IVA",
    features: [
      "Acceso 24/7",
      "Recepción y atención de visitas",
      "Limpieza incluida",
      "Climatización",
      "Internet de alta velocidad",
      "Dirección comercial y postal",
      "Mobiliario y mantenimiento incluidos",
    ],
    cta: {
      label: "Solicitar información",
      href:  "/contacto?servicio=despachos",
    },
    image:    "/images/despacho-principal.webp",
    imageAlt: "Despacho privado en Cirilo Amorós Centro Empresarial, Valencia",
  },
  {
    id:          "salas",
    name:        "Salas de reuniones",
    slug:        "/salas",
    headline:    "Reúnete con profesionalidad",
    description:
      "Salas equipadas para reuniones, presentaciones y formaciones. Reserva por horas sin compromisos. Ideal para recibir clientes y equipo.",
    priceFrom:     16,
    priceCurrency: "EUR",
    priceUnit:     "hora",
    priceNote:     "Precio sin IVA",
    features: [
      "Reserva por horas",
      "Pantalla y proyector",
      "Videoconferencia",
      "Internet de alta velocidad",
      "Agua y café",
      "Hasta 8 personas",
      "Pizarra y rotuladores",
    ],
    cta: {
      label: "Reservar sala",
      href:  "/contacto?servicio=salas",
    },
    image:    "/images/sala-reuniones.webp",
    imageAlt: "Sala de reuniones en Cirilo Amorós Centro Empresarial, Valencia",
  },
  {
    id:          "oficina-virtual",
    name:        "Oficina virtual",
    slug:        "/oficina-virtual",
    headline:    "Imagen profesional sin coste de despacho",
    description:
      "Domicilia tu empresa en una dirección de prestigio en Valencia centro. Gestión de correo, atención y uso puntual de salas incluidos.",
    priceFrom:     40,
    priceCurrency: "EUR",
    priceUnit:     "mes",
    priceNote:     "Precio sin IVA",
    features: [
      "Dirección comercial y fiscal",
      "Recepción y gestión de correo",
      "Uso de salas a precio especial",
      "Aviso inmediato de correo y paquetería",
      "Atención telefónica personalizada (plan Premium)",
    ],
    cta: {
      label: "Contratar oficina virtual",
      href:  "/contacto?servicio=oficina-virtual",
    },
    image:    "/images/galeria-recepcion.webp",
    imageAlt: "Oficina virtual y domiciliación empresarial en Valencia centro",
  },
];
