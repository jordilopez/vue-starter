import type { Meta, StoryObj } from '@storybook/vue3'
import HelloWorld from '../components/HelloWorld.vue'

const meta: Meta<typeof HelloWorld> = {
  title: 'Example/HelloWorld',
  component: HelloWorld,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HelloWorld>

export const Default: Story = {
  args: {
    msg: 'Hello from Storybook!',
  },
}
