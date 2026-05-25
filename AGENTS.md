# AI Agent Context — Vue Starter

## Project overview

A Vue 3 starter project with TypeScript, Vite, Storybook, CSS Modules,
Vitest, and pre-commit hooks (ESLint + Prettier + Gitleaks).

## Tech stack

| Layer            | Choice                                                  |
| ---------------- | ------------------------------------------------------- |
| Framework        | Vue 3 (`<script setup lang="ts">`)                      |
| Language         | TypeScript (strict mode)                                |
| Build            | Vite 8                                                  |
| Testing          | Vitest + `@vue/test-utils` (unit), Playwright (browser) |
| Storybook        | v10 + addon-a11y + addon-docs + vitest addon            |
| Styling          | CSS Modules (`*.module.css`, native CSS nesting)        |
| Variants / state | `data-*` attributes instead of modifier classes         |
| Linting          | ESLint (flat config) + Prettier                         |
| Secrets          | Gitleaks (pre-commit hook)                              |
| Git hooks        | Husky + lint-staged                                     |
| Node             | v24 (`.nvmrc`)                                          |

## Project structure

```
src/
├── main.ts
├── App.vue
├── env.d.ts
├── style.css                       # Global styles
├── composables/
│   └── use-namespace.ts             # Data-attribute + naming helpers
└── components/
    ├── Button/
    │   ├── c-button.vue             # Component SFC
    │   ├── c-button.module.css      # CSS Module (native nesting)
    │   ├── c-button.ts              # Props / emits / types
    │   ├── c-button.spec.ts         # Unit test
    │   └── c-button.stories.ts      # Storybook story
    ├── Accordion/
    │   ├── c-accordion.vue
    │   ├── c-accordion.module.css
    │   ├── c-accordion.ts
    │   ├── c-accordion.spec.ts
    │   └── c-accordion.stories.ts
    └── Page/
        ├── l-page.vue               # Layout component
        ├── l-page.module.css
        ├── l-page.ts
        ├── l-page.spec.ts
        └── l-page.stories.ts
```

## Conventions

### Naming

| Prefix | Use                 | Examples                  |
| ------ | ------------------- | ------------------------- |
| `c-`   | Reusable components | `c-button`, `c-accordion` |
| `l-`   | Layout wrappers     | `l-page`, `l-sidebar`     |
| `u-`   | Utility helpers     | `u-visually-hidden`       |

**Folder names** are descriptive (no prefix). **File names** include the
prefix: `Button/c-button.vue`, `Page/l-page.vue`.

### Vue components

- Always `<script setup lang="ts">`
- Props defined in a dedicated `.ts` file, imported and used with
  `defineProps<Type>()` / `withDefaults(defineProps<Type>(), {…})`
- Emits typed with `defineEmits<Type>()` (interface from `.ts` file)
- All state and variants use `data-*` attributes (never modifier classes)

### CSS Modules

- Files named `*.module.css`, imported as `import styles from './foo.module.css'`
- Classes accessed via `styles.className`
- **Native CSS nesting** everywhere (`&.sm`, `&:hover`, `.parent &`)
- Variant classes only for visual presets; state goes in `data-*` attrs

### Data attributes over modifier classes

Instead of `<div class="panel is-open">`, use
`<div :class="styles.panel" v-bind="ns.data('open', true)">`.

The `useNamespace()` composable generates consistent data attribute names:

```
ns.data('disabled', true)   →  { 'data-c-button-disabled': '' }
ns.data('open', false)      →  undefined  (attribute is omitted)
ns.data('variant', 'ghost') →  { 'data-c-button-variant': 'ghost' }
```

CSS targets these via:

```css
.button:where([data-c-button-disabled]) { … }
.panel:where([data-c-accordion-open]) { … }
```

### Component folder structure

Each component has its own folder named descriptively, containing exactly
these files:

```
ComponentName/
├── c-component.vue          # SFC
├── c-component.module.css   # Styles (CSS Module, native nesting)
├── c-component.ts           # TypeScript types
├── c-component.spec.ts      # Vitest unit tests
└── c-component.stories.ts   # Storybook stories
```

### Testing

- Unit tests colocated: `ComponentName/c-component.spec.ts`
- Use `@vue/test-utils` `mount()` + `vitest` assertions
- Check CSS Module classes with `wrapper.classes().some(c => c.includes('…'))`
- Check data attributes with `wrapper.attributes('data-c-…')`

### Scripts

```bash
npm run dev              # Vite dev server
npm run build            # Production build
npm test                 # Run unit tests
npm run test:watch       # Watch mode
npm run coverage         # With coverage report
npm run format           # Prettier all source
npm run lint             # ESLint check
npm run storybook        # Storybook dev (port 6006)
```

### Pre-commit hooks

1. `prettier --write` on staged `.ts/.vue/.css/.json/.md`
2. `eslint --fix` on staged `.ts/.vue`
3. `gitleaks protect --staged` on all staged files

## Vite / Vitest configs

- `vite.config.ts` — Vite with Vue plugin
- `vitest.config.ts` — Two projects: `unit` (jsdom) and `storybook` (browser)
- Path alias `@/` maps to `src/`
