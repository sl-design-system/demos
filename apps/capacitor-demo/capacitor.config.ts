import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.sanomalearning.slds.demo',
  appName: 'SLDS Demo',
  webDir: 'dist',
  android: {
    // SLDS relies on the Popover API, @starting-style, CSS nesting and style
    // container queries (theme dark mode), which need Chromium 120+. Older
    // WebViews get Capacitor's "update your WebView" screen instead of a
    // half-broken UI.
    minWebViewVersion: 120,
  },
  ios: {
    // The app shell scrolls inside <main>; keep the WKWebView itself fixed so
    // focusing a field or overscrolling never moves the header and tab bar.
    scrollEnabled: false,
  },
  plugins: {
    Keyboard: {
      // The native navigation plugin hosts the WebView in its own tab
      // container and re-lays it out on keyboard changes, which undoes the
      // keyboard plugin's 'native' resize. So the WebView keeps its size and
      // the page makes room itself (--keyboard-height, see src/app/app.ts).
      resize: KeyboardResize.None,
    },
    SystemBars: {
      // index.html uses viewport-fit=cover; telling Android up front avoids a
      // layout jump while the WebView starts. The default insetsHandling
      // ('css') injects --safe-area-inset-* variables, used in global.css.
      initialViewportFitValueHint: 'cover',
    },
  },
  experimental: {
    ios: {
      spm: {
        // The iOS deployment target is 18.0 (Safari 18 is needed for the
        // theme's style container queries). `.iOS(.v18)` in the generated
        // CapApp-SPM/Package.swift requires Swift tools 6.0+; Capacitor
        // defaults to 5.9.
        swiftToolsVersion: '6.0',
      },
    },
  },
};

export default config;
