import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CButton from './Button.vue'

describe('Button', () => {
  it('renders the label', () => {
    const wrapper = mount(CButton, { props: { label: 'Submit' } })
    expect(wrapper.text()).toContain('Submit')
  })

  it('renders slot content', () => {
    const wrapper = mount(CButton, { slots: { default: '<strong>Go</strong>' } })
    expect(wrapper.find('strong').text()).toBe('Go')
  })

  it('applies the c-button class', () => {
    const wrapper = mount(CButton, { props: { label: 'Go' } })
    expect(wrapper.find('button').classes()).toContain('c-button')
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

  it('sets the disabled attribute when disabled', () => {
    const wrapper = mount(CButton, { props: { label: 'Go', disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('omits the disabled attribute when not disabled', () => {
    const wrapper = mount(CButton, { props: { label: 'Go' } })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('forwards fallthrough attributes', () => {
    const wrapper = mount(CButton, { props: { label: 'Go', 'aria-label': 'Submit now' } })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Submit now')
  })
})
