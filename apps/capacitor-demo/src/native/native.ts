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

/** Calls `handler` with `true` just before the on-screen keyboard appears and `false` before it hides. */
export function onKeyboardVisibilityChange(
  handler: (visible: boolean) => void,
): void {
  if (!isNative) {
    return;
  }

  void Keyboard.addListener('keyboardWillShow', () => handler(true));
  void Keyboard.addListener('keyboardWillHide', () => handler(false));
}

/** The native app's version and build number, e.g. `1.0 (1)`; `undefined` in a browser. */
export async function getAppVersion(): Promise<string | undefined> {
  if (!isNative) {
    return undefined;
  }

  const { version, build } = await App.getInfo();
  return `${version} (${build})`;
}
