import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Badge } from '@sl-design-system/badge';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Card } from '@sl-design-system/card';
import styles from './sl-card.scss.js';

export class CardPage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-badge': Badge,
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
    'sl-card': Card,
  };

  static override styles = styles;

  private _openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  override render(): TemplateResult {
    return html`
      <sl-card orientation="horizontal">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1586622992874-27d98f198139?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Illustration for digital learning"
        />
        <h2>Captivating Nyhavn Moments</h2>
        <span slot="header">
          <sl-badge color="purple" size="lg">new</sl-badge>
        </span>
        <p slot="body">
          Immerse yourself in the vibrant hues of Nyhavn, Copenhagen's iconic
          waterfront. This picturesque scene, adorned with colorful facades and
          historic ships, invites you to explore the charm of Danish culture
          against the backdrop of serene canals.
        </p>
        <sl-button-bar slot="actions">
          <sl-button variant="primary" @click=${this._openBlankPage}
            >Download</sl-button
          >
        </sl-button-bar>
      </sl-card>
    `;
  }
}
