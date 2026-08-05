# AI Agent Context — Vue Starter

## Project overview

A Vue 3 starter project with TypeScript, Vite, Storybook, headless
components styled by the shared css-starter design system, Vitest, and
pre-commit hooks (ESLint + Prettier + Gitleaks).

## Tech stack

| Layer      | Choice                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Framework  | Vue 3 (`<script setup lang="ts">`)                                                                    |
| Language   | TypeScript (strict mode)                                                                              |
| Build      | Vite 8                                                                                                |
| Testing    | Vitest + `@vue/test-utils` (unit), Playwright (browser)                                               |
| Storybook  | v10 + addon-a11y + addon-docs + vitest addon                                                          |
| Styling    | [css-starter](../css-starter) (tokens + native element styles); optional `*.module.css` per component |
| Components | Headless primitives — no local styles, native semantics                                               |
| Linting    | ESLint (flat config) + Prettier                                                                       |
| Secrets    | Gitleaks (pre-commit hook)                                                                            |
| Git hooks  | Husky + lint-staged                                                                                   |
| Node       | v24 (`.nvmrc`)                                                                                        |

## Project structure

```
src/
├── main.ts
├── App.vue
├── env.d.ts
├── styles/
│   └── index.css               # Imports css-starter (tokens, reset, base styles)
└── components/
    ├── Button/
    │   ├── Button.vue          # Headless SFC (no .module.css)
    │   ├── Button.ts           # Props / emits / types
    │   ├── Button.spec.ts      # Unit test
    │   └── Button.stories.ts   # Storybook story
    ├── Accordion/
    │   ├── Accordion.vue
    │   ├── Accordion.module.css # Local styles (native nesting)
    │   ├── Accordion.ts
    │   ├── Accordion.spec.ts
    │   └── Accordion.stories.ts
    └── Page/
        ├── Page.vue            # Layout component (l-page class)
        ├── Page.module.css
        ├── Page.ts
        ├── Page.spec.ts
        └── Page.stories.ts
```

## Conventions

### Naming

| Prefix | Use                           | Examples    |
| ------ | ----------------------------- | ----------- |
| `c-`   | Class hook on UI primitives   | `.c-button` |
| `l-`   | Class hook on layout wrappers | `.l-page`   |

**Folder and file names** are descriptive `PascalCase` (no prefix):
`Button/Button.vue`, `Page/Page.vue`. The `c-`/`l-` prefixes appear as
CSS **class hooks**, not file names.

### Vue components

- Always `<script setup lang="ts">`
- Props defined in a dedicated `.ts` file, imported and used with
  `defineProps<Type>()` / `withDefaults(defineProps<Type>(), {…})`
- Emits typed with `defineEmits<Type>()` (interface from `.ts` file)
- Native semantics win: `disabled`, `aria-*`, `type` — no custom
  `data-*` state attributes on primitives

### Headless styling

UI primitives (e.g. `CButton`) carry **no local CSS**. They render the
native element with a `c-` class hook and css-starter does the styling:

```vue
<button type="button" class="c-button" :disabled="props.disabled" @click="handleClick">
  <slot>{{ label }}</slot>
</button>
```

- Visuals come from css-starter's native element selectors (`:where(button)`)
  and tokens (`--btn-*`, `--c-*`, …)
- Components with bespoke behavior may keep a `*.module.css` (native CSS
  nesting) and component-specific state attributes (e.g. `data-open` on
  `Accordion` panels)

### Testing

- Unit tests colocated: `ComponentName/{Name}.spec.ts`
- Use `@vue/test-utils` `mount()` + `vitest` assertions
- Check class hooks with `wrapper.find('button').classes()`
- Check native attributes with `wrapper.find('button').attributes('disabled')`

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
