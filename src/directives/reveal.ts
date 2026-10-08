import type { Directive } from 'vue'

type RevealKind = 'section' | 'subsection'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()
const completionHandlers = new WeakMap<HTMLElement, EventListener>()
const completionTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>()

const completeReveal = (element: HTMLElement) => {
  const handler = completionHandlers.get(element)
  const timer = completionTimers.get(element)

  if (handler) element.removeEventListener('transitionend', handler)
  if (timer) window.clearTimeout(timer)

  completionHandlers.delete(element)
  completionTimers.delete(element)
  element.classList.add('reveal-complete')
}

const reveal = (element: HTMLElement, animate = true) => {
  element.classList.add('is-revealed')

  if (!animate) {
    completeReveal(element)
    return
  }

  const handler: EventListener = (event) => {
    const transitionEvent = event as TransitionEvent
    if (transitionEvent.target === element && transitionEvent.propertyName === 'transform') {
      completeReveal(element)
    }
  }

  completionHandlers.set(element, handler)
  completionTimers.set(
    element,
    window.setTimeout(() => completeReveal(element), 1_200),
  )
  element.addEventListener('transitionend', handler)
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
      reveal(element, false)
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
    completeReveal(element)
  },
}

export default revealDirective
