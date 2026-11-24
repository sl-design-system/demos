# Capacitor Demo

A mobile-first Lit app that showcases SL Design System components. It will be wrapped with [Capacitor](https://capacitorjs.com) to run on iOS and Android.

> Status: web scaffold only. The Capacitor native projects, app shell, component catalog and showcase screens are added in later steps.

## Getting started

Install dependencies from the monorepo root:

```bash
yarn install
```

Then run the app:

```bash
yarn workspace capacitor-demo dev       # Vite dev server on http://localhost:8010
yarn workspace capacitor-demo build     # type-check + production build into dist/
yarn workspace capacitor-demo preview   # serve the production build on port 8010
```

## Styles

This app uses [Vite](https://vite.dev) with [`@sl-design-system/rolldown-plugin-css-sheet`](https://github.com/sl-design-system/components/tree/main/tools/rolldown-plugin-css-sheet) instead of the `.scss` → `.scss.js` step the other demos use.

- **Component styles** live in a plain `.css` file next to the component. Import it with the `type: 'css'` attribute to get a `CSSStyleSheet`:

  ```ts
  import styles from './my-page.css' with { type: 'css' };

  export class MyPage extends LitElement {
    static override styles = styles;
  }
  ```

- **Global styles** are imported in `src/index.ts` without the attribute, so Vite treats them as regular CSS. These are the Sanoma Learning theme, its fonts (bundled into `dist/assets`, so the app works offline), its typography, and `src/styles/global.css`.
- **Dark mode** follows the system setting. The theme switches to its dark tokens when `--color-scheme: dark` is set on `<html>`.

## Project structure

- `index.html`: Vite entry, with `viewport-fit=cover` for notched devices
- `vite.config.ts`: Vite config with the css-sheet plugin
- `src/index.ts`: bootstraps the scoped-registry polyfill, the theme and `<demo-app>`
- `src/app/`: the app shell
- `src/styles/global.css`: document-level theme and base styles
