import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import {
  MenuButtonComponent,
  MenuItemComponent,
} from '@sl-design-system/angular/menu';
import { ToolBarComponent } from '@sl-design-system/angular/tool-bar';

@Component({
  selector: 'app-tool-bar-page',
  templateUrl: './sl-tool-bar.component.html',
  styleUrls: ['./sl-tool-bar.component.scss'],
  imports: [
    ToolBarComponent,
    ButtonComponent,
    MenuButtonComponent,
    MenuItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToolBarPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
