import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  CheckboxComponent,
  CheckboxGroupComponent,
} from '@sl-design-system/angular/checkbox';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './sl-checkbox.component.html',
  imports: [CheckboxComponent, CheckboxGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxPageComponent {}
