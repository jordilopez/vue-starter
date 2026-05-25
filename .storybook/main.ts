import type { StorybookConfig } from '@storybook/vue3-vite'

/**
 * Storybook configuration for Vue 3 + Vite.
 *
 * Addons:
 * - `@chromatic-com/storybook` — visual regression reviews
 * - `@storybook/addon-vitest` — run stories as Vitest tests
 * - `@storybook/addon-a11y` — accessibility audits per story
 * - `@storybook/addon-docs` — auto-generated documentation
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/vue3-vite',
}

export default config
