import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Badge } from '@sl-design-system/badge';
import { Tab, TabGroup, TabPanel } from '@sl-design-system/tabs';
import styles from './schedule-page.scss.js';

interface Lesson {
  time: string;
  subject: string;
  room: string;
  kind?: 'test' | 'homework';
}

const TODAY: Lesson[] = [
  { time: '08:30', subject: 'Mathematics B', room: 'Room 204' },
  { time: '09:20', subject: 'English Literature', room: 'Room 118' },
  { time: '10:30', subject: 'Physics', room: 'Lab 2', kind: 'test' },
  { time: '11:20', subject: 'History', room: 'Room 301' },
  { time: '13:00', subject: 'Physical Education', room: 'Gym' },
];

const TOMORROW: Lesson[] = [
  { time: '08:30', subject: 'Chemistry', room: 'Lab 1' },
  {
    time: '09:20',
    subject: 'Mathematics B',
    room: 'Room 204',
    kind: 'homework',
  },
  { time: '10:30', subject: 'French', room: 'Room 112' },
  { time: '11:20', subject: 'Biology', room: 'Lab 3' },
];

export class SchedulePage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-badge': Badge,
    'sl-tab': Tab,
    'sl-tab-group': TabGroup,
    'sl-tab-panel': TabPanel,
  };

  static override styles = styles;

  private _renderLessons(lessons: Lesson[]): TemplateResult {
    return html`
      <ul class="agenda">
        ${lessons.map(
          ({ time, subject, room, kind }) => html`
            <li>
              <span class="time">${time}</span>
              <span class="details">
                <span class="subject">${subject}</span>
                <span class="room">${room}</span>
              </span>
              ${kind === 'test'
                ? html`<sl-badge color="red">test</sl-badge>`
                : kind === 'homework'
                  ? html`<sl-badge color="blue">homework</sl-badge>`
                  : ''}
            </li>
          `,
        )}
      </ul>
    `;
  }

  override render(): TemplateResult {
    return html`
      <h2>Schedule</h2>
      <sl-tab-group>
        <sl-tab slot="tabs" selected>Today</sl-tab>
        <sl-tab slot="tabs">Tomorrow</sl-tab>

        <sl-tab-panel>${this._renderLessons(TODAY)}</sl-tab-panel>
        <sl-tab-panel>${this._renderLessons(TOMORROW)}</sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
