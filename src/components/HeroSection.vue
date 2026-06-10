<template>
  <section id="top" class="relative flex min-h-svh flex-col justify-center overflow-hidden pt-16">
    <!-- Grid backdrop, faded at the edges by an overlay gradient
         (cheaper than mask-image, which forces offscreen rasterization on scroll) -->
    <div class="hero-grid absolute inset-0" aria-hidden="true" />
    <div class="hero-grid-fade absolute inset-0" aria-hidden="true" />
    <!-- Glows (radial gradients, no filter: blur keeps scrolling cheap) -->
    <div
      class="hero-glow-accent absolute -top-48 right-[-16%] h-[44rem] w-[44rem]"
      aria-hidden="true"
    />
    <div
      class="hero-glow-mint absolute bottom-[-28%] left-[-16%] h-[38rem] w-[38rem]"
      aria-hidden="true"
    />

    <div class="relative mx-auto w-full max-w-6xl px-6 py-20">
      <p v-reveal class="mb-5 font-mono text-sm text-accent">
        // Backend Developer · The Netherlands
      </p>

      <h1
        v-reveal="100"
        class="font-display text-[clamp(2.9rem,9vw,7rem)] leading-[0.95] font-semibold tracking-tight"
      >
        Thomas<br />
        Arensman<span class="text-accent">.</span>
      </h1>

      <p v-reveal="200" class="mt-7 max-w-xl text-xl leading-relaxed text-muted">
        I design and build scalable, failure-proof data integrations.
        Curious by default. I don't let a problem go until I understand it.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 64px 64px;
}

/* Solid-color fade over the grid: same look as the old radial mask because
   the page background is flat carbon, but it paints as a plain gradient */
.hero-grid-fade {
  background: radial-gradient(ellipse 80% 70% at 50% 40%, transparent 35%, var(--color-carbon) 80%);
}

.hero-glow-accent {
  background: radial-gradient(circle closest-side, rgba(255, 180, 84, 0.1), transparent 72%);
}
.hero-glow-mint {
  background: radial-gradient(circle closest-side, rgba(142, 227, 208, 0.06), transparent 72%);
}
</style>
