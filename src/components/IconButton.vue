<script setup lang="ts">
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  icon: IconDefinition
}>()
</script>

<template>
  <button
    class="w-8 h-8 rounded-sm hover:bg-slate-200 active:bg-slate-300 transition-colors"
    type="button"
  >
    <fa-icon class="text-blue-600" fixed-width :icon="icon" />
  </button>
</template>

<style scoped></style>
