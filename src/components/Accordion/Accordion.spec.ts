import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CAccordion from './Accordion.vue'

const items = [
  { title: 'One', content: 'First panel' },
  { title: 'Two', content: 'Second panel' },
]

describe('Accordion', () => {
  it('renders all item titles', () => {
    const wrapper = mount(CAccordion, { props: { items } })
    expect(wrapper.text()).toContain('One')
    expect(wrapper.text()).toContain('Two')
  })

  it('opens a panel on header click', async () => {
    const wrapper = mount(CAccordion, { props: { items } })
    const openBefore = wrapper.findAll('[data-open]')
    expect(openBefore).toHaveLength(0)

    await wrapper.findAll('button')[0].trigger('click')

    const openAfter = wrapper.findAll('[data-open]')
    expect(openAfter).toHaveLength(1)
    expect(openAfter[0].attributes('data-open')).toBe('true')
  })

  it('closes a panel on second click', async () => {
    const wrapper = mount(CAccordion, { props: { items } })
    const header = wrapper.findAll('button')[0]
    await header.trigger('click')
    await header.trigger('click')

    expect(wrapper.findAll('[data-open]')).toHaveLength(0)
  })

  it('emits update:open with open indexes', async () => {
    const wrapper = mount(CAccordion, { props: { items } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('update:open')![0]).toEqual([[0]])
  })

  it('sets aria-expanded on the active header', async () => {
    const wrapper = mount(CAccordion, { props: { items } })
    const header = wrapper.findAll('button')[0]

    expect(header.attributes('aria-expanded')).toBe('false')

    await header.trigger('click')
    expect(header.attributes('aria-expanded')).toBe('true')
  })

  it('links header and body via aria-controls / aria-labelledby', () => {
    const wrapper = mount(CAccordion, { props: { items } })
    const header = wrapper.findAll('button')[0]
    const body = wrapper.findAll('[role="region"]')[0]

    expect(header.attributes('aria-controls')).toBe(body.attributes('id'))
    expect(body.attributes('aria-labelledby')).toBe(header.attributes('id'))
  })
})
