import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LPage from './Page.vue'

describe('Page', () => {
  it('renders default slot content', () => {
    const wrapper = mount(LPage, {
      slots: { default: 'Hello' },
    })
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders title and subtitle', () => {
    const wrapper = mount(LPage, {
      props: { title: 'Home', subtitle: 'Welcome' },
    })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Welcome')
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(LPage, {
      slots: { header: '<span>extra</span>' },
    })
    expect(wrapper.find('header').text()).toContain('extra')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(LPage, {
      slots: { footer: '© 2025' },
    })
    expect(wrapper.text()).toContain('© 2025')
  })

  it('applies centered class', () => {
    const wrapper = mount(LPage, {
      props: { centered: true },
      slots: { default: 'Hi' },
    })
    expect(
      wrapper
        .find('main')
        .classes()
        .some((c) => c.includes('centered')),
    ).toBe(true)
  })

  it('applies narrow class', () => {
    const wrapper = mount(LPage, {
      props: { narrow: true },
      slots: { default: 'Hi' },
    })
    expect(
      wrapper
        .find('main')
        .classes()
        .some((c) => c.includes('narrow')),
    ).toBe(true)
  })
})
