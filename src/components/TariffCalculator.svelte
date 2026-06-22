<script lang="ts">
  import { services } from "../data/services";

  const byId = Object.fromEntries(services.map((s) => [s.id, s]));
  const PD = byId["despachos"]?.priceFrom ?? 320;   // €/mes por despacho
  const PS = byId["salas"]?.priceFrom ?? 16;         // €/hora sala
  const PO = byId["oficina-virtual"]?.priceFrom ?? 40; // €/mes oficina virtual

  type Tipo = "despachos" | "salas" | "oficina-virtual";

  const tabs: { id: Tipo; label: string }[] = [
    { id: "despachos",       label: "Despacho privado" },
    { id: "salas",           label: "Sala de reuniones" },
    { id: "oficina-virtual", label: "Oficina virtual" },
  ];

  let tipo     = $state<Tipo>("despachos");
  let despachos = $state(1);   // nº de despachos
  let meses     = $state(6);   // permanencia estimada (despacho / oficina virtual)
  let horas     = $state(8);   // horas de sala al mes

  // Cuota mensual y total estimado según el tipo elegido
  let mensual = $derived(
    tipo === "despachos"      ? PD * despachos
    : tipo === "salas"        ? PS * horas
    :                           PO
  );
  let total = $derived(
    tipo === "salas" ? mensual : mensual * meses
  );

  const eur = (n: number) =>
    new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(n) + " €";

  let ctaHref = $derived(`/contacto?servicio=${tipo}`);
</script>

<div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <div class="grid lg:grid-cols-[1fr_320px]">

    <!-- Controles -->
    <div class="p-7 sm:p-9">
      <!-- Selector de tipo -->
      <div class="inline-flex flex-wrap gap-1 rounded-full bg-gray-100 p-1">
        {#each tabs as t}
          <button
            type="button"
            onclick={() => (tipo = t.id)}
            class={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tipo === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
            aria-pressed={tipo === t.id}
          >
            {t.label}
          </button>
        {/each}
      </div>

      <!-- Campos según tipo -->
      <div class="mt-8 space-y-7">
        {#if tipo === "despachos"}
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="calc-despachos" class="text-sm font-medium text-gray-700">Número de despachos</label>
              <span class="text-sm font-semibold tabular-nums text-accent-600">{despachos}</span>
            </div>
            <input id="calc-despachos" type="range" min="1" max="6" step="1" bind:value={despachos} class="calc-range" />
          </div>
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="calc-meses" class="text-sm font-medium text-gray-700">Permanencia estimada</label>
              <span class="text-sm font-semibold tabular-nums text-accent-600">{meses} {meses === 1 ? "mes" : "meses"}</span>
            </div>
            <input id="calc-meses" type="range" min="1" max="24" step="1" bind:value={meses} class="calc-range" />
          </div>
        {:else if tipo === "salas"}
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="calc-horas" class="text-sm font-medium text-gray-700">Horas de sala al mes</label>
              <span class="text-sm font-semibold tabular-nums text-accent-600">{horas} h</span>
            </div>
            <input id="calc-horas" type="range" min="1" max="40" step="1" bind:value={horas} class="calc-range" />
          </div>
          <p class="text-sm leading-relaxed text-gray-500">
            Reserva por horas, sin permanencia. Paga solo las horas que uses.
          </p>
        {:else}
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="calc-meses-ov" class="text-sm font-medium text-gray-700">Permanencia estimada</label>
              <span class="text-sm font-semibold tabular-nums text-accent-600">{meses} {meses === 1 ? "mes" : "meses"}</span>
            </div>
            <input id="calc-meses-ov" type="range" min="1" max="24" step="1" bind:value={meses} class="calc-range" />
          </div>
          <p class="text-sm leading-relaxed text-gray-500">
            Dirección comercial y fiscal de prestigio, sin coste de despacho.
          </p>
        {/if}
      </div>
    </div>

    <!-- Resultado -->
    <div class="flex flex-col justify-center gap-1 border-t border-gray-100 bg-gray-50 p-7 sm:p-9 lg:border-l lg:border-t-0">
      <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        {tipo === "salas" ? "Coste estimado / mes" : "Cuota mensual"}
      </p>
      <p class="flex items-baseline gap-1">
        <span class="text-4xl font-light tracking-[0.01em] text-gray-900 tabular-nums sm:text-5xl">{eur(mensual)}</span>
        {#if tipo !== "salas"}<span class="text-sm text-gray-500">/mes</span>{/if}
      </p>

      {#if tipo !== "salas"}
        <p class="mt-1 text-sm text-gray-500">
          Total estimado ({meses} {meses === 1 ? "mes" : "meses"}):
          <strong class="font-semibold text-gray-800 tabular-nums">{eur(total)}</strong>
        </p>
      {/if}

      <p class="mt-3 text-xs text-gray-400">Estimación orientativa. Precios sin IVA (21%).</p>

      <a href={ctaHref} class="btn-primary mt-5 w-full">
        Solicitar presupuesto
      </a>
    </div>
  </div>
</div>

<style>
  .calc-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 9999px;
    background: #e5e7eb;
    outline: none;
    cursor: pointer;
  }
  .calc-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 9999px;
    background: #5266eb;
    border: 3px solid #ffffff;
    box-shadow: 0 1px 4px rgba(82, 102, 235, 0.45);
    cursor: pointer;
  }
  .calc-range::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 9999px;
    background: #5266eb;
    border: 3px solid #ffffff;
    box-shadow: 0 1px 4px rgba(82, 102, 235, 0.45);
    cursor: pointer;
  }
</style>
