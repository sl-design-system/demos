import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-radio-group-template-page',
  templateUrl: './sl-radio-group-template.component.html',
  imports: [
    FormsModule,
    ButtonComponent,
    ButtonBarComponent,
    FormComponent,
    FormFieldComponent,
    RadioComponent,
    RadioGroupComponent,
    RadioGroupDirective,
  ],
})
export class RadioGroupTemplatePageComponent {
  @ViewChild('form', { read: ElementRef }) form!: ElementRef<Form>;

  selectedOption: string | null = null;

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
    this.form.nativeElement.reportValidity();
  }
}
