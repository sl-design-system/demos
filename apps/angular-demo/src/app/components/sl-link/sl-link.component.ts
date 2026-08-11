import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@sl-design-system/angular/link';

@Component({
  selector: 'app-link-page',
  templateUrl: './sl-link.component.html',
  styleUrls: ['./sl-link.component.scss'],
  imports: [LinkComponent, RouterLink],
})
export class LinkPageComponent {}
