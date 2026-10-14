import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlElementDirective } from '@sl-design-system/angular/forms';
import { type SearchField } from '@sl-design-system/search-field';

@Directive({
  selector: 'sl-search-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFieldDirective),
      multi: true,
    },
  ],
})
export class SearchFieldDirective extends FormControlElementDirective<SearchField> {
  constructor(
    elementRef: ElementRef<SearchField>,
    changeDetection: ChangeDetectorRef,
  ) {
    super(elementRef, changeDetection);
  }
}
