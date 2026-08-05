import type { Meta, StoryObj } from '@storybook/vue3'
import CButton from './Button.vue'

const meta: Meta<typeof CButton> = {
  title: 'Components/Button',
  component: CButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CButton>

export const Default: Story = {
  args: { label: 'Default Button' },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}

export const WithSlot: Story = {
  render: () => ({
    components: { CButton },
    template: '<CButton><strong>Slot content</strong></CButton>',
  }),
}
