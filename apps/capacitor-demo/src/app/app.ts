import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { CoursesPage } from '../pages/courses/courses-page.js';
import { DevicePage } from '../pages/device/device-page.js';
import { HomePage } from '../pages/home/home-page.js';
import { ProfilePage } from '../pages/profile/profile-page.js';
import { SettingsPage } from '../pages/settings/settings-page.js';
import { themeManager } from '../theme.js';
import styles from './app.styles.scss.js';

interface Route {
  path: string;
  label: string;
  icon: string;
}

const ROUTES: Route[] = [
  { path: 'home', label: 'Home', icon: '🏠' },
  { path: 'courses', label: 'Courses', icon: '📚' },
  { path: 'profile', label: 'Profile', icon: '👤' },
  { path: 'device', label: 'Device', icon: '📱' },
  { path: 'settings', label: 'Settings', icon: '⚙️' },
];

const DEFAULT_ROUTE = 'home';

/**
 * Application shell: a mobile style top app bar with a slide-in drawer menu,
 * a quick theme toggle and a hash based router. Hash routing is used because
 * Capacitor serves the app from the local `capacitor://` origin, where
 * path based routing would break on a reload.
 */
export class App extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'page-courses': CoursesPage,
    'page-device': DevicePage,
    'page-home': HomePage,
    'page-profile': ProfilePage,
    'page-settings': SettingsPage,
  };

  static override styles = styles;

  @state() private _route = DEFAULT_ROUTE;
  @state() private _menuOpen = false;

  private _onHashChange = (): void => {
    this._route = this._parseRoute();
  };

  private _onThemeChange = (): void => {
    this.requestUpdate();
  };

  override connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener('hashchange', this._onHashChange);
    themeManager.addEventListener('theme-change', this._onThemeChange);

    if (!window.location.hash) {
      window.location.replace(`#/${DEFAULT_ROUTE}`);
    }

    this._route = this._parseRoute();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('hashchange', this._onHashChange);
    themeManager.removeEventListener('theme-change', this._onThemeChange);
  }

  private _parseRoute(): string {
    const path = window.location.hash.replace(/^#\/?/, '');

    return ROUTES.some((route) => route.path === path) ? path : DEFAULT_ROUTE;
  }

  private _navigate(path: string): void {
    window.location.hash = `#/${path}`;
    this._menuOpen = false;
  }

  private _toggleTheme(): void {
    void themeManager.setMode(themeManager.dark ? 'light' : 'dark');
  }

  private _renderPage(): TemplateResult {
    switch (this._route) {
      case 'courses':
        return html`<page-courses></page-courses>`;
      case 'profile':
        return html`<page-profile></page-profile>`;
      case 'device':
        return html`<page-device></page-device>`;
      case 'settings':
        return html`<page-settings></page-settings>`;
      default:
        return html`<page-home></page-home>`;
    }
  }

  override render(): TemplateResult {
    const current = ROUTES.find((route) => route.path === this._route);

    return html`
      <div class="app-layout">
        <header class="app-bar">
          <button
            class="icon-button"
            aria-controls="app-drawer"
            aria-expanded=${this._menuOpen}
            title="Open menu"
            @click=${() => (this._menuOpen = !this._menuOpen)}
          >
            <span aria-hidden="true">☰</span>
            <span class="visually-hidden">Open menu</span>
          </button>
          <h1>${current?.label ?? 'SLDS Demo'}</h1>
          <button
            class="icon-button"
            title="Toggle light/dark theme"
            @click=${this._toggleTheme}
          >
            <span aria-hidden="true">${themeManager.dark ? '☀️' : '🌙'}</span>
            <span class="visually-hidden">
              Switch to ${themeManager.dark ? 'light' : 'dark'} theme
            </span>
          </button>
        </header>

        <div
          class="backdrop ${this._menuOpen ? 'visible' : ''}"
          @click=${() => (this._menuOpen = false)}
        ></div>

        <nav
          class="drawer ${this._menuOpen ? 'open' : ''}"
          id="app-drawer"
          aria-label="Main navigation"
        >
          <h2>SLDS Demo</h2>
          <ul>
            ${ROUTES.map(
              ({ path, label, icon }) => html`
                <li>
                  <a
                    href="#/${path}"
                    class=${this._route === path ? 'active' : ''}
                    @click=${(event: Event) => {
                      event.preventDefault();
                      this._navigate(path);
                    }}
                  >
                    <span aria-hidden="true">${icon}</span>
                    <span class="label">${label}</span>
                  </a>
                </li>
              `,
            )}
          </ul>
        </nav>

        <main class="content">${this._renderPage()}</main>
      </div>
    `;
  }
}

customElements.define('demo-app', App);
