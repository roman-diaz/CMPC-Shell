export default {
  // 1) Linter only for staged files
  '**/*.{ts,tsx,js,jsx,json,md,yml,yaml}': (stagedFiles) => [
    `prettier --write ${stagedFiles.join(' ')}`,
  ],

  // 2) ESLint for all files
  '**/*.{ts,tsx,js,jsx}': ['eslint --cache --cache-location .cache/eslint --no-warn-ignored'],

  // 3) Tests only for staged files
  '**/*.{test,spec}.{ts,tsx}': (stagedFiles) =>
    `npx vitest run --passWithNoTests ${stagedFiles.join(' ')}`,
};
