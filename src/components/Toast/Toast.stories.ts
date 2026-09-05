import type { Meta, StoryObj } from '@storybook/vue3'
import CToast from './Toast.vue'

const meta: Meta<typeof CToast> = {
  title: 'Components/Toast',
  component: CToast,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CToast>

/** Default toast (info variant). Auto-closes after 5 seconds unless disabled.

 * The dialog must get an accessible name from the consumer (its content is
 * arbitrary slot text), so every story passes `aria-label` via fallthrough. */
export const Info: Story = {
  args: { variant: 'info', autoCloseSeconds: 0 },
  render: (args) => ({
    components: { CToast },
    setup: () => ({ args }),
    template: '<CToast v-bind="args" aria-label="Notification">Default toast</CToast>',
  }),
}

/** Success toast for confirmations like saved changes. */
export const Success: Story = {
  args: { variant: 'success', autoCloseSeconds: 0 },
  render: (args) => ({
    components: { CToast },
    setup: () => ({ args }),
    template: '<CToast v-bind="args" aria-label="Changes saved">Changes saved</CToast>',
  }),
}

/** Error toast for failures; exposed as `role="alert"` via fallthrough. */
export const Error: Story = {
  args: { variant: 'error', autoCloseSeconds: 0 },
  render: (args) => ({
    components: { CToast },
    setup: () => ({ args }),
    template:
      '<CToast v-bind="args" role="alert" aria-label="Something went wrong">Something went wrong</CToast>',
  }),
}

/** Warning toast for cautions like low storage. */
export const Warning: Story = {
  args: { variant: 'warning', autoCloseSeconds: 0 },
  render: (args) => ({
    components: { CToast },
    setup: () => ({ args }),
    template: '<CToast v-bind="args" aria-label="Storage almost full">Storage almost full</CToast>',
  }),
}

/** Auto-dismissing toast — closes itself after 1 second. */
export const AutoClose: Story = {
  args: { autoCloseSeconds: 1 },
  render: (args) => ({
    components: { CToast },
    setup: () => ({ args }),
    template:
      '<CToast v-bind="args" aria-label="Auto-closing toast">This toast closes itself after 1 second</CToast>',
  }),
}
