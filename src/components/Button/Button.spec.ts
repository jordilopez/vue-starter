import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CButton from './Button.vue'

describe('Button', () => {
  it('renders the label', () => {
    const wrapper = mount(CButton, { props: { label: 'Submit' } })
    expect(wrapper.text()).toContain('Submit')
  })

  it('emits click on click', async () => {
    const wrapper = mount(CButton, { props: { label: 'Go' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(CButton, { props: { label: 'Go', disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  it('sets data-disabled when disabled', () => {
    const wrapper = mount(CButton, { props: { label: 'Go', disabled: true } })
    expect(wrapper.find('button').attributes('data-disabled')).toBe('')
  })

  it('omits data-disabled when not disabled', () => {
    const wrapper = mount(CButton, { props: { label: 'Go' } })
    expect(wrapper.find('button').attributes('data-disabled')).toBeUndefined()
  })

  it('applies the correct size class', () => {
    const wrapper = mount(CButton, { props: { label: 'Go', size: 'lg' } })
    const btn = wrapper.find('button')
    expect(btn.classes().some((c) => c.includes('lg'))).toBe(true)
  })

  it('applies the correct variant class', () => {
    const wrapper = mount(CButton, { props: { label: 'Go', variant: 'ghost' } })
    const btn = wrapper.find('button')
    expect(btn.classes().some((c) => c.includes('ghost'))).toBe(true)
  })
})
