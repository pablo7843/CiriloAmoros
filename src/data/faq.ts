export interface FaqItem {
  question: string;
  answer:   string;
  category: "precios" | "despachos" | "salas" | "oficina-virtual" | "ubicacion" | "general";
}

export const faq: FaqItem[] = [
  {
    question: "¿Los precios incluyen IVA?",
    answer:
      "No, todos los precios indicados son sin IVA. El IVA aplicable es el 21%.",
    category: "precios",
  },
  {
    question: "¿Qué gastos incluye la cuota mensual del despacho?",
    answer:
      "La cuota es todo incluido: internet de alta velocidad, climatización, limpieza, recepción y atención de visitas, y dirección comercial y postal. Sin costes de comunidad ni suministros aparte.",
    category: "precios",
  },
  {
    question: "¿Hay que pagar fianza o cuota de alta?",
    answer:
      "Para los despachos se solicita una fianza equivalente a una mensualidad, que se devuelve al finalizar el contrato. No hay cuota de alta ni de matrícula. Las salas y la oficina virtual no requieren fianza.",
    category: "precios",
  },
  {
    question: "¿Cuál es la permanencia mínima para un despacho?",
    answer:
      "La permanencia mínima es de un mes. A partir de ahí el contrato se renueva mes a mes, con total flexibilidad para ampliar o dejarlo avisando con antelación.",
    category: "despachos",
  },
  {
    question: "¿Qué incluye el precio del despacho?",
    answer:
      "Todo incluido en una sola cuota: internet de alta velocidad, climatización, limpieza, suministros, mobiliario y mantenimiento, recepción y atención de visitas, y dirección comercial y postal. Acceso 24/7 los 365 días.",
    category: "despachos",
  },
  {
    question: "¿Puedo acceder al despacho fuera del horario de oficina?",
    answer:
      "Sí, los clientes con contrato de despacho tienen acceso las 24 horas del día, los 7 días de la semana.",
    category: "despachos",
  },
  {
    question: "¿Cómo puedo reservar una sala de reuniones?",
    answer:
      "Puedes reservar por teléfono, por email o desde el formulario de contacto de la web. Te confirmamos la disponibilidad el mismo día.",
    category: "salas",
  },
  {
    question: "¿Cuántas personas caben en la sala de reuniones?",
    answer:
      "La sala de reuniones tiene capacidad para hasta 8 personas, con pantalla, proyector y equipo de videoconferencia.",
    category: "salas",
  },
  {
    question: "¿La oficina virtual incluye domiciliación fiscal?",
    answer:
      "Sí. Según el plan que elijas puedes domiciliar la dirección comercial, la fiscal o ambas, para que tu empresa tenga una sede de prestigio en Valencia centro.",
    category: "oficina-virtual",
  },
  {
    question: "¿Dónde están exactamente las oficinas?",
    answer:
      "En la Calle Cirilo Amorós 6, entresuelo 1ª (entrada por el pasaje Ruzafa), en el barrio de El Pla del Remei, Valencia. A pocos minutos andando de la Calle Colón, el Ayuntamiento y el metro.",
    category: "ubicacion",
  },
  {
    question: "¿Cuál es el horario de atención de la recepción?",
    answer:
      "La recepción atiende de lunes a jueves de 8:30 a 14:00 y de 16:00 a 19:00, y los viernes de 8:30 a 15:00. Los clientes con contrato de despacho tienen acceso al edificio las 24 horas del día, todos los días del año.",
    category: "general",
  },
  {
    question: "¿Puedo visitar las instalaciones antes de contratar?",
    answer:
      "Por supuesto. Contáctanos para concertar una visita sin compromiso en el horario que te convenga.",
    category: "general",
  },
];
