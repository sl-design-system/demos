<template>
  <div class="tooltip-example">
    <sl-button id="tooltip-target" variant="primary">Button</sl-button>
    <sl-tooltip id="tooltip" for="tooltip-target" position="top" type="description"
      >This is the tooltip message</sl-tooltip
    >
  </div>
</template>

<script setup lang="ts">
import '@sl-design-system/button/register.js';
import '@sl-design-system/tooltip/register.js';
</script>
