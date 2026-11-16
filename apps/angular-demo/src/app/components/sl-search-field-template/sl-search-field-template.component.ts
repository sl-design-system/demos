import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import '@sl-design-system/search-field/register.js';
import { SearchFieldDirective } from '../sl-search-field/search-field.directive';

@Component({
  selector: 'app-search-field-template-page',
  templateUrl: './sl-search-field-template.component.html',
  styleUrls: ['./sl-search-field-template.component.scss'],
  imports: [FormsModule, FormFieldComponent, SearchFieldDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchFieldTemplatePageComponent {
  searchValue = '';
  disabledSearchValue = '';
}
