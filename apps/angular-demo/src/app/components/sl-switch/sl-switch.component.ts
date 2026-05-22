import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@sl-design-system/switch/register.js';

@Component({
  selector: 'app-switch-page',
  templateUrl: './sl-switch.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwitchPageComponent {}
