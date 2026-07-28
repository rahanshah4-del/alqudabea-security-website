/** @type {import('prettier').Config} */
export default {
  // ── Line Width & Wrapping ───────────────────────────
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  // ── Quotes ──────────────────────────────────────────
  singleQuote: true,
  jsxSingleQuote: false,

  // ── Punctuation ─────────────────────────────────────
  semi: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',

  // ── Misc ────────────────────────────────────────────
  endOfLine: 'lf',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',

  // ── Plugins ─────────────────────────────────────────
  plugins: ['prettier-plugin-tailwindcss'],

  // ── Overrides ───────────────────────────────────────
  overrides: [
    {
      files: ['*.yml', '*.yaml', '*.toml'],
      options: { tabWidth: 2 },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: { trailingComma: 'none' },
    },
  ],
};
