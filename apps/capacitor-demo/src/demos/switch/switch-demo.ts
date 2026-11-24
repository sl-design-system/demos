import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Switch } from '@sl-design-system/switch';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './switch-demo.css' with { type: 'css' };

export class SwitchDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-switch': Switch,
  };

  static override styles = [DemoPage.styles, styles];

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Settings list',
        html`
          <sl-switch reverse checked>Notifications</sl-switch>
          <sl-switch reverse>Sounds</sl-switch>
          <sl-switch reverse checked>
            Show grades
            <span slot="description"
              >Grades appear as soon as they are published.</span
            >
          </sl-switch>
        `,
        {
          hint: 'With reverse, the label comes first and the switch sits at the end of the row, as in iOS and Android settings.',
        },
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
