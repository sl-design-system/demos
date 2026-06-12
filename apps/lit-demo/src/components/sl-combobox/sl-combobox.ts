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
      <sl-combobox multiple>
        <sl-listbox>
          <sl-option value="0">Test 1</sl-option>
          <sl-option value="1">Test 2</sl-option>
        </sl-listbox>
      </sl-combobox>
    `;
  }
}
