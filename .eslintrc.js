module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-indent': ['error', 2],
    'react/no-unknown-property': ['error', { ignore: ['css'] }]
  },
  globals: {
    cy: true
  }
}
