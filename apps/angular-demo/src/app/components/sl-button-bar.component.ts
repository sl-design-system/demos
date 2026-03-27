import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';

@Component({
  selector: 'app-button-bar-page',
  template: `
    <sl-button-bar align="start">
      <sl-button variant="primary" fill="solid" [disabled]="true"
        >Test 1</sl-button
      >
      <sl-button variant="primary" fill="solid" (click)="openBlankPage()"
        >Test 2</sl-button
      >
    </sl-button-bar>
  `,
  imports: [ButtonComponent, ButtonBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonBarPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
