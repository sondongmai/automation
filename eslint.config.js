module.exports = {
  overrides: [
    {
      files: ["*.js", "*.ts"],
      extends: "eslint-config-standard-with-typescript",
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "no-console": "warn",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/interactive-supports-focus": "warn",
        "prettier/prettier": "warn",
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "object-curly-spacing": ["error", "never"],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "after-used",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_.*?$",
          },
        ],
        "import/order": [
          "warn",
          {
            groups: [
              "type",
              "builtin",
              "object",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
            ],
            pathGroups: [
              {
                pattern: "~/**",
                group: "external",
                position: "after",
              },
            ],
            "newlines-between": "always",
          },
        ],
        "react/self-closing-comp": "warn",
        "react/jsx-sort-props": [
          "warn",
          {
            callbacksLast: true,
            shorthandFirst: true,
            noSortAlphabetically: false,
            reservedFirst: true,
          },
        ],
        "padding-line-between-statements": [
          "warn",
          {
            blankLine: "always",
            prev: "*",
            next: "return",
          },
          {
            blankLine: "always",
            prev: ["const", "let", "var"],
            next: "*",
          },
          {
            blankLine: "any",
            prev: ["const", "let", "var"],
            next: ["const", "let", "var"],
          },
        ],
      },
    },
  ],
};
