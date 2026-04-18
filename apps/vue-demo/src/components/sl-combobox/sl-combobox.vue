<template>
  <sl-combobox :multiple="true">
    <sl-listbox>
      <sl-option value="0">Test 1</sl-option>
      <sl-option value="1">Test 2</sl-option>
    </sl-listbox>
  </sl-combobox>
</template>

<script setup lang="ts">
import '@sl-design-system/combobox/register.js';
import '@sl-design-system/listbox/register.js';
</script>
