<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <p class="hello">{{ msg }}</p>
</template>

<style scoped>
.hello {
  font-size: 1.25rem;
  color: #42b883;
}
</style>
