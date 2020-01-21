module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        useJSXTextNode: true,
    },
    plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],

        'simple-import-sort/sort': 'error',

        '@typescript-eslint/explicit-function-return-type': 'error',
        // FIXME:
        // @emotion/core の提供する jsxFactory を使用しても
        // no-unused-var ルールに引っかからないように適切なオプションを設定したい
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                varsIgnorePattern: '^jsx$', // jsx という変数名を一律に無視させている
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
