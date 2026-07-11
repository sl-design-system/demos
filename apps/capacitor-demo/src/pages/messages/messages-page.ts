import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Avatar } from '@sl-design-system/avatar';
import { Badge } from '@sl-design-system/badge';
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';
import styles from './messages-page.scss.js';

interface Message {
  from: string;
  preview: string;
  when: string;
  unread?: boolean;
}

const MESSAGES: Message[] = [
  {
    from: 'Ms. de Vries',
    preview: 'Reminder: the physics test on Thursday covers chapters 3 and 4.',
    when: '09:41',
    unread: true,
  },
  {
    from: 'Study group',
    preview: 'Shall we meet in the library after the last period?',
    when: '08:15',
    unread: true,
  },
  {
    from: 'Mr. Bakker',
    preview: 'Well done on your book report, see my feedback attached.',
    when: 'Yesterday',
  },
  {
    from: 'School administration',
    preview: 'The sports day has been moved to next Friday.',
    when: 'Monday',
  },
];

export class MessagesPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-avatar': Avatar,
    'sl-badge': Badge,
  };

  static override styles = styles;

  private async _openMessage(message: Message): Promise<void> {
    await MessageDialog.alert(message.preview, message.from);
  }

  override render(): TemplateResult {
    return html`
      <h2>Messages</h2>
      <ul class="messages">
        ${MESSAGES.map(
          (message) => html`
            <li>
              <button
                class=${message.unread ? 'unread' : ''}
                @click=${() => this._openMessage(message)}
              >
                <sl-avatar display-name=${message.from} size="md"></sl-avatar>
                <span class="body">
                  <span class="row">
                    <span class="from">${message.from}</span>
                    <span class="when">${message.when}</span>
                  </span>
                  <span class="preview">${message.preview}</span>
                </span>
                ${message.unread
                  ? html`<sl-badge color="blue">new</sl-badge>`
                  : ''}
              </button>
            </li>
          `,
        )}
      </ul>
    `;
  }
}
