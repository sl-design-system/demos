import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { Callout } from '@sl-design-system/callout';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

export class CalloutDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-callout': Callout,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Variants',
        html`
          <sl-callout variant="info">
            <span slot="title">New this week</span>
            Practise with the new fractions exercises.
          </sl-callout>
          <sl-callout variant="success">
            <span slot="title">Well done</span>
            You finished all exercises for this chapter.
          </sl-callout>
          <sl-callout variant="warning">
            <span slot="title">Almost due</span>
            Two assignments are due tomorrow.
          </sl-callout>
          <sl-callout variant="danger">
            <span slot="title">Missed deadline</span>
            Ask your teacher whether you can still hand it in.
          </sl-callout>
        `,
      )}
      ${demoSection(
        'With an action',
        html`
          <sl-callout variant="info" density="relaxed">
            <span slot="title">Update available</span>
            A new version of the course material is ready to download.
            <sl-button fill="outline" variant="info">Download</sl-button>
          </sl-callout>
        `,
      )}
    `;
  }
}
