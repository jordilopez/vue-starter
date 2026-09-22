import type { LucideIcon } from '@lucide/vue'
import { CircleCheck, CircleX, Info, TriangleAlert } from '@lucide/vue'

/** Callout tone. Drives the `.callout--<tone>` modifier and accent icon. */
export type CalloutTone = 'info' | 'success' | 'warning' | 'error'

/** Props for the headless `CCallout`. */
export interface CalloutProps {
  /** Visual tone. Defaults to `'info'`. */
  tone?: CalloutTone
  /**
   * ARIA role. `status` (the default) exposes the callout as a polite live
   * region; use `alert` for assertive errors.
   */
  role?: 'status' | 'alert'
  /** Optional bold title row (falls back to the `title` slot). */
  title?: string
}

/**
 * Exhaustive tone → icon mapping (mirrors `Toast`'s `getToastIcon`).
 *
 * The `never` guard makes the compiler fail the build whenever a
 * `CalloutTone` is added without a matching case here.
 */
export function getCalloutIcon(tone: CalloutTone): LucideIcon {
  switch (tone) {
    case 'info':
      return Info
    case 'success':
      return CircleCheck
    case 'warning':
      return TriangleAlert
    case 'error':
      return CircleX
    default: {
      // Exhaustiveness guard: compiles only when every tone is handled.
      const _exhaustive: never = tone
      return _exhaustive
    }
  }
}
