import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Icon } from '@sl-design-system/icon';
import { html, LitElement, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  type Appearance,
  getAppearance,
  setAppearance,
} from '../../app/appearance.js';
import {
  getAppVersion,
  platform,
  selectionHaptic,
} from '../../native/native.js';
import listStyles from '../../styles/list.css' with { type: 'css' };
import pageStyles from '../../styles/page.css' with { type: 'css' };

const PLATFORM_NAMES: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web browser',
};

const APPEARANCES: { value: Appearance; label: string }[] = [
  { value: 'system', label: 'Match system' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

/**
 * App settings. These are the app's own controls, not an SLDS demo, so they
 * use the platform's list patterns: Appearance is a list of checkmark rows,
 * the way iOS Settings presents a single choice.
 */
export class SettingsPage extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-icon': Icon,
  };

  static override styles = [pageStyles, listStyles];

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
        <fieldset class="list" aria-labelledby="appearance-title">
          ${APPEARANCES.map(
            ({ value, label }) => html`
              <label class="row">
                <input
                  type="radio"
                  name="appearance"
                  .value=${value}
                  .checked=${value === this.appearance}
                  @change=${this.#onAppearanceChange}
                />
                <span class="row-label">${label}</span>
                <sl-icon class="check" name="check"></sl-icon>
              </label>
            `,
          )}
        </fieldset>
        <p class="group-footer">
          Match system follows the light or dark setting of your device.
        </p>
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

  #onAppearanceChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement,
      appearance = APPEARANCES.find(({ value }) => value === input.value);
    if (!appearance) {
      return;
    }

    selectionHaptic();
    this.appearance = appearance.value;
    setAppearance(appearance.value);
  };
}
