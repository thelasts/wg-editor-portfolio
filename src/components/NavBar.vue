<template>
    <UNavigationMenu :items="items" :orientation="orientation" :collapsed="collapsed" :tooltip="collapsed"
        :popover="collapsed" color="primary" variant="pill" highlight highlight-color="primary"
        :class="orientation === 'horizontal' ? 'w-full justify-start' : 'w-fit'" :ui="{
            link: `${collapsed ? 'p-2 ' : ''}hover:text-default hover:before:bg-transparent hover:before:outline-0 data-[state=open]:text-default data-[state=open]:before:bg-transparent data-[state=open]:before:outline-0 focus-visible:text-highlight focus-visible:before:outline-0`,
            linkLabel: collapsed ? 'sr-only' : 'whitespace-nowrap font-semibold',
            linkLeadingIcon: collapsed
                ? 'size-7 text-muted group-hover:text-default group-focus-visible:text-highlight group-data-[active]:text-highlight'
                : 'text-muted group-hover:text-default group-data-[state=open]:text-default group-focus-visible:text-highlight group-data-[active]:text-highlight',
            viewportWrapper: orientation === 'horizontal' ? 'justify-start' : undefined,
            viewport: orientation === 'horizontal'
                ? 'bg-white/95 ring-black/10 dark:bg-eerie-black/95 dark:ring-white/10'
                : undefined,
            childLink: orientation === 'horizontal'
                ? 'hover:before:bg-black/5 focus-visible:before:bg-highlight/10 focus-visible:before:outline-highlight/30 dark:hover:before:bg-white/10'
                : undefined,
            childLinkIcon: orientation === 'horizontal' ? 'dark:text-toned' : undefined,
            childLinkLabel: orientation === 'horizontal' ? 'dark:text-toned whitespace-normal' : undefined,

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
