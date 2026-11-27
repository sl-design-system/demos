import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Icon } from '@sl-design-system/icon';
import { ToggleButton } from '@sl-design-system/toggle-button';
import { html, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { DemoPage, demoSection } from '../demo-page.js';

/**
 * The icons of an icon-only toggle button: `slot="default"` while off and
 * `slot="pressed"` while on. Both are required and must differ.
 */
const STAR_ICONS = html`
  <sl-icon slot="default" name="star"></sl-icon>
  <sl-icon slot="pressed" name="fav"></sl-icon>
`;

export class ToggleButtonDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-icon': Icon,
    'sl-toggle-button': ToggleButton,
  };

  @state() private favourite = false;

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'Icon toggle',
        html`
          <sl-toggle-button
            aria-label="Favourite"
            .pressed=${this.favourite}
            @sl-toggle=${(event: CustomEvent<boolean>) =>
              (this.favourite = event.detail)}
          >
            ${STAR_ICONS}
          </sl-toggle-button>
          <p class="demo-output">
            ${this.favourite ? 'Added to favourites' : 'Not a favourite'}
          </p>
        `,
        {
          hint: 'An icon-only toggle needs an accessible label and two different icons for off and on.',
          layout: 'wrap',
        },
      )}
      ${demoSection(
        'With text',
        html`
          <sl-toggle-button>Show answers</sl-toggle-button>
          <sl-toggle-button pressed>Hints on</sl-toggle-button>
        `,
        {
          hint: 'Text toggles show a check mark while pressed.',
          layout: 'wrap',
        },
      )}
      ${demoSection(
        'Fills',
        html`
          <sl-toggle-button fill="outline" aria-label="Favourite, outline">
            ${STAR_ICONS}
          </sl-toggle-button>
          <sl-toggle-button fill="solid" aria-label="Favourite, solid">
            ${STAR_ICONS}
          </sl-toggle-button>
          <sl-toggle-button
            fill="solid"
            pressed
            aria-label="Favourite, pressed"
          >
            ${STAR_ICONS}
          </sl-toggle-button>
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Sizes and shapes',
        html`
          <sl-toggle-button size="sm" aria-label="Favourite, small">
            ${STAR_ICONS}
          </sl-toggle-button>
          <sl-toggle-button size="md" aria-label="Favourite, medium">
            ${STAR_ICONS}
          </sl-toggle-button>
          <sl-toggle-button size="lg" aria-label="Favourite, large">
            ${STAR_ICONS}
          </sl-toggle-button>
          <sl-toggle-button size="lg" shape="pill" aria-label="Favourite, pill">
            ${STAR_ICONS}
          </sl-toggle-button>
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Disabled',
        html`
          <sl-toggle-button disabled aria-label="Favourite, disabled">
            ${STAR_ICONS}
          </sl-toggle-button>
          <sl-toggle-button
            disabled
            pressed
            aria-label="Favourite, disabled and on"
          >
            ${STAR_ICONS}
          </sl-toggle-button>
        `,
        { layout: 'wrap' },
      )}
    `;
  }
}
