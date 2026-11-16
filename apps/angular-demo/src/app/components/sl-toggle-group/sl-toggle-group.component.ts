import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@sl-design-system/angular/toggle-button';
import { ToggleGroupComponent } from '@sl-design-system/angular/toggle-group';

@Component({
  selector: 'app-toggle-group-page',
  templateUrl: './sl-toggle-group.component.html',
  styleUrls: ['./sl-toggle-group.component.scss'],
  imports: [ToggleButtonComponent, ToggleGroupComponent],
})
export class ToggleGroupPageComponent {}
