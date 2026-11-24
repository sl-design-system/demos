import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Checkbox, CheckboxGroup } from '@sl-design-system/checkbox';
import { FormField } from '@sl-design-system/form';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class CheckboxDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-checkbox': Checkbox,
    'sl-checkbox-group': CheckboxGroup,
    'sl-form-field': FormField,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Single',
        html`
          <sl-checkbox>Remember me</sl-checkbox>
          <sl-checkbox checked>
            Email me a summary
            <span slot="description">Once a week, on Monday morning.</span>
          </sl-checkbox>
        `,
        { hint: 'The whole label is tappable, not just the box.' },
      )}
      ${demoSection(
        'Group',
        html`
          <sl-form-field label="Notify me about">
            <sl-checkbox-group>
              <sl-checkbox value="grades" checked>New grades</sl-checkbox>
              <sl-checkbox value="homework">Homework</sl-checkbox>
              <sl-checkbox value="messages" checked>Messages</sl-checkbox>
            </sl-checkbox-group>
          </sl-form-field>
        `,
      )}
      ${demoSection(
        'Sizes',
        html`
          <sl-checkbox size="sm">Small</sl-checkbox>
          <sl-checkbox size="md">Medium</sl-checkbox>
          <sl-checkbox size="lg">Large</sl-checkbox>
        `,
      )}
      ${demoSection(
        'States',
        html`
          <sl-checkbox indeterminate>Indeterminate</sl-checkbox>
          <sl-checkbox disabled>Disabled</sl-checkbox>
          <sl-checkbox disabled checked>Disabled and checked</sl-checkbox>
        `,
      )}
    `;
  }
}
