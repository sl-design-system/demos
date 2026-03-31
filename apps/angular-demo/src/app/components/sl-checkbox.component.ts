import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  CheckboxComponent,
  CheckboxGroupComponent,
} from '@sl-design-system/angular/checkbox';

@Component({
  selector: 'app-checkbox-page',
  template: `
    <sl-checkbox-group>
      <sl-checkbox value="enabled">Test 1</sl-checkbox>
      <sl-checkbox value="disabled" [disabled]="true">Test 2</sl-checkbox>
    </sl-checkbox-group>
  `,
  imports: [CheckboxComponent, CheckboxGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxPageComponent {}
