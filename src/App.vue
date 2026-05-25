<script setup lang="ts">
/**
 * Root application component.
 *
 * Composes the `LPage` layout shell with `CButton` and `CAccordion`
 * samples to demonstrate the component conventions used across the
 * project (CSS Modules, data attributes, native nesting).
 */
import LPage from './components/Page/Page.vue'
import CButton from './components/Button/Button.vue'
import CAccordion from './components/Accordion/Accordion.vue'

const accordionItems = [
  {
    title: 'What is this?',
    content: 'A Vue 3 starter with TypeScript, Storybook, CSS Modules, and more.',
  },
  {
    title: 'Component pattern',
    content:
      'Components live in folders named after the component, each with .vue, .css, .ts, .spec.ts, and .stories.ts files.',
  },
  {
    title: 'Data attributes',
    content:
      'Variants and state use data-* attributes instead of modifier classes, e.g. data-disabled.',
  },
]

function handleClick(): void {
  // placeholder — wire up navigation or toast here
}
</script>

<template>
  <LPage title="Vue Starter" subtitle="A modern foundation for Vue 3 projects">
    <div class="hero">
      <p class="intro">
        This starter uses <strong>CSS Modules</strong> with native CSS nesting,
        <strong>data attributes</strong> for component state, and a consistent folder structure per
        component.
      </p>

      <div class="actions">
        <CButton label="Get started" variant="primary" size="lg" @click="handleClick" />
        <CButton label="Learn more" variant="ghost" @click="handleClick" />
      </div>

      <details class="faq">
        <summary>FAQ</summary>
        <CAccordion :items="accordionItems" />
      </details>
    </div>
  </LPage>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin-inline: auto;
}

.intro {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.faq summary {
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
</style>
