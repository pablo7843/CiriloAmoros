export interface NavLink {
  label:      string;
  href:       string;
  highlight?: boolean; // resalta como CTA en el header
}

export const mainNav: NavLink[] = [
  { label: "Despachos",        href: "/despachos" },
  { label: "Salas",            href: "/salas" },
  { label: "Oficina virtual",  href: "/oficina-virtual" },
  { label: "Tarifas",          href: "/tarifas" },
  { label: "Blog",             href: "/blog" },
  { label: "Contacto",         href: "/contacto", highlight: true },
];

export const footerNav: NavLink[] = [
  { label: "Inicio",           href: "/" },
  { label: "Despachos",        href: "/despachos" },
  { label: "Salas",            href: "/salas" },
  { label: "Oficina virtual",  href: "/oficina-virtual" },
  { label: "Tarifas",          href: "/tarifas" },
  { label: "Contacto",         href: "/contacto" },
  { label: "Blog",             href: "/blog" },
];

export const legalNav: NavLink[] = [
  { label: "Aviso legal",            href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Política de cookies",    href: "/cookies" },
];
