<template>
  <UPageColumns v-auto-animate as="ul" class="mt-4 gap-4 space-y-4 sm:gap-6 sm:space-y-6">
    <UPageCard
      v-for="skill in skills"
      :key="skill.title"
      as="li"
      variant="subtle"
      :icon="skill.icon"
      :title="skill.title"
      :description="skill.description"
      class="overflow-hidden border border-black/10 bg-white/60 shadow-sm transition-[border-color,box-shadow,transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-highlight hover:shadow-md hover:ring-1 hover:ring-highlight/20 motion-reduce:transform-none dark:border-white/10 dark:bg-black/10 dark:hover:border-highlight"
      :ui="cardUi"
    >
      <template #title>
        <h2 :id="skill.id" class="text-highlighted">{{ skill.title }}</h2>
      </template>
      <USeparator v-if="skill.image" decorative />
      <img
        v-if="skill.image"
        :src="skill.image.src"
        :alt="skill.image.alt"
        class="block h-auto w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </UPageCard>
  </UPageColumns>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/stores/store'

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

const { t } = useI18n()
const { skills: skillData } = useStore()

const skills = computed<Skill[]>(() =>
  skillData.map((skill) => ({
    ...skill,
    description: t(skill.descriptionKey),
  })),
)

const cardUi = {
  container: 'gap-0 p-0 sm:p-0',
  wrapper: 'p-5 sm:p-6',
  leading: 'mb-4 rounded-lg bg-highlight/10 p-2.5 text-highlight',
  leadingIcon: 'size-7 text-highlight',
  title: 'text-lg text-highlighted',
  description: 'mt-2 text-base/7 text-toned',
}
</script>
