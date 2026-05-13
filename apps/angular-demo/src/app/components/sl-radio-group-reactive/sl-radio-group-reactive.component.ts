import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';
import {
  FormComponent,
  FormFieldComponent,
} from '@sl-design-system/angular/form';
import { RadioGroupDirective } from '@sl-design-system/angular/forms';
import {
  RadioComponent,
  RadioGroupComponent,
} from '@sl-design-system/angular/radio-group';
import { type Form } from '@sl-design-system/form';
import { type RadioGroup } from '@sl-design-system/radio-group';

@Component({
  selector: 'app-radio-group-reactive-page',
  templateUrl: './sl-radio-group-reactive.component.html',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    ButtonBarComponent,
    FormComponent,
    FormFieldComponent,
    RadioComponent,
    RadioGroupComponent,
    RadioGroupDirective,
  ],
})
export class RadioGroupReactivePageComponent {
  @ViewChild('form', { read: ElementRef }) form!: ElementRef<Form>;

  formGroup = new FormGroup({
    option: new FormControl<string | null>(null, [
      Validators.required,
      (control) =>
        control.value && control.value !== '2' ? { secondOption: true } : null,
    ]),
  });

  onValidate = (event: Event & { target: RadioGroup }): void => {
    const group = event.target;

    if (group.required && !group.value) {
      group.setCustomValidity('Please select an option.');
      return;
    }

    group.setCustomValidity(
      group.value === '2' ? '' : 'Pick the second option',
    );
  };

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.form.nativeElement.reportValidity();
      return;
    }
  }
}
