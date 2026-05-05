import { css, html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import {
  Paginator,
  PaginatorPageSize,
  PaginatorStatus,
} from '@sl-design-system/paginator';

interface Item {
  id: number;
  name: string;
}

const ALL_ITEMS: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

export class PaginatorPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-paginator': Paginator,
    'sl-paginator-page-size': PaginatorPageSize,
    'sl-paginator-status': PaginatorStatus,
  };

  static override styles = css`
    :host {
      display: block;
    }

    .paginator-wrapper {
      display: block;
      width: 100%;
    }
  `;

  @state() private _page = 0;
  @state() private _pageSize = 5;

  private get _visibleItems(): Item[] {
    const start = this._page * this._pageSize;
    return ALL_ITEMS.slice(start, start + this._pageSize);
  }

  private _onPageChange(event: CustomEvent<number>): void {
    this._page = event.detail;
  }

  private _onPageSizeChange(event: CustomEvent<number>): void {
    this._pageSize = event.detail;
    this._page = 0;
  }

  override render(): TemplateResult {
    return html`
      <ul>
        ${this._visibleItems.map((item) => html`<li>${item.name}</li>`)}
      </ul>
      <sl-paginator-status
        .page=${this._page}
        .pageSize=${this._pageSize}
        .totalItems=${ALL_ITEMS.length}
        itemLabel="items"
      ></sl-paginator-status>
      <div class="paginator-wrapper">
        <sl-paginator
          .page=${this._page}
          .pageSize=${this._pageSize}
          .totalItems=${ALL_ITEMS.length}
          @sl-page-change=${this._onPageChange}
        ></sl-paginator>
      </div>
      <sl-paginator-page-size
        .pageSize=${this._pageSize}
        .pageSizes=${[5, 10]}
        itemLabel="Items"
        @sl-page-size-change=${this._onPageSizeChange}
      ></sl-paginator-page-size>
    `;
  }
}
