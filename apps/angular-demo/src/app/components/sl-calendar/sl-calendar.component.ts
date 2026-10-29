import { Component } from '@angular/core';
import { CalendarComponent } from '@sl-design-system/angular/calendar';

@Component({
  selector: 'app-sl-calendar',
  templateUrl: './sl-calendar.component.html',
  styleUrls: ['./sl-calendar.component.scss'],
  imports: [CalendarComponent],
})
export class CalendarPageComponent {}
