<template>
    <UCard v-reveal="'subsection'" :id="id" variant="subtle" :title="title" :description="description"
        class="content-card my-4 scroll-mt-36 border border-black/10 bg-white/60 shadow-sm ring-0 ring-primary/0 transition-[border-color,box-shadow] duration-300 ease-in-out hover:border-primary hover:ring-2 hover:ring-primary/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 dark:border-white/10 dark:bg-black/10 dark:hover:border-primary dark:focus-within:border-primary"
        :class="{ 'content-card--has-header-image': headerImage }" :style="cardStyle" :ui="cardUi">
        <template #title>
            <HeadingAnchor as="h3" :id="headingId">{{ title }}</HeadingAnchor>
        </template>
        <template v-if="description || links.length" #description>
            <div class=" text-base technical-label select-none flex flex-wrap items-center gap-x-1 gap-y-1">
                <span v-if="description" class="text-muted">{{ description }}</span>
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
import type { CSSProperties } from 'vue'
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
        headerImage?: string
    }>(),
    {
        id: undefined,
        description: undefined,
        links: () => [],
        headerImage: undefined,
    },
)

const slots = useSlots()
const headingId = computed(() => props.anchorId)
const cardStyle = computed<CSSProperties | undefined>(() =>
    props.headerImage
        ? { '--content-card-header-image': `url("${props.headerImage}")` }
        : undefined,
)

const cardUi = computed(() => ({
    header: 'content-card-header px-5 py-4 sm:px-6 main-bg',
    title: 'content-card-title text-lg',
    description: 'mt-1 text-sm text-toned',
    body: slots.default ? 'px-5 py-4 sm:px-6' : 'hidden',
}))
</script>
