import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Combobox } from '@sl-design-system/combobox';
import { Listbox, Option } from '@sl-design-system/listbox';

export class ComboboxPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-combobox': Combobox,
    'sl-listbox': Listbox,
    'sl-option': Option,
  };

  override render(): TemplateResult {
    return html`
      <sl-combobox
        filter-results
        .options=${Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`)}>
      </sl-combobox>

      <sl-text-field></sl-text-field>
    `;
  }
}
