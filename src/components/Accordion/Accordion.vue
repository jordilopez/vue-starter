<script setup lang="ts">
/**
 * Accessible accordion component.
 *
 * Each panel header is a `<button>` that toggles visibility of its body.
 * Open state is communicated via `data-open` on the panel, `aria-expanded`
 * and `aria-controls` on the header button, plus `role="region"` and
 * `aria-labelledby` on the body for assistive technology.
 *
 * Supports single-panel (default) and multi-panel (`allowMultiple`) modes.
 * Keyboard: Enter/Space toggles the focused panel; ArrowUp/ArrowDown
 * navigates between panel headers.
 */
import { ref } from 'vue'
import type { AccordionProps, AccordionEmits } from './Accordion'
import styles from './Accordion.module.css'

const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultiple: false,
})

const emit = defineEmits<AccordionEmits>()

const openIndexes = ref<number[]>([])

function isOpen(index: number): boolean {
  return openIndexes.value.includes(index)
}

function toggle(index: number): void {
  if (isOpen(index)) {
    openIndexes.value = openIndexes.value.filter((i) => i !== index)
  } else if (props.allowMultiple) {
    openIndexes.value = [...openIndexes.value, index]
  } else {
    openIndexes.value = [index]
  }
  emit('update:open', openIndexes.value)
}

function onKeyDown(index: number, event: KeyboardEvent): void {
  const headers = document.querySelectorAll<HTMLElement>('[id^="accordion-header-"]')
  if (headers.length === 0) return

  let targetIndex = -1
  switch (event.key) {
    case 'ArrowUp': {
      event.preventDefault()
      targetIndex = index === 0 ? headers.length - 1 : index - 1
      break
    }
    case 'ArrowDown': {
      event.preventDefault()
      targetIndex = index === headers.length - 1 ? 0 : index + 1
      break
    }
    case 'Home': {
      event.preventDefault()
      targetIndex = 0
      break
    }
    case 'End': {
      event.preventDefault()
      targetIndex = headers.length - 1
      break
    }
  }

  if (targetIndex >= 0) {
    headers[targetIndex]?.focus()
  }
}
</script>

<template>
  <div :class="styles['c-accordion']">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="styles.panel"
      :data-open="isOpen(index) || undefined"
    >
      <button
        :id="`accordion-header-${index}`"
        :class="styles.header"
        :aria-expanded="isOpen(index)"
        :aria-controls="`accordion-body-${index}`"
        @click="toggle(index)"
        @keydown="onKeyDown(index, $event)"
      >
        {{ item.title }}
        <span :class="styles.chevron" aria-hidden="true">▾</span>
      </button>
      <div
        :id="`accordion-body-${index}`"
        :class="styles.body"
        role="region"
        :aria-labelledby="`accordion-header-${index}`"
      >
        <div :class="styles.bodyInner">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
