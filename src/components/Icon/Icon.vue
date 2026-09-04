<script setup lang="ts">
/**
 * Headless icon component wrapping a Lucide icon.
 *
 * No local styles. Sizing scales with the surrounding font size
 * (`size="1em"`) and the stroke color inherits text color
 * (`color="currentColor"`), so `--c-*` tokens can be applied on any
 * parent. Without an `ariaLabel` the icon is decorative
 * (`aria-hidden="true"`); pass one for a standalone informative icon
 * (exposed with `role="img"`). Icon-only buttons/links keep the label on
 * the control — the nested icon stays decorative. All other attributes
 * (`class`, `data-*`, kebab-case SVG attrs, listeners like `@click`)
 * fall through to the rendered `<svg>`.
 *
 * @usage
 * ```html
 * <CIcon :icon="Camera" />
 * <CIcon :icon="Camera" aria-label="Take photo" />
 * ```
 */
import { computed } from 'vue'
import type { IconProps } from './Icon'

const props = withDefaults(defineProps<IconProps>(), {
  size: '1em',
  color: 'currentColor',
  strokeWidth: undefined,
  ariaLabel: undefined,
})

/** True when an `ariaLabel` is provided; drives the exposed role. */
const hasLabel = computed(() => Boolean(props.ariaLabel))

/**
 * Lucide types `size` as number-only, but the runtime accepts strings
 * like `'1em'`; cast to satisfy Lucide's (narrow) prop type.
 */
const sizeProp = computed(() => props.size as number)
</script>

<template>
  <component
    :is="props.icon"
    :size="sizeProp"
    :color="props.color"
    :stroke-width="props.strokeWidth"
    class="c-icon"
    :aria-hidden="hasLabel ? undefined : 'true'"
    :aria-label="hasLabel ? props.ariaLabel : undefined"
    :role="hasLabel ? 'img' : undefined"
  />
</template>
