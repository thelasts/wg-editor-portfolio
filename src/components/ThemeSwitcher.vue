<template>
  <div
    class="inline-flex select-none items-center gap-2 rounded-full bg-black/5 p-2 text-black dark:bg-white/10 dark:text-white"
    :aria-label="t('controls.theme')">
    <button type="button" :title="t('controls.dark')" :aria-label="t('controls.dark')" :aria-pressed="theme === 'dark'"
      class="size-6 cursor-pointer transition-transform duration-75 ease-linear xl:hover:scale-110"
      @click="theme = 'dark'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" class="fill-current transition-opacity"
        :class="theme === 'dark' ? 'opacity-100' : 'opacity-30'">
        <path
          d="M14.971 8.932A7.14 7.14 0 0 1 .996 6.858 7.08 7.08 0 0 1 2.43 2.564 7.2 7.2 0 0 1 6.063.025a.55.55 0 0 1 .686.686 6.048 6.048 0 0 0 7.54 7.539.55.55 0 0 1 .686.687z" />
      </svg>
    </button>

    <button type="button" :title="t('controls.light')" :aria-label="t('controls.light')"
      :aria-pressed="theme === 'light'"
      class="size-6 cursor-pointer transition-transform duration-75 ease-linear xl:hover:scale-110"
      @click="theme = 'light'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="fill-current transition-opacity"
        :class="theme === 'light' ? 'opacity-100' : 'opacity-30'">
        <path
          d="m7.395.213.345.522a3.06 3.06 0 0 0 3.167 1.312l.614-.126a.473.473 0 0 1 .558.558l-.126.614a3.06 3.06 0 0 0 1.312 3.167l.522.345a.473.473 0 0 1 0 .79l-.522.345a3.06 3.06 0 0 0-1.312 3.167l.126.614a.473.473 0 0 1-.558.558l-.614-.126a3.06 3.06 0 0 0-3.167 1.312l-.345.522a.473.473 0 0 1-.79 0l-.345-.522a3.06 3.06 0 0 0-3.167-1.312l-.614.126a.473.473 0 0 1-.558-.558l.126-.614A3.06 3.06 0 0 0 .735 7.74l-.522-.345a.473.473 0 0 1 0-.79l.522-.345a3.06 3.06 0 0 0 1.312-3.167l-.126-.614a.473.473 0 0 1 .558-.558l.614.126A3.06 3.06 0 0 0 6.26.735l.345-.522a.473.473 0 0 1 .79 0" />
      </svg>
    </button>

  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

type Theme = 'light' | 'dark'

const { t } = useI18n()
const storedTheme = localStorage.getItem('theme')
const theme = ref<Theme>(
  storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark',
)

function applyTheme() {
  const isDark = theme.value === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
}

watch(
  theme,
  (value) => {
    localStorage.setItem('theme', value)
    applyTheme()
  },
  { immediate: true },
)
</script>
