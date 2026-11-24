import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Paginator, PaginatorStatus } from '@sl-design-system/paginator';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './paginator-demo.css' with { type: 'css' };

const PAGE_SIZE = 5;

const STUDENTS = Array.from(
  { length: 42 },
  (_, index) => `Student ${index + 1}`,
);

export class PaginatorDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-paginator': Paginator,
    'sl-paginator-status': PaginatorStatus,
  };

  static override styles = [DemoPage.styles, styles];

  @state() private page = 0;

  override render(): TemplateResult {
    const start = this.page * PAGE_SIZE,
      visible = STUDENTS.slice(start, start + PAGE_SIZE);

    return html`
      ${demoSection(
        'Compact',
        html`
          <ul class="items">
            ${visible.map((student) => html`<li>${student}</li>`)}
          </ul>
          <sl-paginator-status
            .page=${this.page}
            .pageSize=${PAGE_SIZE}
            .totalItems=${STUDENTS.length}
            item-label="students"
          ></sl-paginator-status>
          <sl-paginator
            width="xs"
            .page=${this.page}
            .pageSize=${PAGE_SIZE}
            .totalItems=${STUDENTS.length}
            @sl-page-change=${(event: CustomEvent<number>) =>
              (this.page = event.detail)}
          ></sl-paginator>
        `,
        {
          hint: 'The xs width shows previous/next with a compact page indicator, which suits a phone.',
        },
      )}
      ${demoSection(
        'Wider',
        html`
          <sl-paginator
            width="sm"
            .page=${this.page}
            .pageSize=${PAGE_SIZE}
            .totalItems=${STUDENTS.length}
            @sl-page-change=${(event: CustomEvent<number>) =>
              (this.page = event.detail)}
          ></sl-paginator>
        `,
        {
          hint: 'Wider variants show page numbers; check whether they still fit and are big enough to tap.',
        },
      )}
    `;
  }
}
