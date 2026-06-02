<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const PHRASES = ['Hello World!!', 'My name is Thomas.', 'Welcome to my page!']
const TYPE_SPEED = 60
const DELETE_SPEED = 40
const PAUSE_AFTER_TYPE = 3600
const PAUSE_AFTER_DELETE = 800

const displayedText = ref('')
const phraseIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

function tick() {
  const phrase = PHRASES[phraseIndex.value]!
  if (!isDeleting.value) {
    displayedText.value = phrase.slice(0, ++charIndex.value)
    if (charIndex.value === phrase.length) {
      timeoutId = setTimeout(() => { isDeleting.value = true; tick() }, PAUSE_AFTER_TYPE)
      return
    }
  } else {
    displayedText.value = phrase.slice(0, --charIndex.value)
    if (charIndex.value === 0) {
      isDeleting.value = false
      phraseIndex.value = (phraseIndex.value + 1) % PHRASES.length
      timeoutId = setTimeout(tick, PAUSE_AFTER_DELETE)
      return
    }
  }
  timeoutId = setTimeout(tick, isDeleting.value ? DELETE_SPEED : TYPE_SPEED)
}

onMounted(() => { timeoutId = setTimeout(tick, PAUSE_AFTER_DELETE) })
onUnmounted(() => { if (timeoutId) clearTimeout(timeoutId) })
</script>

<template>
  <section class="flex h-[38vh] items-center justify-center bg-[#242323]">
    <p class="text-[5.25rem] font-semibold text-white" style="font-family: 'Courier New', monospace">
      {{ displayedText }}<span class="animate-blink">|</span>
    </p>
  </section>
</template>
