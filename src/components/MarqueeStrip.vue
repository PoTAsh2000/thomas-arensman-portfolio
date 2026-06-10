<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const words = [
  'REST', 'SOAP', 'AS2', 'SFTP', 'EDI', 'Java', 'Spring Boot', 'Apache Camel',
  'MongoDB', 'MySQL', 'Docker', '.NET', 'Rust', 'Go', 'AI Engineering',
]

// Pause the infinite animation while the strip is offscreen so it never
// costs frames when scrolling elsewhere on the page.
const root = ref<HTMLElement | null>(null)
const playing = ref(true)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      playing.value = entries.some((entry) => entry.isIntersecting)
    },
    { rootMargin: '64px 0px' },
  )
  if (root.value) observer.observe(root.value)
})
onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="overflow-hidden border-y border-line bg-elev/60 py-3.5" aria-hidden="true">
    <div
      class="marquee-track flex w-max animate-marquee gap-10 will-change-transform"
      :style="{ animationPlayState: playing ? 'running' : 'paused' }"
    >
      <template v-for="n in 2" :key="n">
        <span
          v-for="word in words"
          :key="`${n}-${word}`"
          class="flex shrink-0 items-center gap-10 font-mono text-xs tracking-[0.2em] text-muted uppercase"
        >
          {{ word }}
          <span class="text-accent/60">✦</span>
        </span>
      </template>
    </div>
  </div>
</template>
