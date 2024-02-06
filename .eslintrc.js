module.exports = {
  root: true,
  env: { node: true, browser: true },
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  settings: { react: { version: 'detect' } },
  extends: [
    // JavaScript
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:react/recommended',
    // TypeScript
    'plugin:@typescript-eslint/recommended',
    // Prettier
    'prettier'
  ],
  rules: {
    /** ESLint: @see {@link https://eslint.org/docs/rules/} */
    'eqeqeq': 'error',
    'no-console': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-template-curly-in-string': 'error',
    'no-undef': 'off',
    'no-unreachable': 'error',
    'object-shorthand': 'error',
    'radix': 'error',
    'yoda': 'error',
    /** Node.js: @see {@link https://github.com/mysticatea/eslint-plugin-node#-rules} */
    'node/no-extraneous-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-process-env': 'error',
    'node/no-sync': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
    /** TypeScript: @see {@link https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules} */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    '@typescript-eslint/no-var-requires': 'off'
  }
};
