export interface CatalogItem {
  /** URL segment, e.g. `text-field` for `/components/text-field`. */
  slug: string;
  name: string;
}

export interface CatalogGroup {
  title: string;
  items: CatalogItem[];
}

/** Components shown in the catalog, grouped the way a mobile developer looks for them. */
export const catalog: CatalogGroup[] = [
  {
    title: 'Actions',
    items: [
      { slug: 'button', name: 'Button' },
      { slug: 'toggle-button', name: 'Toggle button' },
      { slug: 'menu', name: 'Menu' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { slug: 'text-field', name: 'Text field' },
      { slug: 'text-area', name: 'Text area' },
      { slug: 'search-field', name: 'Search field' },
      { slug: 'number-field', name: 'Number field' },
      { slug: 'select', name: 'Select' },
      { slug: 'combobox', name: 'Combobox' },
      { slug: 'checkbox', name: 'Checkbox' },
      { slug: 'radio-group', name: 'Radio group' },
      { slug: 'switch', name: 'Switch' },
      { slug: 'date-field', name: 'Date field' },
      { slug: 'time-field', name: 'Time field' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { slug: 'inline-message', name: 'Inline message' },
      { slug: 'callout', name: 'Callout' },
      { slug: 'dialog', name: 'Dialog' },
      { slug: 'message-dialog', name: 'Message dialog' },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { slug: 'popover', name: 'Popover' },
      { slug: 'infotip', name: 'Infotip' },
      { slug: 'tooltip', name: 'Tooltip' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { slug: 'tab-group', name: 'Tabs' },
      { slug: 'paginator', name: 'Paginator' },
    ],
  },
  {
    title: 'Data display',
    items: [
      { slug: 'card', name: 'Card' },
      { slug: 'avatar', name: 'Avatar' },
      { slug: 'tag', name: 'Tag' },
      { slug: 'accordion', name: 'Accordion' },
    ],
  },
];

export function findCatalogItem(slug: string): CatalogItem | undefined {
  for (const group of catalog) {
    const item = group.items.find((candidate) => candidate.slug === slug);
    if (item) {
      return item;
    }
  }

  return undefined;
}
