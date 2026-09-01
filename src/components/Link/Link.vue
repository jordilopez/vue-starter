<script setup lang="ts">
/**
 * Headless link component.
 *
 * The default visual comes from `css-starter`'s native anchor styles
 * (`:where(a)`); `.c-link` is applied as a class hook. `openInNewTab`
 * sets `target="_blank"` and merges `rel="noopener noreferrer"`.
 * Disabled links drop the `href` attribute, announce
 * `aria-disabled="true"`, and swallow clicks.
 */
import { computed } from 'vue'
import type { LinkProps, LinkEmits } from './Link'

const props = withDefaults(defineProps<LinkProps>(), {
  disabled: false,
  openInNewTab: false,
})

const emit = defineEmits<LinkEmits>()

const isNewTab = computed(() => props.openInNewTab || props.target === '_blank')
const effectiveRel = computed(() =>
  isNewTab.value ? ['noopener', 'noreferrer', props.rel].filter(Boolean).join(' ') : props.rel,
)

function handleClick(event: MouseEvent): void {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<template>
  <a
    class="c-link"
    :href="props.disabled ? undefined : props.href"
    :aria-disabled="props.disabled || undefined"
    :target="props.openInNewTab ? '_blank' : props.target"
    :rel="effectiveRel"
    @click="handleClick"
  >
    <slot>{{ props.label }}</slot>
  </a>
</template>
