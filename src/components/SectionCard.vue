<template>
  <section
    :id="id"
    :aria-labelledby="titleId"
    class="mx-auto min-h-screen max-w-6xl scroll-mt-36 px-4 py-4 sm:px-6 sm:py-6"
  >
    <UCard
      variant="outline"
      class="flex min-h-[calc(100vh-3rem)] flex-col overflow-hidden border-black/10 bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition-colors duration-300 dark:border-white/10 dark:bg-eerie-black/80 dark:ring-white/5"
      :ui="cardUi"
    >
      <template #header>
        <h1 :id="titleId">{{ title }}</h1>
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
