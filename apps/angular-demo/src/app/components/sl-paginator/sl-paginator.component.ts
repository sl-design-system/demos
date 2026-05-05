import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  PaginatorComponent,
  PaginatorPageSizeComponent,
  PaginatorStatusComponent,
} from '@sl-design-system/angular/paginator';

interface Item {
  id: number;
  name: string;
}

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
  allItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

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
