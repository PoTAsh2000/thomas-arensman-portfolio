import type { Directive } from 'vue'

/**
 * v-reveal, fades/slides an element in the first time it scrolls into view.
 * Optional value sets a transition delay in ms for staggered groups:
 *   <div v-reveal>…</div>
 *   <div v-reveal="150">…</div>
 */
type RevealValue = number | undefined

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('revealed')
            observer!.unobserve(el)
            // Release the will-change compositor layer once the one-shot
            // transition (0.7s + optional stagger delay) has played out.
            setTimeout(() => {
              el.style.willChange = 'auto'
            }, 1000)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    )
  }
  return observer
}

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) {
      el.style.transitionDelay = `${binding.value}ms`
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
