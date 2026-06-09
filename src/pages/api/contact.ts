import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const TO_EMAIL   = import.meta.env.RESEND_TO_EMAIL   ?? "recepcion@ciriloamoros.com";
const FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

const SERVICIO_LABELS: Record<string, string> = {
  "despachos":       "Despacho privado",
  "salas":           "Sala de reuniones",
  "oficina-virtual": "Oficina virtual / domiciliación",
  "general":         "Consulta general",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  nombre?:   string;
  empresa?:  string;
  email?:    string;
  telefono?: string;
  servicio?: string;
  mensaje?:  string;
}

export const POST: APIRoute = async ({ request }) => {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return json({ error: "Petición mal formada." }, 400);
  }

  const { nombre, empresa, email, telefono, servicio, mensaje } = body;

  // Validación server-side
  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
    return json({ error: "Faltan campos obligatorios." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "El email no tiene un formato válido." }, 400);
  }
  if (mensaje.trim().length < 10) {
    return json({ error: "El mensaje es demasiado corto." }, 400);
  }

  const servicioLabel = SERVICIO_LABELS[servicio ?? ""] ?? "No especificado";

  const lines = [
    `Nombre:   ${nombre.trim()}`,
    empresa?.trim() ? `Empresa:  ${empresa.trim()}` : null,
    `Email:    ${email.trim()}`,
    telefono?.trim() ? `Teléfono: ${telefono.trim()}` : null,
    `Servicio: ${servicioLabel}`,
    "",
    "Mensaje:",
    mensaje.trim(),
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await resend.emails.send({
      from:    `Formulario web <${FROM_EMAIL}>`,
      to:      TO_EMAIL,
      replyTo: email.trim(),
      subject: `[ciriloamoros.es] Nueva consulta: ${servicioLabel} — ${nombre.trim()}`,
      text:    lines,
    });

    return json({ success: true }, 200);
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return json(
      { error: "Error al enviar el mensaje. Por favor, llámenos directamente al 96 353 39 00." },
      500
    );
  }
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
