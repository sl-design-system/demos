import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Callout } from '@sl-design-system/callout';

export class CalloutPage extends ScopedElementsMixin(LitElement) {
  static override get scopedElements(): ScopedElementsMap {
    return {
      'sl-button': Button,
      'sl-callout': Callout,
    };
  }

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-callout variant="info">
        <h2 slot="title">Test title</h2>
        Test description.
        <a href="about:blank" target="_blank" rel="noopener noreferrer"
          >Open link</a
        >
        <sl-button fill="outline" variant="info" @click=${this._openBlankPage}
          >Open page</sl-button
        >
      </sl-callout>
    `;
  }
}
