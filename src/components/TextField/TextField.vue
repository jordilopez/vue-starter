<script setup lang="ts">
/**
 * Headless text field component.
 *
 * The default visual comes from `css-starter`'s native input styles
 * (`:where(input)` — border, focus ring, placeholder color); `.c-text-field`
 * is applied as a class hook. No local CSS. `v-model` is supported through
 * the `modelValue` prop and `update:modelValue` emit.
 */
import type { TextFieldProps, TextFieldEmits } from './TextField'

const props = withDefaults(defineProps<TextFieldProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: undefined,
  name: undefined,
  id: undefined,
  autocomplete: undefined,
  maxlength: undefined,
  minlength: undefined,
  disabled: false,
  readonly: false,
  required: false,
  invalid: false,
})

const emit = defineEmits<TextFieldEmits>()

function handleInput(event: Event): void {
  const target = event.target as { value?: string }
  // Match Vue's built-in v-model behavior: do not commit the value while
  // an IME composition (e.g. Japanese/Korean input) is still in progress.
  if (!(event as { isComposing?: boolean }).isComposing) {
    emit('update:modelValue', target.value ?? '')
  }
  emit('input', event)
}

function handleCompositionEnd(event: Event): void {
  const target = event.target as { value?: string }
  emit('update:modelValue', target.value ?? '')
}
</script>

<template>
  <input
    :id="props.id"
    class="c-text-field"
    :type="props.type"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :name="props.name"
    :autocomplete="props.autocomplete"
    :maxlength="props.maxlength"
    :minlength="props.minlength"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :required="props.required"
    :aria-invalid="props.invalid || undefined"
    @input="handleInput"
    @compositionend="handleCompositionEnd"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>
