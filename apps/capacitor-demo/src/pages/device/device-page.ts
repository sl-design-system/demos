import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { Capacitor } from '@capacitor/core';
import { type BatteryInfo, Device, type DeviceInfo } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Callout } from '@sl-design-system/callout';
import { Card } from '@sl-design-system/card';
import styles from './device-page.scss.js';

/**
 * Showcases the Capacitor runtime: it reads native device information via
 * the Device plugin and triggers haptic feedback via the Haptics plugin.
 * Everything degrades gracefully when running in a regular browser.
 */
export class DevicePage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-button': Button,
    'sl-button-bar': ButtonBar,
    'sl-callout': Callout,
    'sl-card': Card,
  };

  static override styles = styles;

  @state() private _deviceInfo?: DeviceInfo;
  @state() private _batteryInfo?: BatteryInfo;
  @state() private _languageCode?: string;

  override connectedCallback(): void {
    super.connectedCallback();

    void this._loadDeviceInfo();
  }

  private async _loadDeviceInfo(): Promise<void> {
    this._deviceInfo = await Device.getInfo();
    this._languageCode = (await Device.getLanguageCode()).value;

    try {
      this._batteryInfo = await Device.getBatteryInfo();
    } catch {
      // Battery information is not available on this platform
    }
  }

  private async _impact(style: ImpactStyle): Promise<void> {
    try {
      await Haptics.impact({ style });
    } catch {
      // Haptics are not available on this platform
    }
  }

  private _renderInfoRow(label: string, value?: string): TemplateResult {
    return html`
      <dt>${label}</dt>
      <dd>${value ?? '—'}</dd>
    `;
  }

  override render(): TemplateResult {
    const info = this._deviceInfo,
      battery = this._batteryInfo?.batteryLevel,
      native = Capacitor.isNativePlatform();

    return html`
      ${native
        ? ''
        : html`
            <sl-callout variant="info">
              <h2 slot="title">Running in the browser</h2>
              You are viewing the web build. Run this app on an iOS device or
              simulator to see native values and feel haptic feedback.
            </sl-callout>
          `}

      <sl-card>
        <h2>Device information</h2>
        <div slot="body">
          <dl class="info">
            ${this._renderInfoRow('Platform', Capacitor.getPlatform())}
            ${this._renderInfoRow('Model', info?.model)}
            ${this._renderInfoRow('Operating system', info?.operatingSystem)}
            ${this._renderInfoRow('OS version', info?.osVersion)}
            ${this._renderInfoRow('Manufacturer', info?.manufacturer)}
            ${this._renderInfoRow('Language', this._languageCode)}
            ${this._renderInfoRow(
              'Battery',
              battery !== undefined
                ? `${Math.round(battery * 100)}%`
                : undefined,
            )}
          </dl>
        </div>
      </sl-card>

      <sl-card>
        <h2>Haptic feedback</h2>
        <p slot="body">
          Trigger the Taptic Engine with different impact strengths.
        </p>
        <sl-button-bar slot="actions">
          <sl-button @click=${() => this._impact(ImpactStyle.Light)}>
            Light
          </sl-button>
          <sl-button @click=${() => this._impact(ImpactStyle.Medium)}>
            Medium
          </sl-button>
          <sl-button
            variant="primary"
            @click=${() => this._impact(ImpactStyle.Heavy)}
          >
            Heavy
          </sl-button>
        </sl-button-bar>
      </sl-card>
    `;
  }
}
