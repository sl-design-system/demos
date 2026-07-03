import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { AccordionPage } from '../components/sl-accordion/sl-accordion.js';
import { AvatarPage } from '../components/sl-avatar/sl-avatar.js';
import { BreadcrumbsPage } from '../components/sl-breadcrumbs/sl-breadcrumbs.js';
import { ButtonPage } from '../components/sl-button/sl-button.js';
import { ButtonBarPage } from '../components/sl-button-bar/sl-button-bar.js';
import { CalloutPage } from '../components/sl-callout/sl-callout.js';
import { CheckboxPage } from '../components/sl-checkbox/sl-checkbox.js';
import { ComboboxPage } from '../components/sl-combobox/sl-combobox.js';
import { DialogPage } from '../components/sl-dialog/sl-dialog.js';
import { FormFieldPage } from '../components/sl-form-field/sl-form-field.js';
import { FormPage } from '../components/sl-form/sl-form.js';
import { InlineMessagePage } from '../components/sl-inline-message/sl-inline-message.js';
import { MenuPage } from '../components/sl-menu/sl-menu.js';
import { MessageDialogPage } from '../components/sl-message-dialog/sl-message-dialog.js';
import { NumberFieldPage } from '../components/sl-number-field/sl-number-field.js';
import { TextAreaPage } from '../components/sl-text-area/sl-text-area.js';
import { TabGroupPage } from '../components/sl-tab-group/sl-tab-group.js';
import { PaginatorPage } from '../components/sl-paginator/sl-paginator.js';
import { SelectPage } from '../components/sl-select/sl-select.js';
import { SwitchPage } from '../components/sl-switch/sl-switch.js';
import { CardPage } from '../components/sl-card/sl-card.js';
import { PopoverPage } from '../components/sl-popover/sl-popover.js';
import { TooltipPage } from '../components/sl-tooltip/sl-tooltip.js';
import { RadioGroupPage } from '../components/sl-radio-group/sl-radio-group.js';
import { ToggleButtonPage } from '../components/sl-toggle-button/sl-toggle-button.js';
import styles from './app.styles.scss.js';

const ROUTES = [
  { path: '/sl-accordion', label: 'sl-accordion' },
  { path: '/sl-avatar', label: 'sl-avatar' },
  { path: '/sl-breadcrumbs', label: 'sl-breadcrumbs' },
  { path: '/sl-button', label: 'sl-button' },
  { path: '/sl-button-bar', label: 'sl-button-bar' },
  { path: '/sl-callout', label: 'sl-callout' },
  { path: '/sl-checkbox', label: 'sl-checkbox' },
  { path: '/sl-combobox', label: 'sl-combobox' },
  { path: '/sl-dialog', label: 'sl-dialog' },
  { path: '/sl-form-field', label: 'sl-form-field' },
  { path: '/sl-form', label: 'sl-form' },
  { path: '/sl-inline-message', label: 'sl-inline-message' },
  { path: '/sl-menu', label: 'sl-menu' },
  { path: '/sl-message-dialog', label: 'sl-message-dialog' },
  { path: '/sl-number-field', label: 'sl-number-field' },
  { path: '/sl-text-area', label: 'sl-text-area' },
  { path: '/sl-tab-group', label: 'sl-tab-group' },
  { path: '/sl-paginator', label: 'sl-paginator' },
  { path: '/sl-select', label: 'sl-select' },
  { path: '/sl-switch', label: 'sl-switch' },
  { path: '/sl-card', label: 'sl-card' },
  { path: '/sl-popover', label: 'sl-popover' },
  { path: '/sl-toggle-button', label: 'sl-toggle-button' },
  { path: '/sl-tooltip', label: 'sl-tooltip' },
  { path: '/sl-radio-group', label: 'sl-radio-group' },
];

export class App extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'page-accordion': AccordionPage,
    'page-avatar': AvatarPage,
    'page-breadcrumbs': BreadcrumbsPage,
    'page-button': ButtonPage,
    'page-button-bar': ButtonBarPage,
    'page-callout': CalloutPage,
    'page-checkbox': CheckboxPage,
    'page-combobox': ComboboxPage,
    'page-dialog': DialogPage,
    'page-form-field': FormFieldPage,
    'page-form': FormPage,
    'page-inline-message': InlineMessagePage,
    'page-menu': MenuPage,
    'page-message-dialog': MessageDialogPage,
    'page-number-field': NumberFieldPage,
    'page-text-area': TextAreaPage,
    'page-tab-group': TabGroupPage,
    'page-paginator': PaginatorPage,
    'page-select': SelectPage,
    'page-switch': SwitchPage,
    'page-card': CardPage,
    'page-popover': PopoverPage,
    'page-toggle-button': ToggleButtonPage,
    'page-tooltip': TooltipPage,
    'page-radio-group': RadioGroupPage,
  };

  static override styles = styles;

  @state() private _currentPath = window.location.pathname;
  @state() private _navCollapsed = false;

  private _onPopState = () => {
    this._currentPath = window.location.pathname;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('popstate', this._onPopState);
    if (this._currentPath === '/') {
      this._navigate('/sl-accordion');
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._onPopState);
  }

  private _navigate(path: string): void {
    window.history.pushState(null, '', path);
    this._currentPath = path;
  }

  private _renderPage(): TemplateResult {
    switch (this._currentPath) {
      case '/sl-accordion':
        return html`<page-accordion></page-accordion>`;
      case '/sl-avatar':
        return html`<page-avatar></page-avatar>`;
      case '/sl-breadcrumbs':
        return html`<page-breadcrumbs></page-breadcrumbs>`;
      case '/sl-button':
        return html`<page-button></page-button>`;
      case '/sl-button-bar':
        return html`<page-button-bar></page-button-bar>`;
      case '/sl-callout':
        return html`<page-callout></page-callout>`;
      case '/sl-checkbox':
        return html`<page-checkbox></page-checkbox>`;
      case '/sl-combobox':
        return html`<page-combobox></page-combobox>`;
      case '/sl-dialog':
        return html`<page-dialog></page-dialog>`;
      case '/sl-form-field':
        return html`<page-form-field></page-form-field>`;
      case '/sl-form':
        return html`<page-form></page-form>`;
      case '/sl-inline-message':
        return html`<page-inline-message></page-inline-message>`;
      case '/sl-menu':
        return html`<page-menu></page-menu>`;
      case '/sl-message-dialog':
        return html`<page-message-dialog></page-message-dialog>`;
      case '/sl-number-field':
        return html`<page-number-field></page-number-field>`;
      case '/sl-text-area':
        return html`<page-text-area></page-text-area>`;
      case '/sl-tab-group':
        return html`<page-tab-group></page-tab-group>`;
      case '/sl-paginator':
        return html`<page-paginator></page-paginator>`;
      case '/sl-select':
        return html`<page-select></page-select>`;
      case '/sl-switch':
        return html`<page-switch></page-switch>`;
      case '/sl-card':
        return html`<page-card></page-card>`;
      case '/sl-popover':
        return html`<page-popover></page-popover>`;
      case '/sl-toggle-button':
        return html`<page-toggle-button></page-toggle-button>`;
      case '/sl-tooltip':
        return html`<page-tooltip></page-tooltip>`;
      case '/sl-radio-group':
        return html`<page-radio-group></page-radio-group>`;
      default:
        return html``;
    }
  }

  override render(): TemplateResult {
    return html`
      <div class="app-layout">
        <a href="#main" class="skip-link">Skip to main content</a>
        <nav
          class="sidebar ${this._navCollapsed ? 'collapsed' : ''}"
          aria-label="Main navigation"
          id="app-sidebar"
        >
          <button
            class="sidebar-toggle"
            aria-controls="app-sidebar"
            @click=${() => (this._navCollapsed = !this._navCollapsed)}
            aria-expanded="${!this._navCollapsed}"
            title="Toggle navigation"
          >
            <span aria-hidden="true">☰</span>
            <span class="visually-hidden"
              >${this._navCollapsed
                ? 'Expand navigation'
                : 'Collapse navigation'}</span
            >
          </button>
          <h2>Lit Demo App</h2>
          <ul class="sidebar-list">
            ${ROUTES.map(
              ({ path, label }) => html`
                <li>
                  <a
                    href=${path}
                    class=${this._currentPath === path ? 'active' : ''}
                    @click=${(e: Event) => {
                      e.preventDefault();
                      this._navigate(path);
                    }}
                    ><span class="label">${label}</span></a
                  >
                </li>
              `,
            )}
          </ul>
        </nav>
        <main id="main" class="content" tabindex="-1">
          ${this._renderPage()}
        </main>
      </div>
    `;
  }
}

customElements.define('demo-app', App);
