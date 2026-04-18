import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';

@Component({
  selector: 'app-button-bar-page',
  templateUrl: './sl-button-bar.component.html',
  imports: [ButtonComponent, ButtonBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonBarPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
