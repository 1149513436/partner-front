module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  plugins: ["vue"],
  rules: {
    // 在这里添加您需要的 ESLint 规则
    "no-console": "error",
    "no-debugger": "error",
    "no-var": "error",
    semi: ["error", "always"],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
  },
};
