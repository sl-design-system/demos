import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Tag, TagList } from '@sl-design-system/tag';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History'];

export class TagDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-tag': Tag,
    'sl-tag-list': TagList,
  };

  @state() private subjects = [...SUBJECTS];

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Removable',
        html`
          <sl-tag-list aria-label="Selected subjects">
            ${this.subjects.map(
              (subject) => html`
                <sl-tag removable @sl-remove=${() => this.#remove(subject)}>
                  ${subject}
                </sl-tag>
              `,
            )}
          </sl-tag-list>
          ${
            this.subjects.length < SUBJECTS.length
              ? html`
                  <sl-button
                    fill="link"
                    @click=${() => (this.subjects = [...SUBJECTS])}
                  >
                    Restore all
                  </sl-button>
                `
              : ''
          }
        `,
        {
          hint: 'Check that the remove buttons are easy to hit without removing the wrong tag.',
        },
      )}
      ${demoSection(
        'Variants and sizes',
        html`
          <sl-tag-list aria-label="Neutral tags">
            <sl-tag>Neutral</sl-tag>
            <sl-tag size="lg">Neutral large</sl-tag>
          </sl-tag-list>
          <sl-tag-list aria-label="Info tags" variant="info">
            <sl-tag>Info</sl-tag>
            <sl-tag size="lg">Info large</sl-tag>
          </sl-tag-list>
        `,
      )}
      ${demoSection(
        'Stacked',
        html`
          <sl-tag-list stacked aria-label="Many subjects">
            ${[
              ...SUBJECTS,
              'Geography',
              'Music',
              'Art',
              'French',
              'German',
            ].map((subject) => html`<sl-tag>${subject}</sl-tag>`)}
          </sl-tag-list>
        `,
        {
          hint: 'When there is no room for all tags, the rest is collapsed into a count.',
        },
      )}
    `;
  }

  #remove(subject: string): void {
    this.subjects = this.subjects.filter((candidate) => candidate !== subject);
  }
}
