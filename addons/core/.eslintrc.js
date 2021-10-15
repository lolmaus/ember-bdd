'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'ember', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'standard',
    // This one should come last
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    camelcase: 'off', // Have to keep this off for the TS equivalent to take precedence
    'no-console': ['error', { allow: ['debug', 'error', 'info', 'warn'] }],
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off', // Need this for cyclic references
    'no-useless-constructor': 'off', // This rule crashes ESLint unless disabled
    'prefer-const': 'error', // Only use `let` when you are actually mutating the variable
    'prettier/prettier': 'error',
  },
  overrides: [
    // TypeScript
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off', // Can't fully get rid of it due to TS quirks and issues with third-party depenecies
        '@typescript-eslint/camelcase': 'off', // Allow two levels of separation, e. g. ProductWizard_SidebarConfig_ListWithHeader_Component_Args
        '@typescript-eslint/class-name-casing': 'off', // Allow two levels of separation, e. g. ProductWizard_SidebarConfig_ListWithHeader_Component_Args
        '@typescript-eslint/explicit-function-return-type': 'error', // We want to be strict with types
        '@typescript-eslint/no-empty-interface': 'off', // Required for simplified typing of Mirage and Ember Data
        '@typescript-eslint/no-non-null-assertion': 'off', // When I do it, I mean it.
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/prefer-regexp-exec': 'off', // string.match works the way regexp.exec can't
      },
    },
    // node files
    {
      files: [
        '.eslintrc.js',
        '.lintstagedrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js',
        'lighthouserc.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      }),
    },
    {
      files: ['tests/**/*.ts', 'tests/**/*.js', 'addon-test-support/steps.ts'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off', // Chai needs this
      },
    },
    // {
    //   files: ['lib/**/*.ts', 'lib/**/*.js'],
    //   rules: {
    //     'node/no-unpublished-require': 'off', // dependencies are installed into the app's package.json
    //   },
  ],
};
