import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { TabGroup, Tab, TabPanel } from '@sl-design-system/tabs';
import { Button } from '@sl-design-system/button';

export class TabGroupPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-tab-group': TabGroup,
    'sl-tab': Tab,
    'sl-tab-panel': TabPanel,
    'sl-button': Button,
  };

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-tab-group>
        <sl-tab slot="tabs">General</sl-tab>
        <sl-tab slot="tabs">Settings</sl-tab>
        <sl-tab ?disabled=${true} slot="tabs">Disabled</sl-tab>

        <sl-tab-panel>This is the <strong>General</strong> tab content. It contains basic information about the component.
          <sl-button @click=${this._openBlankPage}>Action</sl-button></sl-tab-panel>
        <sl-tab-panel>This is the <strong>Settings</strong> tab content. Here you can configure various options.</sl-tab-panel>
        <sl-tab-panel>Disabled tab content</sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
