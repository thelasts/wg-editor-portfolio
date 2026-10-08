<template>
  <div class="min-h-72 overflow-hidden bg-black/5 dark:bg-white/5">
    <div
      class="h-[min(70vh,48rem)] overflow-x-hidden overflow-y-auto scroll-smooth"
      :aria-label="`${alt} preview.`"
      tabindex="0"
    >
      <LazyImage
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        class="block h-auto w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/LazyImage.vue'

defineProps<{
  src: string
  alt: string
  width: number
  height: number
}>()
</script>
