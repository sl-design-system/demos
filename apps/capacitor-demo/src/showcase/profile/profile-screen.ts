import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Avatar } from '@sl-design-system/avatar';
import { Button } from '@sl-design-system/button';
import { FormField } from '@sl-design-system/form';
import { Option } from '@sl-design-system/listbox';
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import { Select } from '@sl-design-system/select';
import type { SlChangeEvent } from '@sl-design-system/shared/events.js';
import { Switch } from '@sl-design-system/switch';
import { html, LitElement, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  getUserGroup,
  setUserGroup,
  type UserGroup,
} from '../../app/user-group.js';
import pageStyles from '../../styles/page.css' with { type: 'css' };
import styles from './profile-screen.css' with { type: 'css' };

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'fi', label: 'Suomi' },
  { value: 'sv', label: 'Svenska' },
  { value: 'pl', label: 'Polski' },
];

const READING_LEVELS: Array<{
  value: UserGroup;
  label: string;
  description: string;
}> = [
  {
    value: 'early',
    label: 'Early reader',
    description: 'Largest text, for young children',
  },
  {
    value: 'developing',
    label: 'Developing reader',
    description: 'Larger text for primary school',
  },
  {
    value: 'advanced',
    label: 'Advanced reader',
    description: 'Secondary school',
  },
  { value: 'superuser', label: 'Adult', description: 'Standard text size' },
];

/** A profile and preferences screen. The reading level really changes the theme. */
export class ProfileScreen extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-avatar': Avatar,
    'sl-button': Button,
    'sl-form-field': FormField,
    'sl-option': Option,
    'sl-radio': Radio,
    'sl-radio-group': RadioGroup,
    'sl-select': Select,
    'sl-switch': Switch,
  };

  static override styles = [pageStyles, styles];

  @state() private readingLevel: UserGroup = getUserGroup();
  @state() private signedOut = false;

  override render(): TemplateResult {
    return html`
      <div class="profile">
        <sl-avatar display-name="Sanne de Vries" size="3xl" vertical>
          Year 2 · Class 2B
        </sl-avatar>
      </div>

      <section class="panel" aria-labelledby="notifications">
        <h2 id="notifications">Notifications</h2>
        <sl-switch checked>New grades</sl-switch>
        <sl-switch checked>Homework reminders</sl-switch>
        <sl-switch>
          Messages from classmates
          <span slot="description">Only from your own class.</span>
        </sl-switch>
      </section>

      <section class="panel" aria-labelledby="reading">
        <h2 id="reading">Reading</h2>
        <sl-form-field
          label="Reading level"
          hint="Changes the text size of the whole app (the theme's user groups)."
        >
          <sl-radio-group
            .value=${this.readingLevel}
            @sl-change=${this.#onReadingLevelChange}
          >
            ${READING_LEVELS.map(
              (level) => html`
                <sl-radio .value=${level.value}>
                  ${level.label}
                  <span slot="description">${level.description}</span>
                </sl-radio>
              `,
            )}
          </sl-radio-group>
        </sl-form-field>
        <sl-form-field label="Language">
          <sl-select value="en">
            ${LANGUAGES.map(
              (language) =>
                html`<sl-option .value=${language.value}
                  >${language.label}</sl-option
                >`,
            )}
          </sl-select>
        </sl-form-field>
      </section>

      <section class="panel" aria-labelledby="account">
        <h2 id="account">Account</h2>
        ${
          this.signedOut
            ? html`
                <p class="signed-out" aria-live="polite">
                  You are signed out (not really, this is a demo).
                </p>
                <sl-button
                  fill="outline"
                  @click=${() => (this.signedOut = false)}
                >
                  Sign in again
                </sl-button>
              `
            : html`
                <sl-button fill="outline">Change password</sl-button>
                <sl-button
                  fill="outline"
                  variant="danger"
                  @click=${this.#signOut}
                >
                  Sign out
                </sl-button>
              `
        }
      </section>
    `;
  }

  #onReadingLevelChange = (
    event: SlChangeEvent<UserGroup | undefined>,
  ): void => {
    const level = event.detail ?? 'superuser';
    this.readingLevel = level;
    setUserGroup(level);
  };

  #signOut = async (): Promise<void> => {
    const confirmed = await MessageDialog.confirm(
      'You will need your password to sign in again.',
      'Sign out?',
    );
    if (confirmed) {
      this.signedOut = true;
    }
  };
}
