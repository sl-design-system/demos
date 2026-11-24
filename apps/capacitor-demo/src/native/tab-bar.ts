import {
  NativeNavigation,
  type NativeNavigationIcon,
  type NativeNavigationTab,
} from '@capgo/capacitor-native-navigation';
import { type TabId, tabs } from '../app/routes.js';
import { isNative } from './native.js';

/**
 * Native tab bar through `@capgo/capacitor-native-navigation`: on iOS 26+ a
 * system `UITabBarController` with Liquid Glass, on Android a floating
 * translucent capsule. In a regular browser the app keeps its web tab bar.
 */
export const hasNativeTabBar = isNative;

// Android renders inline SVG (as template images, so the native tint applies).
const GRID_SVG =
  '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>';
const STAR_SVG =
  '<svg viewBox="0 0 24 24"><polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3"/></svg>';
const SLIDERS_SVG =
  '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="2"/><rect x="2" y="11" width="20" height="2"/><rect x="2" y="18" width="20" height="2"/><circle cx="8" cy="5" r="2.5"/><circle cx="16" cy="12" r="2.5"/><circle cx="10" cy="19" r="2.5"/></svg>';

/** SF Symbols on iOS (outline, and filled when selected), SVG on Android. */
const ICONS: Record<
  TabId,
  { icon: NativeNavigationIcon; selectedIcon: NativeNavigationIcon }
> = {
  components: {
    icon: { ios: { sfSymbol: 'square.grid.2x2' }, android: { svg: GRID_SVG } },
    selectedIcon: {
      ios: { sfSymbol: 'square.grid.2x2.fill' },
      android: { svg: GRID_SVG },
    },
  },
  showcase: {
    icon: { ios: { sfSymbol: 'star' }, android: { svg: STAR_SVG } },
    selectedIcon: {
      ios: { sfSymbol: 'star.fill' },
      android: { svg: STAR_SVG },
    },
  },
  settings: {
    icon: { ios: { sfSymbol: 'gearshape' }, android: { svg: SLIDERS_SVG } },
    selectedIcon: {
      ios: { sfSymbol: 'gearshape.fill' },
      android: { svg: SLIDERS_SVG },
    },
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
