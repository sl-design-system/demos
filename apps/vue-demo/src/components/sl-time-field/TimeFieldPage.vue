<template>
  <sl-form-field label="Appointment date">
    <sl-time-field max="18:20" min="08:40"></sl-time-field>
  </sl-form-field>

  <sl-form-field label="Concert date">
    <sl-time-field max="18:20" min="08:40" :disabled="true"></sl-time-field>
  </sl-form-field>
</template>

<script setup lang="ts">
import '@sl-design-system/form/register.js';
import '@sl-design-system/time-field/register.js';
</script>

<style scoped lang="scss">
@use './sl-time-field.scss';
</style>
