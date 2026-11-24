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
- **Keyboard:** on native platforms the tab bar hides while the on-screen keyboard is open. On iOS the WKWebView's own scrolling is disabled (`ios.scrollEnabled: false`), so focusing a field scrolls `<main>` instead of moving the whole app.
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

Issues in SLDS itself that this demo surfaced, mostly on iOS (iPhone simulator, iOS 27.2). Where the app works around one, the item says so.

1. **Inputs zoom the page on iOS.** For the default (adult) user group, text inputs use a 14px font, also at size `lg`. iOS zooms in whenever an input under 16px gets focus. The younger user groups use 16–20px and are not affected. The app sets `maximum-scale=1` in the viewport meta tag to prevent it; a fix in SLDS would be a 16px minimum font size for inputs on touch devices.
2. **Hover styles stick after a tap.** On iOS a button keeps its hover background after it is tapped (and an element that appears under the finger after navigation shows as hovered). Hover styles should be wrapped in `@media (hover: hover)`.
3. **Dialog bottom sheet ignores the home indicator.** On small screens `sl-dialog` becomes a bottom sheet, but it does not add `env(safe-area-inset-bottom)` padding, so the bottom button sits on the home indicator. The close button also sits flush against the right edge.
4. **Toggle button icons need `slot="default"`.** Icon-only toggle buttons only detect their icon in a slot literally named `default`; an icon in the unnamed slot logs an error and shows error styling. They also require a different icon in the `pressed` slot.
5. **Toggle groups don't wrap.** Three text chips in an `sl-toggle-group` overflow a 375px-wide screen; the courses screen adds `flex-wrap: wrap` to the host.
6. **Form field error announcements throw inside shadow DOM.** `sl-form-field` reads `event.target` inside a `setTimeout` when announcing a validation error. By then the event has been retargeted to the outermost shadow host (here `<demo-app>`), which has no `formControlElement`, so every invalid submit logs `Cannot read properties of undefined (reading 'getAttribute')` and the screen-reader announcement is lost.
7. **`sl-form` reports valid before its controls register.** Controls register a frame after they connect; until then `controls` is empty and `reportValidity()` returns `true`. The assignment screen checks `controls.length` first.
8. **Form values are strings.** `form.value` returns the date field as an ISO string (`2026-11-27`) and the number field as a string, not a `Date` or `number`.
9. **Select-only date fields show iOS selection handles.** Tapping a `select-only` date field opens the calendar without a keyboard, but iOS selects part of the read-only input and shows text selection handles.
10. **Missing pieces for mobile apps.** There is no bottom navigation component (the tab bar here is custom), and the Sanoma Learning theme has no grid or settings icon (the app registers simple ones).

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
- `ios/`, `android/`: native projects. They are committed; edit them in Xcode or Android Studio, and let `cap sync` manage the generated parts.
- `src/index.ts`: bootstraps the scoped-registry polyfill, the theme and `<demo-app>`
- `src/app/`: the app shell (`app.ts`), router, routes, tab bar, appearance setting and app icons
- `src/pages/`: the tab screens (catalog list, showcase, settings)
- `src/demos/`: one demo page per component, plus the shared `DemoPage` base class
- `src/showcase/`: the showcase screens and their registry
- `src/catalog.ts`: the components listed in the catalog
- `src/native/native.ts`: wrappers around the Capacitor plugins
- `src/styles/`: document-level styles (`global.css`) and shared component sheets
