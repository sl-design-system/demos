import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { TextField } from '@sl-design-system/text-field';
import styles from './sl-text-field.scss.js';

export class TextFieldPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-text-field': TextField,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <div class="text-field-container">
        <sl-text-field
          aria-label="Text field"
          placeholder="Type your message"
        ></sl-text-field>
      </div>
      <div class="text-field-container">
        <sl-text-field
          aria-label="Disabled text field"
          placeholder="Disabled text field"
          disabled
        ></sl-text-field>
      </div>
    `;
  }
}
