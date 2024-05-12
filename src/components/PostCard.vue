<script setup lang="ts">
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton.vue'
import BaseCard from './BaseCard.vue'
import { Post } from '../interfaces/post'
defineProps<{
  /** The Post that is shown */
  post: Post
  /** If the button o move up is visible */
  canMoveUp: boolean
  /** If the button o move down is visible */
  canMoveDown: boolean
}>()

defineEmits<{
  (e: 'moved-up'): void
  (e: 'moved-down'): void
}>()
</script>
<template>
  <base-card class="p-2 flex h-20">
    <div class="grow flex items-center text-lg">{{ post }}</div>
    <div class="flex flex-col justify-center">
      <icon-button
        v-if="canMoveUp"
        :icon="faChevronUp"
        title="Move Post Up"
        @click="$emit('moved-up')"
      />
      <icon-button
        v-if="canMoveDown"
        :icon="faChevronDown"
        title="Move Post Down"
        @click="$emit('moved-down')"
      />
    </div>
  </base-card>
</template>

<style scoped></style>
