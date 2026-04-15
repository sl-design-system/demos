import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-form-template-page',
  templateUrl: './sl-form-template.component.html',
  imports: [
    FormsModule,
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
export class FormTemplatePageComponent {
  @ViewChild('form', { read: ElementRef }) form!: ElementRef<Form>;

  name = '';
  agreed = false;

  onSubmit(): void {
    this.form.nativeElement.reportValidity();
    if (this.name && this.agreed) {
      window.open('about:blank', '_blank', 'noopener,noreferrer');
    }
  }
}
