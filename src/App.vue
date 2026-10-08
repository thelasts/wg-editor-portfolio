<template>
  <UApp :locale="uiLocale">
    <Header />
    <div class="main-bg relative isolate overflow-clip">
      <VehiclePattern />
      <UPageCard as="main" variant="naked" class="relative z-10 pb-24 md:pb-0" :ui="mainCardUi">
        <OverviewSection />
        <ContentSection />
        <ToolsSection />
        <SkillsSection />
      </UPageCard>
    </div>
    <Footer />
  </UApp>
</template>

<script setup lang="ts">
import { cs, en } from '@nuxt/ui/locale'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import ContentSection from '@/components/sections/ContentSection.vue'
import OverviewSection from '@/components/sections/OverviewSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ToolsSection from '@/components/sections/ToolsSection.vue'
import VehiclePattern from '@/components/VehiclePattern.vue'

const { locale } = useI18n()
const uiLocale = computed(() => (locale.value === 'cs' ? cs : en))

const mainCardUi = {
  root: 'block rounded-none',
  container: 'block gap-0 p-0 sm:p-0 lg:block',
}
</script>
