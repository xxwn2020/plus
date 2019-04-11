module.exports = {
  extends: ["standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "vue": {
      "script-indent": [
        "error",
        2,
        {
          "baseIndent": 1,
          "switchCase": 1,
          "ignores": []
        }
      ],
    },
    "indent": [
      "error",
      2
    ],
  },
  "overrides": [
    {
      "files": [
        "*.vue"
      ],
      "rules": {
        "indent": "off"
      }
    }
  ]
};
