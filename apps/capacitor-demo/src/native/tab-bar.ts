import {
  NativeNavigation,
  type NativeNavigationIcon,
  type NativeNavigationTab,
} from '@capgo/capacitor-native-navigation';
import { type TabId, tabs } from '../app/routes.js';
import { isNative, platform } from './native.js';

/**
 * Native tab bar through `@capgo/capacitor-native-navigation`, on iOS only:
 * iOS 26+ shows the system `UITabBarController` with Liquid Glass, which a
 * web view can't imitate convincingly. Android's Material navigation bar is
 * opaque and flat, so there (and in a browser) the app's web tab bar is just
 * as native-looking and stays under dialogs and popovers.
 */
export const hasNativeTabBar = isNative && platform === 'ios';

/** SF Symbols, outline and filled when selected. */
const ICONS: Record<
  TabId,
  { icon: NativeNavigationIcon; selectedIcon: NativeNavigationIcon }
> = {
  components: {
    icon: { ios: { sfSymbol: 'square.grid.2x2' } },
    selectedIcon: { ios: { sfSymbol: 'square.grid.2x2.fill' } },
  },
  showcase: {
    icon: { ios: { sfSymbol: 'star' } },
    selectedIcon: { ios: { sfSymbol: 'star.fill' } },
  },
  settings: {
    icon: { ios: { sfSymbol: 'gearshape' } },
    selectedIcon: { ios: { sfSymbol: 'gearshape.fill' } },
  },
};

const NATIVE_TABS: NativeNavigationTab[] = tabs.map((tab) => ({
  id: tab.id,
  title: tab.label,
  ...ICONS[tab.id],
}));

function isTabId(id: string): id is TabId {
  return tabs.some((tab) => tab.id === id);
}

/**
 * The SLDS "selected" colour as `#rrggbb`, used as the tab bar tint so the
 * selected tab matches the rest of the app. Read from a probe element because
 * the token resolves through several custom properties.
 */
function selectedTint(): string | undefined {
  const probe = document.createElement('span');
  probe.style.color = 'var(--sl-color-foreground-selected-bold)';
  document.body.append(probe);
  const channels = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
  probe.remove();

  if (!channels || channels.length < 3) {
    return undefined;
  }

  return `#${channels
    .slice(0, 3)
    .map((channel) => Math.round(Number(channel)).toString(16).padStart(2, '0'))
    .join('')}`;
}

let rendered:
  { selectedId: TabId; hidden: boolean; tint: string | undefined } | undefined;

/**
 * Shows (or updates) the native tab bar. Call it again after the appearance
 * changes so the tint follows. Does nothing in a browser.
 */
export async function renderNativeTabBar(
  selectedId: TabId,
  hidden: boolean,
): Promise<void> {
  if (!hasNativeTabBar) {
    return;
  }

  const tint = selectedTint();
  if (
    rendered?.selectedId === selectedId &&
    rendered.hidden === hidden &&
    rendered.tint === tint
  ) {
    return;
  }

  // `animated` soft-hides the bar (and fades it back in) instead of tearing
  // it down; it needs the same tabs on every call.
  const animated = rendered !== undefined;
  rendered = { selectedId, hidden, tint };
  await NativeNavigation.setTabbar({
    tabs: NATIVE_TABS,
    selectedId,
    hidden,
    animated,
    labelVisibilityMode: 'labeled',
    colors: tint ? { tint } : undefined,
  });
}

/** Calls `handler` when the user taps a tab in the native tab bar. */
export function onNativeTabSelect(handler: (id: TabId) => void): void {
  if (!hasNativeTabBar) {
    return;
  }

  void NativeNavigation.addListener('tabSelect', ({ id }) => {
    if (isTabId(id)) {
      // The native bar already shows the new tab.
      if (rendered) {
        rendered = { ...rendered, selectedId: id };
      }
      handler(id);
    }
  });
}
