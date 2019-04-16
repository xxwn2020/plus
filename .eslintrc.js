module.exports = {
  extends: ["standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "indent": [
      "error",
      2
    ]
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: false
  },
  overrides: [
    // {
    //   "files": [
    //     "*.vue",
    //     "*.js"
    //   ],
    //   "rules": {
    //     "indent": [
    //       "error",
    //       2
    //     ],
    //     "vue/script-indent": [
    //       "error",
    //       2
    //     ],
    //     "eqeqeq": ["error", "always"]
    //   }
    // }
  ]
};
