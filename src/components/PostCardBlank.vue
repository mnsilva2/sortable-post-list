<script setup lang="ts">
import BaseCard from './BaseCard.vue'
</script>
<template>
  <base-card class="p-2 flex items-center justify-between h-20">
    <div class="mx-4 rounded-lg flex h-6 bg-gray-200 w-2/3 animate-pulse"></div>
    <div class="flex flex-col justify-center gap-2">
      <div class="bg-gray-200 w-7 h-7 rounded-lg animate-pulse"></div>
      <div class="bg-gray-200 w-7 h-7 rounded-lg animate-pulse"></div>
    </div>
  </base-card>
</template>

<style scoped></style>
