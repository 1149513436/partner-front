module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "@babel/eslint-parser",
    },
    plugins: ["import"],
    settings: {
    "import/resolver": {
      // 使用 Vite 的默认导入解析器
      vite: {
        root: process.cwd(),
        alias: {},
      },
    },
    },
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "no-debugger": "off",
      "vue/no-unused-components": "off",
      "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": ["error", "always", { js: "never", vue: "never" }],
    },
  };