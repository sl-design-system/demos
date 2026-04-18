import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComboboxComponent } from '@sl-design-system/angular/combobox';
import {
  ListboxComponent,
  OptionComponent,
} from '@sl-design-system/angular/listbox';

@Component({
  selector: 'app-combobox-page',
  templateUrl: './sl-combobox.component.html',
  imports: [ComboboxComponent, ListboxComponent, OptionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComboboxPageComponent {}
