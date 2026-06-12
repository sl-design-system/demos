<template>
  <sl-form ref="formEl">
    <sl-form-field label="Name">
      <sl-text-field name="name" :required="true"></sl-text-field>
    </sl-form-field>

    <sl-form-field label="I agree">
      <sl-checkbox name="agree" :required="true"></sl-checkbox>
    </sl-form-field>

    <sl-button-bar>
      <sl-button variant="primary" @click="onSubmit">Confirm</sl-button>
    </sl-button-bar>
  </sl-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Form } from '@sl-design-system/form';
import '@sl-design-system/form/register.js';
import '@sl-design-system/text-field/register.js';
import '@sl-design-system/checkbox/register.js';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';

const formEl = ref<Form | null>(null);

function onSubmit() {
  if (!formEl.value?.reportValidity()) {
    return;
  }
  window.open('about:blank', '_blank', 'noopener,noreferrer');
}
</script>
