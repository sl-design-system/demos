import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { MessageDialog } from '@sl-design-system/message-dialog';
// MessageDialog appends <sl-message-dialog> to the document body, so it must be
// defined globally rather than as a scoped element.
import '@sl-design-system/message-dialog/register.js';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';

type SaveChoice = 'save' | 'discard';

export class MessageDialogDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
  };

  @state() private result = '';

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Alert',
        html`
          <sl-button fill="solid" @click=${this.#alert}>Show alert</sl-button>
        `,
      )}
      ${demoSection(
        'Confirm',
        html`
          <sl-button fill="solid" @click=${this.#confirm}
            >Delete note</sl-button
          >
        `,
      )}
      ${demoSection(
        'Custom buttons',
        html`
          <sl-button fill="solid" @click=${this.#custom}
            >Close editor</sl-button
          >
        `,
        {
          hint: 'Check how three buttons fit on a narrow screen.',
        },
      )}
      ${
        this.result
          ? html`<p class="demo-output" aria-live="polite">${this.result}</p>`
          : ''
      }
    `;
  }

  #alert = async (): Promise<void> => {
    await MessageDialog.alert(
      'Your teacher has received your assignment.',
      'Handed in',
    );
    this.result = 'Alert closed';
  };

  #confirm = async (): Promise<void> => {
    const confirmed = await MessageDialog.confirm(
      'This note will be deleted permanently.',
      'Delete note?',
    );
    this.result = confirmed ? 'Confirmed: note deleted' : 'Cancelled';
  };

  #custom = async (): Promise<void> => {
    const choice = await MessageDialog.show<SaveChoice>({
      title: 'Unsaved changes',
      message: 'Do you want to save your changes before closing?',
      buttons: [
        { text: 'Cancel', fill: 'ghost' },
        {
          text: 'Discard',
          value: 'discard',
          fill: 'outline',
          variant: 'danger',
        },
        {
          text: 'Save',
          value: 'save',
          fill: 'solid',
          variant: 'primary',
          autofocus: true,
        },
      ],
    });
    this.result = choice ? `Chose: ${choice}` : 'Cancelled';
  };
}
