import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Checkbox, CheckboxGroup } from '@sl-design-system/checkbox';

export class CheckboxPage extends ScopedElementsMixin(LitElement) {
  static override get scopedElements(): ScopedElementsMap {
    return {
      'sl-checkbox': Checkbox,
      'sl-checkbox-group': CheckboxGroup,
    };
  }

  override render(): TemplateResult {
    return html`
      <sl-checkbox-group>
        <sl-checkbox value="enabled">Test 1</sl-checkbox>
        <sl-checkbox value="disabled" disabled>Test 2</sl-checkbox>
      </sl-checkbox-group>
    `;
  }
}
