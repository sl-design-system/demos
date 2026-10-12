import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { SearchField } from '@sl-design-system/search-field';

export class FormFieldPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-search-field': SearchField,
  };

  override render(): TemplateResult {
    return html`
      <div class="states">
        <sl-form-field label="Enabled search field">
          <sl-search-field placeholder="Search"></sl-search-field>
        </sl-form-field>

        <sl-form-field label="Disabled search field">
          <sl-search-field disabled placeholder="Search"></sl-search-field>
        </sl-form-field>
      </div>
    `;
  }
}
