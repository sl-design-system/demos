import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { InlineMessage } from '@sl-design-system/inline-message';

export class InlineMessagePage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-inline-message': InlineMessage,
  };

  override render(): TemplateResult {
    return html`
      <sl-inline-message variant="success">
        <span slot="title">Test</span>
        Test description
      </sl-inline-message>
    `;
  }
}
