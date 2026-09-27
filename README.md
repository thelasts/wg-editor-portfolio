# Internship portfolio

Vue 3, TypeScript, Vite, Tailwind CSS, Vue I18n, Nuxt UI.

## Development

Use Node 24 and the pnpm version declared in `package.json`.

```sh
corepack enable
corepack prepare pnpm@10.16.1 --activate
pnpm install --frozen-lockfile
pnpm dev
```

## Commands

```sh
pnpm type-check
pnpm build
pnpm preview
pnpm lint
pnpm format
```

## GitHub Pages

The deployment workflow builds and publishes `dist/` whenever `main` is updated. In repository settings, select **GitHub Actions** as the Pages source.

The workflow sets `VITE_BASE_PATH=/wg-editor-portfolio/`. A future custom-domain build should use `VITE_BASE_PATH=/`.
