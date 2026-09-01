# Vue Starter

A modern Vue 3 starter project with TypeScript, Vite, Storybook, headless
components styled by the shared css-starter design system, and
comprehensive testing — ready to build from day one.

## Stack

- **Vue 3** — Composition API with `<script setup lang="ts">`
- **TypeScript** — strict mode, bundled with Vite
- **Vite 8** — fast dev server and builds
- **Storybook 10** — component explorer with a11y, docs, and vitest addons
- **css-starter** — shared design system (tokens, reset, native element styles)
- **Headless components** — no local styles on primitives; css-starter
  styles native elements directly
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

| Prefix | Use                           | Examples    |
| ------ | ----------------------------- | ----------- |
| `c-`   | Class hook on UI primitives   | `.c-button` |
| `l-`   | Class hook on layout wrappers | `.l-page`   |

Folder and file names are descriptive `PascalCase` (no prefix):

```
src/components/
├── Button/
│   ├── Button.vue
│   ├── Button.ts
│   ├── Button.spec.ts
│   └── Button.stories.ts
├── Link/
│   ├── Link.vue
│   ├── Link.ts
│   ├── Link.spec.ts
│   └── Link.stories.ts
├── Accordion/
│   └── …
└── Page/
    └── …
```

### Headless primitives

UI primitives like `CButton` are **headless**: no local CSS, no modifier
classes. They render the native element and let css-starter style it:

```vue
<button type="button" class="c-button" :disabled="props.disabled" @click="handleClick">
  <slot>{{ label }}</slot>
</button>
```

- The visual comes from css-starter's native element styles
  (`:where(button)`) and tokens (`--btn-*`, `--c-*`, …)
- Native semantics win: `disabled`, `aria-*`, `type` — not custom state
  attributes
- Attributes fall through to the native element automatically

Components with bespoke behavior (e.g. `Accordion`, `Page`) may keep a
local `*.module.css` with native CSS nesting and their own state
attributes (`data-open`).

### Each component folder contains

- `{Name}.vue` — the SFC (`<script setup lang="ts">`)
- `{Name}.ts` — TypeScript interfaces (props, emits, slots)
- `{Name}.spec.ts` — Vitest unit tests
- `{Name}.stories.ts` — Storybook stories
- `{Name}.module.css` — only when the component needs local styles

### CSS

Local styles use **native CSS nesting**:

```css
.button {
  padding: 0.5em 1.2em;

  &:hover {
    opacity: 0.9;
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

Opens at [http://localhost:6006](http://localhost:6006). Dark mode follows
your system preference automatically.

## License

MIT
