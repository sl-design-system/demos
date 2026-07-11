import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Accordion, AccordionItem } from '@sl-design-system/accordion';
import { Badge } from '@sl-design-system/badge';
import { Checkbox } from '@sl-design-system/checkbox';
import styles from './courses-page.scss.js';

interface Chapter {
  summary: string;
  lessons: Array<{ title: string; done: boolean }>;
}

const CHAPTERS: Chapter[] = [
  {
    summary: 'Chapter 1: Linear equations',
    lessons: [
      { title: 'Solving simple equations', done: true },
      { title: 'Equations with fractions', done: true },
      { title: 'Word problems', done: false },
    ],
  },
  {
    summary: 'Chapter 2: Quadratic equations',
    lessons: [
      { title: 'Factorising', done: false },
      { title: 'The quadratic formula', done: false },
    ],
  },
  {
    summary: 'Chapter 3: Functions and graphs',
    lessons: [
      { title: 'Plotting parabolas', done: false },
      { title: 'Transformations', done: false },
      { title: 'Intersections', done: false },
    ],
  },
];

export class CoursesPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-accordion': Accordion,
    'sl-accordion-item': AccordionItem,
    'sl-badge': Badge,
    'sl-checkbox': Checkbox,
  };

  static override styles = styles;

  override render(): TemplateResult {
    return html`
      <h2>Mathematics B</h2>
      <p class="intro">
        Track your progress per chapter. Tick off the lessons you have
        completed.
      </p>
      <sl-accordion single>
        ${CHAPTERS.map(
          ({ summary, lessons }) => html`
            <sl-accordion-item summary=${summary}>
              <ul class="lessons">
                ${lessons.map(
                  ({ title, done }) => html`
                    <li>
                      <sl-checkbox ?checked=${done}>${title}</sl-checkbox>
                      ${done
                        ? html`<sl-badge color="green">done</sl-badge>`
                        : ''}
                    </li>
                  `,
                )}
              </ul>
            </sl-accordion-item>
          `,
        )}
      </sl-accordion>
    `;
  }
}
