import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { TabComponent, TabGroupComponent, TabPanelComponent } from '@sl-design-system/angular/tabs';

@Component({
  selector: 'app-tab-group-page',
  templateUrl: './sl-tab-group.component.html',
  imports: [ButtonComponent, TabComponent, TabGroupComponent, TabPanelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class TabGroupPageComponent {
  openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
}
