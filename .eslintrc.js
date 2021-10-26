module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2020: true,
    mocha: true,
  },
  // parser: 'vue-eslint-parser',
  parserOptions: {
    // parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    // project: ['./tsconfig.eslint.json'],
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier', 'mocha'],
  extends: [
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'prettier/@typescript-eslint',
    // 'prettier/vue',
    // 'plugin:prettier-vue/recommended',

    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'plugin:mocha/recommended',
  ],

  // settings: {
  //   'prettier-vue': {},
  //   usePrettierrc: true,
  // },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // 2
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/attribute-hyphenation': ['error', 'never', { ignore: ['custom-prop', 'v-'] }],
    // 'no-unused-vars': ["error", {"args": "none"}],
    'prettier-vue/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'ignore',
        printWidth: 100,
        trailingComma: 'es5',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'should|expect',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
  },

  globals: {
    describe: true,
    it: true,
  },
}
