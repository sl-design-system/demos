# Svelte Demo

A Svelte-based demo showcasing SL Design System components with PostCSS and TypeScript in a monorepo workspace.

## Getting Started

Clone the monorepo and install dependencies from the root:

```bash
yarn install
```

Then navigate into the demo and start development or build:

```bash
cd apps/svelte-demo
# development: rebuild on changes and preview
yarn dev
# production build only
yarn build
# preview the production output
yarn preview
```

## Prerequisites

- Node.js (>=18.x) or later
- Yarn v4+

## Available Scripts

- `yarn dev`  
  Starts a watch build (`build:watch`) and local server (`serve`) for live development.

- `yarn build`  
  Bundles the app once into `dist/` using `esbuild` (via `scripts/build.js`).

- `yarn preview`  
  Serves the contents of `dist/` locally with Web Dev Server (`wds`).

- `yarn lint`  
  Runs ESLint on `.ts` files.

- `yarn lint:fix`  
  Runs ESLint with `--fix`.

## Installation Details

```bash
cd apps/svelte-demo
yarn install
```

## Project Structure

- `scripts/build.js` – Main build pipeline using esbuild and svelte-preprocess,
- `src/` – Source files,
- `dist/` – Output directory containing `main.js`, `index.html`, and assets.


