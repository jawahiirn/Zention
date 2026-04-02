import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import js from '@eslint/js';
import nextTs from 'eslint-config-next/typescript';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

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
      prettier, // Disable conflicting ESLint rules
    ],
    files: ['**/*.{ts,tsx}'], // Apply to TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 syntax
    },
    plugins: {
      prettier: prettierPlugin, // Integrate Prettier into ESLint
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Apply recommended React Hooks rules
      'prettier/prettier': 'warn', // Enforce Prettier formatting
    },
  },
]);

export default eslintConfig;
