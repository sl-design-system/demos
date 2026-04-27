<template>
  <sl-form ref="formEl">
    <sl-form-field
      label="Radio group"
      hint="This story has both builtin validation (required) and custom validation. You need to pick the middle option to make the field valid. The custom validation is done by listening to the sl-validate event and setting the custom validity on the radio group. If you never select any option, then only the builtin validation applies."
    >
      <sl-radio-group @sl-validate="handleValidate" :required="true">
        <sl-radio value="1">One</sl-radio>
        <sl-radio value="2">Two</sl-radio>
        <sl-radio value="3">Three</sl-radio>
      </sl-radio-group>
    </sl-form-field>

    <sl-button-bar>
      <sl-button variant="primary" @click="reportValidity">Report validity</sl-button>
    </sl-button-bar>

    <sl-form-field label="Disabled radio group" hint="This radio group is disabled; no interaction is possible.">
      <sl-radio-group :disabled="true">
        <sl-radio value="1">One</sl-radio>
        <sl-radio value="2">Two</sl-radio>
        <sl-radio value="3">Three</sl-radio>
      </sl-radio-group>
    </sl-form-field>
  </sl-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Form } from '@sl-design-system/form';
import type { RadioGroup } from '@sl-design-system/radio-group';
import '@sl-design-system/form/register.js';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';
import '@sl-design-system/radio-group/register.js';

const formEl = ref<Form | null>(null);

function handleValidate(event: Event) {
  const radioGroup = event.target as RadioGroup<string>;
  radioGroup.setCustomValidity(
    radioGroup.value === '2' ? '' : 'Pick the middle option',
  );
}

function reportValidity() {
  formEl.value?.reportValidity();
}
</script>
