import type { CapacitorConfig } from '@capacitor/cli';

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
  plugins: {
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
