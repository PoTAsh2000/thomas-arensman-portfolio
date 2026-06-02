<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  images: { src: string; alt: string }[]
}>()

const AUTO_SLIDE_INTERVAL = 3500
const RESUME_DELAY = 0

const offset = ref(0)
const visibleCount = 5
const isAnimating = ref(false)
const slideDirection = ref<'left' | 'right' | null>(null)
const slideSpeedSeconds = 0.7

const totalRendered = visibleCount + 2 // buffer image on each side
const trackWidthPercent = (totalRendered / visibleCount) * 100 // % of container
const stepPercent = 100 / totalRendered // % of track width per item

let autoSlideTimer: ReturnType<typeof setInterval> | null = null
let resumeTimer: ReturnType<typeof setTimeout> | null = null

const renderedImages = computed(() => {
  const result = []
  const len = props.images.length
  for (let i = -1; i <= visibleCount; i++) {
    const index = ((offset.value + i) % len + len) % len
    result.push({ ...props.images[index]!, position: i })
  }
  return result
})

const trackStyle = computed(() => {
  const base = stepPercent // hide the -1 buffer image
  let translatePercent = base
  let transition = 'none'

  if (isAnimating.value && slideDirection.value === 'right') {
    translatePercent = base + stepPercent
    transition = `transform ${slideSpeedSeconds}s ease`
  } else if (isAnimating.value && slideDirection.value === 'left') {
    translatePercent = base - stepPercent
    transition = `transform ${slideSpeedSeconds}s ease`
  }

  return {
    width: `${trackWidthPercent}%`,
    transform: `translateX(-${translatePercent}%)`,
    transition,
  }
})

let safetyTimer: ReturnType<typeof setTimeout> | null = null

function clearSafetyTimer() {
  if (safetyTimer !== null) {
    clearTimeout(safetyTimer)
    safetyTimer = null
  }
}

function slideRight() {
  if (isAnimating.value) return
  isAnimating.value = true
  slideDirection.value = 'right'
  clearSafetyTimer()
  safetyTimer = setTimeout(finishSlide, slideSpeedSeconds * 1000 + 100)
}

function slideLeft() {
  if (isAnimating.value) return
  isAnimating.value = true
  slideDirection.value = 'left'
  clearSafetyTimer()
  safetyTimer = setTimeout(finishSlide, slideSpeedSeconds * 1000 + 100)
}

function finishSlide() {
  clearSafetyTimer()
  const len = props.images.length
  if (slideDirection.value === 'right') {
    offset.value = (offset.value + 1) % len
  } else if (slideDirection.value === 'left') {
    offset.value = ((offset.value - 1) % len + len) % len
  }
  isAnimating.value = false
  slideDirection.value = null
}

function onTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'transform') return
  finishSlide()
}

function startAutoSlide() {
  stopAutoSlide()
  autoSlideTimer = setInterval(slideRight, AUTO_SLIDE_INTERVAL)
}

function stopAutoSlide() {
  if (autoSlideTimer !== null) {
    clearInterval(autoSlideTimer)
    autoSlideTimer = null
  }
}

function clearResumeTimer() {
  if (resumeTimer !== null) {
    clearTimeout(resumeTimer)
    resumeTimer = null
  }
}

function onArrowClick(direction: 'left' | 'right') {
  if (isAnimating.value) return
  stopAutoSlide()
  clearResumeTimer()

  if (direction === 'left') {
    slideLeft()
  } else {
    slideRight()
  }

  resumeTimer = setTimeout(startAutoSlide, RESUME_DELAY)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
  clearResumeTimer()
  clearSafetyTimer()
})
</script>

<template>
  <div class="flex items-center w-full">
    <button
      class="text-4xl font-bold text-gray-400 hover:text-gray-700 transition-colors px-4 py-2 select-none flex-shrink-0"
      @click="onArrowClick('left')"
      aria-label="Slide left"
    >
      &lt;
    </button>

    <div class="flex-1 overflow-hidden">
      <div
        class="flex items-center"
        :style="trackStyle"
        @transitionend.self="onTransitionEnd"
      >
        <div
          v-for="(image, i) in renderedImages"
          :key="offset + '_' + i"
          class="flex-1 flex items-center justify-center"
        >
          <div class="w-[72px] h-[72px] flex items-center justify-center">
            <img
              :src="image.src"
              :alt="image.alt"
              class="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <button
      class="text-4xl font-bold text-gray-400 hover:text-gray-700 transition-colors px-4 py-2 select-none flex-shrink-0"
      @click="onArrowClick('right')"
      aria-label="Slide right"
    >
      &gt;
    </button>
  </div>
</template>
