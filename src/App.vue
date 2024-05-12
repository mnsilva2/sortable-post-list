<script setup lang="ts">
import PostList from './components/PostList.vue'
import HistoryList from './components/HistoryList.vue'
import { useAppStore } from './stores/app'
import { onMounted } from 'vue'

const store = useAppStore()

onMounted(() => {
  store.loadPosts()
})
</script>

<template>
  <main
    class="h-screen w-screen flex overflow-hidden justify-center bg-neutral-200"
  >
    <template v-if="!store.error">
      <div class="flex max-w-7xl w-full flex-col md:flex-row z-10">
        <div class="w-full md:w-1/2 p-4 lg:p-8">
          <div class="text-2xl mb-4 text-white">Sortable Post List</div>
          <post-list />
        </div>

        <div class="max-h-full w-full md:w-1/2 p-4 lg:p-8 overflow-hidden">
          <history-list class="max-h-full" />
        </div>
      </div>
      <div class="absolute w-full h-full bg-[#6357b1] triangle-clip-path"></div>
    </template>
    <div v-else class="h-full pt-20 flex flex-col gap-2">
      <span class="text-2xl">
        Oh no! Something went wrong while loading the application!
      </span>
      <pre class="text-sm">{{ store.error }}</pre>
    </div>
  </main>
</template>

<style scoped>
.triangle-clip-path {
  clip-path: polygon(0 0, 100% 0%, 0 33%);
}
</style>
