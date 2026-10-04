<template>
  <span class="relative block max-h-[32rem] max-w-full overflow-hidden">
    <LazyImage
      :src="thumbnailSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="block max-h-[32rem] max-w-full object-contain transition-[filter,opacity] duration-300 motion-reduce:transition-none"
      :class="active ? 'opacity-100 blur-none grayscale-0' : 'opacity-35 blur-sm grayscale'"
    />

    <video
      v-if="active"
      ref="video"
      :width="width"
      :height="height"
      class="absolute inset-0 size-full object-contain transition-opacity duration-200 motion-reduce:transition-none"
      :class="isReady ? 'opacity-100' : 'opacity-0'"
      loop
      muted
      playsinline
      preload="auto"
      aria-hidden="true"
      @canplay="startPlayback"
      @error="handleError"
    >
      <source :src="src" type="video/webm" />
    </video>
  </span>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue'

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
const isReady = ref(false)

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
  () => [props.active, props.src] as const,
  async ([active]) => {
    isReady.value = false
    if (!active) return

    await nextTick()
    video.value?.load()
  },
)
</script>
