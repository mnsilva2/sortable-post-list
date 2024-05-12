<script setup lang="ts">
import { computed } from 'vue'
import PostCard from './PostCard.vue'
import PostCardBlank from './PostCardBlank.vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const filteredPosts = computed(() => {
  return store.posts.slice(0, 5)
})

function onMovedUp(index: number) {
  store.moveIndexUp(index)
}

function onMovedDown(index: number) {
  store.moveIndexDown(index)
}
</script>
<template>
  <transition-group
    v-if="!store.isLoadingPosts"
    name="post-list"
    tag="div"
    class="flex flex-col gap-2"
  >
    <post-card
      v-for="(post, index) in filteredPosts"
      :key="post"
      :post="post"
      :can-move-down="index < filteredPosts.length - 1"
      :can-move-up="index > 0"
      @moved-up="onMovedUp(index)"
      @moved-down="onMovedDown(index)"
    />
  </transition-group>
  <div v-else class="flex flex-col gap-2">
    <post-card-blank v-for="n in 5" :key="n" />
  </div>
</template>

<style scoped>
.post-list-move {
  @apply transition-all;
}

.post-list-leave-active {
  @apply absolute;
}
</style>
