<script setup lang="ts">
/**
 * Layout component for page-level structure.
 *
 * Renders an optional `<header>` (with title / subtitle / header slot),
 * a `<main>` content area (with optional `centered` and `narrow` modes),
 * and an optional `<footer>` slot.
 *
 * All regions use semantic HTML5 elements for proper document outline.
 */
import type { PageProps } from './Page'
import styles from './Page.module.css'

withDefaults(defineProps<PageProps>(), {
  centered: false,
  narrow: false,
})
</script>

<template>
  <div :class="styles['l-page']">
    <header v-if="$slots.header || title" :class="styles.header">
      <h1 v-if="title" :class="styles.title">{{ title }}</h1>
      <p v-if="subtitle" :class="styles.subtitle">{{ subtitle }}</p>
      <slot name="header" />
    </header>

    <main :class="[styles.main, { [styles.centered]: centered, [styles.narrow]: narrow }]">
      <slot />
    </main>

    <footer v-if="$slots.footer" :class="styles.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
