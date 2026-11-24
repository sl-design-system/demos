import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Dialog } from '@sl-design-system/dialog';
import { FormField } from '@sl-design-system/form';
import { TextArea } from '@sl-design-system/text-area';
import { TextField } from '@sl-design-system/text-field';
import { html, type TemplateResult } from 'lit';
import { query } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './dialog-demo.css' with { type: 'css' };

export class DialogDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-dialog': Dialog,
    'sl-form-field': FormField,
    'sl-text-area': TextArea,
    'sl-text-field': TextField,
  };

  static override styles = [DemoPage.styles, styles];

  @query('#basic') private basicDialog?: Dialog;
  @query('#form') private formDialog?: Dialog;
  @query('#required') private requiredDialog?: Dialog;

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Basic',
        html`
          <sl-button fill="solid" @click=${() => this.basicDialog?.showModal()}>
            Open dialog
          </sl-button>
        `,
        {
          hint: 'On small screens the dialog fills more of the screen. Close it with the X, by tapping outside, or with the Android back button.',
        },
      )}
      ${demoSection(
        'With a form',
        html`
          <sl-button fill="solid" @click=${() => this.formDialog?.showModal()}>
            Write a note
          </sl-button>
        `,
        {
          hint: 'Check that the fields stay visible when the keyboard opens inside the dialog.',
        },
      )}
      ${demoSection(
        'Requires a choice',
        html`
          <sl-button
            fill="solid"
            variant="danger"
            @click=${() => this.requiredDialog?.showModal()}
          >
            Leave the test
          </sl-button>
        `,
        {
          hint: 'With disable-cancel, tapping outside and the back button do not close the dialog.',
        },
      )}

      <sl-dialog id="basic" close-button>
        <span slot="title">About this course</span>
        <p>
          Mathematics for year 2: 12 chapters, each with explanations, worked
          examples and practice exercises.
        </p>
        <sl-button
          slot="primary-actions"
          fill="solid"
          variant="primary"
          @click=${() => this.basicDialog?.close()}
        >
          Got it
        </sl-button>
      </sl-dialog>

      <sl-dialog id="form" close-button>
        <span slot="title">New note</span>
        <div class="form">
          <sl-form-field label="Title">
            <sl-text-field></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Note">
            <sl-text-area rows="4" resize="auto"></sl-text-area>
          </sl-form-field>
        </div>
        <sl-button
          slot="secondary-actions"
          fill="outline"
          @click=${() => this.formDialog?.close()}
        >
          Cancel
        </sl-button>
        <sl-button
          slot="primary-actions"
          fill="solid"
          variant="primary"
          @click=${() => this.formDialog?.close()}
        >
          Save
        </sl-button>
      </sl-dialog>

      <sl-dialog id="required" dialog-role="alertdialog" disable-cancel>
        <span slot="title">Leave the test?</span>
        <p>Your answers so far are saved, but the timer keeps running.</p>
        <sl-button
          slot="secondary-actions"
          fill="outline"
          @click=${() => this.requiredDialog?.close()}
        >
          Stay
        </sl-button>
        <sl-button
          slot="primary-actions"
          fill="solid"
          variant="danger"
          @click=${() => this.requiredDialog?.close()}
        >
          Leave
        </sl-button>
      </sl-dialog>
    `;
  }
}
