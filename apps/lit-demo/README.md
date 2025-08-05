# Lit Demo

A LitElement-based demo showcasing SL Design System components and scoped styles.

## Prerequisites

- Node.js v14 or later
- npm (or yarn)

## Installation

```bash
cd apps/lit-demo
npm install
npm run generate-styles  # compile SCSS imports into JS styles
```

## Available Scripts

- `npm run generate-styles`  
  Processes all `.scss` files in `src/` to generate `.scss.js` modules.

- `npm run build`  
  Bundles the app and outputs to `dist/`.

- `npm run dev`  
  Starts the build in watch mode for development.

- `npm run preview`  
  Serves the `dist/` folder on a local HTTP server.

- `npm run lint`  
  Runs ESLint on TypeScript and HTML files.

- `npm run lint:fix`  
  Runs ESLint with auto-fix.

## Project Structure

- `scripts/build.js` Build script using esbuild.
- `scripts/generate-styles.js` SCSS preprocessor to JS converter.
- `src/` Application source files.
- `index.html` Entry HTML template.

## Notes

- Styles are scoped via `ScopedElementsMixin` and imported CSS.
- Uses `esbuild` for fast bundling and a simple copy of HTML.
