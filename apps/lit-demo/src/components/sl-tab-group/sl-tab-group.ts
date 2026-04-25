import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { TabGroup } from '@sl-design-system/tabs';
import { Tab } from '@sl-design-system/tabs';
import { TabPanel } from '@sl-design-system/tabs';

export class TabGroupPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-tab-group': TabGroup,
    'sl-tab': Tab,
    'sl-tab-panel': TabPanel,
  };

  override render(): TemplateResult {
    return html`
      <h2>sl-tab-group</h2>
      <sl-tab-group>
        <sl-tab slot="tabs">General</sl-tab>
        <sl-tab slot="tabs">Settings</sl-tab>
        <sl-tab slot="tabs">Advanced</sl-tab>

        <sl-tab-panel>This is the <strong>General</strong> tab content. It contains basic information about the component.</sl-tab-panel>
        <sl-tab-panel>This is the <strong>Settings</strong> tab content. Here you can configure various options.</sl-tab-panel>
        <sl-tab-panel>This is the <strong>Advanced</strong> tab content. Power-user features live here.</sl-tab-panel>
      </sl-tab-group>
    `;
  }
}
