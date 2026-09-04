/**
 * Stylelint configuration.
 *
 * Scope: CSS Module files only — run via `npm run lint:css`
 * (glob: `src`/`**`/`*.module.css`).
 *
 * Global styles (`src/styles/index.css`) and story-only CSS
 * (`src/components/Tokens.stories.css`) are intentionally outside this
 * config's scope; they are styled by the shared css-starter design system.
 *
 * - `stylelint-config-standard` provides the base rule set.
 * - `stylelint-use-nesting` enforces native CSS nesting wherever it is
 *   possible, matching the existing nested pattern in Accordion.module.css.
 * - `@custom-media` (processed by postcss-custom-media in postcss.config.js)
 *   is allowed as a project-specific at-rule.
 */
/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-use-nesting'],
  ignoreFiles: [
    'dist/**',
    'node_modules/**',
    'storybook-static/**',
    'playwright-report/**',
    'test-results/**',
  ],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['custom-media'] }],
    // CSS Module class hooks use camelCase (styles.bodyInner) and the
    // project's `c-` / `l-` kebab-case prefixes.
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$',
    // stylelint-use-nesting v6 registers its rule under the `csstools/` prefix.
    'csstools/use-nesting': true,
  },
}
