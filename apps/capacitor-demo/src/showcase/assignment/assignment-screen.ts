import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { DateField } from '@sl-design-system/date-field';
import { Form, FormField } from '@sl-design-system/form';
import { Option } from '@sl-design-system/listbox';
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';
import { NumberField } from '@sl-design-system/number-field';
import { Select } from '@sl-design-system/select';
import { Switch } from '@sl-design-system/switch';
import { TextArea } from '@sl-design-system/text-area';
import { TextField } from '@sl-design-system/text-field';
import { TimeField } from '@sl-design-system/time-field';
import { html, LitElement, type TemplateResult } from 'lit';
import { query } from 'lit/decorators.js';
import pageStyles from '../../styles/page.css' with { type: 'css' };
import styles from './assignment-screen.css' with { type: 'css' };

/** The form's value; date and number fields report their values as strings. */
interface AssignmentValue {
  title?: string;
  group?: string;
  /** ISO date, e.g. `2026-11-27`. */
  dueDate?: string;
  dueTime?: string;
  points?: string;
  description?: string;
  allowLate?: boolean;
}

const GROUPS = ['Class 2A', 'Class 2B', 'Class 2C', 'Maths club'];

function today(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

/** A teacher creating an assignment: a validated form with most SLDS form controls. */
export class AssignmentScreen extends ScopedElementsMixin(LitElement) {
  static override scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-date-field': DateField,
    'sl-form': Form,
    'sl-form-field': FormField,
    'sl-number-field': NumberField,
    'sl-option': Option,
    'sl-select': Select,
    'sl-switch': Switch,
    'sl-text-area': TextArea,
    'sl-text-field': TextField,
    'sl-time-field': TimeField,
  };

  static override styles = [pageStyles, styles];

  @query('sl-form') private form?: Form<AssignmentValue>;

  override render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field label="Title">
          <sl-text-field
            name="title"
            required
            minlength="3"
            placeholder="E.g. Exercises 4.1 to 4.6"
          ></sl-text-field>
        </sl-form-field>

        <sl-form-field label="Class">
          <sl-select name="group" required placeholder="Choose a class">
            ${GROUPS.map(
              (group) => html`<sl-option .value=${group}>${group}</sl-option>`,
            )}
          </sl-select>
        </sl-form-field>

        <div class="when">
          <sl-form-field label="Due date">
            <sl-date-field
              name="dueDate"
              required
              select-only
              .min=${today()}
            ></sl-date-field>
          </sl-form-field>
          <sl-form-field label="Time">
            <sl-time-field
              name="dueTime"
              required
              select-only
              minute-step="15"
              value="09:00"
            ></sl-time-field>
          </sl-form-field>
        </div>

        <sl-form-field label="Points" hint="Between 1 and 100.">
          <sl-number-field
            name="points"
            min="1"
            max="100"
            value="10"
            step-buttons="edges"
          ></sl-number-field>
        </sl-form-field>

        <sl-form-field label="Instructions" mark="optional">
          <sl-text-area
            name="description"
            resize="auto"
            rows="3"
            maxlength="500"
            show-count="400"
          ></sl-text-area>
        </sl-form-field>

        <sl-switch name="allowLate">
          Accept late hand-ins
          <span slot="description">Marked as late, but still accepted.</span>
        </sl-switch>

        <div class="actions">
          <sl-button
            fill="solid"
            variant="primary"
            size="lg"
            @click=${this.#onSubmit}
          >
            Create assignment
          </sl-button>
          <sl-button fill="ghost" size="lg" @click=${() => this.form?.reset()}>
            Clear form
          </sl-button>
        </div>
      </sl-form>
    `;
  }

  #onSubmit = async (): Promise<void> => {
    const form = this.form;

    // Controls register with <sl-form> a frame after they connect; until then
    // `controls` is empty and reportValidity() would return true.
    if (!form?.controls.length || !form.reportValidity()) {
      return;
    }

    const { title, group, dueDate, dueTime } = form.value,
      // Parse as a local date; `new Date('2026-11-27')` would be UTC midnight.
      due = dueDate ? new Date(`${dueDate}T00:00`).toLocaleDateString() : '';
    await MessageDialog.alert(
      `“${title}” is due for ${group} on ${due} at ${dueTime}.`,
      'Assignment created',
    );
    form.reset();
  };
}
