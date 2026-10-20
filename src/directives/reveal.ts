import type { Directive } from 'vue'

/**
 * v-reveal, fades/slides an element in the first time it scrolls into view.
 * Optional value sets a transition delay in ms for staggered groups:
 *   <div v-reveal>…</div>
 *   <div v-reveal="150">…</div>
 * The .group modifier keeps the element itself in place and animates its
 * .reveal-item children in from one shared trigger, staggered by --reveal-i:
 *   <div v-reveal.group><div class="reveal-item" style="--reveal-i: 0">…</div></div>
 */
type RevealValue = number | undefined

let observer: IntersectionObserver | null = null
let prepareObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('revealed')
            observer!.unobserve(el)
            prepareObserver?.unobserve(el)
            // Release the will-change compositor layer once the one-shot
            // transition (0.7s + optional stagger delay) has played out.
            setTimeout(() => {
              el.style.willChange = 'auto'
            }, 1000)
          }
        }
      },
      // Start just before the element scrolls in, so it is already on its way
      // instead of popping in while it should be visible
      { threshold: 0, rootMargin: '0px 0px 48px 0px' },
    )
  }
  return observer
}

// Promote elements to their own compositor layer about one viewport ahead, so
// raster and image decode happen offscreen instead of on the first reveal frame
function getPrepareObserver(): IntersectionObserver {
  if (!prepareObserver) {
    prepareObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            if (!el.classList.contains('revealed')) el.style.willChange = 'opacity, transform'
            prepareObserver!.unobserve(el)
          }
        }
      },
      { rootMargin: '0px 0px 100% 0px' },
    )
  }
  return prepareObserver
}

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, binding) {
    el.classList.add(binding.modifiers.group ? 'reveal-group' : 'reveal')
    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }
    getPrepareObserver().observe(el)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
    prepareObserver?.unobserve(el)
  },
}
