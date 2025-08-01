# Svelte Demo

A Svelte-based demo showcasing SL Design System components with PostCSS and TypeScript.

## Prerequisites

- Node.js v14 or later
- npm (or yarn)

## Installation

```bash
cd apps/svelte-demo
npm install
```  

## Available Scripts

- `npm run build`       
  Bundles the app using esbuild into `dist/main.js` and copies static assets.

- `npm run dev`         
  Starts a watch build (rebuild on changes) and filesystem server for rapid development.

- `npm run preview`     
  Serves the contents of `dist/` on a local HTTP server and opens it in your browser.

- `npm run lint`        
  Runs ESLint checks on `.ts` and `.svelte` files.

- `npm run lint:fix`    
  Runs ESLint with auto-fix enabled.

## Project Structure

- `scripts/build.js`    Main build script using esbuild and svelte-preprocess.
- `src/`                Source files, including `App.svelte`, styles, and HTML template.
- `dist/`               Generated output folder containing `main.js`, CSS, and `index.html`.

## Notes

- Component-level and global styles are extracted/copied by the build script.
- Uses PostCSS through `svelte-preprocess` for styling.
- HMR is not included; the build script only rebuilds on changes.

