const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'babel',
    'import',
    '@typescript-eslint',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      typescript: {},
    },
  },
  globals: {
    '$Diff': true,
  },
  rules: {
    'babel/quotes': [error, 'single'],
    'comma-dangle': [
      error,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'function-paren-newline': [error, 'consistent'],
    'global-require': off,
    'import/extensions': off,
    'import/named': off,
    'import/no-cycle': off,
    'import/no-deprecated': off,
    'import/no-duplicates': off,
    'import/no-extraneous-dependencies': off,
    'import/no-self-import': off,
    'import/no-unresolved': off,
    'import/order': off,
    'import/prefer-default-export': off,
    indent: off,
    'max-len': [error, 150, { ignoreComments: true }],
    'no-console': off,
    'no-redeclare': off,
    'no-mixed-operators': off,
    'no-multiple-empty-lines': [error, { max: error, maxEOF: error }],
    'no-implicit-coercion': error,
    'no-shadow': off,
    'no-undef': off,
    'no-underscore-dangle': off,
    'no-unused-vars': [
      warn, {
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_|^[A-Z]|^[가-힣]',
        argsIgnorePattern: '$',
      },
    ],
    'no-warning-comments': [
      warn,
      {
        terms: ['TODO', 'FIXME', 'XXX', 'BUG', 'NOTE'],
        location: 'anywhere',
      },
    ],
    'object-curly-newline': [error, { consistent: true }],
    'prefer-spread': off,
    'quotes': off,
    'space-infix-ops': off,
    '@typescript-eslint/camelcase': warn,
    '@typescript-eslint/explicit-function-return-type': off,
    '@typescript-eslint/explicit-member-accessibility': off,
    '@typescript-eslint/indent': off,
    '@typescript-eslint/no-explicit-any': off,
    '@typescript-eslint/no-unused-vars': off,
  },
};
