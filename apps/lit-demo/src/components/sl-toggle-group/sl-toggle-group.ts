import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { ToggleButton } from '@sl-design-system/toggle-button';
import { ToggleGroup } from '@sl-design-system/toggle-group';

export class ToggleGroupPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-toggle-button': ToggleButton,
    'sl-toggle-group': ToggleGroup,
  };

  override render(): TemplateResult {
    return html`
      <sl-toggle-group>
        <sl-toggle-button variant="primary" fill="solid"
          >Test 1</sl-toggle-button
        >
        <sl-toggle-button variant="primary" fill="solid"
          >Test 2</sl-toggle-button
        >
        <sl-toggle-button variant="primary" fill="solid" disabled
          >Test 3</sl-toggle-button
        >
      </sl-toggle-group>
    `;
  }
}
