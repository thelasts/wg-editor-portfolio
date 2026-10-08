<template>
  <div ref="container" class="newsletter-preview relative min-h-72 overflow-hidden bg-black/5 dark:bg-white/5">
    <div ref="viewport" class="h-[min(70vh,48rem)] overflow-x-hidden overflow-y-auto scroll-smooth"
      :aria-label="`${alt} preview.`" tabindex="0">
      <LazyImage :src="src" :alt="alt" :width="width" :height="height" class="block h-auto w-full"
        @load="maybeShowScrollHint" />
    </div>

    <Transition name="scroll-hint">
      <span v-if="showScrollHint" class="newsletter-preview__scroll-hint"
        :class="{ 'newsletter-preview__scroll-hint--dimmed': isScrollHintDimmed }">
        <UTooltip :text="t('controls.scrollNewsletter')" :content="{ side: 'right' }" arrow>
          <UButton class="newsletter-preview__scroll-info cursor-pointer" icon="i-lucide-info" color="neutral"
            variant="ghost" size="xl" :aria-label="t('controls.scrollNewsletter')" />
        </UTooltip>
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
  }, 900)
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
  top: 1rem;
  left: 1rem;
  transition: opacity 150ms ease;
}

.newsletter-preview__scroll-info {
  color: var(--ui-text-muted);
  background-color: transparent !important;
  box-shadow: none !important;
  transition: color 150ms ease;
}

.newsletter-preview__scroll-info:hover,
.newsletter-preview__scroll-info:focus-visible {
  color: var(--ui-text-highlighted);
  background-color: transparent !important;
}

.newsletter-preview__scroll-hint--dimmed {
  opacity: 0.5;
}

.newsletter-preview__scroll-hint--dimmed:hover,
.newsletter-preview__scroll-hint--dimmed:focus-within {
  opacity: 1;
}

.scroll-hint-enter-from,
.scroll-hint-leave-to {
  opacity: 0;
}
</style>
