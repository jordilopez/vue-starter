export interface ButtonProps {
  /** Visible label text inside the button. */
  label?: string
  /** When `true`, prevents interaction and dims the button. */
  disabled?: boolean
}

export interface ButtonEmits {
  /** Fired on click when `disabled` is `false`. */
  click: []
}
