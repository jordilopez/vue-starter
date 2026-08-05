<script setup lang="ts">
/**
 * Headless button component.
 *
 * No local styles. The visual comes from `css-starter`'s native button
 * styles (neutral variant); `.c-button` is applied as a class hook.
 * Native attributes (aria-*, id, class, ...) fall through to the
 * `<button>` element.
 *
 * @usage
 * ```html
 * <CButton label="Submit" @click="onSubmit" />
 * <!-- or with a slot: -->
 * <CButton @click="onSubmit">Submit</CButton>
 * ```
 */
import type { ButtonProps, ButtonEmits } from './Button'

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
})

const emit = defineEmits<ButtonEmits>()

function handleClick(): void {
  if (!props.disabled) emit('click')
}
</script>

<template>
  <button type="button" class="c-button" :disabled="props.disabled" @click="handleClick">
    <slot>{{ label }}</slot>
  </button>
</template>
