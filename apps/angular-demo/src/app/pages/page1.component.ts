import { Component } from '@angular/core';

@Component({
  selector: 'app-page1',
  standalone: true,
  template: `
    <div class="page">
      <h2>Page 1</h2>
      <p>This is the first page</p>
    </div>
  `,
  styles: [`
    .page {
      padding: 20px;
    }
  `]
})
export class Page1Component {}
