import { NgFor } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { PaginatorComponent } from '@sl-design-system/angular/paginator';
import { FetchListDataSource, FetchListDataSourceError, ListDataSourceItem } from '@sl-design-system/data-source';

 interface Quote {
      id: string;
      quote: string;
      author: string;
    }

    interface QuotesResponse {
      quotes: Quote[];
      total: number;
      skip: number;
      limit: number;
    }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgFor, ButtonComponent, PaginatorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  dataSource!: FetchListDataSource<Quote>;
  quotes?:Quote[];

  ngOnInit(): void {
    this.dataSource = new FetchListDataSource<Quote>({
      pageSize: 10,
      pagination: true,
      fetchPage: async ({ page, pageSize }) => {
        const response = await fetch(`https://dummyjson.com/quotes?skip=${page * pageSize}&limit=${pageSize}`);

        if (response.ok) {
          const { quotes, total } = (await response.json()) as QuotesResponse;
          this.quotes = quotes;
          return { items: quotes, totalItems: total };
        } else {
          throw new FetchListDataSourceError('Failed to fetch data', response);
        }
      }
    });

  }
  onPageChange() {
    setTimeout(() => {
       this.quotes = [...this.dataSource.items.map((item: ListDataSourceItem) => item.id as Quote)];
    }, 10);
  }
}
