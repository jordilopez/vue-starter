import type { Meta, StoryObj } from '@storybook/vue3'
import CLink from './Link.vue'

const meta: Meta<typeof CLink> = {
  title: 'Components/Link',
  component: CLink,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CLink>

export const Default: Story = {
  args: { href: 'https://example.com', label: 'Default Link' },
}

export const Disabled: Story = {
  args: { href: 'https://example.com', label: 'Disabled', disabled: true },
}

export const NewTab: Story = {
  args: { href: 'https://example.com', label: 'Open in new tab', openInNewTab: true },
}

export const WithSlot: Story = {
  render: () => ({
    components: { CLink },
    template: '<CLink href="https://example.com"><strong>Slot content</strong></CLink>',
  }),
}
