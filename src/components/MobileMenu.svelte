<script lang="ts">
  interface NavLink {
    label: string;
    href: string;
    highlight?: boolean;
  }

  interface Props {
    navLinks: NavLink[];
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    currentPath?: string;
  }

  let {
    navLinks,
    phone,
    phoneHref,
    email,
    emailHref,
    currentPath = "/",
  }: Props = $props();

  let isOpen = $state(false);

  function isActive(href: string): boolean {
    if (href === "/") return currentPath === "/" || currentPath === "";
    return (
      currentPath === href ||
      currentPath === href + "/" ||
      currentPath.startsWith(href + "/")
    );
  }

  /**
   * Portal action: mueve el overlay a <body> para escapar
   * del stacking context creado por backdrop-filter del header.
   */
  function portal(el: HTMLElement) {
    document.body.appendChild(el);
    return {
      destroy() {
        el.remove();
      },
    };
  }

  $effect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape" && isOpen) isOpen = false;
  }}
/>

<!-- Botón hamburguesa (permanece en el header) -->
<button
  type="button"
  onclick={() => (isOpen = !isOpen)}
  class="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
  aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
  aria-expanded={isOpen}
  aria-controls="mobile-nav"
>
  {#if isOpen}
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  {:else}
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  {/if}
</button>

<!-- Overlay — portaleado a <body> para evitar el contenedor del backdrop-filter -->
{#if isOpen}
  <div
    use:portal
    id="mobile-nav"
    role="dialog"
    aria-modal="true"
    aria-label="Menú de navegación"
    class="menu-overlay fixed inset-0 z-[9999] flex flex-col bg-white"
  >
    <!-- Cabecera del menú -->
    <div class="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-6">
      <a
        href="/"
        onclick={() => (isOpen = false)}
        class="flex items-center gap-2.5"
        aria-label="Inicio"
      >
        <svg class="h-7 w-7 shrink-0 text-gray-900" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <path d="M17 5 L5 5 L5 47 L17 47" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M35 5 L47 5 L47 47 L35 47" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="26" y1="10" x2="26" y2="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
        </svg>
        <span class="leading-tight">
          <span class="block text-[15px] font-semibold text-gray-900">Cirilo Amorós</span>
          <span class="block text-[11px] text-gray-400">Centro Empresarial · Valencia</span>
        </span>
      </a>
      <button
        type="button"
        onclick={() => (isOpen = false)}
        class="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
        aria-label="Cerrar menú"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Links de navegación -->
    <nav class="flex-1 overflow-y-auto px-6 py-6" aria-label="Menú móvil">
      <ul class="space-y-1">
        {#each navLinks.filter((l) => !l.highlight) as link}
          <li>
            <a
              href={link.href}
              onclick={() => (isOpen = false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              class={[
                "block rounded-full px-4 py-3 text-base font-medium transition-colors",
                isActive(link.href)
                  ? "bg-accent-50 text-accent-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>

      <!-- CTA principal -->
      <div class="mt-6">
        <a
          href="/contacto"
          onclick={() => (isOpen = false)}
          class="block w-full rounded-full bg-accent-600 px-4 py-4 text-center text-base font-medium text-white transition-colors hover:bg-accent-700"
        >
          Contactar
        </a>
      </div>
    </nav>

    <!-- Datos de contacto al pie -->
    <div class="shrink-0 border-t border-gray-100 px-6 py-5">
      <div class="space-y-3">
        <a
          href={phoneHref}
          class="flex items-center gap-3 text-gray-700 transition-colors hover:text-gray-900"
        >
          <svg class="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          <span class="font-medium">{phone}</span>
        </a>
        <a
          href={emailHref}
          class="flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <svg class="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          {email}
        </a>
      </div>
    </div>
  </div>
{/if}
