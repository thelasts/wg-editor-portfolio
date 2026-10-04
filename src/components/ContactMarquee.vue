<template>
  <UMarquee
    class="main-bg rounded-2xl border border-black/10 px-2 py-2 dark:border-white/10"
    pause-on-hover
    overlay="false"
    aria-label="Contact links"
  >
    <UButton v-for="contact in contacts" :key="contact.name" class="contact-icon-button" :icon="contact.icon"
      color="neutral" variant="ghost" size="xl" square :to="contact.to"
      :target="contact.external ? '_blank' : undefined" :rel="contact.external ? 'noopener noreferrer' : undefined"
      :aria-label="contact.name" />
  </UMarquee>
</template>

<script setup lang="ts">
const contacts = [
  {
    name: 'Email',
    icon: 'i-lucide-mail',
    to: 'mailto:khomambe@proton.me?subject=portfolio',
    external: false,
  },
  {
    name: 'Telegram',
    icon: 'i-lucide-send',
    to: 'https://t.me/khomambe',
    external: true,
  },
  {
    name: 'WhatsApp',
    icon: 'i-simple-icons-whatsapp',
    to: 'https://wa.me/420774066925',
    external: true,
  },
  {
    name: 'LinkedIn',
    icon: 'i-lucide-linkedin',
    to: 'https://www.linkedin.com/in/aleksandr-khomutov/',
    external: true,
  },
]
</script>

<style scoped>
.contact-icon-button:hover,
.contact-icon-button:focus-visible {
  color: var(--ui-primary);
  background-color: transparent !important;
}
</style>
