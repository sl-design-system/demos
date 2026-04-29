import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { AccordionPage } from '../components/sl-accordion/sl-accordion.js';
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
import { NumberFieldPage } from '../components/sl-number-field/sl-number-field.js';
import styles from './app.styles.scss.js';

const ROUTES = [
  { path: '/sl-accordion', label: 'sl-accordion' },
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
  { path: '/sl-number-field', label: 'sl-number-field' },
];

export class App extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'page-accordion': AccordionPage,
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
    'page-number-field': NumberFieldPage,
  };

  static override styles = styles;

  @state() private _currentPath = window.location.pathname;

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
      case '/sl-number-field':
        return html`<page-number-field></page-number-field>`;
      default:
        return html``;
    }
  }

  override render(): TemplateResult {
    return html`
      <div class="app-layout">
        <nav class="sidebar">
          <h2>Lit Demo App</h2>
          <ul>
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
                    >${label}</a
                  >
                </li>
              `,
            )}
          </ul>
        </nav>
        <main class="content">${this._renderPage()}</main>
      </div>
    `;
  }
}

customElements.define('demo-app', App);
