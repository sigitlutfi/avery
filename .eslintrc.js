module.exports = {
  extends: [
    'expo',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors', // Menambahkan plugin untuk import linting
    'plugin:import/warnings', // Menambahkan plugin untuk import warnings
    'plugin:import/typescript', // Jika menggunakan TypeScript
    'eslint-config-prettier',
  ], // Tambahkan untuk JSX a11y
  plugins: [
    'prettier',
    'unused-imports',
    'react-hooks', // Plugin untuk React Hooks
    'import', // Plugin untuk linting impor
    'jsx-a11y', // Plugin untuk linting aksesibilitas JSX
  ],
  rules: {
    'no-undef': 'warn',
    'comma-dangle': 'off',
    'prettier/prettier': [
      'error',
      { endOfLine: 'lf', parser: 'flow', singleQuote: true },
    ],
    quotes: ['error', 'single'], // ESLint juga mengharuskan tanda kutip tunggal
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_|navigation|route|POST|GET',
        args: 'after-used',
        argsIgnorePattern: '^_|navigation|route|POST|GET',
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_|navigation|route|POST|GET',
        args: 'after-used',
        argsIgnorePattern: '^_|navigation|route|POST|GET',
      },
    ],

    // Aturan untuk React Hooks
    'react-hooks/rules-of-hooks': 'error', // Memastikan aturan penggunaan Hooks
    'react-hooks/exhaustive-deps': 'warn', // Memeriksa dependencies di Hooks (useEffect)

    // Aturan untuk import
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Aturan untuk JSX A11y (Aksesibilitas)
    'jsx-a11y/anchor-is-valid': 'warn', // Contoh aturan aksesibilitas
    'jsx-a11y/no-onchange': 'off', // Example of disabling a rule
  },
  globals: {
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
    setInterval: 'readonly',
    clearInterval: 'readonly',
  },
  overrides: [
    {
      files: ['./expo-env.d.ts'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
};
