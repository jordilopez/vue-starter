/** Visual variant for `c-button`. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/** Size preset for `c-button`. */
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** Visible label text inside the button. */
  label: string
  /** Visual variant — affects background and text colour. */
  variant?: ButtonVariant
  /** Size preset — adjusts padding and font-size. */
  size?: ButtonSize
  /** When `true`, prevents interaction and dims the button. */
  disabled?: boolean
}

export interface ButtonEmits {
  /** Fired on click when `disabled` is `false`. */
  click: []
}
