import { Component } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import {
  MenuButtonComponent,
  MenuItemComponent,
} from '@sl-design-system/angular/menu';
import {
  ToolBarComponent,
  ToolBarDividerComponent,
} from '@sl-design-system/angular/tool-bar';

@Component({
  selector: 'app-tool-bar-page',
  templateUrl: './sl-tool-bar.component.html',
  styleUrls: ['./sl-tool-bar.component.scss'],
  imports: [
    ToolBarComponent,
    ToolBarDividerComponent,
    ButtonComponent,
    MenuButtonComponent,
    MenuItemComponent,
  ],
})
export class ToolBarPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
