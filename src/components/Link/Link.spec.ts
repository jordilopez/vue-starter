import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CLink from './Link.vue'

describe('Link', () => {
  it('renders the label', () => {
    const wrapper = mount(CLink, { props: { href: 'https://example.com', label: 'Submit' } })
    expect(wrapper.text()).toContain('Submit')
  })

  it('renders slot content', () => {
    const wrapper = mount(CLink, {
      props: { href: 'https://example.com' },
      slots: { default: '<strong>Go</strong>' },
    })
    expect(wrapper.find('strong').text()).toBe('Go')
  })

  it('applies the c-link class', () => {
    const wrapper = mount(CLink, { props: { href: 'https://example.com', label: 'Go' } })
    expect(wrapper.find('a').classes()).toContain('c-link')
  })

  it('sets the href attribute', () => {
    const wrapper = mount(CLink, { props: { href: '/docs', label: 'Go' } })
    expect(wrapper.find('a').attributes('href')).toBe('/docs')
  })

  it('emits click on click', async () => {
    const wrapper = mount(CLink, { props: { href: '#section', label: 'Go' } })
    await wrapper.find('a').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(CLink, { props: { href: '#section', label: 'Go', disabled: true } })
    await wrapper.find('a').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  it('omits the href attribute when disabled', () => {
    const wrapper = mount(CLink, { props: { href: '/docs', label: 'Go', disabled: true } })
    expect(wrapper.find('a').attributes('href')).toBeUndefined()
  })

  it('sets aria-disabled when disabled', () => {
    const wrapper = mount(CLink, { props: { href: '/docs', label: 'Go', disabled: true } })
    expect(wrapper.find('a').attributes('aria-disabled')).toBe('true')
  })

  it('omits aria-disabled when not disabled', () => {
    const wrapper = mount(CLink, { props: { href: '/docs', label: 'Go' } })
    expect(wrapper.find('a').attributes('aria-disabled')).toBeUndefined()
  })

  it('opens in a new tab with noopener noreferrer rel', () => {
    const wrapper = mount(CLink, {
      props: { href: 'https://example.com', label: 'Go', openInNewTab: true },
    })
    expect(wrapper.find('a').attributes('target')).toBe('_blank')
    expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
  })

  it('auto-adds rel when target is _blank and merges existing rel', () => {
    const wrapper = mount(CLink, {
      props: { href: 'https://example.com', label: 'Go', target: '_blank', rel: 'nofollow' },
    })
    expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer nofollow')
  })

  it('prevents default navigation when disabled', () => {
    const wrapper = mount(CLink, { props: { href: '/docs', label: 'Go', disabled: true } })
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    wrapper.find('a').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })
})
