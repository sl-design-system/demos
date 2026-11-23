import { Component } from '@angular/core';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { TimeFieldComponent } from '@sl-design-system/angular/time-field';

@Component({
  selector: 'app-time-field-page',
  templateUrl: './sl-time-field.component.html',
  styleUrls: ['./sl-time-field.component.scss'],
  imports: [FormFieldComponent, TimeFieldComponent],
})
export class TimeFieldPageComponent {}
