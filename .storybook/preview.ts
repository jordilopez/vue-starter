import type { Preview } from '@storybook/vue3'
import '../src/styles/index.css'

/**
 * Global Storybook preview configuration.
 *
 * Dark mode is controlled by the user's OS preference via
 * `@media (prefers-color-scheme: dark)` in the CSS tokens.
 * No theme toggle is needed — the browser handles it automatically.
 *
 * `a11y.test` is set to `'todo'` so accessibility violations
 * surface in the test UI without failing CI.
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      disable: true,
    },
  },
}

export default preview
