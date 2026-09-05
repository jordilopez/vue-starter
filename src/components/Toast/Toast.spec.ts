import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CToast from './Toast.vue'

/**
 * jsdom does not implement `showModal`/`close` on HTMLDialogElement,
 * so the Toast tests install local mocks: `showModal` flips `open`
 * to true, `close` flips it back and dispatches the native `close`
 * event (mimicking browser behavior).
 */
function installDialogMocks() {
  const prototype = HTMLDialogElement.prototype
  const originalShow = Object.getOwnPropertyDescriptor(prototype, 'showModal')
  const originalClose = Object.getOwnPropertyDescriptor(prototype, 'close')

  const showModal = vi.fn().mockImplementation(function (this: HTMLDialogElement) {
    this.open = true
  })
  const close = vi.fn().mockImplementation(function (this: HTMLDialogElement) {
    this.open = false
    this.dispatchEvent(new Event('close'))
  })

  Object.defineProperty(prototype, 'showModal', { value: showModal, configurable: true })
  Object.defineProperty(prototype, 'close', { value: close, configurable: true })

  return {
    showModal,
    close,
    restore() {
      if (originalShow) {
        Object.defineProperty(prototype, 'showModal', originalShow)
      } else {
        Reflect.deleteProperty(prototype, 'showModal')
      }
      if (originalClose) {
        Object.defineProperty(prototype, 'close', originalClose)
      } else {
        Reflect.deleteProperty(prototype, 'close')
      }
    },
  }
}

describe('Toast', () => {
  let mocks: ReturnType<typeof installDialogMocks>

  beforeEach(() => {
    mocks = installDialogMocks()
  })

  afterEach(() => {
    mocks.restore()
    vi.useRealTimers()
  })

  it('renders a native dialog with slot content', () => {
    const wrapper = mount(CToast, { slots: { default: 'Saved successfully' } })
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('Saved successfully')
  })

  it('calls showModal on mount', () => {
    mount(CToast, { slots: { default: 'Default' } })
    expect(mocks.showModal).toHaveBeenCalledTimes(1)
  })

  it('applies the c-toast class and the module class to the dialog', () => {
    const wrapper = mount(CToast, { slots: { default: 'Default' } })
    const classes = wrapper.find('dialog').classes()
    expect(classes).toContain('c-toast')
    expect(classes.length).toBeGreaterThan(1)
  })

  it('defaults to the info variant with its icon', () => {
    const wrapper = mount(CToast, { slots: { default: 'Heads up' } })
    expect(wrapper.find('dialog').attributes('data-variant')).toBe('info')
    expect(wrapper.find('.lucide-info').exists()).toBe(true)
  })

  it.each([
    ['success', '.lucide-circle-check'],
    ['error', '.lucide-circle-x'],
    ['warning', '.lucide-triangle-alert'],
  ] as const)('renders the %s variant icon', (variant, iconClass) => {
    const wrapper = mount(CToast, { props: { variant }, slots: { default: 'Look' } })
    expect(wrapper.find('dialog').attributes('data-variant')).toBe(variant)
    expect(wrapper.find(iconClass).exists()).toBe(true)
  })

  it('renders an accessible close button that closes the dialog and emits close', async () => {
    const wrapper = mount(CToast, { slots: { default: 'Dismiss me' } })
    const closeButton = wrapper.find('button[aria-label="Close toast"]')
    expect(closeButton.exists()).toBe(true)

    await closeButton.trigger('click')
    expect(mocks.close).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('auto-closes after the configured number of seconds', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, {
      props: { autoCloseSeconds: 2 },
      slots: { default: 'Auto close' },
    })
    expect(mocks.close).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    expect(mocks.close).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1000)
    expect(mocks.close).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('clears the auto-close timer on unmount', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, { props: { autoCloseSeconds: 2 }, slots: { default: 'Unmount' } })
    wrapper.unmount()
    await vi.advanceTimersByTimeAsync(5000)
    expect(mocks.close).not.toHaveBeenCalled()
  })

  it('clears the pending timer after manual dismissal (no double close)', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, { props: { autoCloseSeconds: 1 }, slots: { default: 'Manual' } })
    await wrapper.find('button[aria-label="Close toast"]').trigger('click')
    expect(mocks.close).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(10_000)
    expect(mocks.close).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('does not schedule auto-close when autoCloseSeconds is 0', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, { props: { autoCloseSeconds: 0 }, slots: { default: 'Sticky' } })
    await vi.advanceTimersByTimeAsync(60_000)
    expect(mocks.close).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('reschedules auto-close when autoCloseSeconds changes from 0 to a positive value', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, { props: { autoCloseSeconds: 0 }, slots: { default: 'Sticky' } })
    await vi.advanceTimersByTimeAsync(10_000)
    expect(mocks.close).not.toHaveBeenCalled()

    await wrapper.setProps({ autoCloseSeconds: 1 })
    await vi.advanceTimersByTimeAsync(999)
    expect(mocks.close).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(mocks.close).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('clears the pending auto-close timer when autoCloseSeconds changes to 0', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, { props: { autoCloseSeconds: 2 }, slots: { default: 'Sticky' } })
    await wrapper.setProps({ autoCloseSeconds: 0 })

    await vi.advanceTimersByTimeAsync(60_000)
    expect(mocks.close).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('emits close once and clears the timer when dismissed via the Escape/native cancel path', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CToast, { props: { autoCloseSeconds: 5 }, slots: { default: 'Escaped' } })
    const dialog = wrapper.find('dialog').element as HTMLDialogElement

    // Native Escape flow: the browser dispatches `cancel`, then closes the
    // dialog (which fires `close`). jsdom implements neither, so both steps
    // are simulated with native dispatch + close().
    dialog.dispatchEvent(new Event('cancel'))
    dialog.close()

    expect(wrapper.emitted('close')).toHaveLength(1)

    await vi.advanceTimersByTimeAsync(60_000)
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })

  it('does not throw when a consumer passes the open attribute (stripped from fallthrough)', () => {
    const wrapper = mount(CToast, { attrs: { open: true }, slots: { default: 'Open' } })
    // Regression: an inherited `open` used to render the dialog already
    // open, making `showModal()` throw InvalidStateError on mount.
    expect(mocks.showModal).toHaveBeenCalledTimes(1)
    expect(wrapper.find('dialog').element.open).toBe(true)
  })

  it('supports an accessible name via aria-label fallthrough', () => {
    const wrapper = mount(CToast, {
      attrs: { 'aria-label': 'Saved changes' },
      slots: { default: 'Changes saved' },
    })
    expect(wrapper.find('dialog').attributes('aria-label')).toBe('Saved changes')
  })

  it('forwards fallthrough attributes to the dialog', () => {
    const wrapper = mount(CToast, {
      attrs: { role: 'status', 'aria-live': 'polite' },
      slots: { default: 'Heads up' },
    })
    expect(wrapper.find('dialog').attributes('role')).toBe('status')
    expect(wrapper.find('dialog').attributes('aria-live')).toBe('polite')
  })
})
