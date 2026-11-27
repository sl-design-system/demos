import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Icon } from '@sl-design-system/icon';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './button-demo.css' with { type: 'css' };

export class ButtonDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-icon': Icon,
  };

  static override styles = [DemoPage.styles, styles];

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Variants',
        html`
          <sl-button fill="solid" variant="primary">Primary</sl-button>
          <sl-button fill="solid" variant="secondary">Secondary</sl-button>
          <sl-button fill="solid" variant="success">Success</sl-button>
          <sl-button fill="solid" variant="info">Info</sl-button>
          <sl-button fill="solid" variant="warning">Warning</sl-button>
          <sl-button fill="solid" variant="danger">Danger</sl-button>
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Fills',
        html`
          <sl-button fill="solid" variant="primary">Solid</sl-button>
          <sl-button fill="outline" variant="primary">Outline</sl-button>
          <sl-button fill="ghost" variant="primary">Ghost</sl-button>
          <sl-button fill="link" variant="primary">Link</sl-button>
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Sizes',
        html`
          <sl-button fill="solid" size="sm">Small</sl-button>
          <sl-button fill="solid" size="md">Medium</sl-button>
          <sl-button fill="solid" size="lg">Large</sl-button>
        `,
        {
          hint: 'Touch targets should be at least 44 × 44 pt (iOS) or 48 × 48 dp (Android).',
          layout: 'wrap',
        },
      )}
      ${demoSection(
        'With icons',
        html`
          <sl-button fill="solid" variant="primary">
            <sl-icon name="plus"></sl-icon>
            Add
          </sl-button>
          <sl-button fill="outline" shape="pill">
            <sl-icon name="search"></sl-icon>
            Search
          </sl-button>
          <sl-button fill="ghost" aria-label="More options">
            <sl-icon name="ellipsis"></sl-icon>
          </sl-button>
          <sl-button fill="outline" shape="pill" aria-label="Favourite">
            <sl-icon name="star"></sl-icon>
          </sl-button>
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Full width',
        html`
          <sl-button class="full" fill="solid" variant="primary" size="lg">
            Continue
          </sl-button>
          <sl-button class="full" fill="outline" size="lg">Cancel</sl-button>
        `,
        {
          hint: 'The usual pattern for primary actions at the bottom of a screen.',
        },
      )}
      ${demoSection(
        'Disabled',
        html`
          <sl-button fill="solid" variant="primary" disabled>Solid</sl-button>
          <sl-button fill="outline" disabled>Outline</sl-button>
        `,
        { layout: 'wrap' },
      )}
    `;
  }
}
