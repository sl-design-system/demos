import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { TextFieldComponent } from '@sl-design-system/angular/text-field';

@Component({
  selector: 'app-form-field-page',
  templateUrl: './sl-form-field.component.html',
  imports: [FormFieldComponent, TextFieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormFieldPageComponent {}
