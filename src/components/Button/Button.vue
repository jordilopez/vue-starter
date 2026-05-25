<script setup lang="ts">
import styles from './Button.module.css'

interface ButtonProps {
  label: string
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
})

const emit = defineEmits<{
  click: []
}>()

function handleClick(): void {
  emit('click')
}
</script>

<template>
  <button
    :class="[styles.button, styles[size]]"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>
