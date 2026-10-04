<template>
  <section :id="id" :aria-labelledby="titleId" class="mx-auto max-w-6xl scroll-mt-36 px-4 py-4 sm:px-6 sm:py-6">
    <UCard variant="outline"
      class="flex flex-col overflow-hidden border-black/10 bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition-colors duration-300 dark:border-white/10 dark:bg-eerie-black/80 dark:ring-white/5"
      :ui="cardUi">
      <template #header>
        <HeadingAnchor as="h1" :id="titleId">{{ title }}</HeadingAnchor>
      </template>

      <slot />
    </UCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  title: string
}>()

const titleId = computed(() => `${props.id}-title`)

const cardUi = {
  header: 'border-b border-black/10 px-5 py-4 sm:px-8 sm:py-6 dark:border-white/10',
  body: 'flex-1 px-5 py-5 sm:px-8 sm:py-8',
}
</script>
