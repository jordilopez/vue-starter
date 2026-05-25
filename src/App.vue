<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Button from './components/Button/Button.vue'

function handleClick(): void {
  console.log('Button clicked!')
}
</script>

<template>
  <div class="app">
    <h1>Vue Starter</h1>
    <HelloWorld msg="Welcome to the Vue Starter!" />
    <Button label="Click me" @click="handleClick" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1.5rem;
}
</style>
