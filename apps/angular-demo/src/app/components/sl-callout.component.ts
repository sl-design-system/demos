import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-callout-page',
  template: `
    <sl-callout variant="info">
      <h2 slot="title">Test title</h2>
      Test description.
      <a href="about:blank" target="_blank" rel="noopener noreferrer"
        >Open link</a
      >
      <sl-button fill="outline" variant="info" (click)="openBlankPage()"
        >Open page</sl-button
      >
    </sl-callout>
  `,
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalloutPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
