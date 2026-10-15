import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Infotip } from '@sl-design-system/infotip';

export class InfotipPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-infotip': Infotip,
  };

  override render(): TemplateResult {
    return html`
      <div class="infotip-example">
        <sl-infotip>
          This is the infotip message
        </sl-infotip>
      </div>
    `;
  }
}
