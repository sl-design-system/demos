import { Component } from '@angular/core';
import { ButtonComponent } from '@sl-design-system/angular/button';
import { ButtonBarComponent } from '@sl-design-system/angular/button-bar';
import { BadgeComponent } from '@sl-design-system/angular/badge';
import { IconComponent } from '@sl-design-system/angular/icon';
import { CardComponent } from '@sl-design-system/angular/card';

@Component({
  selector: 'app-card-page',
  templateUrl: './sl-card.component.html',
  styleUrls: ['./sl-card.component.scss'],
  imports: [CardComponent, ButtonComponent, ButtonBarComponent, BadgeComponent, IconComponent],
})
export class CardPageComponent {}
