# Lit Demo

A LitElement-based demo showcasing SL Design System components with scoped styles in a monorepo workspace.

## Getting Started

Clone the monorepo and install dependencies from the root:

```bash
yarn install
```

Then navigate to this demo and run dev or build the app:

```bash
cd apps/lit-demo
# Install dependencies and run in dev or build mode (both auto-run style generation):
yarn dev    # development with watch and auto SCSS compilation
# or for production build:
yarn build
# serve dist with a static server (e.g. npx serve dist)
```

## Prerequisites

- Node.js (>=18.x) LTS or later
- Yarn v4+

## Installation

```bash
cd apps/lit-demo
yarn install
yarn generate-styles
```

## Available Scripts

- `yarn dev`  
  Runs the build in watch mode and auto-generates styles on file changes (invokes `generate-styles`).

- `yarn build`  
  Bundles the app into `dist/` for production and auto-runs style generation.

- `yarn preview`  
  Serves the `dist/` folder locally using Web Dev Server (`wds`).

- `yarn generate-styles`  
  Manually compiles `.scss` files to `.scss.js` modules; only needed if you want to regenerate styles without a full build.

## Project Structure

- `index.html` – Entry HTML that loads the app bundle,
- `src/` – Application source files,
- `scripts/` – Build scripts (e.g. `generate-styles.js` and Rollup config in `build.js`).
