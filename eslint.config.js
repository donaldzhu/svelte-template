import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.stylisticTypeChecked,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    plugins: {
      import: importPlugin
    }
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig
      }
    }
  },
  {
    rules: {
      indent: ['error', 2, { ignoredNodes: ['TemplateLiteral *'] }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      'svelte/require-each-key': 'off',
      'no-multiple-empty-lines': 'off',
      'no-irregular-whitespace': 'off',
      'no-unused-vars': 'off',
      'no-constant-condition': 'warn',
      'no-useless-rename': 'error',
      'no-multiple-empty-lines': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-for-of': 'off',
      'svelte/no-unused-class-name': 'warn',
      'svelte/prefer-class-directive': 'warn',
      'svelte/prefer-style-directive': 'warn',
      'svelte/shorthand-attribute': 'warn',
      'svelte/shorthand-directive': 'warn',
      'svelte/sort-attributes': 'warn',
      'svelte/no-trailing-spaces': 'error',
      /* 'svelte/consistent-selector-style': 'warn', */
      'import/no-named-as-default': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'unknown',
            'type',
          ],
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true
          },

        }
      ],
    },
  }
)