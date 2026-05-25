import type { Meta, StoryObj } from '@storybook/vue3'
import CButton from './Button.vue'

const meta: Meta<typeof CButton> = {
  title: 'Components/Button',
  component: CButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof CButton>

export const Primary: Story = {
  args: { label: 'Primary', variant: 'primary' },
}

export const Secondary: Story = {
  args: { label: 'Secondary', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { label: 'Ghost', variant: 'ghost' },
}

export const Small: Story = {
  args: { label: 'Small', size: 'sm' },
}

export const Large: Story = {
  args: { label: 'Large', size: 'lg' },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
}
