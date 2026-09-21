import type { Meta, StoryObj } from '@storybook/vue3'
import CCallout from './Callout.vue'

const meta: Meta<typeof CCallout> = {
  title: 'Components/Callout',
  component: CCallout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CCallout>

export const Info: Story = {
  args: { tone: 'info', title: 'Heads up' },
  render: (args) => ({
    components: { CCallout },
    setup: () => ({ args }),
    template: '<CCallout v-bind="args">A neutral informational callout.</CCallout>',
  }),
}

export const Success: Story = {
  args: { tone: 'success', title: 'Saved' },
  render: (args) => ({
    components: { CCallout },
    setup: () => ({ args }),
    template: '<CCallout v-bind="args">Your changes have been saved.</CCallout>',
  }),
}

export const Warning: Story = {
  args: { tone: 'warning', title: 'Safari only' },
  render: (args) => ({
    components: { CCallout },
    setup: () => ({ args }),
    template: '<CCallout v-bind="args">This demo requires Safari to see the real thing.</CCallout>',
  }),
}

export const Error: Story = {
  args: { tone: 'error', role: 'alert', title: 'Something went wrong' },
  render: (args) => ({
    components: { CCallout },
    setup: () => ({ args }),
    template: '<CCallout v-bind="args">The request failed. Please try again.</CCallout>',
  }),
}

export const BodyOnly: Story = {
  args: { tone: 'info' },
  render: (args) => ({
    components: { CCallout },
    setup: () => ({ args }),
    template: '<CCallout v-bind="args">A callout with no title, just a body message.</CCallout>',
  }),
}
