import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';

export class ButtonBarPage extends ScopedElementsMixin(LitElement) {
  static override get scopedElements(): ScopedElementsMap {
    return {
      'sl-button': Button,
      'sl-button-bar': ButtonBar,
    };
  }

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-button-bar align="start">
        <sl-button variant="primary" fill="solid" disabled>Test 1</sl-button>
        <sl-button variant="primary" fill="solid" @click=${this._openBlankPage}
          >Test 2</sl-button
        >
      </sl-button-bar>
    `;
  }
}
