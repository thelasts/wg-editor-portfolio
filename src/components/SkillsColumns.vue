<template>
  <UPageColumns as="ul" class="mt-4 gap-4 space-y-4 sm:gap-6 sm:space-y-6">
    <UPageCard v-for="skill in skills" :key="skill.title" as="li" variant="subtle" :icon="skill.icon"
      :title="skill.title" :description="skill.description"
      class="overflow-hidden border border-black/10 bg-white/60 shadow-sm transition-[border-color,box-shadow,transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-highlight hover:shadow-md hover:ring-1 hover:ring-highlight/20 motion-reduce:transform-none dark:border-white/10 dark:bg-black/10 dark:hover:border-highlight"
      :ui="cardUi">
      <template #title>
        <h2 :id="skill.id" class="text-highlighted">{{ skill.title }}</h2>
      </template>
      <USeparator v-if="skill.image" decorative />
      <img v-if="skill.image" :src="skill.image.src" :alt="skill.image.alt"
        class="block h-auto w-full object-cover" loading="lazy" decoding="async" />
    </UPageCard>
  </UPageColumns>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Skill {
  id: string
  title: string
  description: string
  icon: string
  image?: {
    src: string
    alt: string
  }
}

const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const { t } = useI18n()

const skills = computed<Skill[]>(() => [
  {
    id: 'f2p-game-publishing',
    title: 'F2P Game Publishing',
    description: t('skills.f2pGamePublishingDescription'),
    icon: 'i-lucide-gamepad-2',
  },
  {
    id: 'content-skill',
    title: 'Content',
    description: t('skills.contentDescription'),
    icon: 'i-lucide-pen-line',
  },
  {
    id: 'technical-skill',
    title: 'Technical',
    description: t('skills.technicalDescription'),
    icon: 'i-lucide-code-xml',
  },
  {
    id: 'communication-teamwork',
    title: 'Communication & Teamwork',
    description: t('skills.communicationTeamworkDescription'),
    icon: 'i-lucide-messages-square',
  },
  {
    id: 'international-workplace',
    title: 'International Workplace',
    description: t('skills.internationalWorkplaceDescription'),
    icon: 'i-lucide-globe-2',
    image: {
      src: publicAssetUrl('wgboost.webp'),
      alt: 'Three attendees posing in front of a Wargaming and WG Boost event backdrop.',
    },
  },
])

const cardUi = {
  container: 'gap-0 p-0 sm:p-0',
  wrapper: 'p-5 sm:p-6',
  leading: 'mb-4 rounded-lg bg-highlight/10 p-2.5 text-highlight',
  leadingIcon: 'size-7 text-highlight',
  title: 'text-lg text-highlighted',
  description: 'mt-2 text-base/7 text-toned',
}
</script>
