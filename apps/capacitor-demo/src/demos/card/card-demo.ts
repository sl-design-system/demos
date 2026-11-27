import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Card } from '@sl-design-system/card';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';
import styles from './card-demo.css' with { type: 'css' };

export class CardDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-card': Card,
  };

  static override styles = [DemoPage.styles, styles];

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Vertical',
        html`
          <sl-card orientation="vertical">
            <div slot="media" class="media blue" role="presentation"></div>
            <h3>Fractions</h3>
            <span slot="header">Chapter 3 · 12 lessons</span>
            <p slot="body">
              Learn to add, subtract and compare fractions with worked examples
              and short practice rounds.
            </p>
            <sl-button slot="actions" fill="solid" variant="primary">
              Continue
            </sl-button>
          </sl-card>
        `,
        {
          hint: 'The media is a coloured block so the demo works offline.',
        },
      )}
      ${demoSection(
        'Horizontal',
        html`
          <sl-card orientation="horizontal">
            <div slot="media" class="media green" role="presentation"></div>
            <h3>Geometry</h3>
            <p slot="body">Angles, shapes and symmetry.</p>
          </sl-card>
          <sl-card orientation="horizontal">
            <div slot="media" class="media orange" role="presentation"></div>
            <h3>Statistics</h3>
            <p slot="body">Averages, charts and probability.</p>
          </sl-card>
        `,
        { hint: 'Check how horizontal cards adapt to a narrow screen.' },
      )}
    `;
  }
}
