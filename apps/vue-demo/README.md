# Vue Demo

A Vue 3 demo showcasing SL Design System components using esbuild for bundling.

## Prerequisites

- Node.js v14 or later
- npm (or yarn)

## Installation

```bash
cd apps/vue-demo
npm install
```

## Available Scripts

- `npm run build`  
  Bundles the app and outputs files into `dist/`.

- `npm run dev`  
  Starts the esbuild dev server with watch and live reload on port 8008.

- `npm run lint`  
  Runs ESLint on `.ts` and `.vue` files.

- `npm run lint:fix`  
  Runs ESLint with auto-fix enabled.

- `npm run preview`  
  Serves the `dist/` directory on a local HTTP server and opens in browser.

## Project Structure

- `scripts/build.js` Custom build script using esbuild and vue plugin.
- `public/` Contains static `index.html` template.
- `src/` Source files, including `App.vue`, styles, and `main.ts` entry.
- `dist/` Generated output folder.

## Notes

- The HTML template is copied from `public` into `dist/` during build.
- Global and component CSS are manually copied by the build script.
- You can adjust port and serve directory in `scripts/build.js`.
