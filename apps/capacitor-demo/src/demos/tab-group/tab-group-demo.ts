import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Icon } from '@sl-design-system/icon';
import { Tab, TabGroup, TabPanel } from '@sl-design-system/tabs';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

const CHAPTERS = [
  'Numbers',
  'Fractions',
  'Percentages',
  'Geometry',
  'Algebra',
  'Statistics',
  'Probability',
];

export class TabGroupDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-icon': Icon,
    'sl-tab': Tab,
    'sl-tab-group': TabGroup,
    'sl-tab-panel': TabPanel,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Full width',
        html`
          <sl-tab-group align-tabs="stretch">
            <sl-tab slot="tabs" selected>Lessons</sl-tab>
            <sl-tab slot="tabs">Practice</sl-tab>
            <sl-tab slot="tabs">Results</sl-tab>
            <sl-tab-panel>12 lessons in this chapter.</sl-tab-panel>
            <sl-tab-panel>48 practice exercises.</sl-tab-panel>
            <sl-tab-panel>You scored 8.2 on average.</sl-tab-panel>
          </sl-tab-group>
        `,
        {
          hint: 'A few tabs that share the full width, a common mobile layout.',
        },
      )}
      ${demoSection(
        'More tabs than fit',
        html`
          <sl-tab-group>
            ${CHAPTERS.map(
              (chapter, index) =>
                html`<sl-tab slot="tabs" ?selected=${index === 0}
                  >${chapter}</sl-tab
                >`,
            )}
            ${CHAPTERS.map(
              (chapter) =>
                html`<sl-tab-panel>Chapter: ${chapter}</sl-tab-panel>`,
            )}
          </sl-tab-group>
        `,
        {
          hint: 'Check how the overflowing tabs behave: scroll with a swipe, or a menu?',
        },
      )}
      ${demoSection(
        'With icons and a disabled tab',
        html`
          <sl-tab-group>
            <sl-tab slot="tabs" selected>
              <sl-icon slot="icon" name="calendar"></sl-icon>
              Schedule
            </sl-tab>
            <sl-tab slot="tabs">
              <sl-icon slot="icon" name="envelope"></sl-icon>
              Messages
            </sl-tab>
            <sl-tab slot="tabs" disabled>
              <sl-icon slot="icon" name="star"></sl-icon>
              Badges
            </sl-tab>
            <sl-tab-panel>No lessons today.</sl-tab-panel>
            <sl-tab-panel>No new messages.</sl-tab-panel>
            <sl-tab-panel>Coming soon.</sl-tab-panel>
          </sl-tab-group>
        `,
      )}
    `;
  }
}
