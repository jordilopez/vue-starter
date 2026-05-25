export interface PageProps {
  /** Page-level heading rendered inside `<h1>`. */
  title?: string
  /** Smaller description rendered below the title. */
  subtitle?: string
  /** When `true`, vertically centres the main content area. */
  centered?: boolean
  /** When `true`, constrains the main content to 720 px. */
  narrow?: boolean
}

export interface PageSlots {
  /** Primary content rendered inside `<main>`. */
  default(): unknown
  /** Optional content appended to the `<header>` block. */
  header?(): unknown
  /** Optional content rendered inside `<footer>`. */
  footer?(): unknown
}
