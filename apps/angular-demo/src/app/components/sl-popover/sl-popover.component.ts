import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';

@Component({
  selector: 'app-popover-page',
  templateUrl: './sl-popover.component.html',
  imports: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopoverPageComponent {}
