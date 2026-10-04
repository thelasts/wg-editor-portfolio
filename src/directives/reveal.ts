import type { Directive } from 'vue'

type RevealKind = 'section' | 'subsection'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

const reveal = (element: HTMLElement) => {
  element.classList.add('is-revealed')
}

const revealDirective: Directive<HTMLElement, RevealKind | undefined> = {
  beforeMount(element, binding) {
    element.classList.add('reveal-on-scroll')
    element.classList.add(`reveal-on-scroll--${binding.value ?? 'subsection'}`)
  },

  mounted(element) {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      reveal(element)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry?.isIntersecting) return

        reveal(element)
        observer.unobserve(element)
        observers.delete(element)
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.01,
      },
    )

    observers.set(element, observer)
    observer.observe(element)
  },

  beforeUnmount(element) {
    observers.get(element)?.disconnect()
    observers.delete(element)
  },
}

export default revealDirective
