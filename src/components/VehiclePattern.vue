<template>
  <div class="vehicle-pattern" aria-hidden="true">
    <div class="vehicle-pattern__field">
      <div class="vehicle-pattern__canvas">
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="vehicle-pattern__row"
          :style="rowStyle(row, rowIndex)">
          <div v-for="copy in 2" :key="copy" class="vehicle-pattern__group">
            <img v-for="vehicleIndex in row.count" :key="vehicleIndex" class="vehicle-pattern__icon"
              :class="{ 'vehicle-pattern__icon--mirrored': shouldMirror(rowIndex, vehicleIndex) }"
              :src="vehicleAt(rowIndex, vehicleIndex)" alt="" width="512" height="512" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type PatternRow = {
  count: number
  nudge: number
}

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const vehicles = [
  assetUrl('vehicles/light-tank.png'),
  assetUrl('vehicles/heavy-tank.png'),
  assetUrl('vehicles/artillery.png'),
  assetUrl('vehicles/armored-car.png'),
  assetUrl('vehicles/tank-destroyer.png'),
]

const rows: PatternRow[] = Array.from({ length: 16 }, (_, rowIndex) => ({
  count: 32 + (rowIndex % 5),
  nudge: -180 - ((rowIndex * 137) % 420),
}))

function vehicleAt(rowIndex: number, vehicleIndex: number) {
  return vehicles[(vehicleIndex + rowIndex * 2) % vehicles.length]
}

function shouldMirror(rowIndex: number, vehicleIndex: number) {
  return (rowIndex + vehicleIndex) % 4 === 0
}

function rowStyle(row: PatternRow, rowIndex: number) {
  return {
    '--row-shift': `${row.nudge}px`,
    '--row-scale': `${0.82 + (rowIndex % 3) * 0.09}`,
  }
}
</script>
