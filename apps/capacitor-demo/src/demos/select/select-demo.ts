import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { Option, OptionGroup } from '@sl-design-system/listbox';
import { Select } from '@sl-design-system/select';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

const GRADES = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];

export class SelectDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-option': Option,
    'sl-option-group': OptionGroup,
    'sl-select': Select,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Basic',
        html`
          <sl-form-field label="Year">
            <sl-select placeholder="Choose a year">
              ${GRADES.map(
                (grade) =>
                  html`<sl-option .value=${grade}>${grade}</sl-option>`,
              )}
            </sl-select>
          </sl-form-field>
        `,
        {
          hint: 'SLDS opens its own list instead of the native picker. Check how it fits a small screen and scrolls.',
        },
      )}
      ${demoSection(
        'Groups and clearing',
        html`
          <sl-form-field label="Subject">
            <sl-select clearable placeholder="Choose a subject" size="lg">
              <sl-option-group label="Languages">
                <sl-option value="dutch">Dutch</sl-option>
                <sl-option value="english">English</sl-option>
                <sl-option value="french">French</sl-option>
              </sl-option-group>
              <sl-option-group label="Sciences">
                <sl-option value="biology">Biology</sl-option>
                <sl-option value="chemistry">Chemistry</sl-option>
                <sl-option value="physics">Physics</sl-option>
              </sl-option-group>
            </sl-select>
          </sl-form-field>
        `,
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Required">
            <sl-select required show-valid placeholder="Pick one">
              <sl-option value="a">Option A</sl-option>
              <sl-option value="b">Option B</sl-option>
            </sl-select>
          </sl-form-field>
          <sl-form-field label="Disabled">
            <sl-select disabled placeholder="Not available">
              <sl-option value="a">Option A</sl-option>
            </sl-select>
          </sl-form-field>
        `,
      )}
    `;
  }
}
