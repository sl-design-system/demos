import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';
import { CheckboxComponent } from '@sl-design-system/angular/checkbox';
import {
  FormComponent,
  FormFieldComponent,
} from '@sl-design-system/angular/form';
import {
  CheckboxDirective,
  TextFieldDirective,
} from '@sl-design-system/angular/forms';
import { TextFieldComponent } from '@sl-design-system/angular/text-field';
import { type Form } from '@sl-design-system/form';

@Component({
  selector: 'app-form-reactive-page',
  templateUrl: './sl-form-reactive.component.html',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    ButtonBarComponent,
    CheckboxComponent,
    CheckboxDirective,
    FormComponent,
    FormFieldComponent,
    TextFieldComponent,
    TextFieldDirective,
  ],
})
export class FormReactivePageComponent {
  @ViewChild('form', { read: ElementRef }) form!: ElementRef<Form>;

  formGroup = new FormGroup({
    name: new FormControl(''),
    agreed: new FormControl(false),
  });

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.form.nativeElement.reportValidity();
      return;
    }
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
