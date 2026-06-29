<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SectionShell from '@/components/SectionShell.vue'
import technologyImage from '@/assets/images/interests/technology.png'
import aiImage from '@/assets/images/bento/ai.png'
import sportsImage from '@/assets/images/interests/sports.png'
import motorcycleImage from '@/assets/images/interests/motorcycle.png'
import racingImage from '@/assets/images/interests/racing.png'
import gamingImage from '@/assets/images/interests/gaming.png'

interface Slide {
  image: string
  title: string
  text: string
  tags: string[]
}

const slides: Slide[] = [
  {
    image: technologyImage,
    title: 'Technology',
    text: "I'm always looking for an excuse to pick up something new. Learning new things always keeps me motivated and interested in the tech industry. I also love working on personal side projects. Even after a day of work it can be relaxing to make some progress on my own projects",
    tags: [],
  },
  {
    image: aiImage,
    title: 'Following the world of AI',
    text: "AI has become one of my bigest interests. It has come to the point where I now use it daily during and outside of work. I like to create my own specialist AI environments for different tasks.",
    tags: [],
  },
  {
    image: sportsImage,
    title: 'Sports',
    text: "I've been into sports since I was six, starting with track and field. As a kid I loved the all-round challenge of the decathlon, but as I got older I gravitated towards the 100m and 200m sprint. These days I go to the gym because it fits my schedule better.",
    tags: [],
  },
  {
    image: motorcycleImage,
    title: 'Two wheels',
    text: "Another thing that gets me out of the house is my passion for motorcycles. I ride a Honda CBR600RR. There's nothing quite like heading out on a nice summer ride. It's honestly one of the first things I miss when winter rolls around.",
    tags: [],
  },  
  {
    image: racingImage,
    title: 'Racing',
    text: "I’ve been a Formula 1 fan for as long as I can remember, after a while I got really into endurance racing, especially events like the 24H of Le Mans and Spa-Francorchamps, which I’ve attended. I also regularly watch MotoGP and have been to the TT of Assen more than once.",
    tags: [],
  },
  {
    image: gamingImage,
    title: 'Gaming',
    text: "Gaming has been part of my life for as long as I can remember. I like variety. Sometimes I'm in the mood for something fast and competitive with friends, and other times I want to sink into a deep single-player story or lose a few hours to a strategy game.",
    tags: [],
  },
]

const AUTO_ADVANCE_MS = 6000
const active = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function goTo(index: number) {
  active.value = ((index % slides.length) + slides.length) % slides.length
}
function next() {
  goTo(active.value + 1)
}
function prev() {
  goTo(active.value - 1)
}

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    if (!paused.value) next()
  }, AUTO_ADVANCE_MS)
}
function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Touch / pointer swipe
let startX: number | null = null
function onPointerDown(e: PointerEvent) {
  startX = e.clientX
}
function onPointerUp(e: PointerEvent) {
  if (startX === null) return
  const delta = e.clientX - startX
  if (Math.abs(delta) > 48) (delta < 0 ? next : prev)()
  startX = null
}

onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<template>
  <SectionShell
    section-id="interests"
    index="02"
    title="Interests"
    subtitle="A diverse range of interests outside of work keep me sharp and creative."
  >
    <div
      v-reveal
      class="relative overflow-hidden rounded-2xl border border-line bg-card"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
    >
      <!-- Track -->
      <div
        class="flex transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="{ transform: `translateX(-${active * 100}%)` }"
      >
        <div
          v-for="(slide, i) in slides"
          :key="slide.title"
          class="w-full shrink-0 px-8 md:px-16 pt-8 pb-4"
          :aria-hidden="i !== active"
        >
          <div class="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <div class="flex items-center gap-5 md:flex-col md:items-start">
              <img
                :src="slide.image"
                :alt="slide.title"
                class="h-12 w-12 object-contain md:h-[4.5rem] md:w-[4.5rem]"
              />
              <span class="font-mono text-xs text-muted">{{ String(i + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span>
            </div>
            <div class="max-w-xl">
              <h3 class="font-display text-2xl font-semibold md:text-3xl">{{ slide.title }}</h3>
              <p class="mt-4 text-lg leading-relaxed text-muted">{{ slide.text }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="tag in slide.tags"
                  :key="tag"
                  class="rounded-full border border-line bg-elev px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between border-t border-line px-6 py-4">
        <div class="flex gap-2">
          <button
            v-for="(slide, i) in slides"
            :key="slide.title"
            class="h-1.5 rounded-full transition-all duration-400"
            :class="i === active ? 'w-8 bg-accent' : 'w-3 bg-line hover:bg-muted'"
            :aria-label="`Go to slide ${i + 1}: ${slide.title}`"
            @click="goTo(i)"
          />
        </div>
        <div class="flex gap-2">
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/40 hover:text-accent"
            aria-label="Previous slide"
            @click="prev"
          >
            ←
          </button>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent/40 hover:text-accent"
            aria-label="Next slide"
            @click="next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
