<template>
  <h2>sl-tab-group</h2>

  <sl-tab-group>
    <sl-tab slot="tabs">General</sl-tab>
    <sl-tab slot="tabs">Settings</sl-tab>
    <sl-tab slot="tabs">Advanced</sl-tab>

    <sl-tab-panel>This is the <strong>General</strong> tab content. It contains basic information about the component.</sl-tab-panel>
    <sl-tab-panel>This is the <strong>Settings</strong> tab content. Here you can configure various options.</sl-tab-panel>
    <sl-tab-panel>This is the <strong>Advanced</strong> tab content. Power-user features live here.</sl-tab-panel>
  </sl-tab-group>
</template>

<script setup lang="ts">
import '@sl-design-system/tabs/register.js';
</script>
