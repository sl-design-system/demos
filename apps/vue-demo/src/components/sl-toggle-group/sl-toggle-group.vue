<template>
  <sl-toggle-group>
    <sl-toggle-button variant="info" size="lg">Test 1</sl-toggle-button>
    <sl-toggle-button variant="info" size="lg">Test 2</sl-toggle-button>
    <sl-toggle-button variant="info" size="lg" :disabled="true"
      >Test 3</sl-toggle-button
    >
  </sl-toggle-group>
</template>

<script setup lang="ts">
import '@sl-design-system/toggle-button/register.js';
import '@sl-design-system/toggle-group/register.js';
</script>
