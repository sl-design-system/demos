import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Badge } from '@sl-design-system/badge';
import { Card } from '@sl-design-system/card';
import styles from './grades-page.scss.js';

interface Grade {
  subject: string;
  assignment: string;
  grade: number;
  weight: number;
}

const GRADES: Grade[] = [
  {
    subject: 'Mathematics B',
    assignment: 'Chapter 3 test',
    grade: 7.8,
    weight: 2,
  },
  {
    subject: 'English Literature',
    assignment: 'Book report',
    grade: 8.5,
    weight: 1,
  },
  {
    subject: 'Physics',
    assignment: 'Pendulum lab report',
    grade: 6.9,
    weight: 1,
  },
  { subject: 'History', assignment: 'WWII essay', grade: 7.2, weight: 1 },
  {
    subject: 'Chemistry',
    assignment: 'Periodic table quiz',
    grade: 5.4,
    weight: 1,
  },
  { subject: 'French', assignment: 'Oral exam', grade: 8.1, weight: 2 },
];

const badgeColor = (grade: number): 'green' | 'blue' | 'red' =>
  grade >= 7.5 ? 'green' : grade >= 5.5 ? 'blue' : 'red';

export class GradesPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-badge': Badge,
    'sl-card': Card,
  };

  static override styles = styles;

  override render(): TemplateResult {
    const totalWeight = GRADES.reduce((sum, { weight }) => sum + weight, 0),
      average =
        GRADES.reduce((sum, { grade, weight }) => sum + grade * weight, 0) /
        totalWeight;

    return html`
      <sl-card>
        <h2>Weighted average</h2>
        <p slot="body" class="average">${average.toFixed(1)}</p>
      </sl-card>

      <h3>Latest results</h3>
      <ul class="grades">
        ${GRADES.map(
          ({ subject, assignment, grade, weight }) => html`
            <li>
              <span class="details">
                <span class="subject">${subject}</span>
                <span class="assignment">${assignment} · weight ${weight}</span>
              </span>
              <sl-badge color=${badgeColor(grade)} size="lg">
                ${grade.toFixed(1)}
              </sl-badge>
            </li>
          `,
        )}
      </ul>
    `;
  }
}
