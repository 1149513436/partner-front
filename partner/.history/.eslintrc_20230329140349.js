module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // 浏览器环境中的全局变量。
    es6: true // 启
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/require-default-prop': 'off',
    'vue/max-attributes-per-line': 'off'
  }
}
