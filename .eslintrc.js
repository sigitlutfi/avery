module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "unused-imports"],
  rules: {
    "no-undef": "warn", // Change this to "off" to disable it
    "comma-dangle": "off",
    "prettier/prettier": ["error", { endOfLine: "lf", parser: "flow" }],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_|navigation|route|POST|GET",
        args: "after-used",
        argsIgnorePattern: "^_|navigation|route|POST|GET",
      },
    ],
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_|navigation|route|POST|GET",
        args: "after-used",
        argsIgnorePattern: "^_|navigation|route|POST|GET",
      },
    ],
  },
  globals: {
    setTimeout: "readonly",
    clearTimeout: "readonly",
    setInterval: "readonly",
    clearInterval: "readonly",
  },
};
