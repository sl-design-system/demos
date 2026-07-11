import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'slds-demo-theme-mode';

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark' || value === 'system';

/**
 * Manages the light/dark theme of the application. The effective theme is
 * applied by toggling the `light.css`/`dark.css` stylesheets that ship with
 * `@sl-design-system/sanoma-learning`, so all SL components restyle
 * themselves automatically. The selected mode is persisted with the
 * Capacitor Preferences plugin (backed by `UserDefaults` on iOS and
 * `localStorage` on the web) and the native iOS status bar is kept in sync.
 */
export class ThemeManager extends EventTarget {
  #mode: ThemeMode = 'system';
  #systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  get mode(): ThemeMode {
    return this.#mode;
  }

  get dark(): boolean {
    return this.#mode === 'system'
      ? this.#systemDark.matches
      : this.#mode === 'dark';
  }

  async init(): Promise<void> {
    this.#systemDark.addEventListener('change', () => {
      if (this.#mode === 'system') {
        this.#apply();
      }
    });

    const { value } = await Preferences.get({ key: STORAGE_KEY });

    this.#mode = isThemeMode(value) ? value : 'system';
    this.#apply();
  }

  async setMode(mode: ThemeMode): Promise<void> {
    this.#mode = mode;
    this.#apply();

    await Preferences.set({ key: STORAGE_KEY, value: mode });
  }

  #apply(): void {
    const dark = this.dark,
      lightSheet = document.querySelector<HTMLLinkElement>('#theme-light'),
      darkSheet = document.querySelector<HTMLLinkElement>('#theme-dark');

    if (lightSheet && darkSheet) {
      lightSheet.disabled = dark;
      darkSheet.disabled = !dark;
    }

    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';

    if (Capacitor.isNativePlatform()) {
      // A dark UI needs light status bar text and vice versa
      StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light }).catch(
        () => {
          // The status bar plugin is unavailable in this webview; ignore
        },
      );
    }

    this.dispatchEvent(new Event('theme-change'));
  }
}

export const themeManager = new ThemeManager();
