<template>
  <UApp :locale="uiLocale">
    <Header />
    <main class="main-bg">
      <section id="home" class="page-section">
        <h1>{{ t('intro.title') }}</h1>{{ t('intro.text') }}
      </section>
      <section id="overview" class="page-section">
        <h1>{{ t('nav.overview') }}</h1>
      </section>
      <section id="content-showcase" class="page-section">
        <h1>{{ t('nav.contentShowcase') }}</h1>
        <h2>Portal</h2>
        <h3>'Celebrate 16 Years With Special Merch Discounts!'</h3>
        <h3>Weekly Sales Articles</h3>
        <h3>Twitch Drops Guide Update</h3>
        <h3>TikTok Drops Guide</h3>
        <h3>WoT Salute Reinforcements Mission</h3>
        <h3>Steam Articles</h3>
        <h2>Other channels</h2>
        <h3>Promo Screens Gallery</h3>
      </section>
      <section id="tools-developed" class="page-section">
        <h1>{{ t('nav.toolsDeveloped') }}</h1>
        <h2>Asset Manager</h2>
        <h2>Tank Tools</h2>
      </section>
      <section id="contacts" class="page-section">
        <h1>{{ t('nav.contacts') }}</h1>
      </section>
    </main>
    <Footer />
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cs, en } from '@nuxt/ui/locale'
import { useI18n } from 'vue-i18n'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

const { locale, t } = useI18n()
const uiLocale = computed(() => (locale.value === 'cs' ? cs : en))
</script>
