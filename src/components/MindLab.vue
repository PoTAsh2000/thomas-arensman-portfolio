<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import SectionShell from '@/components/SectionShell.vue'
import nasImage from '@/assets/images/bento/nas.png'
import bookImage from '@/assets/images/bento/book.png'
import programmingImage from '@/assets/images/bento/programming.png'
import aiImage from '@/assets/images/bento/ai.png'
import practiceImage from '@/assets/images/bento/practice.png'
import infoImage from '@/assets/images/bento/info.png'

type BentoType = 'Study' | 'Labbing' | 'Programming' | 'AI' | 'Practice'

const typeImages: Partial<Record<BentoType, string>> = {
  Study: bookImage,
  Labbing: nasImage,
  Programming: programmingImage,
  AI: aiImage,
  Practice: practiceImage,
}

interface BentoItem {
  id: string
  topic: string
  short: string
  text: string
  points: string[]
  span: string
  type: BentoType
  cells: number
}

const items: BentoItem[] = [
  {
    id: 'nas',
    topic: 'NAS Home labbing',
    short: 'Setting up my own NAS for multiple purposes',
    // text: 'A home project to own my data: storage, backups and self-hosted services, all containerized. Equal parts useful and an excuse to tinker.',
    text: 'Using a NAS to safely store personal data on a local server became a fun way to learn a bit more about networking, RAID setups, and backup strategies. I quickly became obsessed with doing more projects on it. I started using it as my own streaming service, so I can easily watch movies and series from my NAS, instead of being dependent on external streaming providers like Netflix. My NAS also became a nice device for hosting personal projects like this portfolio page. And I am still working on creating a safe way to remotely access my NAS, so I can use it as a self hosted cloud environment',
    points: [
      'Installing it as LAN file server using a RAID setup and backup strategies',
      'Running and maintaining services like Jellyfin streaming using Docker',
      'Hosting personal projects',
      'Safe remote access setup for cloud usage',
    ],
    span: 'col-span-2 md:col-span-2 md:row-span-2',
    type: 'Labbing',
    cells: 4,
  },
  {
    id: 'ai',
    topic: 'AI engineering',
    short: 'Agentic programming, context management, prompt design & security.',
    text: 'The most exciting shift in development right now. I follow all AI development closely and apply it almost daily. AI will not replace all jobs, but good developers will become incredibly more productive than ever before. I improve my personal Claude setup during every project I work on. However, because AI development moves so quickly it is also a difficult task to stay up to date with every move',
    points: [
      'Staying up to date with every move in AI development',
      'Improving my own Claude Code setup by using it as a marketplace',
      'Learning about efficient context management to get the most value out of the tokens I have',
      'Reading, testing and brainstorming about the security risks of AI in software.',
      'Creating specific specialised agents for different workflows'
    ],
    span: 'col-span-2 md:col-span-2',
    type: 'AI',
    cells: 2,
  },
  {
    id: 'side-projects',
    topic: 'Side projects',
    short: 'Learning through side projects',
    text: 'While working and studying I often get fresh ideas, but during these activities I won\'t have much time to actually work on them. So, after work and study I often like to experiment with different tools, frameworks and concepts in my own time. This allows me to still expand my general IT knowledge beyond what I use during work hours.',
    points: [
      'Learning new programming languages the old fashioned way by creating fun projects (no AI)',
      'Creating CLI tools for personal usage',
      'Developing a progress tracker for one of my favorite games',
      'Writing scripts to clean up old duplicate files from old hard drives from my girlfriends parents',
      'Creating an image to ascii art generator'
    ],
    span: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2',
    type: 'Programming',
    cells: 2,
  },
  {
    id: 'leetcode',
    topic: 'LeetCode',
    short: 'Solving short coding challenges',
    text: 'Whenever I am not working on any of my side projects, I will often try to solve a LeetCode challenge. Doing LeetCode questions has become less of an interest to me due to AI\'s capability to solve them all by just copy pasting the question into a prompt. I do still think knowing some things about data structures and algorithms is a good thing, so you can validate the AI\'s response and perform in a technical interview.',
    points: [
      'Data structures and algorithms practice',
    ],
    span: 'col-span-1 row-span-2 md:col-span-1 md:row-span-2',
    type: 'Practice',
    cells: 2,
  },
  {
    id: 'hbo',
    topic: 'HBO software architecture',
    short: 'Software architecture next to full-time work.',
    text: 'I was already interested in software architecture and I was following content from creators like Fireship, ByteByteGo and ThePrimeagen in order to learn more about patterns, tool usage and industry standards. When the usage of AI in development grew, and I gained more knowledge about software architecture, I saw that knowing architectural fundamentals and including these fundamentals in prompts improved my AI results drastically. That is when I decided to actually follow a HBO program to learn everything about software architecture',
    points: [
      'System design and architecture patterns',
      'Finding ways to optimise processes',
      'Applying coursework directly at home and work',
      'Looking deeper into retry strategies, error handling and event driven processes',
    ],
    span: 'col-span-2 md:col-span-2',
    type: 'Study',
    cells: 2,
  },
]

function tileImage(item: BentoItem): string {
  return typeImages[item.type] ?? infoImage
}

const openItem = ref<BentoItem | null>(null)
const expanded = ref(false)
const startRect = ref({ top: 0, left: 0, width: 0, height: 0 })
const gridSize = ref({ width: 0, height: 0 })
const imageAspect = ref(1)
const grid = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)

const tileEls = new Map<string, HTMLElement>()
function setTileRef(el: unknown, id: string) {
  if (el instanceof HTMLElement) tileEls.set(id, el)
}

let closeTimer: number | null = null

function measureGrid() {
  if (!grid.value) return
  gridSize.value = { width: grid.value.clientWidth, height: grid.value.clientHeight }
}

function measureTile(id: string) {
  const el = tileEls.get(id)
  if (!el) return false
  startRect.value = {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight,
  }
  measureGrid()
  const img = el.querySelector('img')
  if (img?.naturalWidth && img.naturalHeight) imageAspect.value = img.naturalWidth / img.naturalHeight
  return true
}

async function open(item: BentoItem) {
  if (openItem.value || !measureTile(item.id)) return
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  openItem.value = item
  expanded.value = false
  await nextTick()
  // Double rAF so the overlay paints at the tile rect before transitioning
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      expanded.value = true
      closeBtn.value?.focus({ preventScroll: true })
    })
  })
}

function close() {
  if (!openItem.value || !expanded.value) return
  // Re-measure in case the layout shifted (e.g. window resize) while open
  measureTile(openItem.value.id)
  expanded.value = false
  closeTimer = window.setTimeout(() => {
    openItem.value = null
    closeTimer = null
  }, 480)
}

const overlayStyle = computed(() =>
  expanded.value
    ? { top: '0px', left: '0px', width: '100%', height: '100%' }
    : {
        top: `${startRect.value.top}px`,
        left: `${startRect.value.left}px`,
        width: `${startRect.value.width}px`,
        height: `${startRect.value.height}px`,
      },
)

const overlayImage = computed(() =>
  openItem.value ? (typeImages[openItem.value.type] ?? infoImage) : null,
)

// The overlay content keeps the final (full grid) size while the box animates,
// so text never reflows mid-transition. Sizes exclude the overlay's 1px border.
const contentStyle = computed(() => ({
  width: `${gridSize.value.width - 2}px`,
  height: `${gridSize.value.height - 2}px`,
}))

// Pinned to the content's right edge instead of the overlay's, so it doesn't slide
const CLOSE_SIZE = 36
const CLOSE_INSET = 16
const closeBtnStyle = computed(() => ({
  left: `${gridSize.value.width - 2 - CLOSE_INSET - CLOSE_SIZE}px`,
}))

const ICON_SIZE = 80
const ICON_INSET = 24

// Expanded: small icon bottom-right. Collapsed: transformed onto the tile image
// rect (inset 10%, object-contain) so the hand-off is seamless. Only transform
// and opacity animate, which stay on the compositor.
const overlayImageStyle = computed(() => {
  const left = gridSize.value.width - 2 - ICON_INSET - ICON_SIZE
  const top = gridSize.value.height - 2 - ICON_INSET - ICON_SIZE
  const box = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
  }
  if (expanded.value) return { ...box, transform: 'none', opacity: '0.25' }

  const tileWidth = startRect.value.width - 2
  const tileHeight = startRect.value.height - 2
  const fit = (w: number, h: number) => Math.min(w / imageAspect.value, h)
  const scale = fit(tileWidth * 0.8, tileHeight * 0.8) / fit(ICON_SIZE, ICON_SIZE)
  const dx = tileWidth / 2 - (left + ICON_SIZE / 2)
  const dy = tileHeight / 2 - (top + ICON_SIZE / 2)
  return { ...box, transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: '0.1' }
})

let resizeObserver: ResizeObserver | null = null

function onWindowScroll() {
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('scroll', onWindowScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  // Keep the open overlay's content sized to the grid on window resize
  resizeObserver = new ResizeObserver(() => {
    if (openItem.value) measureGrid()
  })
  if (grid.value) resizeObserver.observe(grid.value)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
  document.removeEventListener('keydown', onKeydown)
  resizeObserver?.disconnect()
  if (closeTimer) clearTimeout(closeTimer)
})
</script>

<template>
  <SectionShell
    section-id="now"
    index="03"
    title="Currently Exploring"
    subtitle="What has my attention at the moment. Click a tile for the story."
  >
    <div
      ref="grid"
      v-reveal.group
      class="bento-grid relative grid grid-cols-2 gap-4 md:h-[34rem] md:grid-cols-4 md:grid-rows-3"
    >
      <button
        v-for="(item, i) in items"
        :key="item.id"
        :ref="(el) => setTileRef(el, item.id)"
        class="reveal-item relative flex flex-col justify-between gap-3 overflow-hidden rounded-xl border border-line bg-card p-5 text-left transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 md:p-6"
        :class="item.span"
        :style="{ '--reveal-i': i }"
        :aria-expanded="openItem?.id === item.id"
        @click="open(item)"
      >
        <img
          v-if="tileImage(item)"
          :src="tileImage(item)!"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute top-[10%] left-[10%] h-[80%] w-[80%] object-contain opacity-10"
          :class="{ 'opacity-0': openItem?.id === item.id }"
        />
        <h3 class="relative font-display text-lg font-semibold text-accent md:text-xl">{{ item.topic }}</h3>
        <p class="relative w-full truncate text-sm text-muted">{{ item.short }}</p>
      </button>

      <!-- Expanding overlay -->
      <div
        v-if="openItem"
        class="bento-overlay absolute z-10 cursor-pointer overflow-hidden rounded-xl border border-accent/40 bg-card shadow-2xl shadow-black/40"
        :style="overlayStyle"
        @click="close"
      >
        <img
          v-if="overlayImage"
          :src="overlayImage"
          alt=""
          aria-hidden="true"
          class="bento-overlay-img pointer-events-none absolute object-contain"
          :style="overlayImageStyle"
        />
        <div
          class="bento-overlay-content flex flex-col overflow-y-auto p-6 transition-opacity duration-300 md:p-8"
          :class="expanded ? 'opacity-100 delay-150' : 'opacity-0'"
          :style="contentStyle"
        >
          <h3 class="pr-12 font-display text-2xl font-semibold text-accent md:text-3xl">
            {{ openItem.topic }}
          </h3>
          <p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">{{ openItem.text }}</p>

          <hr class="my-5 border-line" />

          <ul class="space-y-2">
            <li
              v-for="point in openItem.points"
              :key="point"
              class="flex gap-3 text-base leading-relaxed text-muted"
            >
              <span class="mt-0.5 text-accent">›</span>
              {{ point }}
            </li>
          </ul>

        </div>

        <button
          ref="closeBtn"
          class="absolute top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
          :class="expanded ? 'opacity-100 delay-150' : 'opacity-0'"
          :style="closeBtnStyle"
          aria-label="Close details"
          @click="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </SectionShell>
</template>

<style scoped>
.bento-overlay {
  transition:
    top 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    left 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Fixed-size content: isolate its layout from the animating overlay box */
.bento-overlay-content {
  contain: strict;
}

.bento-overlay-img {
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
