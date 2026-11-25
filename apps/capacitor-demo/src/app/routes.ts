import { html, type TemplateResult } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { findCatalogItem } from '../catalog.js';
import { findShowcaseScreen } from '../showcase/screens.js';

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
   * Whether the page is made of inset grouped cards (styles/list.css and the
   * demo sections in styles/demo.css). The shell then gives it the tinted
   * ground the cards sit on.
   */
  grouped?: boolean;
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
      grouped: true,
      content: html`<page-components></page-components>`,
    };
  }

  if (section === 'components' && slug) {
    const item = findCatalogItem(slug);
    if (!item) {
      return undefined;
    }

    // Safe: the tag name is built from a slug that exists in the catalog.
    const tag = unsafeStatic(`demo-${item.slug}`);
    return {
      tab: 'components',
      title: item.name,
      parent: '/components',
      grouped: true,
      content: staticHtml`<${tag}></${tag}>`,
    };
  }

  if (section === 'showcase' && !slug) {
    return {
      tab: 'showcase',
      title: 'Showcase',
      grouped: true,
      content: html`<page-showcase></page-showcase>`,
    };
  }

  if (section === 'showcase' && slug) {
    const screen = findShowcaseScreen(slug);
    if (!screen) {
      return undefined;
    }

    // Safe: the tag name is built from a slug that exists in the registry.
    const tag = unsafeStatic(`showcase-${screen.slug}`);
    return {
      tab: 'showcase',
      title: screen.name,
      parent: '/showcase',
      content: staticHtml`<${tag}></${tag}>`,
    };
  }

  if (section === 'settings' && !slug) {
    return {
      tab: 'settings',
      title: 'Settings',
      grouped: true,
      content: html`<page-settings></page-settings>`,
    };
  }

  return undefined;
}
