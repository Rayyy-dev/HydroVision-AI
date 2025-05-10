module.exports = {
    extends: ['next/core-web-vitals'],
    rules: {
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@next/next/no-img-element': 'off'
    },
    ignorePatterns: [
        '**/*.js',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx',
        'node_modules',
        '.next',
        'out'
    ]
}; 