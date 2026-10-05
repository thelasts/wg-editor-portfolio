<template>
  <div ref="container" class="newsletter-preview relative min-h-72 overflow-hidden bg-black/5 dark:bg-white/5">
    <div ref="viewport" class="h-[min(70vh,48rem)] overflow-x-hidden overflow-y-auto scroll-smooth"
      :aria-label="`${alt} preview.`" tabindex="0">
      <LazyImage :src="src" :alt="alt" :width="width" :height="height"
        class="block h-auto w-full" @load="maybeShowScrollHint" />
    </div>

    <Transition name="scroll-hint">
      <span v-if="showScrollHint" class="newsletter-preview__scroll-hint"
        :class="{ 'newsletter-preview__scroll-hint--dimmed': isScrollHintDimmed }"
        :title="t('controls.scrollNewsletter')">
        <span class="newsletter-preview__scroll-grip">
          <UIcon name="i-lucide-chevrons-up-down" class="size-5" aria-hidden="true" />
        </span>
        <span class="sr-only">{{ t('controls.scrollNewsletter') }}</span>
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import LazyImage from '@/components/LazyImage.vue'

defineProps<{
  src: string
  alt: string
  width: number
  height: number
}>()

const { t } = useI18n()
const container = useTemplateRef<HTMLElement>('container')
const viewport = useTemplateRef<HTMLElement>('viewport')
const showScrollHint = ref(false)
const isScrollHintDimmed = ref(false)
let isInViewport = false
let hasShownScrollHint = false
let intersectionObserver: IntersectionObserver | undefined
let hintTimer: ReturnType<typeof setTimeout> | undefined

function maybeShowScrollHint() {
  if (!isInViewport || hasShownScrollHint || !viewport.value) return

  const isScrollable = viewport.value.scrollHeight - viewport.value.clientHeight > 2
  if (!isScrollable) return

  hasShownScrollHint = true
  showScrollHint.value = true
  intersectionObserver?.disconnect()
  hintTimer = window.setTimeout(() => {
    isScrollHintDimmed.value = true
  }, 1800)
}

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isInViewport = entry?.isIntersecting ?? false
      maybeShowScrollHint()
    },
    { threshold: 0.25 },
  )
  if (container.value) intersectionObserver.observe(container.value)
})

onBeforeUnmount(() => {
  intersectionObserver?.disconnect()
  window.clearTimeout(hintTimer)
})
</script>

<style scoped>
.newsletter-preview__scroll-hint {
  position: absolute;
  z-index: 10;
  bottom: 1rem;
  left: 50%;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity 150ms ease;
}

.newsletter-preview__scroll-grip {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 2px solid var(--ui-text-muted);
  border-radius: 9999px;
  color: var(--ui-text-muted);
  background-color: var(--ui-bg);
  box-shadow: 0 4px 12px rgb(0 0 0 / 24%);
  animation: newsletter-scroll-hint 900ms ease-in-out 2;
}

.newsletter-preview__scroll-hint--dimmed {
  opacity: 0.5;
}

.scroll-hint-enter-from,
.scroll-hint-leave-to {
  opacity: 0;
}

@keyframes newsletter-scroll-hint {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.14);
  }
}

@media (prefers-reduced-motion: reduce) {
  .newsletter-preview__scroll-grip {
    animation: none;
  }
}
</style>
