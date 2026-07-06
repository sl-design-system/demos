<template>
  <sl-toggle-button variant="info" size="lg">Test 1</sl-toggle-button>
  <sl-toggle-button variant="info" size="lg" :disabled="true"
    >Test 2</sl-toggle-button
  >
</template>

<script setup lang="ts">
import '@sl-design-system/toggle-button/register.js';
</script>
