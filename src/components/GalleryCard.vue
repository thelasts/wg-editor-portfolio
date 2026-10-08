<template>
  <figure
    :id="id"
    class="my-5"
    :aria-labelledby="`${id}-label`"
    :aria-describedby="description ? `${id}-description` : undefined"
  >
    <span :id="`${id}-label`" class="sr-only">{{ label }}</span>

    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="assets"
      :autoplay="{
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }"
      :aria-label="label"
      :prev="{ color: 'primary', variant: 'outline' }"
      :next="{ color: 'primary', variant: 'outline' }"
      :ui="{
        controls: 'mt-4 flex items-center justify-center gap-3',
        arrows: 'contents',
        prev: 'static order-1 translate-y-0',
        dots: 'static order-2 inset-auto gap-1.5 sm:gap-2',
        dot: 'h-1.5 w-3 rounded-full bg-black/20 data-[state=active]:w-6 data-[state=active]:bg-highlight dark:bg-white/25 dark:data-[state=active]:bg-highlight sm:w-5 sm:data-[state=active]:w-8',
        next: 'static order-3 translate-y-0',
      }"
      class="mx-auto w-full max-w-5xl"
      fade
      arrows
      dots
      loop
      @click.capture="resetAutoplayOnControl"
    >
      <div
        v-auto-animate
        class="relative w-full overflow-hidden rounded-lg border border-black/10 bg-black/5 shadow-sm dark:border-white/10 dark:bg-white/5"
        :style="{ aspectRatio: `${width} / ${height}` }"
      >
        <MediaLoadingIndicator v-if="!loadedAssets.has(item.src)" />

        <LazyImage
          :src="item.src"
          :alt="item.alt"
          :width="width"
          :height="height"
          :eager="index === 0"
          root-margin="300px 200%"
          class="block h-full w-full cursor-pointer object-cover transition-opacity duration-300 motion-reduce:transition-none"
          :class="loadedAssets.has(item.src) ? 'opacity-100' : 'opacity-0'"
          @load="markAssetLoaded(item.src)"
          @click="emit('itemClick', item, index)"
        />

        <button
          type="button"
          class="gallery-card__edge-control gallery-card__edge-control--previous"
          :aria-label="`${label}: previous slide`"
          @click.stop="moveSlide('previous')"
        />
        <button
          type="button"
          class="gallery-card__edge-control gallery-card__edge-control--next"
          :aria-label="`${label}: next slide`"
          @click.stop="moveSlide('next')"
        />
      </div>
    </UCarousel>

    <figcaption
      v-if="description"
      :id="`${id}-description`"
      class="mt-3 text-center text-sm text-muted"
    >
      {{ description }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import LazyImage from '@/components/LazyImage.vue'
import MediaLoadingIndicator from '@/components/MediaLoadingIndicator.vue'
import { preloadImage } from '@/utils/preloadImage'

export interface GalleryAsset {
  src: string
  alt: string
}

const props = withDefaults(
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
let preloadTimer: ReturnType<typeof setTimeout> | undefined

async function preloadAsset(asset: GalleryAsset, priority: 'high' | 'low') {
  try {
    await preloadImage(asset.src, priority)
    markAssetLoaded(asset.src)
  } catch {
    // LazyImage will retry when the slide approaches the viewport.
  }
}

onMounted(() => {
  const [firstAsset, ...remainingAssets] = props.assets
  if (firstAsset) void preloadAsset(firstAsset, 'high')

  preloadTimer = window.setTimeout(() => {
    for (const asset of remainingAssets) void preloadAsset(asset, 'low')
  }, 250)
})

onBeforeUnmount(() => window.clearTimeout(preloadTimer))

function markAssetLoaded(src: string) {
  loadedAssets.value = new Set(loadedAssets.value).add(src)
}

function resetAutoplayOnControl(event: MouseEvent) {
  const target = event.target as HTMLElement
  const isControl = target.closest('[data-slot="prev"], [data-slot="next"], [data-slot="dot"]')

  if (isControl) carousel.value?.emblaApi?.plugins().autoplay?.reset()
}

function moveSlide(direction: 'previous' | 'next') {
  const api = carousel.value?.emblaApi
  if (!api) return

  if (direction === 'previous') api.scrollPrev()
  else api.scrollNext()

  api.plugins().autoplay?.reset()
}
</script>

<style scoped>
.gallery-card__edge-control {
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  width: 49%;
  cursor: pointer;
  border: 0;
  background: transparent;
}

.gallery-card__edge-control--previous {
  left: 0;
}

.gallery-card__edge-control--next {
  right: 0;
}

.gallery-card__edge-control:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: -3px;
}
</style>
