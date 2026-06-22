<script lang="ts">
  type Status = "idle" | "sending" | "success" | "error";

  const SERVICIOS = [
    { value: "despachos",       label: "Despacho privado" },
    { value: "salas",           label: "Sala de reuniones" },
    { value: "oficina-virtual", label: "Oficina virtual / domiciliación" },
    { value: "general",         label: "Consulta general" },
  ] as const;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let nombre   = $state("");
  let empresa  = $state("");
  let email    = $state("");
  let telefono = $state("");
  let servicio = $state<string>("despachos");
  let mensaje  = $state("");
  let status   = $state<Status>("idle");
  let errorMsg = $state("");

  let fieldErrors = $derived({
    nombre:  nombre.length  > 0 && nombre.trim().length  < 2  ? "Mínimo 2 caracteres" : "",
    email:   email.length   > 0 && !EMAIL_RE.test(email)       ? "Email no válido"     : "",
    mensaje: mensaje.length > 0 && mensaje.trim().length < 10  ? "Mínimo 10 caracteres" : "",
  });

  let canSubmit = $derived(
    nombre.trim().length >= 2 &&
    EMAIL_RE.test(email) &&
    mensaje.trim().length >= 10 &&
    status !== "sending"
  );

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    status = "sending";
    errorMsg = "";

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ nombre, empresa, email, telefono, servicio, mensaje }),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        status = "success";
      } else {
        errorMsg = data.error ?? "Ha ocurrido un error. Inténtelo de nuevo.";
        status = "error";
      }
    } catch {
      errorMsg = "Error de conexión. Comprueba tu conexión a internet e inténtalo de nuevo.";
      status = "error";
    }
  }
</script>

{#if status === "success"}
  <!-- Estado éxito -->
  <div role="alert" class="rounded-2xl bg-green-50 border border-green-200 p-10 text-center">
    <svg
      class="mx-auto mb-4 h-12 w-12 text-green-500"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
    <h2 class="text-xl font-semibold text-green-800 mb-2">Mensaje enviado correctamente</h2>
    <p class="text-green-700">
      Gracias por tu interés. Te responderemos en menos de 24 horas hábiles.
    </p>
  </div>
{:else}
  <form onsubmit={handleSubmit} novalidate class="space-y-5">

    <!-- Nombre + Empresa -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1.5">
          Nombre <span aria-hidden="true" class="text-red-500">*</span>
        </label>
        <input
          id="nombre"
          type="text"
          bind:value={nombre}
          autocomplete="name"
          required
          aria-describedby={fieldErrors.nombre ? "nombre-err" : undefined}
          aria-invalid={!!fieldErrors.nombre || undefined}
          placeholder="Tu nombre"
          class="block w-full rounded-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition
                 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none
                 aria-invalid:border-red-400 aria-invalid:ring-red-400/20"
        />
        {#if fieldErrors.nombre}
          <p id="nombre-err" class="mt-1.5 text-xs text-red-600">{fieldErrors.nombre}</p>
        {/if}
      </div>

      <div>
        <label for="empresa" class="block text-sm font-medium text-gray-700 mb-1.5">
          Empresa <span class="text-gray-400 font-normal">(opcional)</span>
        </label>
        <input
          id="empresa"
          type="text"
          bind:value={empresa}
          autocomplete="organization"
          placeholder="Nombre de tu empresa"
          class="block w-full rounded-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition
                 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none"
        />
      </div>
    </div>

    <!-- Email + Teléfono -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span aria-hidden="true" class="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          autocomplete="email"
          required
          aria-describedby={fieldErrors.email ? "email-err" : undefined}
          aria-invalid={!!fieldErrors.email || undefined}
          placeholder="correo@ejemplo.com"
          class="block w-full rounded-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition
                 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none
                 aria-invalid:border-red-400 aria-invalid:ring-red-400/20"
        />
        {#if fieldErrors.email}
          <p id="email-err" class="mt-1.5 text-xs text-red-600">{fieldErrors.email}</p>
        {/if}
      </div>

      <div>
        <label for="telefono" class="block text-sm font-medium text-gray-700 mb-1.5">
          Teléfono <span class="text-gray-400 font-normal">(opcional)</span>
        </label>
        <input
          id="telefono"
          type="tel"
          bind:value={telefono}
          autocomplete="tel"
          placeholder="600 000 000"
          class="block w-full rounded-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition
                 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none"
        />
      </div>
    </div>

    <!-- Servicio -->
    <div>
      <label for="servicio" class="block text-sm font-medium text-gray-700 mb-1.5">
        Servicio de interés
      </label>
      <div class="relative">
        <select
          id="servicio"
          bind:value={servicio}
          class="block w-full cursor-pointer appearance-none rounded-full border border-gray-300 bg-white px-5 py-3 pr-12 text-gray-900 transition
                 hover:border-gray-400
                 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none"
        >
          {#each SERVICIOS as s}
            <option value={s.value}>{s.label}</option>
          {/each}
        </select>
        <!-- Flecha personalizada -->
        <svg
          class="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>

    <!-- Mensaje -->
    <div>
      <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-1.5">
        Mensaje <span aria-hidden="true" class="text-red-500">*</span>
      </label>
      <textarea
        id="mensaje"
        bind:value={mensaje}
        rows={5}
        required
        aria-describedby={fieldErrors.mensaje ? "mensaje-err" : undefined}
        aria-invalid={!!fieldErrors.mensaje || undefined}
        placeholder="Cuéntanos qué necesitas…"
        class="block w-full resize-none rounded-3xl border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-400 transition
               focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none
               aria-invalid:border-red-400 aria-invalid:ring-red-400/20"
      ></textarea>
      {#if fieldErrors.mensaje}
        <p id="mensaje-err" class="mt-1.5 text-xs text-red-600">{fieldErrors.mensaje}</p>
      {/if}
    </div>

    <!-- Error global -->
    {#if status === "error"}
      <div role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {errorMsg}
      </div>
    {/if}

    <!-- Submit + nota -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <button
        type="submit"
        disabled={!canSubmit}
        aria-busy={status === "sending"}
        class="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-8 py-3.5
               text-sm font-medium text-white transition-colors
               hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
               disabled:cursor-not-allowed disabled:opacity-50"
      >
        {#if status === "sending"}
          <svg
            class="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Enviando…
        {:else}
          Enviar mensaje
        {/if}
      </button>

      <p class="text-xs text-gray-500">
        Campos <span aria-hidden="true" class="text-red-500">*</span> obligatorios.
        Respuesta en menos de 24 h.
      </p>
    </div>

  </form>
{/if}
