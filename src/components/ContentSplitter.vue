<template>
    <UCollapsible v-model:open="isOpen" :unmount-on-hide="true" class="content-comparison">
        <template #default>
            <UButton type="button" :label="t('controls.openSplitter')" color="neutral" variant="outline"
                icon="i-lucide-arrow-right-left" trailing-icon="i-lucide-chevron-down" block
                class="content-comparison__trigger group" :ui="{
                    label: 'text-left',
                    trailingIcon: [
                        'transition-transform duration-200 ease-out',
                        isOpen ? 'rotate-180' : 'rotate-0',
                    ],
                }" />
        </template>

        <template #content>
            <div class="content-comparison__viewport" :style="viewportStyle">
                <USplitter :id="id" :key="splitterKey" :items="items" orientation="horizontal"
                    class="content-comparison__splitter">
                    <template #before>
                        <MediaLoadingIndicator v-if="!beforeLoaded" />
                        <img :src="beforeSrc" :alt="beforeAlt" :width="beforeWidth" :height="beforeHeight"
                            loading="lazy" fetchpriority="high" decoding="async"
                            class="content-comparison__image content-comparison__image--before transition-opacity duration-300 motion-reduce:transition-none"
                            :class="beforeLoaded ? 'opacity-100' : 'opacity-0'" @load="beforeLoaded = true" />
                    </template>

                    <template #after>
                        <MediaLoadingIndicator v-if="!afterLoaded" />
                        <img :src="afterSrc" :alt="afterAlt" :width="afterWidth" :height="afterHeight" loading="lazy"
                            fetchpriority="high" decoding="async"
                            class="content-comparison__image content-comparison__image--after transition-opacity duration-300 motion-reduce:transition-none"
                            :class="afterLoaded ? 'opacity-100' : 'opacity-0'" @load="afterLoaded = true" />
                    </template>

                    <template #resize-handle>
                        <span class="content-comparison__grip" :title="t('controls.dragSplitter')">
                            <UIcon name="i-lucide-chevrons-left-right" class="size-5" aria-hidden="true" />
                            <span class="sr-only">{{ t('controls.dragSplitter') }}</span>
                        </span>
                    </template>
                </USplitter>
            </div>
        </template>
    </UCollapsible>
</template>

<script setup lang="ts">
import type { SplitterItem } from '@nuxt/ui'
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MediaLoadingIndicator from '@/components/MediaLoadingIndicator.vue'

const props = withDefaults(
    defineProps<{
        id: string
        beforeSrc: string
        afterSrc: string
        beforeAlt?: string
        afterAlt?: string
        beforeWidth: number
        beforeHeight: number
        afterWidth: number
        afterHeight: number
    }>(),
    {
        beforeAlt: 'Page before the update',
        afterAlt: 'Page after the update',
    },
)

const { t } = useI18n()
const isOpen = ref(false)
const splitterKey = ref(0)
const beforeLoaded = ref(false)
const afterLoaded = ref(false)
const viewportStyle = computed(() => ({
    aspectRatio: `${Math.max(props.beforeWidth, props.afterWidth)} / ${Math.max(props.beforeHeight, props.afterHeight)}`,
}))

const panelClass = 'relative items-start overflow-hidden bg-white/60 dark:bg-eerie-black/40'

const items: SplitterItem[] = [
    { slot: 'before', minSize: 3, defaultSize: 50, class: panelClass },
    { slot: 'after', minSize: 3, defaultSize: 50, class: panelClass },
]

watch(isOpen, async (open) => {
    if (!open) return

    await nextTick()
    splitterKey.value += 1
})

watch(
    () => props.beforeSrc,
    () => {
        beforeLoaded.value = false
    },
)

watch(
    () => props.afterSrc,
    () => {
        afterLoaded.value = false
    },
)
</script>

<style scoped>
.content-comparison {
    margin-block: 1rem;
}

.content-comparison__trigger {
    width: 100%;
    justify-content: space-between;
    border-color: color-mix(in srgb, currentColor 14%, transparent);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    background-color: var(--main-bg);
    box-shadow: 0 1px 2px rgb(0 0 0 / 8%);
    transition:
        color 150ms ease,
        border-color 150ms ease,
        background-color 150ms ease,
        box-shadow 150ms ease;
}

.content-comparison__trigger:hover,
.content-comparison__trigger:focus-visible {
    color: var(--ui-primary);
    border-color: color-mix(in srgb, var(--ui-primary) 45%, transparent);
    background-color: var(--main-bg);
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}

.content-comparison__viewport {
    container-type: inline-size;
    position: relative;
    margin-top: 0.75rem;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, currentColor 12%, transparent);
    border-radius: 0.75rem;
    background-color: var(--ui-bg);
}

.content-comparison__splitter {
    position: absolute;
    inset: 0;
}

.content-comparison__splitter :deep([data-slot='handle']) {
    z-index: 10;
    display: flex;
    width: 0.25rem;
    overflow: visible;
    cursor: col-resize;
    align-items: flex-start;
    justify-content: center;
    background-color: var(--ui-text-muted);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--ui-text-muted) 25%, transparent);
    transition:
        background-color 150ms ease,
        width 150ms ease,
        box-shadow 150ms ease;
}

.content-comparison__splitter :deep([data-slot='handle']:hover),
.content-comparison__splitter :deep([data-slot='handle']:focus-visible) {
    width: 0.375rem;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-text-muted) 18%, transparent);
}

.content-comparison__splitter :deep([data-slot='handle'][data-resize-handle-active]) {
    width: 0.375rem;
    background-color: var(--ui-primary);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--ui-primary) 25%, transparent);
}

.content-comparison__grip {
    position: sticky;
    top: 8rem;
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    flex: none;
    place-items: center;
    border: 2px solid var(--ui-text-muted);
    border-radius: 9999px;
    color: var(--ui-text-muted);
    background-color: var(--ui-bg);
    box-shadow: 0 4px 12px rgb(0 0 0 / 24%);
    transition:
        color 150ms ease,
        border-color 150ms ease;
    animation: splitter-hint 900ms ease-in-out 2;
}

.content-comparison__splitter :deep([data-slot='handle'][data-resize-handle-active]) .content-comparison__grip {
    color: var(--ui-primary);
    border-color: var(--ui-primary);
}

@keyframes splitter-hint {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.14);
    }
}

@media (prefers-reduced-motion: reduce) {
    .content-comparison__grip {
        animation: none;
    }
}

.content-comparison__image {
    position: absolute;
    top: 0;
    display: block;
    width: 100cqw;
    max-width: none;
    height: auto;
}

.content-comparison__image--before {
    left: 0;
}

.content-comparison__image--after {
    right: 0;
}
</style>
