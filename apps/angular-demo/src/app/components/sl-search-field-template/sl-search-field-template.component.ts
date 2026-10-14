import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@sl-design-system/angular/form';
import { SearchFieldComponent } from '@sl-design-system/angular/search-field';
import { SearchFieldDirective } from '../sl-search-field/search-field.directive';

@Component({
  selector: 'app-search-field-template-page',
  templateUrl: './sl-search-field-template.component.html',
  styleUrls: ['./sl-search-field-template.component.scss'],
  imports: [
    FormsModule,
    FormFieldComponent,
    SearchFieldComponent,
    SearchFieldDirective,
  ],
})
export class SearchFieldTemplatePageComponent {
  searchValue = '';
  disabledSearchValue = '';
}
