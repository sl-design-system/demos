import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { TextArea } from '@sl-design-system/text-area';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class TextAreaDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-text-area': TextArea,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Grows with its content',
        html`
          <sl-form-field label="Message">
            <sl-text-area
              resize="auto"
              rows="3"
              placeholder="Write a message…"
            ></sl-text-area>
          </sl-form-field>
        `,
        {
          hint: 'Type several lines: the field grows, and the caret should stay visible above the keyboard.',
        },
      )}
      ${demoSection(
        'Character count',
        html`
          <sl-form-field label="Short bio">
            <sl-text-area maxlength="140" show-count="100"></sl-text-area>
          </sl-form-field>
        `,
        { hint: 'The counter appears once you get close to the limit.' },
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Required">
            <sl-text-area required show-valid></sl-text-area>
          </sl-form-field>
          <sl-form-field label="Disabled">
            <sl-text-area disabled value="Can't change this"></sl-text-area>
          </sl-form-field>
        `,
      )}
    `;
  }
}
