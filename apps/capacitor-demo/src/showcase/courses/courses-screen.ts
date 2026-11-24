import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Avatar } from '@sl-design-system/avatar';
import { Button } from '@sl-design-system/button';
import { Card } from '@sl-design-system/card';
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';
import { SearchField } from '@sl-design-system/search-field';
import { Tag, TagList } from '@sl-design-system/tag';
import { ToggleButton } from '@sl-design-system/toggle-button';
import { ToggleGroup } from '@sl-design-system/toggle-group';
import { html, LitElement, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import pageStyles from '../../styles/page.css' with { type: 'css' };
import styles from './courses-screen.css' with { type: 'css' };

type Filter = 'all' | 'in-progress' | 'completed';

interface Course {
  title: string;
  subject: string;
  teacher: string;
  lessonsDone: number;
  lessonsTotal: number;
  /** Background of the card's media block. */
  color: 'blue' | 'green' | 'orange' | 'purple' | 'teal';
}

const COURSES: Course[] = [
  {
    title: 'Fractions',
    subject: 'Mathematics',
    teacher: 'Mohamed El Amrani',
    lessonsDone: 8,
    lessonsTotal: 12,
    color: 'blue',
  },
  {
    title: 'The human body',
    subject: 'Biology',
    teacher: 'Lotte Jansen',
    lessonsDone: 10,
    lessonsTotal: 10,
    color: 'green',
  },
  {
    title: 'The Golden Age',
    subject: 'History',
    teacher: 'Pieter Bakker',
    lessonsDone: 3,
    lessonsTotal: 9,
    color: 'orange',
  },
  {
    title: 'Writing a short story',
    subject: 'English',
    teacher: 'Emma de Boer',
    lessonsDone: 0,
    lessonsTotal: 6,
    color: 'purple',
  },
  {
    title: 'Forces and motion',
    subject: 'Physics',
    teacher: 'Daan Visser',
    lessonsDone: 7,
    lessonsTotal: 7,
    color: 'teal',
  },
];

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

function isCompleted(course: Course): boolean {
  return course.lessonsDone === course.lessonsTotal;
}

/** A student's course overview: search, filter chips and a list of course cards. */
export class CoursesScreen extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-avatar': Avatar,
    'sl-button': Button,
    'sl-card': Card,
    'sl-search-field': SearchField,
    'sl-tag': Tag,
    'sl-tag-list': TagList,
    'sl-toggle-button': ToggleButton,
    'sl-toggle-group': ToggleGroup,
  };

  static override styles = [pageStyles, styles];

  @state() private filter: Filter = 'all';
  @state() private query = '';

  override render(): TemplateResult {
    const courses = COURSES.filter(
      (course) =>
        (this.filter === 'all' ||
          (this.filter === 'completed') === isCompleted(course)) &&
        `${course.title} ${course.subject}`
          .toLowerCase()
          .includes(this.query.toLowerCase()),
    );

    return html`
      <div class="toolbar">
        <sl-search-field
          aria-label="Search courses"
          placeholder="Search courses"
          shape="pill"
          @input=${this.#onSearch}
          @sl-clear=${() => (this.query = '')}
        ></sl-search-field>
        <sl-toggle-group chips aria-label="Show">
          ${FILTERS.map(
            ({ value, label }) => html`
              <sl-toggle-button
                .pressed=${this.filter === value}
                @sl-toggle=${(event: CustomEvent<boolean>) => {
                  if (event.detail) {
                    this.filter = value;
                  }
                }}
              >
                ${label}
              </sl-toggle-button>
            `,
          )}
        </sl-toggle-group>
      </div>

      <p class="count" aria-live="polite">
        ${courses.length === 1 ? '1 course' : `${courses.length} courses`}
      </p>

      ${courses.map((course) => this.#renderCourse(course))}
    `;
  }

  #renderCourse(course: Course): TemplateResult {
    const completed = isCompleted(course);

    return html`
      <sl-card orientation="vertical">
        <div
          slot="media"
          class="media ${course.color}"
          role="presentation"
        ></div>
        <h3>${course.title}</h3>
        <sl-tag-list slot="header" aria-label="Subject and status">
          <sl-tag>${course.subject}</sl-tag>
          ${completed ? html`<sl-tag variant="info">Completed</sl-tag>` : ''}
        </sl-tag-list>
        <div slot="body" class="body">
          <sl-avatar display-name=${course.teacher} size="sm">
            Teacher
          </sl-avatar>
          <p class="progress">
            ${course.lessonsDone} of ${course.lessonsTotal} lessons done
          </p>
        </div>
        <sl-button
          slot="actions"
          fill=${completed ? 'outline' : 'solid'}
          variant="primary"
          @click=${() => this.#open(course)}
        >
          ${completed ? 'Review' : course.lessonsDone ? 'Continue' : 'Start'}
        </sl-button>
      </sl-card>
    `;
  }

  #onSearch = (event: Event): void => {
    if (event.target instanceof SearchField) {
      this.query = event.target.value ?? '';
    }
  };

  #open(course: Course): void {
    void MessageDialog.alert(
      `This would open the ${course.subject.toLowerCase()} course “${course.title}”.`,
      course.title,
    );
  }
}
