module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2020: true,
        jest: true,
    },
    plugins: ['vue', 'prettier', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // '@vue/typescript/recommended',
        'plugin:prettier/recommended',
        'plugin:prettier-vue/recommended',
        'prettier/vue',
        'plugin:vue/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': 2,
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/attribute-hyphenation': ['error', 'never', { ignore: ['custom-prop', 'v-'] }],
        // 'no-unused-vars': ["error", {"args": "none"}],
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@babel/eslint-parser',
        ecmaFeatures: {
            legacyDecorators: true,
        },
        sourceType: 'module',
    },
    globals: {
        $nuxt: true,
    },
}
