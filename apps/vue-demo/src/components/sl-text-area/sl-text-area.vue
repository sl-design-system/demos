<template>
  <div class="text-area-container">
    <sl-text-area
      aria-label="Text area"
      placeholder="Type your message"
      rows="4"
    ></sl-text-area>
  </div>
  <div class="text-area-container">
    <sl-text-area
      aria-label="Disabled text area"
      placeholder="Disabled text area"
      rows="4"
      :disabled="true"
    ></sl-text-area>
  </div>
</template>

<script setup lang="ts">
import '@sl-design-system/text-area/register.js';
</script>

<style scoped lang="scss">
@use './sl-text-area.scss';
</style>
