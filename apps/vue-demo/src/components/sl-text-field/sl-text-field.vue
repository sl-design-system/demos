<template>
  <div class="text-field-container">
    <sl-text-field
      aria-label="Text field"
      placeholder="Type your message"
    ></sl-text-field>
  </div>
  <div class="text-field-container">
    <sl-text-field
      aria-label="Disabled text field"
      placeholder="Disabled text field"
      :disabled="true"
    ></sl-text-field>
  </div>
</template>

<script setup lang="ts">
import '@sl-design-system/text-field/register.js';
</script>

<style scoped lang="scss">
@use './sl-text-field.scss';
</style>
