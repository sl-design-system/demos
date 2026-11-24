import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class RadioGroupDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-radio': Radio,
    'sl-radio-group': RadioGroup,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'With descriptions',
        html`
          <sl-form-field label="Delivery">
            <sl-radio-group value="standard">
              <sl-radio value="standard">
                Standard
                <span slot="description">2–4 working days, free</span>
              </sl-radio>
              <sl-radio value="express">
                Express
                <span slot="description">Next working day, € 4.95</span>
              </sl-radio>
            </sl-radio-group>
          </sl-form-field>
        `,
      )}
      ${demoSection(
        'Horizontal',
        html`
          <sl-form-field label="Answer">
            <sl-radio-group horizontal>
              <sl-radio value="yes">Yes</sl-radio>
              <sl-radio value="no">No</sl-radio>
              <sl-radio value="maybe">Maybe</sl-radio>
            </sl-radio-group>
          </sl-form-field>
        `,
        {
          hint: 'Only for a few short options; check that it wraps on a narrow screen.',
        },
      )}
      ${demoSection(
        'Large',
        html`
          <sl-form-field label="Difficulty">
            <sl-radio-group size="lg" value="medium">
              <sl-radio value="easy">Easy</sl-radio>
              <sl-radio value="medium">Medium</sl-radio>
              <sl-radio value="hard">Hard</sl-radio>
            </sl-radio-group>
          </sl-form-field>
        `,
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Required">
            <sl-radio-group required show-valid>
              <sl-radio value="a">Option A</sl-radio>
              <sl-radio value="b">Option B</sl-radio>
            </sl-radio-group>
          </sl-form-field>
          <sl-form-field label="Disabled">
            <sl-radio-group disabled value="a">
              <sl-radio value="a">Option A</sl-radio>
              <sl-radio value="b">Option B</sl-radio>
            </sl-radio-group>
          </sl-form-field>
        `,
      )}
    `;
  }
}
