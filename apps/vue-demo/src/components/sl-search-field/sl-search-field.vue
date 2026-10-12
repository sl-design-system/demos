<template>
  <div class="states">
    <sl-form-field label="Enabled">
      <sl-search-field placeholder="Search"></sl-search-field>
    </sl-form-field>

    <sl-form-field label="Disabled">
      <sl-search-field :disabled="true" placeholder="Search"></sl-search-field>
    </sl-form-field>
  </div>
</template>

<script setup lang="ts">
import '@sl-design-system/form/register.js';
import '@sl-design-system/search-field/register.js';
</script>
