<template>
    <UCard :id="id" variant="subtle" :title="title" :description="description"
        class="my-4 scroll-mt-36 border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-black/10"
        :ui="cardUi">
        <template #title>
            <HeadingAnchor as="h3" :id="headingId">{{ title }}</HeadingAnchor>
        </template>
        <template v-if="links.length" #description>
            <div class="technical-label flex flex-wrap items-center gap-x-1 gap-y-1">
                <span v-if="description">{{ description }}</span>
                <template v-for="(link, index) in links" :key="link.to">
                    <a :href="link.to" target="_blank" rel="noopener noreferrer" class="link">
                        {{ link.label }}
                        <UIcon name="i-lucide-external-link" class="size-3.5" aria-hidden="true" />
                    </a>
                    <span v-if="index < links.length - 1" class="text-muted select-none" aria-hidden="true">
                        |
                    </span>
                </template>
            </div>
        </template>

        <slot />
    </UCard>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface ContentCardLink {
    label: string
    to: string
}

const props = withDefaults(
    defineProps<{
        id?: string
        title: string
        description?: string
        links?: ContentCardLink[]
        anchorId: string
    }>(),
    {
        id: undefined,
        description: undefined,
        links: () => [],
    },
)

const slots = useSlots()
const headingId = computed(() => props.anchorId)

const cardUi = computed(() => ({
    header: 'px-5 py-4 sm:px-6',
    title: 'content-card-title',
    description: 'mt-1 text-sm text-toned',
    body: slots.default ? 'px-5 py-4 sm:px-6' : 'hidden',
}))
</script>
