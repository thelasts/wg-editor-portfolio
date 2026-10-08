<template>
  <div class="vehicle-pattern" aria-hidden="true">
    <div class="vehicle-pattern__field" :style="patternStyle" />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const patternStyle = {
  '--vehicle-pattern-light': `url("${assetUrl('patterns/vehicle-pattern-light.png')}")`,
  '--vehicle-pattern-dark': `url("${assetUrl('patterns/vehicle-pattern-dark.png')}")`,
} as CSSProperties
</script>
