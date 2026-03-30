import { Component } from '@angular/core';

@Component({
  selector: 'app-page2',
  standalone: true,
  template: `
    <div class="page">
      <h2>Page 2</h2>
      <p>This is the second page</p>
    </div>
  `,
  styles: [`
    .page {
      padding: 20px;
    }
  `]
})
export class Page2Component {}
