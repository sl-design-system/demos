import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToggleButtonComponent } from '@sl-design-system/angular/toggle-button';

@Component({
  selector: 'app-toggle-button-page',
  templateUrl: './sl-toggle-button.component.html',
  styleUrls: ['./sl-toggle-button.component.scss'],
  imports: [ToggleButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToggleButtonPageComponent {}
