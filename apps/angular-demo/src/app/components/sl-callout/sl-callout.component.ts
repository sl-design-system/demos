import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-callout-page',
  templateUrl: './sl-callout.component.html',
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalloutPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
