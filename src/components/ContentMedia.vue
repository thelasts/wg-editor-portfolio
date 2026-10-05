<template>
    <UContainer :id="id" as="figure" class="my-4 max-w-none px-0 sm:px-0 lg:px-0"
        :aria-describedby="description ? descriptionId : undefined">
        <div class="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
            :role="hasRevealMode ? 'group' : undefined"
            :aria-label="hasRevealMode ? description || 'Media selector' : undefined">
            <component :is="hasRevealMode ? 'button' : 'div'" v-for="(asset, index) in visibleAssets" :key="asset.src"
                :type="hasRevealMode ? 'button' : undefined"
                :aria-label="hasRevealMode ? assetButtonLabel(asset, index) : undefined"
                :aria-pressed="hasRevealMode ? isAssetRevealed(index) : undefined"
                class="group relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border-0 bg-transparent p-0 text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight sm:flex-1"
                :class="hasRevealMode ? 'cursor-pointer' : undefined"
                @click="toggleAsset(index)">
                <ContentVideo v-if="isVideo(asset)" :src="asset.src" :thumbnail-src="asset.thumbnailSrc"
                    :alt="asset.alt ?? description ?? ''" :width="asset.width" :height="asset.height"
                    :active="isAssetRevealed(index)" />
                <LazyImage v-else :src="asset.src" :placeholder-src="asset.placeholderSrc"
                    :alt="asset.alt ?? description ?? ''" :width="asset.width" :height="asset.height"
                    class="block max-h-[32rem] max-w-full object-contain transition-opacity duration-300 motion-reduce:transition-none"
                    :class="!isAssetRevealed(index) ? 'opacity-35' : 'opacity-100'" />

                <span v-if="hasRevealMode && !isAssetRevealed(index)"
                    class="pointer-events-none absolute inset-0 grid place-items-center bg-white/55 text-eerie-black transition-colors group-hover:bg-white/45 dark:bg-black/55 dark:text-white dark:group-hover:bg-black/45"
                    aria-hidden="true">
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-current/20 bg-white/85 px-4 py-2 font-semibold shadow-sm dark:bg-eerie-black/85">
                        <UIcon name="i-lucide-eye" class="size-5" />
                        <span>Show</span>
                    </span>
                </span>
            </component>
        </div>

        <figcaption v-if="description" :id="descriptionId" class="mt-3 text-center text-sm text-muted">
            {{ description }}
        </figcaption>
    </UContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ContentVideo from '@/components/ContentVideo.vue'
import LazyImage from '@/components/LazyImage.vue'

interface ContentImageAsset {
    src: string
    alt?: string
    revealed?: boolean
    width: number
    height: number
    placeholderSrc?: string
    type?: 'image'
}

interface ContentVideoAsset {
    src: string
    thumbnailSrc: string
    alt?: string
    revealed?: boolean
    width: number
    height: number
    type: 'video'
}

type ContentMediaAsset = ContentImageAsset | ContentVideoAsset

const props = withDefaults(
  defineProps<{
    id: string
    assets: [ContentMediaAsset] | [ContentMediaAsset, ContentMediaAsset]
    description?: string
    focus?: boolean
  }>(),
  {
    description: undefined,
    focus: true,
  },
)

const visibleAssets = computed(() => props.assets)
const descriptionId = computed(() => `${props.id}-description`)
const revealedAssets = ref(getInitialRevealState())
const hasRevealMode = computed(() => props.focus !== false)

watch(
    () => props.assets.map((asset) => `${asset.src}:${String(asset.revealed)}`).join('|'),
    () => {
        revealedAssets.value = getInitialRevealState()
    },
)

function getInitialRevealState() {
    return props.assets.map((asset, index) => asset.revealed ?? index === 0)
}

function isAssetRevealed(index: number) {
    return !hasRevealMode.value || revealedAssets.value[index]
}

function isVideo(asset: ContentMediaAsset): asset is ContentVideoAsset {
    return asset.type === 'video'
}

function assetButtonLabel(asset: ContentMediaAsset, index: number) {
    const action = isAssetRevealed(index) ? 'Hide' : 'Show'
    return `${action} ${asset.alt ?? `media asset ${index + 1}`}`
}

function toggleAsset(index: number) {
    if (hasRevealMode.value) revealedAssets.value[index] = !revealedAssets.value[index]
}
</script>
