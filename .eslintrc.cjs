module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    "tsconfigRootDir": ".",
    "project": [
      "./tsconfig.json"
    ]
  },
  plugins: ['react', 'react-refresh', '@typescript-eslint'],
  "settings": {
    "import/resolver": {
      "typescript": {
        "project": "./tsconfig.json"
      }
    },
    "react": {
      "version": "18.x"
    }
  },
  rules: {
    "react-refresh/only-export-components": 'warn',
    "@typescript-eslint/no-use-before-define": ["error", { "functions": false }],
    "linebreak-style": "off",
    // Configure prettier
    "prettier/prettier": [
      "error",
      {
        "printWidth": 80,
        "endOfLine": "lf",
        "singleQuote": true,
        "tabWidth": 2,
        "indentStyle": "space",
        "trailingComma": "es5"
      }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ],
    "object-shorthand": "error",
    "no-console": "warn"
  },
}
