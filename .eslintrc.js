module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'unicorn',
  ],
  rules: {
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/filename-case': 'off',
  },
};
