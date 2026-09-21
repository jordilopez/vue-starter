import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CTextField from './TextField.vue'

describe('TextField', () => {
  it('renders an input element', () => {
    const wrapper = mount(CTextField)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('applies the c-text-field class', () => {
    const wrapper = mount(CTextField)
    expect(wrapper.find('input').classes()).toContain('c-text-field')
  })

  it('defaults to type text', () => {
    const wrapper = mount(CTextField)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('sets the native type attribute', () => {
    const wrapper = mount(CTextField, { props: { type: 'email' } })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('renders the current value', () => {
    const wrapper = mount(CTextField, { props: { modelValue: 'hello' } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('hello')
  })

  it('emits update:modelValue with the new value on input', async () => {
    const wrapper = mount(CTextField, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toEqual([['new value']])
  })

  it('emits the native input event', async () => {
    const wrapper = mount(CTextField)
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted()).toHaveProperty('input')
  })

  it('emits change on change', async () => {
    const wrapper = mount(CTextField)
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('change')
  })

  it('emits focus and blur', async () => {
    const wrapper = mount(CTextField)
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('sets the placeholder attribute', () => {
    const wrapper = mount(CTextField, { props: { placeholder: 'you@example.com' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('you@example.com')
  })

  it('passes through name, id, and autocomplete', () => {
    const wrapper = mount(CTextField, {
      props: { name: 'email', id: 'email-field', autocomplete: 'email' },
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('id')).toBe('email-field')
    expect(input.attributes('autocomplete')).toBe('email')
  })

  it('passes through maxlength and minlength', () => {
    const wrapper = mount(CTextField, { props: { maxlength: 10, minlength: 2 } })
    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe('10')
    expect(input.attributes('minlength')).toBe('2')
  })

  it('sets the disabled attribute when disabled', () => {
    const wrapper = mount(CTextField, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('omits the disabled attribute when enabled', () => {
    const wrapper = mount(CTextField)
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
  })

  it('sets the readonly attribute when readonly', () => {
    const wrapper = mount(CTextField, { props: { readonly: true } })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('sets the required attribute when required', () => {
    const wrapper = mount(CTextField, { props: { required: true } })
    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('sets aria-invalid when invalid', () => {
    const wrapper = mount(CTextField, { props: { invalid: true } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('omits aria-invalid when not invalid', () => {
    const wrapper = mount(CTextField)
    expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
  })

  it('does not emit update:modelValue during IME composition', () => {
    const wrapper = mount(CTextField)
    const input = wrapper.find('input').element as HTMLInputElement
    input.value = 'にほんご'
    input.dispatchEvent(new InputEvent('input', { isComposing: true }))
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('still emits the native input event during IME composition', () => {
    const wrapper = mount(CTextField)
    const input = wrapper.find('input').element as HTMLInputElement
    input.dispatchEvent(new InputEvent('input', { isComposing: true }))
    expect(wrapper.emitted()).toHaveProperty('input')
  })

  it('commits the value on compositionend', () => {
    const wrapper = mount(CTextField)
    const input = wrapper.find('input').element as HTMLInputElement
    input.value = '日本語'
    input.dispatchEvent(new CompositionEvent('compositionend'))
    expect(wrapper.emitted('update:modelValue')).toEqual([['日本語']])
  })
})
