import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CTextField from './TextField.vue'

const meta: Meta<typeof CTextField> = {
  title: 'Components/TextField',
  component: CTextField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CTextField>

export const Default: Story = {
  args: { placeholder: 'Type something…' },
}

export const WithValue: Story = {
  args: { modelValue: 'Hello, world!' },
}

export const Email: Story = {
  args: { type: 'email', placeholder: 'you@example.com', autocomplete: 'email' },
}

export const Password: Story = {
  args: { type: 'password', placeholder: '••••••••', autocomplete: 'current-password' },
}

export const Disabled: Story = {
  args: { modelValue: 'Cannot edit this', disabled: true },
}

export const Readonly: Story = {
  args: { modelValue: 'Read-only value', readonly: true },
}

export const Invalid: Story = {
  args: { modelValue: 'not-an-email', type: 'email', invalid: true },
}

export const WithVModel: Story = {
  render: () => ({
    components: { CTextField },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display: grid; gap: 0.5rem; max-width: 20rem;">
        <label for="vm-field">Live value</label>
        <CTextField id="vm-field" v-model="value" placeholder="Type here…" />
        <p><strong>{{ value || '(empty)' }}</strong></p>
      </div>
    `,
  }),
}
