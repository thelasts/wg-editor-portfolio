<template>
  <component :is="as" :id="id" class="heading-anchor group/heading">
    <span>
      <slot />
    </span>
    <a :href="`#${id}`" class="heading-anchor__link" :class="{ 'heading-anchor__link--active': isActive || copied }"
      :aria-label="copied ? t('controls.linkCopied') : t('controls.copyLinkToHeading')"
      :title="copied ? t('controls.linkCopied') : t('controls.copyLinkToHeading')" @click="copyLink">
      <UIcon name="i-lucide-share-2" class="size-[0.8em]" aria-hidden="true" />
    </a>
    <span class="sr-only" aria-live="polite">{{ copied ? t('controls.linkCopied') : '' }}</span>
  </component>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@nuxt/ui/composables'

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    id: string
  }>(),
  {
    as: 'h2',
  },
)

const { t } = useI18n()
const toast = useToast()
const copied = ref(false)
const isActive = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const syncActiveState = () => {
  isActive.value = window.location.hash === `#${props.id}`
}

const copyLink = async () => {
  const url = new URL(window.location.href)
  url.hash = props.id

  try {
    await navigator.clipboard.writeText(url.href)
    copied.value = true
    toast.add({
      id: 'heading-link-copied',
      title: t('controls.linkCopied'),
      icon: 'i-lucide-check',
      color: 'success',
      duration: 2000,
    })
    window.clearTimeout(copiedTimer)
    copiedTimer = window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // The hash link still works when clipboard access is unavailable.
  }
}

onMounted(() => {
  syncActiveState()
  window.addEventListener('hashchange', syncActiveState)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncActiveState)
  window.clearTimeout(copiedTimer)
})
</script>
