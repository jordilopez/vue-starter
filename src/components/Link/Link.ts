export interface LinkProps {
  /** Destination URL. Required. */
  href: string
  /** Visible label text inside the link. */
  label?: string
  /** When `true`, prevents navigation and dims the link. */
  disabled?: boolean
  /** Native target, e.g. `'_self' | '_blank'`. */
  target?: string
  /** Native rel. Merged with `noopener noreferrer` when opening in a new tab. */
  rel?: string
  /** When `true`, opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`). */
  openInNewTab?: boolean
}

export interface LinkEmits {
  /** Fired on click when `disabled` is `false`. */
  click: [event: MouseEvent]
}
