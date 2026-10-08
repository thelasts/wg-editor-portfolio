<template>
  <SectionCard id="overview" :title="t('nav.overview')">
    <p>{{ t('intro.text') }}</p>
    <h3>TL;DR</h3>
    <ul class="swords-list my-2 space-y-2">
      <li>Six-month internship with the World of Tanks Content Team</li>
      <li>
        Produced a wide range of game-related content, wrote copy, created layouts in the CMS, and
        collaborated with stakeholders
      </li>
      <li>
        Helped implement article widgets and developed in-house tools to improve publishing
        workflows
      </li>
      <li>
        Enhanced experience in cross-team collaboration, fast-paced production, and delivering
        high-quality content for a major F2P video game
      </li>
    </ul>
    <HeadingAnchor id="contacts">{{ t('nav.contacts') }}</HeadingAnchor>
    <p class="pb-1">{{ t('intro.connect') }}</p>
    <ContactMarquee />
  </SectionCard>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ContactMarquee from '@/components/ContactMarquee.vue'
import HeadingAnchor from '@/components/HeadingAnchor.vue'
import SectionCard from '@/components/SectionCard.vue'

const { t } = useI18n()
</script>
