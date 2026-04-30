import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import {
  FormComponent,
  FormFieldComponent,
} from '@sl-design-system/angular/form';
import {
  RadioComponent,
  RadioGroupComponent,
} from '@sl-design-system/angular/radio-group';
import { type Form } from '@sl-design-system/form';
import { type RadioGroup } from '@sl-design-system/radio-group';

@Component({
  selector: 'app-radio-group-page',
  templateUrl: './sl-radio-group.component.html',
  imports: [
    ButtonComponent,
    FormComponent,
    FormFieldComponent,
    RadioComponent,
    RadioGroupComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioGroupPageComponent {
  @ViewChild('form', { read: ElementRef }) form!: ElementRef<Form>;

  onValidate(event: Event): void {
    const radioGroup = event.target as RadioGroup<string>;
    radioGroup.setCustomValidity(
      radioGroup.value === '2' ? '' : 'Pick the middle option',
    );
  }

  reportValidity(): void {
    this.form.nativeElement.reportValidity();
  }
}
