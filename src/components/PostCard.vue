<script setup lang="ts">
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import IconButton from './IconButton.vue'
import BaseCard from './BaseCard.vue'
defineProps<{
  post: string
  canMoveUp: boolean
  canMoveDown: boolean
}>()
</script>

<template>
  <base-card class="p-2 flex h-20">
    <div class="grow flex items-center text-lg">{{ post }}</div>
    <div class="flex flex-col">
      <icon-button v-if="canMoveUp" :icon="faChevronUp" />
      <icon-button v-if="canMoveDown" :icon="faChevronDown" />
    </div>
  </base-card>
</template>

<style scoped></style>
