import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Avatar } from '@sl-design-system/avatar';
import { Badge } from '@sl-design-system/badge';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Card } from '@sl-design-system/card';
import styles from './home-page.scss.js';

interface Course {
  title: string;
  description: string;
  badge?: { label: string; color: 'purple' | 'green' | 'blue' };
}

const COURSES: Course[] = [
  {
    title: 'Mathematics B',
    description:
      'Continue with chapter 4: differentiation rules and applications.',
    badge: { label: 'new', color: 'purple' },
  },
  {
    title: 'English Literature',
    description:
      'Finish reading "Of Mice and Men" and prepare your book report.',
    badge: { label: 'due soon', color: 'blue' },
  },
  {
    title: 'Physics',
    description: 'Lab report on the pendulum experiment has been graded.',
    badge: { label: 'graded', color: 'green' },
  },
];

export class HomePage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-avatar': Avatar,
    'sl-badge': Badge,
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
    'sl-card': Card,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <section class="greeting">
        <sl-avatar display-name="Jan Janssen" size="lg"></sl-avatar>
        <div>
          <h2>Good morning, Jan!</h2>
          <p>You have 2 assignments due this week.</p>
        </div>
      </section>

      <h3>Your courses</h3>
      <div class="course-list">
        ${COURSES.map(
          (course) => html`
            <sl-card>
              <h2>${course.title}</h2>
              ${course.badge
                ? html`
                    <span slot="header">
                      <sl-badge color=${course.badge.color} size="lg">
                        ${course.badge.label}
                      </sl-badge>
                    </span>
                  `
                : ''}
              <p slot="body">${course.description}</p>
              <sl-button-bar slot="actions">
                <sl-button variant="primary" size="md">Open</sl-button>
              </sl-button-bar>
            </sl-card>
          `,
        )}
      </div>
    `;
  }
}
