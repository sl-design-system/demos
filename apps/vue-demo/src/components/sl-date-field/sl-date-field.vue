<template>
  <sl-form-field label="Appointment date">
    <sl-date-field locale="en-GB"></sl-date-field>
  </sl-form-field>

  <sl-form-field label="Concert date">
    <sl-date-field locale="en-GB" :disabled="true"></sl-date-field>
  </sl-form-field>
</template>

<script setup lang="ts">
import '@sl-design-system/form/register.js';
import '@sl-design-system/date-field/register.js';
</script>

<style scoped lang="scss">
@use './sl-date-field.scss';
</style>