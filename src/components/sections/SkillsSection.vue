<template>
  <SectionCard id="skills" :title="t('nav.skills')">
    <SkillsColumns />
  </SectionCard>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionCard from '@/components/SectionCard.vue'
import SkillsColumns from '@/components/SkillsColumns.vue'

const { t } = useI18n()
</script>
