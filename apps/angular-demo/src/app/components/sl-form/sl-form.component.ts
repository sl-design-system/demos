import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormComponent, FormFieldComponent } from '@sl-design-system/angular/form';
import { TextFieldComponent } from '@sl-design-system/angular/text-field';
import { CheckboxComponent } from '@sl-design-system/angular/checkbox';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';

@Component({
  selector: 'app-form-page',
  templateUrl: './sl-form.component.html',
  imports: [FormComponent, FormFieldComponent, TextFieldComponent, CheckboxComponent, ButtonComponent, ButtonBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormPageComponent {
  name = '';
  agreed = false;

  onNameChange(event: Event): void {
    this.name = ((event.target as HTMLElement & { value: string }).value ?? '').trim();
  }

  onAgreeChange(event: Event): void {
    this.agreed = (event.target as HTMLElement & { checked: boolean }).checked;
  }

  onSubmit(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
