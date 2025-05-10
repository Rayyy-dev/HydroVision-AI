module.exports = {
    extends: ['next/core-web-vitals'],
    rules: {
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        '@next/next/no-img-element': 'off'
    }
}; 