<template>
  <span class="ascii-art" role="img" :aria-label="accessibleLabel">
    <pre aria-hidden="true">{{ output }}</pre>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import typewriter, { meta, type TypewriterOptions } from '@/typewriter'

const props = withDefaults(
  defineProps<{
    piece?: 'typewriter'
    options?: Partial<TypewriterOptions> | string
    label?: string
  }>(),
  {
    piece: 'typewriter',
    options: () => ({}),
    label: undefined,
  },
)

const output = ref('')
const parsedOptions = computed<Partial<TypewriterOptions>>(() => {
  if (typeof props.options !== 'string') return props.options

  try {
    return JSON.parse(props.options) as Partial<TypewriterOptions>
  } catch {
    return {}
  }
})
const frame = computed(() => typewriter(parsedOptions.value))
const accessibleLabel = computed(() => {
  if (props.label) return props.label

  const prefix = parsedOptions.value.prefix ?? meta.options.prefix
  const phrases = parsedOptions.value.phrases ?? meta.options.phrases
  return `${prefix}${phrases.join(', ')}`
})

let animationFrame: number | undefined
let startedAt = 0
let lastFrame = -1
let reducedMotion: MediaQueryList | undefined

function render(timestamp: number) {
  const elapsed = (timestamp - startedAt) / 1_000
  const currentFrame = Math.floor(elapsed * meta.fps)

  if (currentFrame !== lastFrame) {
    output.value = frame.value(elapsed)
    lastFrame = currentFrame
  }

  animationFrame = window.requestAnimationFrame(render)
}

function start() {
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)

  startedAt = performance.now()
  lastFrame = -1

  if (reducedMotion?.matches) {
    output.value = frame.value(0)
    animationFrame = undefined
    return
  }

  animationFrame = window.requestAnimationFrame(render)
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.addEventListener('change', start)
  start()
})

watch(() => props.options, start, { deep: true })

onBeforeUnmount(() => {
  reducedMotion?.removeEventListener('change', start)
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.ascii-art {
  display: block;
  max-width: min(44ch, calc(100vw - 8rem));
  overflow: hidden;
  color: inherit;
  font-size: clamp(0.875rem, 1.75vw, 1.25rem);
  font-weight: 600;
  text-align: left;
}

pre {
  width: 44ch;
  margin: 0;
  overflow: hidden;
  font: inherit;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-weight: inherit;
  line-height: 1;
  text-align: left;
  white-space: pre;
}
</style>
