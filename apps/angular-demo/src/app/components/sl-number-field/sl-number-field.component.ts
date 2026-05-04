import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NumberFieldComponent } from '@sl-design-system/angular/number-field';

@Component({
  selector: 'app-number-field-page',
  templateUrl: './sl-number-field.component.html',
  imports: [NumberFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NumberFieldPageComponent {}
