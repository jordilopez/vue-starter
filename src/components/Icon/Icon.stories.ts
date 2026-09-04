import type { Meta, StoryObj } from '@storybook/vue3'
import { Heart, Plus, Search } from '@lucide/vue'
import CButton from '../Button/Button.vue'
import CIcon from './Icon.vue'

const meta: Meta<typeof CIcon> = {
  title: 'Components/Icon',
  component: CIcon,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CIcon>

/** Decorative icon inherits text color and font size from the parent. */
export const DecorativeNextToText: Story = {
  args: { icon: Heart },
  render: (args) => ({
    components: { CIcon },
    setup: () => ({ args }),
    template: `
      <p style="margin: 0">
        <CIcon v-bind="args" /> Favorited
      </p>
    `,
  }),
}

/** Sizing scales with the surrounding font size (default `1em`). */
export const InheritedFontSize: Story = {
  args: { icon: Search },
  render: (args) => ({
    components: { CIcon },
    setup: () => ({ args }),
    template: `
      <div style="font-size: 2rem; line-height: 1">
        <CIcon v-bind="args" />
      </div>
    `,
  }),
}

/** Color inherits text color — apply a `--c-*` token on the parent to re-theme. */
export const TokenColor: Story = {
  args: { icon: Plus },
  render: (args) => ({
    components: { CIcon },
    setup: () => ({ args }),
    template: `
      <div style="color: var(--c-primary); font-size: 1.5rem; line-height: 1">
        <CIcon v-bind="args" />
      </div>
    `,
  }),
}

/** Standalone informative icon: label it via `aria-label` (exposed as `role="img"`). */
export const Labeled: Story = {
  args: { icon: Search, ariaLabel: 'Search' },
}

/** Icon-only button: the control owns the accessible label, the icon stays decorative. */
export const IconOnlyButton: Story = {
  args: { icon: Plus },
  render: (args) => ({
    components: { CButton, CIcon },
    setup: () => ({ args }),
    template: `
      <CButton aria-label="Add item">
        <CIcon v-bind="args" />
      </CButton>
    `,
  }),
}
