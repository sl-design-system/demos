import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { FormField } from '@sl-design-system/form';
import { TextField } from '@sl-design-system/text-field';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class TextFieldDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-form-field': FormField,
    'sl-text-field': TextField,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Basic',
        html`
          <sl-form-field label="Name" hint="As it appears on your profile.">
            <sl-text-field
              autocomplete="name"
              placeholder="First and last name"
            ></sl-text-field>
          </sl-form-field>
        `,
        {
          hint: 'Check that the page scrolls the field into view above the keyboard and that the tab bar hides.',
        },
      )}
      ${demoSection(
        'Keyboard types',
        html`
          <sl-form-field label="Email">
            <sl-text-field type="email" autocomplete="email"></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Phone">
            <sl-text-field type="tel" autocomplete="tel"></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Website">
            <sl-text-field type="url" autocomplete="url"></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Password">
            <sl-text-field
              type="password"
              autocomplete="current-password"
            ></sl-text-field>
          </sl-form-field>
        `,
        {
          hint: 'Each type should bring up the matching on-screen keyboard (@ key, number pad, .com key) and offer autofill.',
        },
      )}
      ${demoSection(
        'Sizes and shapes',
        html`
          <sl-form-field label="Medium">
            <sl-text-field size="md"></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Large">
            <sl-text-field size="lg"></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Pill">
            <sl-text-field size="lg" shape="pill"></sl-text-field>
          </sl-form-field>
        `,
      )}
      ${demoSection(
        'Validation',
        html`
          <sl-form-field label="Username" hint="At least 3 characters.">
            <sl-text-field required minlength="3" show-valid></sl-text-field>
          </sl-form-field>
        `,
        { hint: 'Type a value and tap outside the field to see validation.' },
      )}
      ${demoSection(
        'States',
        html`
          <sl-form-field label="Disabled">
            <sl-text-field disabled value="Can't change this"></sl-text-field>
          </sl-form-field>
          <sl-form-field label="Read-only">
            <sl-text-field
              readonly
              value="Can select, can't edit"
            ></sl-text-field>
          </sl-form-field>
        `,
      )}
    `;
  }
}
