import { html, type TemplateResult } from 'lit';
import { findCatalogItem } from '../catalog.js';

export type TabId = 'components' | 'showcase' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  /** Name of a registered `sl-icon`. */
  icon: string;
  /** The tab's root screen. */
  path: string;
}

export const tabs: Tab[] = [
  {
    id: 'components',
    label: 'Components',
    icon: 'demo-grid',
    path: '/components',
  },
  { id: 'showcase', label: 'Showcase', icon: 'star', path: '/showcase' },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'demo-sliders',
    path: '/settings',
  },
];

export const defaultTab: Tab = tabs[0]!;

export interface Screen {
  tab: TabId;
  title: string;
  /** The screen "back" returns to; undefined for a tab's root screen. */
  parent?: string;
  /**
   * The page to show. The tag names are scoped elements registered by
   * `App`, so this template must be rendered inside the app's shadow root.
   */
  content: TemplateResult;
}

/** Maps a path to the screen to show, or `undefined` when nothing matches. */
export function resolveScreen(path: string): Screen | undefined {
  const [, section, slug, ...rest] = path.split('/');
  if (rest.length > 0) {
    return undefined;
  }

  if (section === 'components' && !slug) {
    return {
      tab: 'components',
      title: 'Components',
      content: html`<page-components></page-components>`,
    };
  }

  if (section === 'components' && slug) {
    const item = findCatalogItem(slug);
    return item
      ? {
          tab: 'components',
          title: item.name,
          parent: '/components',
          content: html`<page-component-detail
            .name=${item.name}
          ></page-component-detail>`,
        }
      : undefined;
  }

  if (section === 'showcase' && !slug) {
    return {
      tab: 'showcase',
      title: 'Showcase',
      content: html`<page-showcase></page-showcase>`,
    };
  }

  if (section === 'settings' && !slug) {
    return {
      tab: 'settings',
      title: 'Settings',
      content: html`<page-settings></page-settings>`,
    };
  }

  return undefined;
}
