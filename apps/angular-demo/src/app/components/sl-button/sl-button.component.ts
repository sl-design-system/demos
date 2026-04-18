import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-button-page',
  templateUrl: './sl-button.component.html',
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
