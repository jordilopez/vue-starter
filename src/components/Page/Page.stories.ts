import type { Meta, StoryObj } from '@storybook/vue3'
import LPage from './Page.vue'

const meta: Meta<typeof LPage> = {
  title: 'Layouts/Page',
  component: LPage,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LPage>

export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Welcome back, Jordi',
  },
  render: (args) => ({
    components: { LPage },
    setup: () => ({ args }),
    template: `
      <LPage v-bind="args">
        <p>Main content goes here.</p>
      </LPage>
    `,
  }),
}

export const Narrow: Story = {
  args: {
    title: 'Settings',
    narrow: true,
  },
  render: (args) => ({
    components: { LPage },
    setup: () => ({ args }),
    template: `
      <LPage v-bind="args">
        <p>Settings content with constrained width.</p>
      </LPage>
    `,
  }),
}

export const Centered: Story = {
  args: {
    title: 'Hello',
    centered: true,
  },
  render: (args) => ({
    components: { LPage },
    setup: () => ({ args }),
    template: `
      <LPage v-bind="args">
        <p>Vertically centered content.</p>
      </LPage>
    `,
  }),
}
