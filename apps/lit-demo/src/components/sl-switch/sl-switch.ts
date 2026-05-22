import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Switch } from '@sl-design-system/switch';

export class SwitchPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-switch': Switch,
  };

  override render(): TemplateResult {
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;"
      >
        <sl-switch value="12345">Text inside the switch</sl-switch>
        <sl-switch value="12345" disabled>Disabled switch</sl-switch>
      </div>
    `;
  }
}
