<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import { AvailableAction, actionIsMoveAction } from '../interfaces/actions'
import { computed } from 'vue'
const props = defineProps<{
  /** The Action that is shown */
  action: AvailableAction
}>()

defineEmits<{
  (e: 'time-travel'): void
}>()

const title = computed(() => {
  if (actionIsMoveAction(props.action)) {
    return `Moved ${props.action.post} from index ${props.action.oldIndex} to index ${props.action.newIndex}`
  }
  return ''
})
</script>
<template>
  <base-card class="p-2 flex">
    <div class="grow flex items-center text-lg">{{ title }}</div>
    <div class="flex align-middle">
      <button
        class="py-2 px-4 rounded-sm bg-green-400 hover:bg-green-500 active:bg-green-600 transition-colors"
        type="button"
        @click="$emit('time-travel')"
      >
        Time Travel
      </button>
    </div>
  </base-card>
</template>

<style scoped></style>
