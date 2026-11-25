<template>
  <sl-panel :collapsible="true" heading="Panel Title">
    <sl-button slot="actions" tooltip="Pinata" fill="ghost"
      ><sl-icon name="pinata"></sl-icon
    ></sl-button>
    <sl-button slot="actions" tooltip="Smile" fill="ghost"
      ><sl-icon name="face-smile"></sl-icon
    ></sl-button>
    <sl-button
      slot="actions"
      tooltip="Warning"
      fill="ghost"
      @click="openBlankPage"
      ><sl-icon name="triangle-exclamation-solid"></sl-icon
    ></sl-button>

    <sl-badge slot="suffix" emphasis="subtle" size="lg" variant="info"
      >suffix</sl-badge
    >
    <span>Collapsible panel content</span>
  </sl-panel>
</template>

<script setup lang="ts">
import '@sl-design-system/badge/register.js';
import '@sl-design-system/button/register.js';
import '@sl-design-system/panel/register.js';
import '@sl-design-system/icon/register.js';
const openBlankPage = () => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>
