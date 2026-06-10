<script setup lang="ts">
defineProps<{
  sectionId: string
  index: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section :id="sectionId" class="relative mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-12 md:py-16">
    <div v-reveal class="mb-4 flex items-end gap-4">
      <span class="pb-1.5 font-mono text-sm text-accent">{{ index }}</span>
      <h2 class="font-display text-4xl font-semibold tracking-tight md:text-5xl">{{ title }}</h2>
      <span class="mb-3 h-px flex-1 bg-line" aria-hidden="true" />
    </div>
    <p v-if="subtitle" v-reveal="100" class="mb-10 max-w-2xl text-lg text-muted">{{ subtitle }}</p>
    <div v-else class="mb-10" />
    <slot />
  </section>
</template>
