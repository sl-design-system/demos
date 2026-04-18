<template>
  <div class="states">
    <sl-form-field label="Enabled">
      <sl-text-field></sl-text-field>
    </sl-form-field>

    <sl-form-field label="Disabled">
      <sl-text-field :disabled="true"></sl-text-field>
    </sl-form-field>
  </div>
</template>

<script setup lang="ts">
import '@sl-design-system/form/register.js';
import '@sl-design-system/text-field/register.js';
</script>
