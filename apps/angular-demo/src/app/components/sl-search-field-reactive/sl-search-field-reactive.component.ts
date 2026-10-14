import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import '@sl-design-system/search-field/register.js';
import { SearchFieldDirective } from '../sl-search-field/search-field.directive';

@Component({
  selector: 'app-search-field-reactive-page',
  templateUrl: './sl-search-field-reactive.component.html',
  styleUrls: ['./sl-search-field-reactive.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    SearchFieldDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchFieldReactivePageComponent {
  searchControl = new FormControl('', { nonNullable: true });
  disabledSearchControl = new FormControl(
    { value: '', disabled: true },
    { nonNullable: true },
  );
}
