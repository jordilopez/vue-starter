<script setup lang="ts">
/**
 * Root application component.
 *
 * Composes the `LPage` layout shell with `CButton`, `CLink`, and
 * `CAccordion` samples. Components are headless — their styles come from
 * the shared `css-starter` design system via the `.c-button`/`.c-link`
 * class hooks.
 */
import LPage from './components/Page/Page.vue'
import CButton from './components/Button/Button.vue'
import CLink from './components/Link/Link.vue'
import CAccordion from './components/Accordion/Accordion.vue'

const accordionItems = [
  {
    title: 'What is this?',
    content:
      'A Vue 3 starter with TypeScript, Storybook, and headless components styled by css-starter.',
  },
  {
    title: 'Component pattern',
    content:
      'Components live in folders named after the component, each with .vue, .ts, .spec.ts, and .stories.ts files.',
  },
  {
    title: 'Headless styling',
    content:
      'Components carry no local CSS — they apply css-starter classes like .c-button and inherit tokens from the design system.',
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
        This starter ships <strong>headless components</strong> — no local styles. The shared
        <strong>css-starter</strong> design system handles the visuals via tokens and base classes.
      </p>

      <div class="actions">
        <CButton label="Get started" @click="handleClick" />
        <CButton label="Learn more" @click="handleClick" />
      </div>

      <div class="links">
        <CLink href="/docs" label="Read the docs" />
        <CLink href="/docs" label="Disabled link" disabled />
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

.links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.faq summary {
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
</style>
