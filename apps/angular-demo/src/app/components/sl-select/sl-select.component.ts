import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { FormComponent } from '@sl-design-system/angular/form';
import { OptionComponent } from '@sl-design-system/angular/listbox';
import { SelectComponent } from '@sl-design-system/angular/select';
import { type Form } from '@sl-design-system/form';

@Component({
  selector: 'app-select-page',
  templateUrl: './sl-select.component.html',
  imports: [
    ButtonComponent,
    ButtonBarComponent,
    FormComponent,
    FormFieldComponent,
    SelectComponent,
    OptionComponent,
  ],
})
export class SelectPageComponent {
  @ViewChild('form', { read: ElementRef }) form!: ElementRef<Form>;
  @ViewChild('basicSelect', { read: ElementRef })
  basicSelect!: ElementRef<{ value?: string; setCustomValidity: (message: string) => void; reportValidity: () => boolean }>;

  reportValidity(): void {
    const selectedValue = String(this.basicSelect.nativeElement.value ?? '');
    const hasSelectedOption = ['1', '2', '3'].includes(selectedValue);

    this.basicSelect.nativeElement.setCustomValidity(
      hasSelectedOption ? '' : 'Please choose an option from the list.',
    );
    this.form.nativeElement.reportValidity();
  }
}
