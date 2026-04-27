<template>
  <sl-form>
    <sl-form-field>
      <sl-select placeholder="Select an option" size="md">
        <sl-option value="1">Option 1</sl-option>
        <sl-option value="2">Option 2</sl-option>
        <sl-option value="3">Option 3</sl-option>
      </sl-select>
    </sl-form-field>
  </sl-form>
</template>

<script setup lang="ts">
import '@sl-design-system/form/register.js';
import '@sl-design-system/listbox/register.js';
import '@sl-design-system/select/register.js';
</script>
