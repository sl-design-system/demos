import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-page',
  template: `
    <sl-breadcrumbs>
      <a href="about:blank" target="_blank" rel="noopener noreferrer">Test 1</a>
    </sl-breadcrumbs>
  `,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BreadcrumbsPageComponent {}
