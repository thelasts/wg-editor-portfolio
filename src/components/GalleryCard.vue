<template>
  <figure :id="id" class="my-5" :aria-labelledby="`${id}-label`"
    :aria-describedby="description ? `${id}-description` : undefined">
    <span :id="`${id}-label`" class="sr-only">{{ label }}</span>

    <UCarousel v-slot="{ item, index }" :items="assets" :autoplay="{
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
    }" class="mx-auto w-full max-w-5xl" fade arrows dots loop>
      <img :src="item.src" :alt="item.alt" :width="width" :height="height"
        :style="{ aspectRatio: `${width} / ${height}` }"
        class="block w-full cursor-pointer rounded-lg border border-black/10 bg-black/5 object-cover shadow-sm dark:border-white/10 dark:bg-white/5"
        :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" @click="emit('itemClick', item, index)" />
    </UCarousel>

    <figcaption v-if="description" :id="`${id}-description`" class="mt-3 text-center text-sm text-muted">
      {{ description }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
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
</script>
