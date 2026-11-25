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
  designPlatform,
  exitApp,
  hideSplashScreen,
  onBackButton,
  onKeyboardVisibilityChange,
  platform,
  selectionHaptic,
} from '../native/native.js';
import {
  hasNativeTabBar,
  onNativeTabSelect,
  renderNativeTabBar,
} from '../native/tab-bar.js';
import { ComponentsPage } from '../pages/components/components-page.js';
import { SettingsPage } from '../pages/settings/settings-page.js';
import { ShowcasePage } from '../pages/showcase/showcase-page.js';
import { demoElements } from '../catalog.js';
import { showcaseElements } from '../showcase/screens.js';
import { APPEARANCE_CHANGE_EVENT } from './appearance.js';
import { closeTopmostOverlay, onModalDialogChange } from './overlays.js';
import { type NavigationDirection, Router } from './router.js';
import {
  defaultTab,
  resolveScreen,
  type Screen,
  type TabId,
  tabs,
} from './routes.js';
import { TabBar, type TabSelectEvent } from './tab-bar/tab-bar.js';
import styles from './app.css' with { type: 'css' };

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Android's back affordance is an arrow; iOS (and the default look) uses a chevron. */
const BACK_ICON = designPlatform === 'android' ? 'arrow-left' : 'chevron-left';

/** The focused element, looking inside shadow roots. */
function deepActiveElement(): Element | null {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/**
 * The app shell: a header with the screen title (and a back button on child
 * screens), the current page, and a bottom tab bar. In the native apps the tab
 * bar is native (Liquid Glass on iOS 26+); in a browser it is the web
 * `<demo-tab-bar>`. On Android the hardware
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

  #router = new Router(this, (direction, apply) =>
    this.#transition(direction, apply),
  );

  /** The last path visited in each tab, so switching tabs returns to where you were. */
  #lastPathByTab = new Map<TabId, string>();

  /** Scroll positions by path, restored when you come back to a screen. */
  #scrollByPath = new Map<string, number>();

  #renderedPath?: string;

  /** Scroll position to restore once the new page has rendered. */
  #pendingScrollTop?: number;

  #keyboardOpen = false;
  #modalOpen = false;

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
    onKeyboardVisibilityChange((visible, height) => {
      this.toggleAttribute('keyboard-open', visible);
      this.#keyboardOpen = visible;
      this.#syncNativeTabBar();
      this.#makeRoomForKeyboard(height);
    });

    if (hasNativeTabBar) {
      this.toggleAttribute('native-tab-bar', true);
      // The tab bar tint follows the light/dark theme.
      window.addEventListener(APPEARANCE_CHANGE_EVENT, () =>
        this.#syncNativeTabBar(),
      );
      onNativeTabSelect((id) => this.#selectTab(id));
      onModalDialogChange((open) => {
        this.#modalOpen = open;
        this.#syncNativeTabBar();
      });
    }
  }

  override firstUpdated(changes: PropertyValues<this>): void {
    super.firstUpdated(changes);

    // Keep the native splash screen up until the first page has rendered, so
    // the app never shows an empty frame.
    void this.#pageUpdateComplete().then(() =>
      requestAnimationFrame(hideSplashScreen),
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
    this.#syncNativeTabBar();

    const path = this.#router.path;
    if (path !== this.#renderedPath) {
      this.#renderedPath = path;
      this.#lastPathByTab.set(this.#screen.tab, path);
      // The page element renders its own content after this update, so wait a
      // frame until it is tall enough to scroll. (During a view transition
      // `#transition` restores it earlier, before the new page is captured.)
      this.#pendingScrollTop = this.#scrollByPath.get(path) ?? 0;
      requestAnimationFrame(() => this.#restoreScroll());
    }
  }

  override render(): TemplateResult {
    const screen = this.#screen;

    return html`
      <header
        class="app-header ${screen.parent ? 'child' : 'root'} ${
          screen.grouped ? 'grouped' : ''
        }"
      >
        ${
          screen.parent
            ? html`
                <sl-button
                  class="back"
                  fill="ghost"
                  aria-label="Back"
                  @click=${this.#goUp}
                >
                  <sl-icon name=${BACK_ICON}></sl-icon>
                </sl-button>
              `
            : nothing
        }
        <h1 part="title">${screen.title}</h1>
      </header>
      <!-- tabindex: keyboard users must be able to scroll pages without focusable content. -->
      <main
        id="main"
        class=${screen.grouped ? 'grouped' : ''}
        part="page"
        tabindex="0"
        @click=${this.#onLinkClick}
      >
        ${screen.content}
      </main>
      ${
        hasNativeTabBar
          ? nothing
          : html`
              <demo-tab-bar
                .active=${screen.tab}
                @tab-select=${this.#onTabSelect}
              ></demo-tab-bar>
            `
      }
    `;
  }

  /**
   * Animates a route change with a view transition, like native navigation:
   * going deeper slides the new page in from the right over the old one, going
   * back slides the page away to the right. The header crossfades. Tab
   * switches (`replace`) are instant, as on iOS. See the `::view-transition`
   * rules in global.css.
   */
  #transition(direction: NavigationDirection, apply: () => void): void {
    if (
      direction === 'replace' ||
      reducedMotion.matches ||
      !('startViewTransition' in document)
    ) {
      apply();
      return;
    }

    const root = document.documentElement;
    root.dataset['navDirection'] = direction;

    const transition = document.startViewTransition(async () => {
      apply();
      await this.updateComplete;

      // Wait for the page itself, so the new state is captured fully rendered
      // and scrolled to where the user left it.
      await this.#pageUpdateComplete();
      this.#restoreScroll();
    });

    void transition.finished.finally(() => {
      delete root.dataset['navDirection'];
    });
  }

  /** Resolves once the current page element has rendered. */
  async #pageUpdateComplete(): Promise<void> {
    const page = this.main?.firstElementChild;
    if (page instanceof LitElement) {
      await page.updateComplete;
    }
  }

  #restoreScroll(): void {
    if (this.main && this.#pendingScrollTop !== undefined) {
      this.main.scrollTop = this.#pendingScrollTop;
      this.#pendingScrollTop = undefined;
    }
  }

  /**
   * Shows the current tab in the native tab bar. The bar is drawn above the
   * web view, so it is hidden while a modal dialog is open (it would cover
   * the dialog) and, on Android, while the keyboard is open (the window
   * resizes, which would push the bar up above the keyboard).
   */
  #syncNativeTabBar(): void {
    const hidden =
      this.#modalOpen || (this.#keyboardOpen && platform === 'android');
    void renderNativeTabBar(this.#screen.tab, hidden);
  }

  /**
   * On iOS the WebView keeps its full height while the keyboard is open (see
   * `Keyboard.resize` in capacitor.config.ts). Shrink the shell by the keyboard
   * height so `<main>` ends at the top of the keyboard, then scroll the focused
   * field into view. Android resizes the window itself, so this is iOS only.
   */
  #makeRoomForKeyboard(height: number): void {
    if (platform !== 'ios') {
      return;
    }

    this.style.setProperty('--keyboard-height', `${height}px`);
    if (height > 0) {
      requestAnimationFrame(() =>
        deepActiveElement()?.scrollIntoView({ block: 'nearest' }),
      );
    }
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
