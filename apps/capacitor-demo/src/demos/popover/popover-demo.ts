import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Popover } from '@sl-design-system/popover';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './popover-demo.css' with { type: 'css' };

export class PopoverDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-popover': Popover,
  };

  static override styles = [DemoPage.styles, styles];

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Positions',
        html`
          <sl-button id="below" fill="outline" @click=${this.#toggle}>
            Below
          </sl-button>
          <sl-popover anchor="below" position="bottom">
            Opens below its button.
          </sl-popover>

          <sl-button id="above" fill="outline" @click=${this.#toggle}>
            Above
          </sl-button>
          <sl-popover anchor="above" position="top">
            Opens above its button.
          </sl-popover>
        `,
        {
          hint: 'Close by tapping outside or with the Android back button. Near the screen edge the popover should flip or shift to stay visible.',
          layout: 'wrap',
        },
      )}
      ${demoSection(
        'With actions',
        html`
          <sl-button id="share" fill="solid" @click=${this.#toggle}>
            Share
          </sl-button>
          <sl-popover anchor="share" position="bottom-start">
            <div class="content">
              <strong>Share this lesson</strong>
              <p>Classmates get a link to the lesson.</p>
              <sl-button
                fill="solid"
                variant="primary"
                size="sm"
                @click=${this.#close}
              >
                Copy link
              </sl-button>
            </div>
          </sl-popover>
        `,
      )}
      ${demoSection(
        'At the right edge',
        html`
          <div class="end">
            <sl-button id="edge" fill="outline" @click=${this.#toggle}>
              Edge
            </sl-button>
            <sl-popover anchor="edge" position="right">
              Asked to open on the right, where there is no room.
            </sl-popover>
          </div>
        `,
      )}
    `;
  }

  /** Toggles the popover anchored to the clicked button. */
  #toggle = (event: Event): void => {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }

    this.renderRoot
      .querySelector<Popover>(`sl-popover[anchor="${event.currentTarget.id}"]`)
      ?.togglePopover();
  };

  /** Closes the popover that contains the clicked element. */
  #close = (event: Event): void => {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.closest<Popover>('sl-popover')?.hidePopover();
    }
  };
}
