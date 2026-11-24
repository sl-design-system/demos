# Capacitor Demo

A mobile-first Lit app that showcases SL Design System components, wrapped with [Capacitor](https://capacitorjs.com) 8 to run on iOS and Android.

> Status: web app and native projects are set up. The app shell, component catalog and showcase screens are added in later steps.

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
- `capacitor.config.ts`: app id, name, web directory and native settings
- `ios/`, `android/`: native projects. They are committed; edit them in Xcode or Android Studio, and let `cap sync` manage the generated parts.
- `src/index.ts`: bootstraps the scoped-registry polyfill, the theme and `<demo-app>`
- `src/app/`: the app shell
- `src/styles/global.css`: document-level theme and base styles
