import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MenuButtonComponent,
  MenuComponent,
  MenuItemComponent,
} from '@sl-design-system/angular/menu';

@Component({
  selector: 'app-menu-page',
  templateUrl: './sl-menu.component.html',
  imports: [MenuButtonComponent, MenuComponent, MenuItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
