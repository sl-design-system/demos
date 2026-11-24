import type { DemoPage } from './demos/demo-page.js';
import { AccordionDemo } from './demos/accordion/accordion-demo.js';
import { AvatarDemo } from './demos/avatar/avatar-demo.js';
import { ButtonDemo } from './demos/button/button-demo.js';
import { CalloutDemo } from './demos/callout/callout-demo.js';
import { CardDemo } from './demos/card/card-demo.js';
import { CheckboxDemo } from './demos/checkbox/checkbox-demo.js';
import { ComboboxDemo } from './demos/combobox/combobox-demo.js';
import { DateFieldDemo } from './demos/date-field/date-field-demo.js';
import { DialogDemo } from './demos/dialog/dialog-demo.js';
import { InfotipDemo } from './demos/infotip/infotip-demo.js';
import { InlineMessageDemo } from './demos/inline-message/inline-message-demo.js';
import { MenuDemo } from './demos/menu/menu-demo.js';
import { MessageDialogDemo } from './demos/message-dialog/message-dialog-demo.js';
import { NumberFieldDemo } from './demos/number-field/number-field-demo.js';
import { PaginatorDemo } from './demos/paginator/paginator-demo.js';
import { PopoverDemo } from './demos/popover/popover-demo.js';
import { RadioGroupDemo } from './demos/radio-group/radio-group-demo.js';
import { SearchFieldDemo } from './demos/search-field/search-field-demo.js';
import { SelectDemo } from './demos/select/select-demo.js';
import { SwitchDemo } from './demos/switch/switch-demo.js';
import { TabGroupDemo } from './demos/tab-group/tab-group-demo.js';
import { TagDemo } from './demos/tag/tag-demo.js';
import { TextAreaDemo } from './demos/text-area/text-area-demo.js';
import { TextFieldDemo } from './demos/text-field/text-field-demo.js';
import { TimeFieldDemo } from './demos/time-field/time-field-demo.js';
import { ToggleButtonDemo } from './demos/toggle-button/toggle-button-demo.js';
import { TooltipDemo } from './demos/tooltip/tooltip-demo.js';

export interface CatalogItem {
  /** URL segment, e.g. `text-field` for `/components/text-field`. */
  slug: string;
  name: string;
  /** The demo page, registered by `App` as `<demo-{slug}>`. */
  page: typeof DemoPage;
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
      { slug: 'button', name: 'Button', page: ButtonDemo },
      { slug: 'toggle-button', name: 'Toggle button', page: ToggleButtonDemo },
      { slug: 'menu', name: 'Menu', page: MenuDemo },
    ],
  },
  {
    title: 'Forms',
    items: [
      { slug: 'text-field', name: 'Text field', page: TextFieldDemo },
      { slug: 'text-area', name: 'Text area', page: TextAreaDemo },
      { slug: 'search-field', name: 'Search field', page: SearchFieldDemo },
      { slug: 'number-field', name: 'Number field', page: NumberFieldDemo },
      { slug: 'select', name: 'Select', page: SelectDemo },
      { slug: 'combobox', name: 'Combobox', page: ComboboxDemo },
      { slug: 'checkbox', name: 'Checkbox', page: CheckboxDemo },
      { slug: 'radio-group', name: 'Radio group', page: RadioGroupDemo },
      { slug: 'switch', name: 'Switch', page: SwitchDemo },
      { slug: 'date-field', name: 'Date field', page: DateFieldDemo },
      { slug: 'time-field', name: 'Time field', page: TimeFieldDemo },
    ],
  },
  {
    title: 'Feedback',
    items: [
      {
        slug: 'inline-message',
        name: 'Inline message',
        page: InlineMessageDemo,
      },
      { slug: 'callout', name: 'Callout', page: CalloutDemo },
      { slug: 'dialog', name: 'Dialog', page: DialogDemo },
      {
        slug: 'message-dialog',
        name: 'Message dialog',
        page: MessageDialogDemo,
      },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { slug: 'popover', name: 'Popover', page: PopoverDemo },
      { slug: 'infotip', name: 'Infotip', page: InfotipDemo },
      { slug: 'tooltip', name: 'Tooltip', page: TooltipDemo },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { slug: 'tab-group', name: 'Tabs', page: TabGroupDemo },
      { slug: 'paginator', name: 'Paginator', page: PaginatorDemo },
    ],
  },
  {
    title: 'Data display',
    items: [
      { slug: 'card', name: 'Card', page: CardDemo },
      { slug: 'avatar', name: 'Avatar', page: AvatarDemo },
      { slug: 'tag', name: 'Tag', page: TagDemo },
      { slug: 'accordion', name: 'Accordion', page: AccordionDemo },
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

/** All demo pages as scoped elements, keyed by their `demo-{slug}` tag name. */
export function demoElements(): Record<string, typeof DemoPage> {
  return Object.fromEntries(
    catalog.flatMap((group) =>
      group.items.map((item) => [`demo-${item.slug}`, item.page]),
    ),
  );
}
