import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';

export class MessageDialogPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
  };

  private async _showAlert(): Promise<void> {
    await MessageDialog.alert('Test description', 'Test');
  }

  override render(): TemplateResult {
    return html`
      <sl-button
        variant="primary"
        fill="solid"
        @click=${() => this._showAlert()}
        >Show</sl-button
      >
    `;
  }
}
