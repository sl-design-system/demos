import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { DateFieldComponent } from '@sl-design-system/angular/date-field';

@Component({
  selector: 'app-date-field-page',
  templateUrl: './sl-date-field.component.html',
  styleUrls: ['./sl-date-field.component.scss'],
  imports: [FormFieldComponent, DateFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DateFieldPageComponent {}
