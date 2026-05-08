import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    extends: [
      js.configs.recommended, // Recommended JavaScript rules
      ...tseslint.configs.recommended, // Recommended TypeScript rules
    ],
    files: ['**/*.{ts,tsx}'], // Apply to TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 syntax
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Apply recommended React Hooks rules
      'no-console': 'error',
    },
  },
]);

export default eslintConfig;
