<template>
  <sl-form ref="formEl">
    <sl-form-field>
      <sl-select ref="basicSelectEl" required :clearable="true" placeholder="Select an option" size="md">
        <sl-option value="1">Option 1</sl-option>
        <sl-option value="2">Option 2</sl-option>
      </sl-select>
    </sl-form-field>

    <sl-button-bar>
      <sl-button @click="reportValidity">Report validity</sl-button>
    </sl-button-bar>

    <sl-form-field>
      <sl-select :disabled="true" placeholder="Disabled select" size="md">
        <sl-option value="1">Disabled value 1</sl-option>
        <sl-option value="2">Disabled value 2</sl-option>
      </sl-select>
    </sl-form-field>
  </sl-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Form } from '@sl-design-system/form';
import type { Select } from '@sl-design-system/select';
import '@sl-design-system/form/register.js';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';
import '@sl-design-system/listbox/register.js';
import '@sl-design-system/select/register.js';

const formEl = ref<Form | null>(null);
const basicSelectEl = ref<Select | null>(null);

function reportValidity() {
  const selectedValue = String(basicSelectEl.value?.value ?? '');
  const hasSelectedOption = ['1', '2'].includes(selectedValue);

  basicSelectEl.value?.setCustomValidity(
    hasSelectedOption ? '' : 'Please choose an option from the list.',
  );
  formEl.value?.reportValidity();
}
</script>
