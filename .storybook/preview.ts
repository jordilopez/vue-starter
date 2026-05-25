import type { Preview } from '@storybook/vue3'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '../src/styles/index.css'

/**
 * Global Storybook preview configuration.
 *
 * `controls.matchers` auto-assigns colour and date controls
 * based on prop names.
 *
 * `a11y.test` is set to `'todo'` so accessibility violations
 * surface in the test UI without failing CI.
 *
 * The built-in backgrounds toolbar is disabled — use the **Theme** toggle
 * (paintbrush icon) in the toolbar instead.
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
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
}

export default preview
