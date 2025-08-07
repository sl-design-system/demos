# Vue Demo

A Vue demo app showcasing SL Design System components with esbuild bundling in a monorepo workspace.

## Getting Started

Clone the monorepo and install dependencies from the root:

```bash
yarn install
```

Navigate into this demo and run scripts:

```bash
cd apps/vue-demo
# development (watch + live reload)
yarn dev
# production build
yarn build
# preview production output
yarn preview
```

## Prerequisites

- Node.js (>=18.x) or later
- Yarn v4+

## Available Scripts

- `yarn dev`  
  Starts the esbuild build in watch mode with live reload on port 8008.

- `yarn build`  
  Bundles the app into `dist/` using the custom esbuild script.

- `yarn lint`  
  Runs ESLint on `.ts` files.

- `yarn lint:fix`  
  Runs ESLint with `--fix` to auto-correct issues.

- `yarn preview`  
  Serves the `dist/` folder locally via Web Dev Server (`wds`) and opens the browser.

## Project Structure

- `scripts/build.js` – Custom esbuild pipeline using `esbuild-plugin-vue-next`.
- `public/` – Static `index.html` template and assets.
- `src/` – Vue application source:
  - `App.vue` – Root component
  - `main.ts` – App entry point
- `dist/` – Generated output containing bundled JS, HTML, and assets.
- `tsconfig.json` – TypeScript config for this demo.
