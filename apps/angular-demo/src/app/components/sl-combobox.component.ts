import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComboboxComponent } from '@sl-design-system/angular/combobox';
import {
  ListboxComponent,
  OptionComponent,
} from '@sl-design-system/angular/listbox';

@Component({
  selector: 'app-combobox-page',
  template: `
    <sl-combobox [multiple]="true">
      <sl-listbox>
        <sl-option value="0">Test 1</sl-option>
        <sl-option value="1">Test 2</sl-option>
      </sl-listbox>
    </sl-combobox>
  `,
  imports: [ComboboxComponent, ListboxComponent, OptionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComboboxPageComponent {}
