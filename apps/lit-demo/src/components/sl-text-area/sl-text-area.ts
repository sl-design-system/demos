import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { TextArea } from '@sl-design-system/text-area';
import styles from './sl-text-area.scss.js';

export class TextAreaPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-text-area': TextArea,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <div class="text-area-container">
        <sl-text-area
          aria-label="Text area"
          placeholder="Type your message"
          rows="4"
        ></sl-text-area>
      </div>
      <div class="text-area-container">
        <sl-text-area
          aria-label="Disabled text area"
          placeholder="Disabled text area"
          rows="4"
          disabled
        ></sl-text-area>
      </div>
    `;
  }
}
