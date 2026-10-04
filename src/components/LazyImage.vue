<template>
  <img
    ref="image"
    v-bind="$attrs"
    :src="currentSrc"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : 'low'"
    decoding="async"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width: number
    height: number
    placeholderSrc?: string
    eager?: boolean
    rootMargin?: string
  }>(),
  {
    placeholderSrc: undefined,
    eager: false,
    rootMargin: '300px 0px',
  },
)

const image = useTemplateRef('image')
const currentSrc = ref(props.eager ? props.src : props.placeholderSrc)
let observer: IntersectionObserver | undefined

function loadImage() {
  currentSrc.value = props.src
  observer?.disconnect()
  observer = undefined
}

function observeImage() {
  observer?.disconnect()

  if (props.eager || !image.value || !('IntersectionObserver' in window)) {
    loadImage()
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) loadImage()
    },
    { rootMargin: props.rootMargin },
  )
  observer.observe(image.value)
}

onMounted(observeImage)
onBeforeUnmount(() => observer?.disconnect())

watch(
  () => [props.src, props.placeholderSrc, props.eager] as const,
  () => {
    currentSrc.value = props.eager ? props.src : props.placeholderSrc
    observeImage()
  },
)
</script>
