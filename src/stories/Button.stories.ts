import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import AppButton from '../components/Button/Button.vue'

const meta: Meta<typeof AppButton> = {
  title: 'Example/Button',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof AppButton>

export const Primary: Story = {
  args: {
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    label: 'Button',
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    label: 'Button',
    size: 'small',
  },
}
