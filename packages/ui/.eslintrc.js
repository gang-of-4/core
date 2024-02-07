module.exports = {
  extends: ["custom/react-internal"],
  parserOptions: {
    parser: '@babel/eslint-parser',
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"]
      }
    }
  },
  rules: {
    "no-bitwise": "off",
    "react-hooks/exhaustive-deps": "off"
  }
};