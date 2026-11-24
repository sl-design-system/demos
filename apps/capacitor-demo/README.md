# Capacitor Demo

A mobile-first Lit app that showcases SL Design System components, wrapped with [Capacitor](https://capacitorjs.com) 8 to run on iOS and Android.

> Status: the app shell (tabs, navigation, appearance setting) is in place. The per-component demo pages and the showcase screens are added in later steps.

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

## Running on iOS and Android

### Prerequisites

- **iOS:** macOS with Xcode 26 or later (iOS dependencies use Swift Package Manager, so CocoaPods is not needed)
- **Android:** Android Studio Otter (2025.2.1) or later, with JDK 21 and Android SDK 36

### Scripts

Run these from `apps/capacitor-demo` (or prefix them with `yarn workspace capacitor-demo`):

```bash
yarn ios            # build the web app, sync, and run on a simulator or device
yarn android        # same for an Android emulator or device
yarn cap:sync       # build the web app and copy it into both native projects
yarn open:ios       # open the project in Xcode
yarn open:android   # open the project in Android Studio
```

`cap run` asks which simulator, emulator or device to use. Pass `--target <id>` to skip the prompt (`npx cap run ios --list` shows the ids).

### Live reload

Run the Vite dev server so other devices can reach it, then point the native app at it:

```bash
yarn dev:host       # terminal 1: Vite on all network interfaces, port 8010
yarn ios:live       # terminal 2: iOS simulator or device, loads the dev server
yarn android:live   # or Android: uses adb reverse, so the emulator can use localhost
```

A physical iPhone must be on the same network as your Mac. Run `yarn ios` or `yarn cap:sync` afterwards to go back to the bundled web app.

### Minimum versions

The app uses the Popover API, `@starting-style`, CSS nesting and the theme's style container queries (for dark mode), so:

- **iOS:** the deployment target is **18.0** (Safari 18). Because of that, `capacitor.config.ts` sets `experimental.ios.spm.swiftToolsVersion` to `6.0`; the generated `Package.swift` needs it for `.iOS(.v18)`.
- **Android:** `minWebViewVersion` is **120**. Devices with an older Android System WebView see Capacitor's "update your WebView" screen.

## App shell

- **Tabs:** Components, Showcase and Settings. Switching tabs returns to the screen you last had open in that tab; tapping the active tab goes back to its root screen.
- **Navigation:** a small History API router (`src/app/router.ts`); screens are defined in `src/app/routes.ts`. Child screens get a back button in the header, and scroll positions are restored when you go back.
- **Android back button:** closes an open dialog or popover first, then goes back to the parent screen, then to the Components tab, then leaves the app.
- **Appearance:** Settings has Match system / Light / Dark. The choice is stored in `localStorage` and also restyles the status bar (and the Android navigation bar) through Capacitor's built-in `SystemBars` API.
- **Safe areas:** content stays clear of notches, the Dynamic Island and the home indicator. On Android, Capacitor injects `--safe-area-inset-*` variables because older WebViews report wrong `env()` values; `src/styles/global.css` turns either source into `--safe-top/right/bottom/left`.
- **Keyboard:** on native platforms the tab bar hides while the on-screen keyboard is open.
- **Native plugins:** all plugin calls go through `src/native/native.ts`, which does nothing in a regular browser, so `yarn dev` keeps working.

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
- **Shared sheets** in `src/styles/` (`page.css`, `list.css`) are imported the same way and added to a page's `static styles` array.
- **Dark mode** follows the system setting unless Settings overrides it (`data-appearance` on `<html>`). The theme switches to its dark tokens when `--color-scheme: dark` is set on `<html>`.

## Project structure

- `index.html`: Vite entry, with `viewport-fit=cover` for notched devices
- `vite.config.ts`: Vite config with the css-sheet plugin
- `capacitor.config.ts`: app id, name, web directory and native settings
- `ios/`, `android/`: native projects. They are committed; edit them in Xcode or Android Studio, and let `cap sync` manage the generated parts.
- `src/index.ts`: bootstraps the scoped-registry polyfill, the theme and `<demo-app>`
- `src/app/`: the app shell (`app.ts`), router, routes, tab bar, appearance setting and app icons
- `src/pages/`: one folder per screen
- `src/catalog.ts`: the components listed in the catalog
- `src/native/native.ts`: wrappers around the Capacitor plugins
- `src/styles/`: document-level styles (`global.css`) and shared component sheets
