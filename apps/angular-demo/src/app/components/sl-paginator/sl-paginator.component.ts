import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  PaginatorComponent,
  PaginatorPageSizeComponent,
  PaginatorStatusComponent,
} from '@sl-design-system/angular/paginator';
import {
  ALL_ITEMS,
  type Item,
} from '../../../../../../shared/utils/paginator-items';

@Component({
  selector: 'app-paginator-page',
  templateUrl: './sl-paginator.component.html',
  imports: [
    PaginatorComponent,
    PaginatorPageSizeComponent,
    PaginatorStatusComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaginatorPageComponent {
  allItems: Item[] = ALL_ITEMS;

  page = 0;
  pageSize = 5;
  pageSizes = [5, 10];

  get visibleItems(): Item[] {
    const start = this.page * this.pageSize;
    return this.allItems.slice(start, start + this.pageSize);
  }

  onPageChange(event: CustomEvent<number>): void {
    this.page = event.detail;
  }

  onPageSizeChange(event: CustomEvent<number>): void {
    this.pageSize = event.detail;
    this.page = 0;
  }
}
