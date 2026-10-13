import { Component } from '@angular/core';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { SearchFieldComponent } from '@sl-design-system/angular/search-field';

@Component({
  selector: 'app-search-field-page',
  templateUrl: './sl-search-field.component.html',
  styleUrls: ['./sl-search-field.component.scss'],
  imports: [FormFieldComponent, SearchFieldComponent],
})
export class SearchFieldPageComponent {}
