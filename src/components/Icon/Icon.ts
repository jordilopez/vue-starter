import type { LucideIcon } from '@lucide/vue'

/**
 * Props for the headless `CIcon` — a Lucide icon component plus the
 * Lucide/SVG props the component manages explicitly. All other attributes
 * (`class`, `data-*`, kebab-case SVG attrs, listeners, ...) fall through
 * to the rendered `<svg>` as native attributes.
 */
export type IconProps = {
  /** Lucide icon component to render (use named imports for tree-shaking). */
  icon: LucideIcon
  /** Icon size, e.g. `'1em'` (default) or a pixel number like `32`. */
  size?: string | number
  /** SVG stroke color; inherits surrounding text color by default. */
  color?: string
  /** SVG stroke width, forwarded to the rendered `<svg>`. */
  strokeWidth?: number | string
  /**
   * Accessible label. Omit for decorative icons (rendered with
   * `aria-hidden="true"`); when set, the SVG is exposed with `role="img"`.
   * In templates the kebab-case `aria-label` attribute form also binds to
   * this prop (Vue camelizes attribute names).
   */
  ariaLabel?: string
}
