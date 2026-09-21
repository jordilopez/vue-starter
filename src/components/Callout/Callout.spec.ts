import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CCallout from './Callout.vue'

describe('Callout', () => {
  it('renders as a .callout with the default info tone and status role', () => {
    const wrapper = mount(CCallout, { slots: { default: 'Message' } })
    const root = wrapper.find('.callout')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('callout--info')
    expect(root.attributes('role')).toBe('status')
    expect(root.text()).toContain('Message')
  })

  it('applies the tone modifier class', () => {
    const wrapper = mount(CCallout, {
      props: { tone: 'warning', title: 'Careful' },
      slots: { default: 'Watch out' },
    })
    expect(wrapper.find('.callout').classes()).toContain('callout--warning')
  })

  it('exposes an assertive role when requested', () => {
    const wrapper = mount(CCallout, {
      props: { tone: 'error', role: 'alert' },
      slots: { default: 'Failure' },
    })
    expect(wrapper.find('.callout').attributes('role')).toBe('alert')
  })

  it('renders the title in a .callout__title and a decorative per-tone icon', () => {
    const wrapper = mount(CCallout, {
      props: { tone: 'success', title: 'Saved' },
      slots: { default: 'Done' },
    })
    expect(wrapper.find('.callout__title').text()).toBe('Saved')
    const icon = wrapper.find('.callout__icon')
    expect(icon.attributes('aria-hidden')).toBe('true')
    expect(icon.find('svg').exists()).toBe(true)
  })

  it('omits the title element when neither prop nor slot is provided', () => {
    const wrapper = mount(CCallout, { slots: { default: 'Body only' } })
    expect(wrapper.find('.callout__title').exists()).toBe(false)
    expect(wrapper.find('.callout__body').text()).toBe('Body only')
  })
})
