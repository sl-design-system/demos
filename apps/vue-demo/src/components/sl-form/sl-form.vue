<template>
  <sl-form>
    <sl-form-field label="Name">
      <sl-text-field name="name" required @sl-change="onNameChange"></sl-text-field>
    </sl-form-field>

    <sl-form-field label="I agree">
      <sl-checkbox name="agree" @sl-change="onAgreeChange"></sl-checkbox>
    </sl-form-field>

    <sl-button-bar>
      <sl-button variant="primary" :disabled="!name || !agreed" @click="onSubmit">Confirm</sl-button>
    </sl-button-bar>
  </sl-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@sl-design-system/form/register.js';
import '@sl-design-system/text-field/register.js';
import '@sl-design-system/checkbox/register.js';
import '@sl-design-system/button/register.js';
import '@sl-design-system/button-bar/register.js';

const name = ref('');
const agreed = ref(false);

function onNameChange(event: Event) {
  name.value = ((event.target as HTMLElement & { value: string }).value ?? '').trim();
}

function onAgreeChange(event: Event) {
  agreed.value = (event.target as HTMLElement & { checked: boolean }).checked;
}

function onSubmit() {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
}
</script>
