import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Camera } from '@lucide/vue'
import CIcon from './Icon.vue'

describe('Icon', () => {
  it('renders the Lucide SVG with the c-icon class', () => {
    const wrapper = mount(CIcon, { props: { icon: Camera } })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.classes()).toContain('c-icon')
    expect(svg.classes()).toContain('lucide-camera')
  })

  it('defaults to 1em sizing and currentColor stroke (no hard-coded px or hex color)', () => {
    const wrapper = mount(CIcon, { props: { icon: Camera } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('1em')
    expect(svg.attributes('height')).toBe('1em')
    expect(svg.attributes('stroke')).toBe('currentColor')
    // Explicit guard against hard-coded defaults like 24px or hex colors:
    expect(svg.attributes('width')).not.toBe('24')
    expect(svg.attributes('stroke')).not.toMatch(/^#/)
  })

  it('is decorative (aria-hidden) when no label is provided', () => {
    const wrapper = mount(CIcon, { props: { icon: Camera } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.attributes('role')).toBeUndefined()
    expect(svg.attributes('aria-label')).toBeUndefined()
  })

  it('exposes the accessible label with role="img" when a label is provided', () => {
    const wrapper = mount(CIcon, {
      props: { icon: Camera },
      attrs: { 'aria-label': 'Take photo' },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-label')).toBe('Take photo')
    expect(svg.attributes('aria-hidden')).toBeUndefined()
  })

  it('merges an external class', () => {
    const wrapper = mount(CIcon, {
      props: { icon: Camera },
      attrs: { class: 'extra' },
    })
    expect(wrapper.find('svg').classes()).toEqual(expect.arrayContaining(['c-icon', 'extra']))
  })

  it('forwards native SVG props and listeners', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(CIcon, {
      props: { icon: Camera },
      attrs: {
        'data-testid': 'camera-icon',
        'stroke-width': '1.5',
        onClick: handleClick,
      },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('data-testid')).toBe('camera-icon')
    expect(svg.attributes('stroke-width')).toBe('1.5')
    await svg.trigger('click')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('updates a11y attributes reactively when the label changes after mount', async () => {
    const wrapper = mount(CIcon, { props: { icon: Camera } })
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('svg').attributes('role')).toBeUndefined()

    await wrapper.setProps({ ariaLabel: 'Take photo' })
    expect(wrapper.find('svg').attributes('role')).toBe('img')
    expect(wrapper.find('svg').attributes('aria-label')).toBe('Take photo')
    expect(wrapper.find('svg').attributes('aria-hidden')).toBeUndefined()

    await wrapper.setProps({ ariaLabel: undefined })
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('svg').attributes('role')).toBeUndefined()
    expect(wrapper.find('svg').attributes('aria-label')).toBeUndefined()
  })

  it('allows overriding size and color', () => {
    const wrapper = mount(CIcon, { props: { icon: Camera, size: 32, color: '#ff0000' } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('32')
    expect(svg.attributes('height')).toBe('32')
    expect(svg.attributes('stroke')).toBe('#ff0000')
  })
})
