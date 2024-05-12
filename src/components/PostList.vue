<script setup lang="ts">
import { computed } from 'vue'
import PostCard from './PostCard.vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const filteredPosts = computed(() => {
  return store.posts.slice(0, 5)
})

function onMovedUp(index: number) {
  store.moveIndexUp(index)
}

function onMovedDown(index: number) {
  console.log('onMoveDown', index)
  store.moveIndexDown(index)
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <post-card
      v-for="(post, index) in filteredPosts"
      :key="post"
      :post="post"
      :can-move-down="index < filteredPosts.length - 1"
      :can-move-up="index > 0"
      @moved-up="onMovedUp(index)"
      @moved-down="onMovedDown(index)"
    />
  </div>
</template>

<style scoped></style>
