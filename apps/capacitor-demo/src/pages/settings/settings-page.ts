import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import type { SlChangeEvent } from '@sl-design-system/shared/events.js';
import { html, LitElement, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  type Appearance,
  getAppearance,
  setAppearance,
} from '../../app/appearance.js';
import { getAppVersion, platform } from '../../native/native.js';
import listStyles from '../../styles/list.css' with { type: 'css' };
import pageStyles from '../../styles/page.css' with { type: 'css' };
import styles from './settings-page.css' with { type: 'css' };

const PLATFORM_NAMES: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web browser',
};

export class SettingsPage extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-radio': Radio,
    'sl-radio-group': RadioGroup,
  };

  static override styles = [pageStyles, listStyles, styles];

  @state() private appearance: Appearance = getAppearance();
  @state() private version?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    void getAppVersion().then((version) => (this.version = version));
  }

  override render(): TemplateResult {
    return html`
      <section class="group">
        <h2 class="group-title" id="appearance-title">Appearance</h2>
        <div class="panel">
          <sl-radio-group
            aria-labelledby="appearance-title"
            .value=${this.appearance}
            @sl-change=${this.#onAppearanceChange}
          >
            <sl-radio value="system">Match system</sl-radio>
            <sl-radio value="light">Light</sl-radio>
            <sl-radio value="dark">Dark</sl-radio>
          </sl-radio-group>
        </div>
      </section>

      <section class="group" aria-labelledby="about-title">
        <h2 class="group-title" id="about-title">About</h2>
        <ul class="list">
          <li class="row">
            <span class="row-label">Theme</span>
            <span class="row-value">Sanoma Learning</span>
          </li>
          <li class="row">
            <span class="row-label">Platform</span>
            <span class="row-value"
              >${PLATFORM_NAMES[platform] ?? platform}</span
            >
          </li>
          ${
            this.version
              ? html`
                  <li class="row">
                    <span class="row-label">App version</span>
                    <span class="row-value">${this.version}</span>
                  </li>
                `
              : ''
          }
        </ul>
      </section>
    `;
  }

  #onAppearanceChange = (
    event: SlChangeEvent<Appearance | undefined>,
  ): void => {
    const appearance = event.detail ?? 'system';
    this.appearance = appearance;
    setAppearance(appearance);
  };
}
