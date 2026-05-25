import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

/**
 * ESLint flat configuration.
 *
 * Combines:
 * - `@eslint/js` recommended rules
 * - `typescript-eslint` for TypeScript files
 * - `eslint-plugin-vue` for Vue SFCs (with TypeScript parser)
 * - `eslint-config-prettier` to disable rules that conflict with Prettier
 */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        KeyboardEvent: 'readonly',
        HTMLElement: 'readonly',
        MouseEvent: 'readonly',
        FocusEvent: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  prettier,
]
