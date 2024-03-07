/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    rules: {
        'no-inner-declarations': 'off',
        '@typescript-eslint/consistent-type-imports': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_.*',
                varsIgnorePattern: '^_.*',
            },
        ],
        '@next/next/no-img-element': 'off', // TODO: remove this when we have time to fix all the img elements
        '@typescript-eslint/no-explicit-any': 'warn', // TODO: remove this when we have time to fix all the anys
    },
};
