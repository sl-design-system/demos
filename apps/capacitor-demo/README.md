# Capacitor Demo

A mobile-first Lit app that showcases SL Design System components, wrapped with [Capacitor](https://capacitorjs.com) 8 to run on iOS and Android.

> Status: the app shell, a demo page for each of the 27 catalog components and three showcase screens are in place.

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

### App icon and splash screen

Both are made from the SLDS logo mark (`assets/sl-logo-mark.svg`, the blue square with the "S" from the logo in the components repository):

- **Icon:** blue with the S. iOS rounds it itself; Android gets an adaptive icon (blue background layer, S foreground layer).
- **Splash screen:** the mark centred on the page colour, white in light mode and `#222222` in dark mode. It stays up until the first page has rendered (`@capacitor/splash-screen` with `launchAutoHide: false`, hidden from `App#firstUpdated`), so the app never shows an empty frame while it starts.

To change them, edit the mark or `scripts/generate-assets.mjs` and run:

```bash
yarn assets   # renders assets/*.png, then writes every iOS and Android size (@capacitor/assets)
```

`capacitor-assets` reformats `android/app/src/main/AndroidManifest.xml` without changing it; revert that file afterwards.

### Minimum versions

The app uses the Popover API, `@starting-style`, CSS nesting and the theme's style container queries (for dark mode), so:

- **iOS:** the deployment target is **18.0** (Safari 18). Because of that, `capacitor.config.ts` sets `experimental.ios.spm.swiftToolsVersion` to `6.0`; the generated `Package.swift` needs it for `.iOS(.v18)`.
- **Android:** `minWebViewVersion` is **120**. Devices with an older Android System WebView see Capacitor's "update your WebView" screen.

## App shell

- **Tabs:** Components, Showcase and Settings. Switching tabs returns to the screen you last had open in that tab; tapping the active tab goes back to its root screen.
- **Page transitions:** navigating uses the View Transitions API (`App#transition` in `src/app/app.ts`, keyframes in `src/styles/global.css`). Opening a screen slides it in from the right over the previous one, which moves left and dims; going back (header button, Android back button, tapping the active tab) reverses that. The header title slides and fades like an iOS navigation title. Tab switches are instant, as on iOS, and everything is instant with _reduce motion_ on. View transition names are tree-scoped, so `<main>` and the title are exposed as parts (`page`, `title`) and named from the document with `demo-app::part(...)`.
- **Native tab bar:** in the iOS and Android apps the tab bar is native, through [`@capgo/capacitor-native-navigation`](https://github.com/Cap-go/capacitor-native-navigation) (`src/native/tab-bar.ts`). On iOS 26+ it is the system `UITabBarController` with Liquid Glass: content scrolls underneath it, icons are SF Symbols (filled when selected) and the tint is the SLDS "selected" colour, which follows light and dark mode. On Android it is the plugin's floating translucent capsule. In a regular browser the app uses its web tab bar (`src/app/tab-bar/`).
  - The native bar is drawn above the WebView, so it is hidden while a modal dialog is open (`onModalDialogChange()` in `src/app/overlays.ts`). Popovers and menus are not handled: one that opens near the bottom of the screen can end up under the bar.
- **Navigation:** a small History API router (`src/app/router.ts`); screens are defined in `src/app/routes.ts`. Child screens get a back button in the header, and scroll positions are restored when you go back.
- **Android back button:** closes an open dialog or popover first, then goes back to the parent screen, then to the Components tab, then leaves the app.
- **Lists:** the Components, Showcase and Settings screens use inset grouped lists (`src/styles/list.css`): rounded cards without borders on a tinted ground, 52px rows, separators that start at the text, and section headers and footers outside the cards. Screens made of these lists set `grouped: true` in `src/app/routes.ts`, and the shell then gives `<main>` the ground colour. The same style is used on Android, where it is close to the grouped cards of Android 16's settings.
- **Appearance:** Settings has Match system / Light / Dark as checkmark rows, the iOS pattern for a single choice. They are app controls rather than an SLDS demo, so they are native radio buttons, visually hidden inside each row, which keeps arrow-key navigation and the screen reader's "radio button, 1 of 3". The choice is stored in `localStorage` and also restyles the status bar (and the Android navigation bar) through Capacitor's built-in `SystemBars` API.
- **Safe areas:** content stays clear of notches, the Dynamic Island and the home indicator. On Android, Capacitor injects `--safe-area-inset-*` variables because older WebViews report wrong `env()` values; `src/styles/global.css` turns either source into `--safe-top/right/bottom/left`.
- **Keyboard:** on iOS the WebView keeps its size while the on-screen keyboard is open (`Keyboard.resize: 'none'`; the native navigation plugin would undo the keyboard plugin's `native` resize anyway). Instead the app shell shrinks by the keyboard height (`--keyboard-height`), scrolls the focused field into view, and lifts dialog bottom sheets above the keyboard. The WKWebView's own scrolling is disabled (`ios.scrollEnabled: false`), so only `<main>` scrolls. Android resizes the window itself; there the native tab bar is hidden while the keyboard is open. The page also publishes its background as `<meta name="theme-color">`, which `ios/App/App/AppViewController.swift` copies to the native window behind the WebView.
- **Native plugins:** all plugin calls go through `src/native/native.ts`, which does nothing in a regular browser, so `yarn dev` keeps working.

## Component demos

Each catalog entry has a demo page in `src/demos/<slug>/<slug>-demo.ts` (plus a `.css` file when it needs its own styles). Pages extend `DemoPage` and are built from `demoSection(title, content, { hint, layout })` blocks; the hint says what to look for on a phone.

To add a component: create its demo page, then add an entry with `slug`, `name` and `page` to `src/catalog.ts`. The app registers it as `<demo-{slug}>` and routes `/components/{slug}` to it.

## Showcase screens

Complete screens in `src/showcase/<slug>/` that combine components the way a real app would:

- **My courses:** search, filter chips (toggle group), cards with tags and teacher avatars, and a message dialog.
- **New assignment:** an `sl-form` with text, select, date, time, number and text-area fields, a switch, validation on submit and a confirmation dialog.
- **Profile:** notification switches, a language select, a sign-out confirmation, and a **reading level** setting that really changes the theme: it sets the theme's user group (`data-user-group` on `<body>`), which scales all typography from 14px (adult) up to 20px (early reader). The choice is remembered.

To add a screen, create it and add an entry to `src/showcase/screens.ts`; it is registered as `<showcase-{slug}>` and routed at `/showcase/{slug}`.

## Mobile findings

Running SLDS in this app surfaced a number of mobile issues in the components themselves: touch targets below 44 pt, inputs that make iOS zoom, sticky hover styles, a dialog sheet that ignores the home indicator, a form bug inside shadow DOM, and more. They are written up as issue drafts, with how they were tested and what passed, in [MOBILE-FINDINGS.md](MOBILE-FINDINGS.md).

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
- **Shared sheets** in `src/styles/` (`page.css`, `list.css`, `demo.css`) are imported the same way and added to a page's `static styles` array.
- **Dark mode** follows the system setting unless Settings overrides it (`data-appearance` on `<html>`). The theme switches to its dark tokens when `--color-scheme: dark` is set on `<html>`.

## Project structure

- `index.html`: Vite entry, with `viewport-fit=cover` for notched devices
- `vite.config.ts`: Vite config with the css-sheet plugin
- `capacitor.config.ts`: app id, name, web directory and native settings
- `assets/`: the logo mark and the source images for the app icon and splash screen (`yarn assets`)
- `ios/`, `android/`: native projects. They are committed; edit them in Xcode or Android Studio, and let `cap sync` manage the generated parts.
- `src/index.ts`: bootstraps the scoped-registry polyfill, the theme and `<demo-app>`
- `src/app/`: the app shell (`app.ts`), router, routes, tab bar, appearance setting and app icons
- `src/pages/`: the tab screens (catalog list, showcase, settings)
- `src/demos/`: one demo page per component, plus the shared `DemoPage` base class
- `src/showcase/`: the showcase screens and their registry
- `src/catalog.ts`: the components listed in the catalog
- `src/native/native.ts`: wrappers around the Capacitor plugins
- `src/styles/`: document-level styles (`global.css`) and shared component sheets
