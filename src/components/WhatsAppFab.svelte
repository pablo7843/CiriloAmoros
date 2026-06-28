<script lang="ts">
  import { fly, fade, scale } from "svelte/transition";
  import { site } from "../data/site";

  // Si el número está [PENDIENTE], el botón no se monta.
  const hasWhatsApp = !site.contact.whatsapp.startsWith("[PENDIENTE");
  const PREFILL = encodeURIComponent(
    "Hola, me gustaría información sobre los despachos de Cirilo Amorós.",
  );
  const waHref = `${site.contact.whatsappHref}?text=${PREFILL}`;

  let open = $state(false);

  function toggle() { open = !open; }
  function close()  { open = false; }
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && open && close()} />

{#if hasWhatsApp}
  <!-- Popup estilo WhatsApp -->
  {#if open}
    <div
      transition:fly={{ y: 12, duration: 220 }}
      class="fixed bottom-44 right-6 z-[72] w-[19rem] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-gray-900/20 ring-1 ring-black/5"
      role="dialog"
      aria-label="Contactar por WhatsApp"
    >
      <!-- Cabecera verde -->
      <header class="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </span>
        <div class="min-w-0 leading-tight">
          <p class="truncate text-sm font-semibold">{site.shortName}</p>
          <p class="text-[11px] text-white/70">Normalmente responde en minutos</p>
        </div>
        <button
          type="button"
          onclick={close}
          class="ml-auto -mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
          aria-label="Cerrar"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </button>
      </header>

      <!-- Cuerpo estilo chat de WhatsApp -->
      <div class="bg-[#ECE5DD] px-4 py-5">
        <div class="relative max-w-[85%] rounded-lg rounded-tl-none bg-white px-3.5 py-2.5 shadow-sm">
          <p class="text-[13px] leading-relaxed text-gray-700">
            👋 ¡Hola! Somos {site.shortName}. Si tienes cualquier duda, pregúntanos
            por WhatsApp y te respondemos enseguida.
          </p>
          <span class="mt-1 block text-right text-[10px] text-gray-400">ahora</span>
        </div>
      </div>

      <!-- Acción -->
      <div class="bg-white px-4 py-3">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onclick={close}
          class="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          Abrir WhatsApp
        </a>
      </div>
    </div>
  {/if}

  <!-- FAB (encima del botón de la IA, misma esquina derecha) -->
  <button
    type="button"
    onclick={toggle}
    class="fab-hideable fixed bottom-24 right-6 z-[71] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-colors hover:bg-[#1ebe5b] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    aria-label={open ? "Cerrar WhatsApp" : "Escríbenos por WhatsApp"}
    aria-expanded={open}
  >
    {#if open}
      <svg in:scale={{ duration: 150 }} class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
      </svg>
    {:else}
      <svg in:scale={{ duration: 150 }} class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    {/if}
  </button>
{/if}
