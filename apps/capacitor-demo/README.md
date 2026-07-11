# Capacitor Demo

A mobile demo application built with [Capacitor](https://capacitorjs.com), [Lit](https://lit.dev) and SL Design System components. The same web code runs in the browser and inside a native iOS app shell.

## Features

- **Multiple pages** (Home, Courses, Schedule, Messages, Grades, Profile, Device, Settings) behind a router built on the [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API): plain `<a href="#/page">` anchors are intercepted centrally in `src/router.ts`, so no per-link click handlers are needed. It falls back to `hashchange` on browsers without the Navigation API. Hash URLs keep reloads working when the app is served from the `capacitor://` origin on iOS.
- **Floating "glass" tab bar** like native iOS apps: a `backdrop-filter` blurred capsule that hovers above the home indicator while the content scrolls behind it. The five primary pages live in the tab bar.
- **Drawer menu** with a mobile style top app bar listing all pages, including safe-area insets for the iPhone notch/home indicator.
- **Theme switcher** with light, dark and follow-system modes. The selection toggles the `light.css`/`dark.css` stylesheets from `@sl-design-system/sanoma-learning`, is persisted with the Capacitor Preferences plugin (`UserDefaults` on iOS, `localStorage` on the web) and keeps the native iOS status bar style in sync.
- **Native plugins**: the Device page reads device and battery information via `@capacitor/device` and triggers the Taptic Engine via `@capacitor/haptics`, degrading gracefully in the browser.

## Development (browser)

```bash
yarn workspace capacitor-demo dev      # watch build + dev server on localhost:8010
yarn workspace capacitor-demo build    # production build into dist/
yarn workspace capacitor-demo preview  # serve the production build
```

## Running on iOS

Requires a Mac with Xcode 16.4+ installed. Capacitor 8 uses Swift Package Manager, so CocoaPods is not needed.

```bash
yarn workspace capacitor-demo build     # build the web assets
yarn workspace capacitor-demo cap:sync  # copy web assets + plugins into ios/
yarn workspace capacitor-demo ios       # open the project in Xcode
```

Then select a simulator or connected device in Xcode and press Run. Alternatively, run directly from the command line with `npx cap run ios` from this directory.

The `ios/` directory contains the native Xcode project and is checked in, as [recommended by Capacitor](https://capacitorjs.com/docs/basics/workflow); generated content inside it (web assets, build output) is gitignored via `ios/.gitignore`.
