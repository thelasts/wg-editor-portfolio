<template>
  <span ref="container" class="relative block max-h-[32rem] max-w-full overflow-hidden">
    <LazyImage
      :src="thumbnailSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="block max-h-[32rem] max-w-full object-contain transition-opacity duration-300 motion-reduce:transition-none"
      :class="active ? 'opacity-100' : 'opacity-35'"
    />

    <video
      v-if="active && isInView"
      ref="video"
      :width="width"
      :height="height"
      class="absolute inset-0 size-full object-contain transition-opacity duration-200 motion-reduce:transition-none"
      :class="isReady ? 'opacity-100' : 'opacity-0'"
      loop
      muted
      playsinline
      preload="metadata"
      aria-hidden="true"
      @canplay="startPlayback"
      @error="handleError"
    >
      <source :src="src" type="video/webm" />
    </video>
  </span>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'

import LazyImage from '@/components/LazyImage.vue'

const props = defineProps<{
  src: string
  thumbnailSrc: string
  alt: string
  width: number
  height: number
  active: boolean
}>()

const video = useTemplateRef('video')
const container = useTemplateRef('container')
const isReady = ref(false)
const isInView = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!container.value || !('IntersectionObserver' in window)) {
    isInView.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry?.isIntersecting ?? false
    },
    { rootMargin: '200px 0px' },
  )
  observer.observe(container.value)
})

onBeforeUnmount(() => observer?.disconnect())

async function startPlayback() {
  if (!video.value || !props.active) return

  try {
    await video.value.play()
    isReady.value = true
  } catch {
    isReady.value = false
  }
}

function handleError() {
  isReady.value = false
}

watch(
  () => [props.active, props.src, isInView.value] as const,
  async ([active, , inView]) => {
    isReady.value = false
    if (!active || !inView) return

    await nextTick()
    video.value?.load()
  },
)
</script>
