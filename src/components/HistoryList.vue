<script setup lang="ts">
import { Action } from '../interfaces/actions'
import BaseCard from './BaseCard.vue'
import HistoryCard from './HistoryCard.vue'
const actions: Action[] = [
  {
    post: 'Post 1',
    newIndex: 1,
    previousIndex: 0
  },
  {
    post: 'Post 0',
    newIndex: 1,
    previousIndex: 0
  }
]
</script>
<template>
  <base-card>
    <div class="p-2 grow flex items-center text-lg">
      List of actions commited
    </div>
    <div class="p-4 flex flex-col gap-2 bg-gray-300">
      <history-card
        v-for="(action, index) in actions"
        :key="index"
        :action="action"
      />
    </div>
  </base-card>
</template>

<style scoped></style>
