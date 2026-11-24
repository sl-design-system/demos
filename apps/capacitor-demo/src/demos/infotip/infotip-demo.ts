import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField, Label } from '@sl-design-system/form';
import { Infotip } from '@sl-design-system/infotip';
import { TextField } from '@sl-design-system/text-field';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class InfotipDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-infotip': Infotip,
    'sl-label': Label,
    'sl-text-field': TextField,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Next to a label',
        html`
          <sl-form-field>
            <sl-label slot="label">
              Student number
              <sl-infotip slot="infotip">
                You can find your student number on your school ID card.
              </sl-infotip>
            </sl-label>
            <sl-text-field></sl-text-field>
          </sl-form-field>
        `,
        {
          hint: 'Unlike a tooltip, an infotip opens on tap, so it works without hover.',
        },
      )}
      ${demoSection(
        'Sizes',
        html`
          <sl-infotip size="sm">Small infotip.</sl-infotip>
          <sl-infotip size="md">Medium infotip.</sl-infotip>
          <sl-infotip size="lg">Large infotip.</sl-infotip>
        `,
        {
          hint: 'The small icon is hard to tap on a phone; compare it with the larger sizes.',
          layout: 'wrap',
        },
      )}
    `;
  }
}
