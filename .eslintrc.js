module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
  },
  env: {
    node: true,
    es2021: true,
  },
}
