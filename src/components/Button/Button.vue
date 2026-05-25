<script setup lang="ts">
/**
 * Reusable button component.
 *
 * Supports three visual variants (`primary`, `secondary`, `ghost`),
 * three sizes (`sm`, `md`, `lg`), and a `disabled` state exposed via
 * `data-disabled` on the host element.
 *
 * @usage
 * ```html
 * <CButton label="Submit" variant="primary" size="lg" @click="onSubmit" />
 * ```
 */
import { computed } from 'vue'
import type { ButtonProps, ButtonEmits } from './Button'
import styles from './Button.module.css'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<ButtonEmits>()

const classes = computed(() => [styles['c-button'], styles[props.size], styles[props.variant]])

const attrs = computed(() => ({
  'data-disabled': props.disabled ? '' : undefined,
}))

function handleClick(): void {
  if (!props.disabled) emit('click')
}
</script>

<template>
  <button :class="classes" v-bind="attrs" @click="handleClick">
    <slot />
    {{ label }}
  </button>
</template>
