import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Switch } from '@sl-design-system/switch';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class SwitchDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-switch': Switch,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Settings list',
        html`
          <sl-switch checked>Notifications</sl-switch>
          <sl-switch>Sounds</sl-switch>
          <sl-switch checked>
            Show grades
            <span slot="description"
              >Grades appear as soon as they are published.</span
            >
          </sl-switch>
        `,
        {
          hint: 'The label comes first and the switch sits at the end of the row, as in iOS and Android settings.',
        },
      )}
      ${demoSection(
        'Reversed',
        html`<sl-switch reverse checked
          >Switch first, then the label</sl-switch
        >`,
      )}
      ${demoSection(
        'Sizes',
        html`
          <sl-switch size="sm">Small</sl-switch>
          <sl-switch size="md">Medium</sl-switch>
          <sl-switch size="lg">Large</sl-switch>
        `,
      )}
      ${demoSection(
        'States',
        html`
          <sl-switch disabled>Disabled</sl-switch>
          <sl-switch disabled checked>Disabled and on</sl-switch>
        `,
      )}
    `;
  }
}
