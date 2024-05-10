<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { Action } from '../interfaces/actions'
import { computed } from 'vue'
const props = defineProps<{
  action: Action
}>()

const title = computed(
  () =>
    `Moved ${props.action.post} from index ${props.action.previousIndex} to ${props.action.newIndex}`
)
</script>
<template>
  <base-card class="p-2 flex">
    <div class="grow flex items-center text-lg">{{ title }}</div>
    <div class="flex align-middle">
      <button
        class="py-2 px-4 rounded-sm bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 transition-colors"
        type="button"
      >
        Time Travel
      </button>
    </div>
  </base-card>
</template>

<style scoped></style>
