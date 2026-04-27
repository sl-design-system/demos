import { Component } from '@angular/core';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { FormComponent } from '@sl-design-system/angular/form';
import { OptionComponent } from '@sl-design-system/angular/listbox';
import { SelectComponent } from '@sl-design-system/angular/select';

@Component({
  selector: 'app-select-page',
  templateUrl: './sl-select.component.html',
  imports: [
    FormComponent,
    FormFieldComponent,
    SelectComponent,
    OptionComponent,
  ],
})
export class SelectPageComponent {}
