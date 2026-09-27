<template>
  <UHeader :title="t('site.title')" :toggle="false" :ui="headerUi"
    class="text-2xl sticky top-0 z-50 h-auto w-full border-x-0 border-t-0 border-b border-black/10 bg-white/90 text-eerie-black shadow-sm backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-eerie-black/95 dark:text-white">
    <template #left>
      <a class="flex shrink-0 items-center gap-2 font-semibold tracking-tight" href="#home">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
          class="shrink-0">
          <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
          <path d="m8 6 2-2" />
          <path d="m18 16 2-2" />
          <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
          <path
            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
        {{ t('site.title') }}
      </a>
    </template>

    <template #right>
      <LocaleSwitcher />
      <ThemeSwitcher />
    </template>

    <template #bottom>
      <UProgress :model-value="pageProgress" :max="100" color="#f25322" size="xs"
        :aria-label="t('controls.pageProgress')" :ui="{ base: 'rounded-none bg-black/10 dark:bg-white/10' }" />
    </template>
  </UHeader>

  <div
    class="sticky top-16 z-40 hidden border-b border-black/5 bg-white/80 backdrop-blur-xl md:block dark:border-white/5 dark:bg-eerie-black/80">
    <div class="mx-auto flex max-w-6xl justify-start px-6 py-2">
      <NavBar :items="navigationItems" orientation="horizontal" />
    </div>
  </div>

  <nav
    class="fixed top-20 right-3 z-40 rounded-xl border border-black/10 bg-white/90 p-1 shadow-sm backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-eerie-black/90"
    :aria-label="t('site.title')">
    <NavBar :items="navigationItems[0]" orientation="vertical" collapsed />
  </nav>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import NavBar from '@/components/NavBar.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { sectionDefinitions, type SectionId } from '@/navigation'

defineOptions({ name: 'SiteHeader' })

const { t } = useI18n()

const activeSection = ref<SectionId>('overview')
const navigationItems = ref<NavigationMenuItem[][]>([[]])
const pageProgress = ref(0)
let animationFrame: number | undefined
let sectionObserver: IntersectionObserver | undefined

watchEffect(() => {
  navigationItems.value = [
    sectionDefinitions.map(({ id, label, icon }) => ({
      id,
      label: t(label),
      icon,
      to: `#${id}`,
      active: activeSection.value === id,
      class: activeSection.value === id ? 'section-nav-active text-highlight' : undefined,
    })),
  ]
})

const headerUi = {
  container: 'h-16 max-w-6xl gap-4 px-4 sm:px-6',
  left: 'shrink-0 self-center lg:flex-none',
  center: 'hidden',
  right: 'ml-auto shrink-0 self-center gap-2 lg:flex-none',
}

function updateProgress() {
  animationFrame = undefined
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
  pageProgress.value = Math.min(100, Math.max(0, progress))
}

function scheduleProgressUpdate() {
  if (animationFrame === undefined) animationFrame = window.requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting)
      if (visibleEntry?.target.id) activeSection.value = visibleEntry.target.id as SectionId
    },
    { rootMargin: '-20% 0px -79% 0px' },
  )

  for (const { id } of sectionDefinitions) {
    const element = document.getElementById(id)
    if (element) sectionObserver.observe(element)
  }

  window.addEventListener('scroll', scheduleProgressUpdate, { passive: true })
  window.addEventListener('resize', scheduleProgressUpdate)
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  window.removeEventListener('scroll', scheduleProgressUpdate)
  window.removeEventListener('resize', scheduleProgressUpdate)
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
})
</script>
