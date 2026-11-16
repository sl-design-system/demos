import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { ToggleButton } from '@sl-design-system/toggle-button';

export class ToggleButtonPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-toggle-button': ToggleButton,
  };

  override render(): TemplateResult {
    return html`
      <sl-toggle-button variant="primary" fill="solid">Test 1</sl-toggle-button>
      <sl-toggle-button variant="primary" fill="solid" disabled
        >Test 2</sl-toggle-button
      >
    `;
  }
}
