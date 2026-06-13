<script setup lang="ts">
import SectionShell from '@/components/SectionShell.vue'

const facts = [
  {
    title: 'Roots',
    text: 'Born and raised in Purmerend, North Holland. My father put a computer in front of me early. Curiosity did the rest.',
  },
  {
    title: 'Education',
    text: 'MBO Software Development done. Now pursuing an HBO degree in Software Architecture.',
  },
  {
    title: 'Mindset',
    text: 'I care about quality and detail, and weigh trade-offs instead of taking the easiest path.',
  },
  {
    title: 'Off-screen',
    text: 'Gym, supersport motorcycle, gaming and side projects. Always moving, always learning.',
  },
]

const stats = [
  { value: '02', label: 'career roles' },
  { value: '26+', label: 'skills' },
  { value: '02', label: 'motorcycles' },
  { value: '∞', label: 'curiosity' },
]
</script>

<template>
  <SectionShell section-id="about" index="01" title="About me">
    <img
      :src="'/main-image-of-me.png'"
      alt="Thomas Arensman"
      class="sr-only"
      aria-hidden="true"
    />
    <div class="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div>
        <p v-reveal class="font-display text-2xl leading-snug font-medium md:text-3xl">
          A software developer with a passion for designing systems
          that keep running <span class="text-accent">reliably at scale</span>.
        </p>
        <p v-reveal="100" class="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          From an early fascination with how things work under the hood, straight
          into professional software development. Naturally curious, I don't let
          a problem go until I understand it.
        </p>

        <div v-reveal="200" class="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-card px-4 py-5 text-center">
            <p class="font-display text-3xl font-semibold text-accent">{{ stat.value }}</p>
            <p class="mt-1 font-mono text-[11px] tracking-wide text-muted uppercase">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="(fact, i) in facts"
          :key="fact.title"
          v-reveal="i * 100"
          class="group rounded-xl border border-line bg-card p-6 transition-all duration-300 hover:scale-[1.08] hover:border-accent/40"
        >
          <h3 class="font-mono text-xs tracking-[0.2em] text-accent uppercase">{{ fact.title }}</h3>
          <p class="mt-3 text-base leading-relaxed text-muted transition-colors group-hover:text-fg">
            {{ fact.text }}
          </p>
        </article>
      </div>
    </div>
  </SectionShell>
</template>
