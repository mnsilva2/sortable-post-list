<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import HistoryCard from './HistoryCard.vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
</script>
<template>
  <base-card>
    <div class="p-2 grow flex items-center text-lg">
      List of actions commited
    </div>
    <div class="p-4 flex flex-col gap-2 bg-gray-300">
      <history-card
        v-for="(action, index) in store.actions"
        :key="index"
        :action="action"
        @rollback="store.rollbackToIndex(index)"
      />
    </div>
  </base-card>
</template>

<style scoped></style>
