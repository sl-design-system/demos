import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Combobox } from '@sl-design-system/combobox';
import { FormField } from '@sl-design-system/form';
import { Listbox, Option } from '@sl-design-system/listbox';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

const COUNTRIES = [
  'Belgium',
  'Denmark',
  'Finland',
  'France',
  'Germany',
  'Netherlands',
  'Norway',
  'Poland',
  'Spain',
  'Sweden',
];

const TOPICS = [
  'Algebra',
  'Fractions',
  'Geometry',
  'Percentages',
  'Statistics',
];

export class ComboboxDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-combobox': Combobox,
    'sl-form-field': FormField,
    'sl-listbox': Listbox,
    'sl-option': Option,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Type to filter',
        html`
          <sl-form-field label="Country">
            <sl-combobox
              autocomplete="both"
              filter-results
              placeholder="Start typing"
            >
              <sl-listbox>
                ${COUNTRIES.map(
                  (country) =>
                    html`<sl-option .value=${country}>${country}</sl-option>`,
                )}
              </sl-listbox>
            </sl-combobox>
          </sl-form-field>
        `,
        {
          hint: 'The list and the keyboard are open at the same time: check that both fit and the list stays reachable.',
        },
      )}
      ${demoSection(
        'Multiple',
        html`
          <sl-form-field label="Topics">
            <sl-combobox multiple placeholder="Add topics">
              <sl-listbox>
                ${TOPICS.map(
                  (topic) =>
                    html`<sl-option .value=${topic}>${topic}</sl-option>`,
                )}
              </sl-listbox>
            </sl-combobox>
          </sl-form-field>
        `,
        { hint: 'Selected topics show as tags inside the field.' },
      )}
      ${demoSection(
        'Custom values',
        html`
          <sl-form-field
            label="Tags"
            hint="Pick a suggestion or type your own."
          >
            <sl-combobox allow-custom-values multiple>
              <sl-listbox>
                <sl-option value="homework">Homework</sl-option>
                <sl-option value="exam">Exam</sl-option>
                <sl-option value="project">Project</sl-option>
              </sl-listbox>
            </sl-combobox>
          </sl-form-field>
        `,
      )}
    `;
  }
}
