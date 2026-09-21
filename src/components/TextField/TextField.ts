/** Props for the headless `CTextField` component. */
export interface TextFieldProps {
  /** Current value (v-model). */
  modelValue?: string
  /** Native input type. Defaults to `'text'`. */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  /** Placeholder text shown when the field is empty. */
  placeholder?: string
  /** Native form name. */
  name?: string
  /** Native id — required when pairing with an external `<label for>`. */
  id?: string
  /** Native autocomplete hint, e.g. `'email'`, `'current-password'`. */
  autocomplete?: string
  /** Maximum number of characters allowed. */
  maxlength?: number
  /** Minimum number of characters required. */
  minlength?: number
  /** When `true`, prevents interaction and dims the field. */
  disabled?: boolean
  /** When `true`, makes the field read-only. */
  readonly?: boolean
  /** When `true`, marks the field as required for native form validation. */
  required?: boolean
  /** When `true`, announces the field as invalid via `aria-invalid`. */
  invalid?: boolean
}

/** Events emitted by the headless `CTextField` component. */
export interface TextFieldEmits {
  /** Fired on every keystroke to support v-model. */
  'update:modelValue': [value: string]
  /** Fired on native `input`. */
  input: [event: Event]
  /** Fired on native `change`. */
  change: [event: Event]
  /** Fired on native `focus`. */
  focus: [event: FocusEvent]
  /** Fired on native `blur`. */
  blur: [event: FocusEvent]
}
