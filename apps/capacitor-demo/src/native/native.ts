import { App } from '@capacitor/app';
import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { Haptics } from '@capacitor/haptics';
import { Keyboard } from '@capacitor/keyboard';

/**
 * Thin wrappers around the Capacitor plugins the app uses. Every function is a
 * no-op in a regular browser, so the app also runs with `vite dev`.
 */

export const isNative = Capacitor.isNativePlatform();

export const platform = Capacitor.getPlatform();

/** Make the status bar (and Android navigation bar) readable on the current color scheme. */
export async function setSystemBarsScheme(
  scheme: 'light' | 'dark',
): Promise<void> {
  if (!isNative) {
    return;
  }

  // `Dark` means light content on a dark background.
  await SystemBars.setStyle({
    style: scheme === 'dark' ? SystemBarsStyle.Dark : SystemBarsStyle.Light,
  });
}

/**
 * iOS zooms the page when an input with a font size under 16px gets focus,
 * and SLDS inputs use 14px for the default user group. Adding
 * `maximum-scale=1` stops that, but also disables pinch-zoom, which WCAG
 * 1.4.4 asks for on the web. So it is only applied inside the native iOS app,
 * where text scales through the reading level setting instead.
 */
export function preventInputZoomOnIOS(): void {
  const viewport = document.querySelector<HTMLMetaElement>(
    'meta[name="viewport"]',
  );
  if (platform !== 'ios' || !viewport) {
    return;
  }

  viewport.content = `${viewport.content}, maximum-scale=1.0`;
}

/** A light tick, used when switching tabs. */
export function selectionHaptic(): void {
  if (isNative) {
    void Haptics.selectionChanged();
  }
}

/** Calls `handler` when the Android hardware/gesture back button is used. */
export function onBackButton(handler: () => void): void {
  if (platform === 'android') {
    void App.addListener('backButton', handler);
  }
}

export function exitApp(): void {
  if (isNative) {
    void App.exitApp();
  }
}

/**
 * Calls `handler` just before the on-screen keyboard appears (with its height
 * in CSS pixels) and before it hides (with `0`).
 */
export function onKeyboardVisibilityChange(
  handler: (visible: boolean, height: number) => void,
): void {
  if (!isNative) {
    return;
  }

  void Keyboard.addListener('keyboardWillShow', ({ keyboardHeight }) =>
    handler(true, keyboardHeight),
  );
  void Keyboard.addListener('keyboardWillHide', () => handler(false, 0));
}

/** The native app's version and build number, e.g. `1.0 (1)`; `undefined` in a browser. */
export async function getAppVersion(): Promise<string | undefined> {
  if (!isNative) {
    return undefined;
  }

  const { version, build } = await App.getInfo();
  return `${version} (${build})`;
}
