<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import HistoryCard from './HistoryCard.vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
</script>
<template>
  <base-card class="flex flex-col overflow-hidden">
    <div class="p-2 grow flex items-center text-lg">
      List of actions commited
    </div>
    <div class="p-4 bg-gray-300 overflow-auto">
      <transition-group
        v-if="store.actions.length"
        name="history-list"
        class="flex flex-col"
        tag="div"
      >
        <history-card
          v-for="(action, index) in store.actions"
          :key="action.id"
          :action="action"
          :class="[
            index < store.actions.length - 1 && 'rounded-b-none',
            index > 0 && 'rounded-t-none border-t border-t-gray-300'
          ]"
          class="z-10 relative"
          @time-travel="store.timeTravelToIndex(index)"
        />
      </transition-group>
      <div v-else class="flex justify-center italic">
        No Actions were made yet
      </div>
    </div>
  </base-card>
</template>

<style scoped>
.history-list-move,
.history-list-enter-active,
.history-list-leave-active {
  @apply transition-all duration-200;
}

.history-list-enter-from,
.history-list-leave-to {
  @apply opacity-0 -mt-14;
}
</style>
