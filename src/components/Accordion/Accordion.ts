/** A single collapsible panel inside `c-accordion`. */
export interface AccordionItem {
  /** Header text visible in the collapsed state. */
  title: string
  /** Body content revealed when the panel is open. */
  content: string
}

export interface AccordionProps {
  /** Ordered list of panels to render. */
  items: AccordionItem[]
  /** When `true`, multiple panels can stay open simultaneously. */
  allowMultiple?: boolean
}

export interface AccordionEmits {
  /** Fires whenever the set of open indexes changes. */
  'update:open': [indexes: number[]]
}
