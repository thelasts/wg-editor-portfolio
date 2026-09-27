<template>
    <UNavigationMenu :items="items" :orientation="orientation" :collapsed="collapsed" :tooltip="collapsed"
        :popover="collapsed" color="primary" variant="pill" highlight highlight-color="primary"
        :class="orientation === 'horizontal' ? 'justify-start' : 'w-fit'" :ui="{
            link: collapsed ? 'p-2' : undefined,
            linkLabel: 'whitespace-nowrap font-semibold',
            linkLeadingIcon: collapsed
                ? 'size-10 text-muted group-data-[active]:text-highlight'
                : 'text-muted group-data-[active]:text-highlight',

        }" />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

withDefaults(
    defineProps<{
        items: NavigationMenuItem[] | NavigationMenuItem[][]
        orientation?: 'horizontal' | 'vertical'
        collapsed?: boolean
    }>(),
    {
        orientation: 'horizontal',
        collapsed: false,
    },
)
</script>
