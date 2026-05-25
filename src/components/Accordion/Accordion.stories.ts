import type { Meta, StoryObj } from '@storybook/vue3'
import CAccordion from './Accordion.vue'

const items = [
  { title: 'Getting started', content: 'Install the dependencies and run `npm run dev`.' },
  {
    title: 'Components',
    content:
      'Each component lives in its own folder with its vue, css, ts, spec, and stories files.',
  },
  {
    title: 'Styling',
    content:
      'CSS Modules with native nesting. Variants use data attributes instead of modifier classes.',
  },
]

const meta: Meta<typeof CAccordion> = {
  title: 'Components/Accordion',
  component: CAccordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CAccordion>

export const Default: Story = {
  args: { items },
}

export const AllowMultiple: Story = {
  args: { items, allowMultiple: true },
}
