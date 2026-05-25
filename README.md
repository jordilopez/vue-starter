# Vue Starter

A modern Vue 3 starter project with TypeScript, Vite, Storybook, CSS
Modules (native nesting), and comprehensive testing — ready to build
from day one.

## Stack

- **Vue 3** — Composition API with `<script setup lang="ts">`
- **TypeScript** — strict mode, bundled with Vite
- **Vite 8** — fast dev server and builds
- **Storybook 10** — component explorer with a11y, docs, and vitest addons
- **CSS Modules** — scoped, hashed class names, **native CSS nesting**
- **Data attributes** — component variants and state use `data-*` attrs
  instead of modifier classes
- **Vitest** — unit tests + Storybook integration with Playwright
- **Husky + lint-staged** — pre-commit hooks (Prettier → ESLint → Gitleaks)
- **EditorConfig** — consistent editor settings

## Getting started

```bash
# Clone and enter the project
git clone <repo-url>
cd vue-starter

# Use the correct Node version
nvm use

# Install dependencies
npm install

# Start developing
npm run dev
```

## Available scripts

| Script                    | Description                           |
| ------------------------- | ------------------------------------- |
| `npm run dev`             | Start Vite dev server                 |
| `npm run build`           | Production build to `dist/`           |
| `npm run preview`         | Preview the production build          |
| `npm test`                | Run unit tests (Vitest)               |
| `npm run test:watch`      | Run tests in watch mode               |
| `npm run test:ui`         | Run tests with Vitest UI              |
| `npm run coverage`        | Run tests with coverage report        |
| `npm run format`          | Format all source files with Prettier |
| `npm run lint`            | Lint all source files with ESLint     |
| `npm run storybook`       | Start Storybook on port 6006          |
| `npm run build-storybook` | Build static Storybook site           |

## Component conventions

### Naming

| Prefix | Use                 | Examples                  |
| ------ | ------------------- | ------------------------- |
| `c-`   | Reusable components | `c-button`, `c-accordion` |
| `l-`   | Layout wrappers     | `l-page`, `l-sidebar`     |

Folder names are descriptive without prefixes; the prefix goes on the
file names inside.

```
src/components/
├── Button/
│   ├── c-button.vue
│   ├── c-button.module.css
│   ├── c-button.ts
│   ├── c-button.spec.ts
│   └── c-button.stories.ts
├── Accordion/
│   └── …
└── Page/
    └── l-page.vue …
```

### Each component folder contains

- `c-{name}.vue` — the SFC (`<script setup lang="ts">`)
- `c-{name}.module.css` — scoped styles with native CSS nesting
- `c-{name}.ts` — TypeScript interfaces (props, emits, slots)
- `c-{name}.spec.ts` — Vitest unit tests
- `c-{name}.stories.ts` — Storybook stories

### Data attributes for state

Variants and state use `data-*` attributes instead of modifier classes.

```vue
<!-- Instead of is-open class → -->
<div :class="styles.panel" v-bind="ns.data('open', isOpen || undefined)">
```

```css
/* CSS targets the data attribute via native :where() */
.panel:where([data-c-accordion-open]) { … }
```

The `useNamespace()` composable generates consistent attribute names:
`data-c-button-disabled`, `data-c-button-variant`, `data-c-accordion-open`.

### CSS

All `*.module.css` files use **native CSS nesting**:

```css
.button {
  padding: 0.5em 1.2em;

  &.primary {
    background: #42b883;
  }

  &:hover {
    opacity: 0.9;
  }

  &:where([data-c-button-disabled]) {
    opacity: 0.5;
  }
}
```

## Committing

Pre-commit hooks run automatically:

1. **Prettier** formats staged files
2. **ESLint** lints and auto-fixes staged files
3. **Gitleaks** scans for secrets

All three must pass before the commit goes through.

## Storybook

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

## License

MIT
