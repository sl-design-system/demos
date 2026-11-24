import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Icon } from '@sl-design-system/icon';
import {
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { query } from 'lit/decorators.js';
import {
  exitApp,
  onBackButton,
  onKeyboardVisibilityChange,
  selectionHaptic,
} from '../native/native.js';
import { ComponentsPage } from '../pages/components/components-page.js';
import { SettingsPage } from '../pages/settings/settings-page.js';
import { ShowcasePage } from '../pages/showcase/showcase-page.js';
import { demoElements } from '../catalog.js';
import { showcaseElements } from '../showcase/screens.js';
import { closeTopmostOverlay } from './overlays.js';
import { Router } from './router.js';
import {
  defaultTab,
  resolveScreen,
  type Screen,
  type TabId,
  tabs,
} from './routes.js';
import { TabBar, type TabSelectEvent } from './tab-bar/tab-bar.js';
import styles from './app.css' with { type: 'css' };

/**
 * The app shell: a header with the screen title (and a back button on child
 * screens), the current page, and a bottom tab bar. On Android the hardware
 * back button closes overlays first, then walks back up to the default tab,
 * then leaves the app.
 */
export class App extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    ...demoElements(),
    ...showcaseElements(),
    'demo-tab-bar': TabBar,
    'page-components': ComponentsPage,
    'page-settings': SettingsPage,
    'page-showcase': ShowcasePage,
    'sl-button': Button,
    'sl-icon': Icon,
  };

  static override styles = styles;

  #router = new Router(this);

  /** The last path visited in each tab, so switching tabs returns to where you were. */
  #lastPathByTab = new Map<TabId, string>();

  /** Scroll positions by path, restored when you come back to a screen. */
  #scrollByPath = new Map<string, number>();

  #renderedPath?: string;

  @query('main') private main?: HTMLElement;

  get #screen(): Screen {
    // `willUpdate` redirects unknown paths, so this only falls back briefly.
    return (
      resolveScreen(this.#router.path) ??
      (resolveScreen(defaultTab.path) as Screen)
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    onBackButton(this.#onBackButton);
    onKeyboardVisibilityChange((visible) =>
      this.toggleAttribute('keyboard-open', visible),
    );
  }

  override willUpdate(changes: PropertyValues<this>): void {
    super.willUpdate(changes);

    if (!resolveScreen(this.#router.path)) {
      this.#router.navigate(defaultTab.path, { replace: true });
    }

    if (this.#renderedPath && this.#renderedPath !== this.#router.path) {
      this.#scrollByPath.set(this.#renderedPath, this.main?.scrollTop ?? 0);
    }
  }

  override updated(changes: PropertyValues<this>): void {
    super.updated(changes);

    const path = this.#router.path;
    if (path !== this.#renderedPath) {
      this.#renderedPath = path;
      this.#lastPathByTab.set(this.#screen.tab, path);
      // The page element renders its own content after this update, so wait a
      // frame until it is tall enough to scroll.
      const scrollTop = this.#scrollByPath.get(path) ?? 0;
      requestAnimationFrame(() => {
        if (this.main) {
          this.main.scrollTop = scrollTop;
        }
      });
    }
  }

  override render(): TemplateResult {
    const screen = this.#screen;

    return html`
      <header class="app-header">
        ${
          screen.parent
            ? html`
                <sl-button
                  class="back"
                  fill="ghost"
                  aria-label="Back"
                  @click=${this.#goUp}
                >
                  <sl-icon name="chevron-left"></sl-icon>
                </sl-button>
              `
            : nothing
        }
        <h1>${screen.title}</h1>
      </header>
      <!-- tabindex: keyboard users must be able to scroll pages without focusable content. -->
      <main id="main" tabindex="0" @click=${this.#onLinkClick}>
        ${screen.content}
      </main>
      <demo-tab-bar
        .active=${screen.tab}
        @tab-select=${this.#onTabSelect}
      ></demo-tab-bar>
    `;
  }

  /** Go to the parent of the current screen. Returns whether there was one. */
  #goUp = (): boolean => {
    const { parent } = this.#screen;
    if (!parent) {
      return false;
    }

    this.#router.back(parent);
    return true;
  };

  #selectTab(id: TabId): void {
    const tab = tabs.find((candidate) => candidate.id === id) ?? defaultTab;

    if (id === this.#screen.tab) {
      // Tapping the active tab returns to its root screen, scrolled to the top.
      if (!this.#goUp()) {
        this.main?.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    selectionHaptic();

    // Tab switches replace the current entry, so history only holds the
    // drill-down within a tab and "back" never jumps between tabs.
    this.#router.navigate(this.#lastPathByTab.get(id) ?? tab.path, {
      replace: true,
    });
  }

  #onTabSelect = (event: TabSelectEvent): void => {
    this.#selectTab(event.detail);
  };

  /** Turns clicks on same-origin links in the page into router navigation. */
  #onLinkClick = (event: MouseEvent): void => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = event
      .composedPath()
      .find(
        (target): target is HTMLAnchorElement =>
          target instanceof HTMLAnchorElement,
      );
    if (!anchor || anchor.target || anchor.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    this.#router.navigate(anchor.pathname);
  };

  #onBackButton = (): void => {
    if (closeTopmostOverlay() || this.#goUp()) {
      return;
    }

    if (this.#screen.tab !== defaultTab.id) {
      this.#selectTab(defaultTab.id);
      return;
    }

    exitApp();
  };
}
