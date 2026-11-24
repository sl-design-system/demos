import { html, LitElement, type TemplateResult } from 'lit';
import listStyles from '../../styles/list.css' with { type: 'css' };
import pageStyles from '../../styles/page.css' with { type: 'css' };

const SCREENS = [
  { name: 'Course list', description: 'Cards, avatars and tags' },
  { name: 'Assignment form', description: 'Validation with the keyboard open' },
  { name: 'Profile settings', description: 'Switches, radios and selects' },
];

/** Realistic screens built from SLDS components. The screens follow in a later phase. */
export class ShowcasePage extends LitElement {
  static override styles = [pageStyles, listStyles];

  override render(): TemplateResult {
    return html`
      <p class="intro">
        Complete screens that combine SL Design System components the way a real
        app would.
      </p>
      <section class="group" aria-labelledby="coming-soon">
        <h2 class="group-title" id="coming-soon">Coming soon</h2>
        <ul class="list">
          ${SCREENS.map(
            (screen) => html`
              <li class="row">
                <span class="row-label">${screen.name}</span>
                <span class="row-value">${screen.description}</span>
              </li>
            `,
          )}
        </ul>
      </section>
    `;
  }
}
