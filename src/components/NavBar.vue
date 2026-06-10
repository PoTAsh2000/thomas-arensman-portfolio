<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '@/assets/images/logo/logo_no_fullname.png'

const links = [
  { index: '01', label: 'About', href: '#about' },
  { index: '02', label: 'Interests', href: '#interests' },
  { index: '03', label: 'Career', href: '#career' },
  { index: '04', label: 'Stack', href: '#stack' },
  { index: '05', label: 'Focus', href: '#now' },
]

const contactLinks = [
  { name: 'Email', href: 'mailto:tharensman@gmail.com', label: 'tharensman@gmail.com' },
  { name: 'GitHub', href: 'https://github.com/PoTAsh2000', label: 'PoTAsh2000' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-arensman-401140135/', label: 'thomas-arensman' },
]

const scrolled = ref(false)
const progress = ref(0)
const showProgress = ref(false)
const menuOpen = ref(false)
const contactOpen = ref(false)

let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    scrolled.value = y > 24
    showProgress.value = y > window.innerHeight * 0.7
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, y / max) : 0
    ticking = false
  })
}

function closeMenu() {
  menuOpen.value = false
}

function onDocumentClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('.nav-contact')) {
    contactOpen.value = false
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
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="scrolled || menuOpen ? 'bg-carbon/95 border-b border-line' : 'border-b border-transparent'"
  >
    <nav class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
      <a href="#top" class="flex items-center gap-3" @click="closeMenu">
        <img :src="logo" alt="" class="h-8 w-8" />
        <span class="hidden font-display text-base font-semibold tracking-wide md:inline" style="color: #b0b1af">
          Thomas<span class="mx-2 text-accent">·</span>Arensman
        </span>
      </a>

      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="group font-mono text-[13px] text-muted transition-colors hover:text-fg"
          >
            <span class="text-accent/70 transition-colors group-hover:text-accent">{{ link.index }}</span>
            <span class="ml-1.5">{{ link.label }}</span>
          </a>
        </li>
        <li class="nav-contact relative">
          <button
            class="rounded-full border border-accent/40 px-4 py-1.5 font-mono text-[13px] text-accent transition-all hover:bg-accent hover:text-carbon"
            :class="{ 'bg-accent text-carbon': contactOpen }"
            :aria-expanded="contactOpen"
            @click.stop="contactOpen = !contactOpen"
          >
            Contact
          </button>
          <Transition name="dropdown">
            <div
              v-if="contactOpen"
              class="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-xl border border-line bg-elev p-2 shadow-2xl shadow-black/50"
            >
              <p class="px-3 pt-2 pb-1 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Reach me at</p>
              <a
                v-for="link in contactLinks"
                :key="link.name"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-card"
                @click="contactOpen = false"
              >
                <span class="text-fg">{{ link.name }}</span>
                <span class="truncate font-mono text-[11px] text-muted">{{ link.label }}</span>
              </a>
            </div>
          </Transition>
        </li>
      </ul>

      <button
        class="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="h-px w-5 bg-fg transition-transform duration-300"
          :class="{ 'translate-y-[3.5px] rotate-45': menuOpen }"
        />
        <span
          class="h-px w-5 bg-fg transition-transform duration-300"
          :class="{ '-translate-y-[3.5px] -rotate-45': menuOpen }"
        />
      </button>
    </nav>

    <Transition name="menu">
      <ul v-if="menuOpen" class="border-t border-line px-6 py-4 md:hidden">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block py-2.5 font-mono text-sm text-muted transition-colors hover:text-fg"
            @click="closeMenu"
          >
            <span class="text-accent/70">{{ link.index }}</span>
            <span class="ml-2">{{ link.label }}</span>
          </a>
        </li>
        <li class="border-t border-line pt-2 mt-2">
          <p class="px-0 pt-1 pb-1 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Reach me at</p>
          <a
            v-for="link in contactLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-baseline justify-between gap-3 py-2.5 font-mono text-sm text-muted transition-colors hover:text-fg"
            @click="closeMenu"
          >
            <span class="text-fg">{{ link.name }}</span>
            <span class="truncate font-mono text-[11px] text-muted">{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </Transition>

    <div
      class="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent transition-opacity duration-300"
      :class="showProgress ? 'opacity-100' : 'opacity-0'"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
