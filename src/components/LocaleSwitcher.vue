<template>
  <button type="button"
    class="inline-flex h-10 shrink-0 cursor-pointer items-center gap-0.5 rounded-full bg-black/5 p-1 leading-none text-black transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
    :aria-label="switchLabel" :title="switchLabel" @click="toggleLocale">
    <span aria-hidden="true" class="inline-flex size-8 items-center justify-center rounded-full text-lg transition-all"
      :class="locale === 'en' ? 'bg-white opacity-100 shadow-sm dark:bg-white/20' : 'opacity-40'">🇬🇧</span>
    <span aria-hidden="true" class="inline-flex size-8 items-center justify-center rounded-full text-lg transition-all"
      :class="locale === 'cs' ? 'bg-white opacity-100 shadow-sm dark:bg-white/20' : 'opacity-40'">🇨🇿</span>
  </button>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n({ useScope: 'global' })
const switchLabel = computed(() =>
  locale.value === 'en' ? t('controls.switchToCzech') : t('controls.switchToEnglish'),
)

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'cs' : 'en'
}

watch(
  locale,
  (value) => {
    document.documentElement.lang = value
  },
  { immediate: true },
)
</script>
