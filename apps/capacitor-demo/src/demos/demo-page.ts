import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type TemplateResult,
} from 'lit';
import demoStyles from '../styles/demo.css' with { type: 'css' };
import pageStyles from '../styles/page.css' with { type: 'css' };

/**
 * Base class for the component demo pages. Subclasses declare the SLDS
 * elements they use in `scopedElements` and render one or more
 * `demoSection()`s.
 */
export class DemoPage extends ScopedElementsMixin(LitElement) {
  static override styles: CSSResultGroup = [pageStyles, demoStyles];
}

export interface DemoSectionOptions {
  /** A sentence about what to look for, shown under the example like an iOS section footer. */
  hint?: string;
  /** `wrap` lays out small items (buttons, tags) in rows instead of a column. */
  layout?: 'stack' | 'wrap';
}

/** One titled example on a demo page. */
export function demoSection(
  title: string,
  content: TemplateResult,
  { hint, layout = 'stack' }: DemoSectionOptions = {},
): TemplateResult {
  return html`
    <section class="demo">
      <h2 class="demo-title">${title}</h2>
      <div class="demo-body ${layout === 'wrap' ? 'wrap' : ''}">${content}</div>
      ${hint ? html`<p class="demo-hint">${hint}</p>` : nothing}
    </section>
  `;
}
