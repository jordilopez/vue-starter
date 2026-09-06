import type { LucideIcon } from '@lucide/vue'
import { CircleCheck, CircleX, Info, TriangleAlert, X } from '@lucide/vue'

/** Toast severity variants. Drives the accent icon and coloring. */
export type ToastVariant = 'info' | 'success' | 'error' | 'warning'

/**
 * Props for the headless `CToast` — native dialog attributes plus the
 * `variant` and `autoCloseSeconds` behavior flags. The native `open`
 * attribute is omitted; the dialog is opened imperatively on mount.
 */
export interface ToastProps {
  /** Visual severity. Defaults to `'info'`. */
  variant?: ToastVariant
  /** Seconds before the toast auto-dismisses. `0` disables auto-close. */
  autoCloseSeconds?: number
}

/** Events emitted by the headless `CToast` component. */
export interface ToastEmits {
  /** Fired when the toast closes (via close button, Escape, or auto-dismiss). */
  close: [event: Event]
}

/**
 * Exhaustive variant → icon mapping.
 *
 * The `never` guard makes the compiler fail the build whenever a
 * `ToastVariant` is added without a matching case here.
 */
export function getToastIcon(variant: ToastVariant): LucideIcon {
  switch (variant) {
    case 'info':
      return Info
    case 'success':
      return CircleCheck
    case 'error':
      return CircleX
    case 'warning':
      return TriangleAlert
    default: {
      // Exhaustiveness guard: compiles only when every variant is handled.
      const _exhaustive: never = variant
      return _exhaustive
    }
  }
}

/** Icon for the close button. */
export const closeIcon = X
