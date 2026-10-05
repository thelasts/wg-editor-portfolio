<template>
  <figure :id="id" class="my-5" :aria-labelledby="`${id}-label`"
    :aria-describedby="description ? `${id}-description` : undefined">
    <span :id="`${id}-label`" class="sr-only">{{ label }}</span>

    <UCarousel ref="carousel" v-slot="{ item, index }" :items="assets" :autoplay="{
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }" :aria-label="label" :prev="{ color: 'primary', variant: 'outline' }"
      :next="{ color: 'primary', variant: 'outline' }" :ui="{
        controls: 'mt-4 flex items-center justify-center gap-3',
        arrows: 'contents',
        prev: 'static order-1 translate-y-0',
        dots: 'static order-2 inset-auto gap-1.5 sm:gap-2',
        dot: 'h-1.5 w-3 rounded-full bg-black/20 data-[state=active]:w-6 data-[state=active]:bg-highlight dark:bg-white/25 dark:data-[state=active]:bg-highlight sm:w-5 sm:data-[state=active]:w-8',
        next: 'static order-3 translate-y-0',
      }" class="mx-auto w-full max-w-5xl" fade arrows dots loop @click.capture="resetAutoplayOnControl">
      <div class="relative w-full overflow-hidden rounded-lg border border-black/10 bg-black/5 shadow-sm dark:border-white/10 dark:bg-white/5"
        :style="{ aspectRatio: `${width} / ${height}` }">
        <span v-if="!loadedAssets.has(item.src)"
          class="pointer-events-none absolute inset-0 z-10 grid place-items-center" aria-hidden="true">
          <span
            class="grid size-12 place-items-center rounded-full border border-black/10 bg-white/85 text-highlight shadow-md backdrop-blur-sm dark:border-white/10 dark:bg-eerie-black/85">
            <UIcon name="i-lucide-loader-circle" class="size-7 animate-spin motion-reduce:animate-none" />
          </span>
        </span>

        <LazyImage :src="item.src" :alt="item.alt" :width="width" :height="height" root-margin="300px 100%"
          class="block h-full w-full cursor-pointer object-cover transition-opacity duration-300 motion-reduce:transition-none"
          :class="loadedAssets.has(item.src) ? 'opacity-100' : 'opacity-0'"
          @load="markAssetLoaded(item.src)" @click="emit('itemClick', item, index)" />
      </div>
    </UCarousel>

    <figcaption v-if="description" :id="`${id}-description`" class="mt-3 text-center text-sm text-muted">
      {{ description }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import LazyImage from '@/components/LazyImage.vue'

export interface GalleryAsset {
  src: string
  alt: string
}

withDefaults(
  defineProps<{
    id: string
    assets: GalleryAsset[]
    label?: string
    description?: string
    autoplayDelay?: number
    width?: number
    height?: number
  }>(),
  {
    label: 'Asset gallery',
    description: undefined,
    autoplayDelay: 8_000,
    width: 1920,
    height: 911,
  },
)

const emit = defineEmits<{
  itemClick: [asset: GalleryAsset, index: number]
}>()

const carousel = useTemplateRef('carousel')
const loadedAssets = ref(new Set<string>())

function markAssetLoaded(src: string) {
  loadedAssets.value = new Set(loadedAssets.value).add(src)
}

function resetAutoplayOnControl(event: MouseEvent) {
  const target = event.target as HTMLElement
  const isControl = target.closest('[data-slot="prev"], [data-slot="next"], [data-slot="dot"]')

  if (isControl) carousel.value?.emblaApi?.plugins().autoplay?.reset()
}
</script>
