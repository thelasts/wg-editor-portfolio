<template>
  <UMarquee
    v-auto-animate
    class="main-bg rounded-2xl border border-black/10 px-2 py-2 md:hidden dark:border-white/10"
    pause-on-hover
    :overlay="false"
    aria-label="Contact links"
  >
    <UButton
      v-for="contact in contacts"
      :key="contact.name"
      class="contact-icon-button"
      :icon="contact.icon"
      color="neutral"
      variant="ghost"
      size="xl"
      square
      :to="contact.to"
      :target="contact.external ? '_blank' : undefined"
      :rel="contact.external ? 'noopener noreferrer' : undefined"
      :aria-label="contact.name"
    />
  </UMarquee>

  <div
    v-auto-animate
    class="main-bg hidden items-center justify-center gap-4 rounded-2xl border border-black/10 px-2 py-2 md:flex dark:border-white/10"
    aria-label="Contact links"
  >
    <UButton
      v-for="contact in contacts"
      :key="contact.name"
      class="contact-icon-button"
      :icon="contact.icon"
      color="neutral"
      variant="ghost"
      size="xl"
      square
      :to="contact.to"
      :target="contact.external ? '_blank' : undefined"
      :rel="contact.external ? 'noopener noreferrer' : undefined"
      :aria-label="contact.name"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'

const { contacts } = useStore()
</script>

<style scoped>
.contact-icon-button:hover,
.contact-icon-button:focus-visible {
  color: var(--ui-primary);
  background-color: transparent !important;
}
</style>
