import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  
  {
    ignores: ['node_modules', 'build'],
    languageOptions: {
      ecmaVersion: 2020, // or 2021, 2022 depending on your target ECMAScript version
      sourceType: 'module',
    },
    rules:{
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_|req|res|next' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      "@typescript-eslint/no-namespace": "off"
    }
  }
);