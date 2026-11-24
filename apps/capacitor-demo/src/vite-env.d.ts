/// <reference types="vite/client" />

// CSS imported with `with { type: 'css' }` is turned into a constructable
// stylesheet by @sl-design-system/rolldown-plugin-css-sheet.
declare module '*.css' {
  const sheet: CSSStyleSheet;
  export default sheet;
}
