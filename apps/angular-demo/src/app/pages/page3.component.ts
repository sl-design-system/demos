import { Component } from '@angular/core';

@Component({
  selector: 'app-page3',
  standalone: true,
  template: `
    <div class="page">
      <h2>Page 3</h2>
      <p>This is the third page</p>
    </div>
  `,
  styles: [`
    .page {
      padding: 20px;
    }
  `]
})
export class Page3Component {}
