import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@sl-design-system/tag/register.js';

@Component({
  selector: 'app-tag-page',
  templateUrl: './sl-tag.html',
  styleUrls: ['./sl-tag.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TagPageComponent {}
