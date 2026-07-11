import { html, LitElement, nothing, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { EdgeSwipeBack } from '../gestures.js';
import { CoursesPage } from '../pages/courses/courses-page.js';
import { DevicePage } from '../pages/device/device-page.js';
import { GradesPage } from '../pages/grades/grades-page.js';
import { HomePage } from '../pages/home/home-page.js';
import { MessagesPage } from '../pages/messages/messages-page.js';
import { ProfilePage } from '../pages/profile/profile-page.js';
import { SchedulePage } from '../pages/schedule/schedule-page.js';
import { SettingsPage } from '../pages/settings/settings-page.js';
import { Router } from '../router.js';
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
  { path: 'schedule', label: 'Schedule', icon: '📅' },
  { path: 'messages', label: 'Messages', icon: '💬' },
  { path: 'grades', label: 'Grades', icon: '🎓' },
  { path: 'profile', label: 'Profile', icon: '👤' },
  { path: 'device', label: 'Device', icon: '📱' },
  { path: 'settings', label: 'Settings', icon: '⚙️' },
];

// The first five routes are promoted to the floating tab bar; the drawer
// menu lists everything.
const TAB_ROUTES = ROUTES.slice(0, 5);

const DEFAULT_ROUTE = 'home';

type SwipePhase = 'idle' | 'dragging' | 'commit' | 'cancel';

const SWIPE_COMMIT_DURATION = 220;
const SWIPE_CANCEL_DURATION = 200;

/**
 * Application shell: a mobile style top app bar with a drawer menu, a
 * floating "glass" bottom tab bar like native iOS apps, a quick theme
 * toggle and a router built on the Navigation API (see router.ts).
 *
 * Route changes are animated with the View Transitions API — pushes slide
 * in from the right, pops slide out to the right, like a native iOS
 * navigation stack — and swiping from the left edge navigates backwards
 * (see gestures.ts).
 */
export class App extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'page-courses': CoursesPage,
    'page-device': DevicePage,
    'page-grades': GradesPage,
    'page-home': HomePage,
    'page-messages': MessagesPage,
    'page-profile': ProfilePage,
    'page-schedule': SchedulePage,
    'page-settings': SettingsPage,
  };

  static override styles = styles;

  #router = new Router(
    ROUTES.map(({ path }) => path),
    DEFAULT_ROUTE,
  );

  #edgeSwipe = new EdgeSwipeBack({
    canGoBack: () => this.#router.canGoBack,
    onStart: () => {
      this._swipePhase = 'dragging';
    },
    onMove: (dx) => {
      this.style.setProperty('--swipe-x', `${dx}px`);
    },
    onCommit: () => {
      this._swipePhase = 'commit';

      window.setTimeout(() => {
        this.#skipTransition = true;
        this.#router.back();
      }, SWIPE_COMMIT_DURATION);
    },
    onCancel: () => {
      this._swipePhase = 'cancel';

      window.setTimeout(() => this.#resetSwipe(), SWIPE_CANCEL_DURATION);
    },
  });

  #skipTransition = false;

  @state() private _route = DEFAULT_ROUTE;
  @state() private _menuOpen = false;
  @state() private _swipePhase: SwipePhase = 'idle';

  private _onRouteChange = (): void => {
    const apply = (): void => {
      this._route = this.#router.route;
      this._menuOpen = false;
      this.#resetSwipe();
    };

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (this.#skipTransition || reduceMotion || !document.startViewTransition) {
      this.#skipTransition = false;
      apply();

      return;
    }

    // Drive the ::view-transition animation direction from the router,
    // so pushes and pops slide opposite ways (see index.html)
    document.documentElement.setAttribute(
      'data-nav-direction',
      this.#router.direction,
    );

    const transition = document.startViewTransition(async () => {
      apply();
      await this.updateComplete;
    });

    void transition.finished.finally(() => {
      document.documentElement.removeAttribute('data-nav-direction');
    });
  };

  private _onThemeChange = (): void => {
    this.requestUpdate();
  };

  override connectedCallback(): void {
    super.connectedCallback();

    this.#router.addEventListener('route-change', this._onRouteChange);
    themeManager.addEventListener('theme-change', this._onThemeChange);

    this.#router.start();
    this._route = this.#router.route;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.#router.removeEventListener('route-change', this._onRouteChange);
    themeManager.removeEventListener('theme-change', this._onThemeChange);
  }

  override firstUpdated(): void {
    const edge = this.renderRoot.querySelector<HTMLElement>('.edge-swipe');

    if (edge) {
      this.#edgeSwipe.attach(edge);
    }
  }

  #resetSwipe(): void {
    this._swipePhase = 'idle';
    this.style.removeProperty('--swipe-x');
  }

  private _toggleTheme(): void {
    void themeManager.setMode(themeManager.dark ? 'light' : 'dark');
  }

  private _renderPage(): TemplateResult {
    switch (this._route) {
      case 'courses':
        return html`<page-courses></page-courses>`;
      case 'schedule':
        return html`<page-schedule></page-schedule>`;
      case 'messages':
        return html`<page-messages></page-messages>`;
      case 'grades':
        return html`<page-grades></page-grades>`;
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
          aria-label="All pages"
        >
          <h2>SLDS Demo</h2>
          <ul>
            ${ROUTES.map(
              ({ path, label, icon }) => html`
                <li>
                  <a
                    href="#/${path}"
                    class=${this._route === path ? 'active' : ''}
                    aria-current=${this._route === path ? 'page' : nothing}
                    @click=${() => (this._menuOpen = false)}
                  >
                    <span aria-hidden="true">${icon}</span>
                    <span class="label">${label}</span>
                  </a>
                </li>
              `,
            )}
          </ul>
        </nav>

        <main
          class="content ${this._swipePhase !== 'idle'
            ? `swipe-${this._swipePhase}`
            : ''}"
        >
          ${this._renderPage()}
        </main>

        <div class="edge-swipe" aria-hidden="true"></div>

        <nav class="tab-bar" aria-label="Primary">
          ${TAB_ROUTES.map(
            ({ path, label, icon }) => html`
              <a
                href="#/${path}"
                class=${this._route === path ? 'active' : ''}
                aria-current=${this._route === path ? 'page' : nothing}
              >
                <span class="tab-icon" aria-hidden="true">${icon}</span>
                <span class="tab-label">${label}</span>
              </a>
            `,
          )}
        </nav>
      </div>
    `;
  }
}

customElements.define('demo-app', App);
