import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from '@vue/eslint-config-prettier'

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // Vue 3 essential rules
  ...vue.configs['flat/essential'],

  // Prettier configuration
  prettier,

  // Global configuration
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // Vue globals
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    rules: {
      // Disable multi-word component names rule for Vue
      'vue/multi-word-component-names': 'off',
    },
  },

  // Configuration files specific rules
  {
    files: ['*.config.js', '*.config.mjs', '*.config.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },

  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
