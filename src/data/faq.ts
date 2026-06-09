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
    question: "¿Cuál es la permanencia mínima para un despacho?",
    answer:   "[PENDIENTE: confirmar con el centro — ¿mensual? ¿trimestral?]",
    category: "despachos",
  },
  {
    question: "¿Qué incluye el precio del despacho?",
    answer:   "[PENDIENTE: confirmar lista completa — suministros, internet, limpieza, recepción, domiciliación...]",
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
    answer:   "[PENDIENTE: definir proceso — ¿por teléfono, email, formulario web?]",
    category: "salas",
  },
  {
    question: "¿Cuántas personas caben en la sala de reuniones?",
    answer:   "[PENDIENTE: confirmar capacidad máxima]",
    category: "salas",
  },
  {
    question: "¿La oficina virtual incluye domiciliación fiscal?",
    answer:   "[PENDIENTE: confirmar si incluye domiciliación fiscal, comercial, o ambas según plan]",
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
      "Por supuesto. Contáctenos para concertar una visita sin compromiso en el horario que le convenga.",
    category: "general",
  },
];
