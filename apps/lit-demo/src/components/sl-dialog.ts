import { html, LitElement, type PropertyValues, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Dialog } from '@sl-design-system/dialog';

export class DialogPage extends ScopedElementsMixin(LitElement) {
  static override get scopedElements(): ScopedElementsMap {
    return {
      'sl-button': Button,
      'sl-dialog': Dialog,
    };
  }

  private _dialog?: Dialog;

  override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._dialog = this.renderRoot.querySelector('sl-dialog') as Dialog;
  }

  private _openDialog(): void {
    this._dialog?.showModal();
  }

  override render(): TemplateResult {
    return html`
      <sl-button
        variant="primary"
        fill="solid"
        @click=${() => this._openDialog()}
        >Test</sl-button
      >
      <sl-dialog>
        <h1 slot="title">Test title</h1>
        Test description
        <sl-button slot="primary-actions" sl-dialog-close>Close</sl-button>
      </sl-dialog>
    `;
  }
}
