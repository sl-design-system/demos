import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { SearchField } from '@sl-design-system/search-field';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './search-field-demo.css' with { type: 'css' };

const SUBJECTS = [
  'Biology',
  'Chemistry',
  'Dutch',
  'English',
  'French',
  'Geography',
  'German',
  'History',
  'Mathematics',
  'Music',
  'Physics',
];

export class SearchFieldDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-search-field': SearchField,
  };

  static override styles = [DemoPage.styles, styles];

  @state() private query = '';

  override render(): TemplateResult {
    const results = SUBJECTS.filter((subject) =>
      subject.toLowerCase().includes(this.query.toLowerCase()),
    );

    return html`
      ${demoSection(
        'Filter a list',
        html`
          <sl-search-field
            aria-label="Search subjects"
            placeholder="Search subjects"
            @input=${this.#onInput}
            @sl-clear=${() => (this.query = '')}
          ></sl-search-field>
          <ul class="results" aria-live="polite">
            ${
              results.length
                ? results.map((subject) => html`<li>${subject}</li>`)
                : html`<li class="empty">No subjects match “${this.query}”</li>`
            }
          </ul>
        `,
        {
          hint: 'The keyboard should show a Search key; the clear button empties the field.',
        },
      )}
      ${demoSection(
        'Sizes and shapes',
        html`
          <sl-search-field aria-label="Medium" size="md"></sl-search-field>
          <sl-search-field aria-label="Large" size="lg"></sl-search-field>
          <sl-search-field
            aria-label="Large pill"
            size="lg"
            shape="pill"
          ></sl-search-field>
        `,
      )}
    `;
  }

  #onInput = (event: Event): void => {
    if (event.target instanceof SearchField) {
      this.query = event.target.value ?? '';
    }
  };
}
