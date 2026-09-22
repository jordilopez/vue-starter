<script setup lang="ts">
/**
 * Headless advisory block styled by `css-starter`'s `.callout` component.
 *
 * No local styles — the visual comes from css-starter (border, tint, radius);
 * the `tone` modifier + accent icon follow the `tone` prop. The icon is
 * component-owned (rendered via `CIcon` → Lucide, one per tone, mirroring
 * `Toast`), so css-starter stays free of any icon dependency. A polite live
 * region by default (`role="status"`); pass `role="alert"` for assertive
 * errors. All other native attributes (`aria-*`, `id`, `class`, …) fall
 * through to the root element.
 *
 * @usage
 * ```html
 * <CCallout tone="warning" title="Safari only">
 *   CSS Grid Lanes is only supported in Safari.
 * </CCallout>
 * <CCallout tone="error" role="alert">Something went wrong</CCallout>
 * ```
 */
import type { CalloutProps } from './Callout'
import { getCalloutIcon } from './Callout'
import CIcon from '../Icon/Icon.vue'

const props = withDefaults(defineProps<CalloutProps>(), {
  tone: 'info',
  role: 'status',
})
</script>

<template>
  <div :class="['callout', `callout--${props.tone}`]" :role="props.role">
    <span class="callout__icon" aria-hidden="true">
      <CIcon :icon="getCalloutIcon(props.tone)" />
    </span>
    <div class="callout__content">
      <p v-if="props.title || $slots.title" class="callout__title">
        <slot name="title">{{ props.title }}</slot>
      </p>
      <div class="callout__body">
        <slot />
      </div>
    </div>
  </div>
</template>
