module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'no-extra-semi': 0,
    semi: 0,
    'prettier/prettier': [
      'warn',
      { semi: false, singleQuote: true, trailingComma: 'es5' },
    ],
    'class-methods-use-this': 0,
    'no-multi-assign': 0,
    'no-use-before-define': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-loop-func': 0,
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,

    'react/no-unescaped-entities': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
}
