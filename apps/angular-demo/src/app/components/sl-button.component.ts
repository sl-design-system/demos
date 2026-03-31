import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-button-page',
  template: `
    <sl-button variant="info" size="lg" (click)="openBlankPage()"
      >Button</sl-button
    >
  `,
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
