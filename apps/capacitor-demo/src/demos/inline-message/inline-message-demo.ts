import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { InlineMessage } from '@sl-design-system/inline-message';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';

export class InlineMessageDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-inline-message': InlineMessage,
  };

  @state() private dismissed = false;

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Variants',
        html`
          <sl-inline-message variant="info" indismissible>
            Your changes are saved automatically.
          </sl-inline-message>
          <sl-inline-message variant="success" indismissible>
            Assignment handed in.
          </sl-inline-message>
          <sl-inline-message variant="warning" indismissible>
            The deadline is tomorrow at 09:00.
          </sl-inline-message>
          <sl-inline-message variant="danger" indismissible>
            Could not connect. Check your internet connection.
          </sl-inline-message>
        `,
      )}
      ${demoSection(
        'With a title',
        html`
          <sl-inline-message variant="warning" indismissible>
            <span slot="title">You are offline</span>
            Answers are stored on this device and sent when you are back online.
          </sl-inline-message>
        `,
      )}
      ${demoSection(
        'Dismissible',
        html`
          ${
            this.dismissed
              ? html`
                  <sl-button
                    fill="outline"
                    @click=${() => (this.dismissed = false)}
                  >
                    Show the message again
                  </sl-button>
                `
              : html`
                  <sl-inline-message
                    variant="info"
                    @sl-dismiss=${() => (this.dismissed = true)}
                  >
                    Tap the close button to dismiss this message.
                  </sl-inline-message>
                `
          }
        `,
        { hint: 'Check that the close button is easy to hit.' },
      )}
    `;
  }
}
