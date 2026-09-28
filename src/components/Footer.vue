<template>
  <UFooter id="site-footer"
    class="border-t border-black/10 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-eerie-black"
    :ui="footerUi">
    <template #left>
      <p class="text-muted text-sm select-none">
        All work displayed here was created during internship with World of Tanks Content Team using publicly released
        materials. It is presented solely for portfolio purposes. All associated rights remain with Wargaming and their
        respective owners.
      </p>
      <p class="text-muted text-sm select-none">Made by A. {{ new
        Date().getFullYear() }}</p>
    </template>

    <template #right>
      <UButton class="footer-icon-button" icon="i-lucide-mail" color="neutral" variant="ghost" size="xl" square
        to="mailto:khomambe@gmail.com?subject=portfolio" aria-label="Email" :ui="iconUi" />
      <UButton class="footer-icon-button" icon="i-lucide-github" color="neutral" variant="ghost" size="xl" square
        to="https://github.com/thelasts/wg-editor-portfolio" target="_blank" rel="noopener noreferrer"
        aria-label="GitHub" :ui="iconUi" />
      <UButton class="footer-icon-button" icon="i-lucide-linkedin" color="neutral" variant="ghost" size="xl" square
        to="https://www.linkedin.com/in/aleksandr-khomutov/" target="_blank" rel="noopener noreferrer"
        aria-label="LinkedIn" :ui="iconUi" />
      <span class="text-muted text-lg align-[8px] select-none"> | </span>
      <UButton class="footer-icon-button" color="neutral" variant="ghost" size="xl" square to="https://wargaming.net/"
        target="_blank" rel="noopener noreferrer" aria-label="Wargaming.net">
        <span class="footer-brand-icon footer-brand-icon--wargaming" aria-hidden="true" />
      </UButton>
      <UButton class="footer-icon-button" color="neutral" variant="ghost" size="xl" square to="https://worldoftanks.eu/"
        target="_blank" rel="noopener noreferrer" aria-label="World of Tanks">
        <span class="footer-brand-icon footer-brand-icon--tanks" aria-hidden="true" />
      </UButton>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
defineOptions({ name: 'SiteFooter' })

const footerUi = {
  container: 'max-w-6xl px-6 pt-6 pb-24 md:py-6',
  left: 'mt-0',
  right: 'gap-1',
}

const iconUi = {
  leadingIcon: 'size-7',
}
</script>

<style scoped>
.footer-icon-button {
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

.footer-icon-button:hover,
.footer-icon-button:focus-visible {
  color: var(--ui-primary);
  background-color: transparent !important;
}

.footer-brand-icon {
  width: 1.75rem;
  height: 1.75rem;
  background-color: currentColor;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
}

.footer-brand-icon--tanks {
  mask-image: url('/tanks.svg');
}

.footer-brand-icon--wargaming {
  mask-image: url('/wg.svg');
}
</style>
