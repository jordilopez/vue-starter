import type { Meta, StoryObj } from '@storybook/vue3'
import CButton from './Button/Button.vue'
import './Tokens.stories.css'

const meta: Meta<typeof CButton> = {
  title: 'Design System/Token Overrides',
  component: CButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Demonstrates how consumers can override `css-starter` design tokens ' +
          'locally, without touching the design system itself. Custom properties ' +
          'inherit down the DOM tree, so redefining the `--c-primary*` / ' +
          '`--c-focus-ring` custom properties on a wrapper element re-themes every ' +
          'token-driven style inside it — the wrapper takes precedence over the ' +
          'layered `css-starter.tokens` declarations on `:root` for its ' +
          'descendants. Because the override is unlayered, it also beats the layered ' +
          'design-system declarations without `!important`.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CButton>

/**
 * Buttons using the design system's default token palette (Vue green).
 * Each button is a **static swatch** for one of the `--c-primary*` /
 * `--c-focus-ring` tokens — they are not interactive states.
 */
export const DefaultTokens: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default `css-starter` tokens. Each button below is a static swatch ' +
          '(not an interactive state) whose colour reads from one of ' +
          '`--c-primary`, `--c-primary-hover`, `--c-primary-active`, ' +
          '`--c-primary-subtle` or `--c-focus-ring`, which resolve to the ' +
          "Vue brand palette defined on `:root` in this project's global CSS.",
      },
    },
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="token-demo">
        <CButton style="background: var(--c-primary); border-color: var(--c-primary); color: #fff;">Primary</CButton>
        <CButton style="background: var(--c-primary-hover); border-color: var(--c-primary-hover); color: #fff;">Hover (swatch)</CButton>
        <CButton style="background: var(--c-primary-active); border-color: var(--c-primary-active); color: #fff;">Active (swatch)</CButton>
        <CButton style="background: var(--c-primary-subtle); border-color: var(--c-primary-subtle); color: var(--c-primary);">Subtle (swatch)</CButton>
        <CButton style="outline: 2px solid var(--c-focus-ring); outline-offset: 2px;">Focus ring (swatch)</CButton>
      </div>
    `,
  }),
}

/**
 * The same static token swatches wrapped in a `.token-override` container
 * that redefines the design-system tokens with a purple palette. The wrapper
 * is a closer ancestor than `:root`, so its custom-property values are
 * inherited by everything inside it, taking precedence over the layered
 * `css-starter.tokens` declarations on `:root` — no `!important` needed.
 * The override is scoped to the wrapper, so `:root` and everything outside
 * `.token-override` keep the default green palette.
 */
export const ConsumerOverride: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The same static swatches, but wrapped in an element that redefines ' +
          'the tokens. The override stylesheet (imported by this story) declares ' +
          'the custom properties on the `.token-override` wrapper, which is a ' +
          'closer ancestor than `:root` — so its values are inherited by every ' +
          'token-driven style inside the wrapper, winning over the layered ' +
          '`css-starter.tokens` declarations on `:root`. Being unlayered, the ' +
          'override also beats the layered design-system declarations without ' +
          '`!important`. Everything outside the wrapper stays on the default ' +
          'green.',
      },
    },
  },
  render: () => ({
    components: { CButton },
    template: `
      <div>
        <div class="token-override">
          <CButton style="background: var(--c-primary); border-color: var(--c-primary); color: #fff;">Primary</CButton>
          <CButton style="background: var(--c-primary-hover); border-color: var(--c-primary-hover); color: #fff;">Hover (swatch)</CButton>
          <CButton style="background: var(--c-primary-active); border-color: var(--c-primary-active); color: #fff;">Active (swatch)</CButton>
          <CButton style="background: var(--c-primary-subtle); border-color: var(--c-primary-subtle); color: var(--c-primary);">Subtle (swatch)</CButton>
          <CButton style="outline: 2px solid var(--c-focus-ring); outline-offset: 2px;">Focus ring (swatch)</CButton>
        </div>
      </div>
    `,
  }),
}
