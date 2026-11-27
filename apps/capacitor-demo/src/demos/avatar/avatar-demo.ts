import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { Avatar } from '@sl-design-system/avatar';
import { html, type TemplateResult } from 'lit';
import { DemoPage, demoSection } from '../demo-page.js';

const SIZES = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

const COLORS = [
  'blue',
  'green',
  'grey',
  'orange',
  'purple',
  'red',
  'teal',
  'yellow',
] as const;

export class AvatarDemo extends DemoPage {
  static override scopedElements: ScopedElementsMap = {
    'sl-avatar': Avatar,
  };

  override render(): TemplateResult {
    return html`
      ${demoSection(
        'With name',
        html`
          <sl-avatar display-name="Sanne de Vries" size="lg">
            Year 2 · Class B
          </sl-avatar>
          <sl-avatar display-name="Mohamed El Amrani" size="lg">
            Teacher
          </sl-avatar>
        `,
        {
          hint: 'Initials are generated from the name when there is no picture.',
        },
      )}
      ${demoSection(
        'Sizes',
        html`
          ${SIZES.map(
            (size) => html`
              <sl-avatar
                display-name="Sanne de Vries"
                image-only
                size=${size}
              ></sl-avatar>
            `,
          )}
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Colours',
        html`
          ${COLORS.map(
            (color) => html`
              <sl-avatar
                display-name=${`${color} avatar`}
                display-initials=${`${color[0]}${color.at(-1)}`.toUpperCase()}
                color=${color}
                image-only
                size="lg"
              ></sl-avatar>
            `,
          )}
        `,
        { layout: 'wrap' },
      )}
      ${demoSection(
        'Square and vertical',
        html`
          <sl-avatar
            display-name="Maths club"
            shape="square"
            size="xl"
            vertical
          >
            14 members
          </sl-avatar>
        `,
      )}
    `;
  }
}
