<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const BASE_OFFSET = 24 // default distance from viewport bottom (px)
const BUTTON_SIZE = 56

const open = ref(false)
const visible = ref(false)
const translateY = ref(0)

const links = [
  { name: 'Email', href: 'mailto:tharensman@gmail.com', label: 'tharensman@gmail.com' },
  { name: 'GitHub', href: 'https://github.com/PoTAsh2000', label: 'PoTAsh2000' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-arensman-401140135/', label: 'thomas-arensman' },
]

let ticking = false
let credits: Element | null = null

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    visible.value = window.scrollY > 300
    // Align with the footer credits row (copyright + built-with line)
    if (!credits) credits = document.querySelector('#footer-credits')
    if (credits) {
      const rect = credits.getBoundingClientRect()
      const creditsCenter = rect.top + rect.height / 2
      const desiredBottom = window.innerHeight - creditsCenter - BUTTON_SIZE / 2
      translateY.value = Math.min(0, -(desiredBottom - BASE_OFFSET))
    }
    ticking = false
  })
}

function onDocumentClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('.contact-fab')) {
    open.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocumentClick)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div
    class="contact-fab fixed right-5 bottom-6 z-40 transition-opacity duration-300 md:right-8"
    :class="visible ? 'opacity-100' : 'pointer-events-none opacity-0'"
    :style="{ transform: `translateY(${translateY}px)` }"
  >
    <Transition name="pop">
      <div
        v-if="open"
        class="absolute right-0 bottom-[4.5rem] w-64 rounded-xl border border-line bg-elev p-2 shadow-2xl shadow-black/50"
      >
        <p class="px-3 pt-2 pb-1 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Reach me at</p>
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-card"
        >
          <span class="text-fg">{{ link.name }}</span>
          <span class="truncate font-mono text-[11px] text-muted">{{ link.label }}</span>
        </a>
      </div>
    </Transition>

    <button
      class="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-carbon shadow-lg shadow-accent/25 transition-transform duration-300 hover:scale-110 active:scale-95"
      :aria-expanded="open"
      aria-label="Contact options"
      @click="open = !open"
    >
      <Transition name="icon" mode="out-in">
        <svg
          v-if="!open" key="mail"
          xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <svg
          v-else key="close"
          xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </Transition>
    </button>
  </div>
</template>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: rotate(-45deg) scale(0.8);
}
</style>
