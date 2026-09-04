/** Props for the headless `CButton` component. */
export interface ButtonProps {
  /** Visible label text inside the button. */
  label?: string
  /** When `true`, prevents interaction and dims the button. */
  disabled?: boolean
}

/** Events emitted by the headless `CButton` component. */
export interface ButtonEmits {
  /** Fired on click when `disabled` is `false`. */
  click: []
}
