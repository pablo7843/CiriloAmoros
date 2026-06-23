<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { site } from "../data/site";

  type Msg = { role: "user" | "assistant"; content: string };

  const EMAIL = site.contact.email;
  const GREETING =
    "¡Hola! 👋 Soy el asistente de Cirilo Amorós. Puedo ayudarte con despachos, precios, ubicación, horario o acceso 24h. ¿Qué necesitas?";

  let open     = $state(false);
  let input    = $state("");
  let sending  = $state(false);
  let messages = $state<Msg[]>([{ role: "assistant", content: GREETING }]);
  let showNudge = $state(false);

  let scroller = $state<HTMLElement | null>(null);
  let inputEl  = $state<HTMLTextAreaElement | null>(null);

  // Autoscroll al fondo cuando cambian los mensajes / estado
  $effect(() => {
    messages; sending;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  });

  // Abrir el chat desde otros sitios de la página (CTA de FAQ, etc.)
  // + bocadillo invitando a pulsar (una vez por sesión).
  $effect(() => {
    const onOpen = () => openChat();
    window.addEventListener("cirilo:open-chat", onOpen);

    let t: ReturnType<typeof setTimeout> | undefined;
    if (!sessionStorage.getItem("chatNudgeSeen")) {
      t = setTimeout(() => { if (!open) showNudge = true; }, 3500);
    }
    return () => {
      window.removeEventListener("cirilo:open-chat", onOpen);
      if (t) clearTimeout(t);
    };
  });

  function dismissNudge() {
    showNudge = false;
    try { sessionStorage.setItem("chatNudgeSeen", "1"); } catch {}
  }

  function openChat() {
    open = true;
    dismissNudge();
    setTimeout(() => inputEl?.focus(), 60);
  }
  function closeChat() { open = false; }

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    messages = [...messages, { role: "user", content: text }];
    input = "";
    sending = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Solo user/assistant; el saludo inicial no se manda (es cosmético)
        body: JSON.stringify({ messages: messages.slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string; detail?: string };
      if (data.detail) console.warn("[chat] detalle:", data.detail);
      const reply =
        data.reply ??
        `Ha habido un problema. Escríbenos a ${EMAIL} y te ayudamos.`;
      messages = [...messages, { role: "assistant", content: reply }];
    } catch {
      messages = [
        ...messages,
        { role: "assistant", content: `Error de conexión. Escríbenos a ${EMAIL} y te ayudamos enseguida.` },
      ];
    } finally {
      sending = false;
      setTimeout(() => inputEl?.focus(), 30);
    }
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && open && closeChat()} />

<!-- Bocadillo que invita a usar el chat -->
{#if !open && showNudge}
  <div
    transition:fly={{ y: 12, duration: 250 }}
    class="fixed bottom-24 right-6 z-[71] w-56 rounded-2xl rounded-br-sm border border-gray-100 bg-white p-3.5 pr-8 shadow-xl shadow-gray-900/10"
  >
    <button
      type="button"
      onclick={dismissNudge}
      class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
      aria-label="Cerrar aviso"
    >
      <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
      </svg>
    </button>
    <button type="button" onclick={openChat} class="block text-left">
      <p class="text-sm font-medium text-gray-900">¿Tienes dudas? 👋</p>
      <p class="mt-0.5 text-xs text-gray-500">Pregúntame lo que quieras, respondo al instante.</p>
    </button>
  </div>
{/if}

<!-- Botón flotante -->
{#if !open}
  <button
    type="button"
    onclick={openChat}
    transition:fade={{ duration: 150 }}
    class="chat-fab fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white shadow-lg shadow-accent-600/30 transition-colors hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
    aria-label="Abrir chat de ayuda"
  >
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 10.5h8M8 14h5M21 12a8.5 8.5 0 0 1-12.4 7.56L3 21l1.5-5.1A8.5 8.5 0 1 1 21 12Z"/>
    </svg>
    {#if showNudge}
      <span class="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75"></span>
        <span class="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-500 ring-2 ring-white"></span>
      </span>
    {/if}
  </button>
{/if}

{#if open}
  <!-- Fondo difuminado -->
  <div
    class="fixed inset-0 z-[80] bg-gray-900/30 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={closeChat}
    role="presentation"
  ></div>

  <!-- Panel vertical -->
  <aside
    class="fixed inset-y-0 right-0 z-[90] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
    transition:fly={{ x: 400, duration: 280, opacity: 1 }}
    role="dialog"
    aria-modal="true"
    aria-label="Asistente de Cirilo Amorós"
  >
    <!-- Cabecera -->
    <header class="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
      <div class="flex items-center gap-3">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-50 text-accent-600">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10.5h8M8 14h5M21 12a8.5 8.5 0 0 1-12.4 7.56L3 21l1.5-5.1A8.5 8.5 0 1 1 21 12Z"/>
          </svg>
        </span>
        <div class="leading-tight">
          <p class="text-sm font-semibold text-gray-900">Asistente Cirilo Amorós</p>
          <p class="text-[11px] text-gray-400">Respuestas al instante</p>
        </div>
      </div>
      <button
        type="button"
        onclick={closeChat}
        class="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
        aria-label="Cerrar chat"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
      </button>
    </header>

    <!-- Mensajes -->
    <div bind:this={scroller} class="flex-1 space-y-3 overflow-y-auto px-5 py-5">
      {#each messages as m}
        <div class={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          <div class={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            m.role === "user"
              ? "bg-accent-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}>
            {m.content}
          </div>
        </div>
      {/each}

      {#if sending}
        <div class="flex justify-start">
          <div class="inline-flex items-center gap-1.5 rounded-2xl bg-gray-100 px-4 py-3">
            <span class="chat-dot"></span>
            <span class="chat-dot" style="animation-delay:.15s"></span>
            <span class="chat-dot" style="animation-delay:.3s"></span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Entrada -->
    <div class="shrink-0 border-t border-gray-100 px-4 py-3">
      <div class="flex items-end gap-2">
        <textarea
          bind:this={inputEl}
          bind:value={input}
          onkeydown={onKey}
          rows="1"
          placeholder="Escribe tu pregunta…"
          class="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        ></textarea>
        <button
          type="button"
          onclick={send}
          disabled={sending || !input.trim()}
          class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Enviar"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.5 4.5a.5.5 0 0 1 .67-.62l16 7.66a.5.5 0 0 1 0 .9l-16 7.66a.5.5 0 0 1-.67-.62L6 12Zm0 0h7"/>
          </svg>
        </button>
      </div>
      <p class="mt-2 px-1 text-center text-[11px] text-gray-400">
        ¿Prefieres hablar con una persona? Escríbenos a
        <a href={site.contact.emailHref} class="font-medium text-accent-600 hover:underline">{EMAIL}</a>
      </p>
    </div>
  </aside>
{/if}

<style>
  .chat-dot {
    width: 7px;
    height: 7px;
    border-radius: 9999px;
    background: #9aa3b2;
    animation: chatBlink 1s ease-in-out infinite;
  }
  @keyframes chatBlink {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50%      { opacity: 1;   transform: translateY(-3px); }
  }
</style>
