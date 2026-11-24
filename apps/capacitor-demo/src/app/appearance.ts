import { setSystemBarsScheme } from '../native/native.js';

export type Appearance = 'system' | 'light' | 'dark';

export type ColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'slds-demo:appearance';

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function isAppearance(value: string | null): value is Appearance {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function getAppearance(): Appearance {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isAppearance(stored) ? stored : 'system';
}

export function getColorScheme(): ColorScheme {
  const appearance = getAppearance();
  if (appearance !== 'system') {
    return appearance;
  }

  return darkQuery.matches ? 'dark' : 'light';
}

/**
 * Applies the appearance: `data-appearance` on `<html>` overrides the system
 * setting in global.css, and the system bars are restyled to match.
 */
function apply(): void {
  const appearance = getAppearance(),
    root = document.documentElement;

  if (appearance === 'system') {
    delete root.dataset['appearance'];
  } else {
    root.dataset['appearance'] = appearance;
  }

  void setSystemBarsScheme(getColorScheme());
}

export function setAppearance(appearance: Appearance): void {
  if (appearance === 'system') {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, appearance);
  }

  apply();
}

export function initAppearance(): void {
  apply();

  // Keep the system bars in sync when the OS switches between light and dark.
  darkQuery.addEventListener('change', apply);
}
