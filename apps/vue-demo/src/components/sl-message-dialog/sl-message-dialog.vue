<template>
  <sl-button variant="primary" fill="solid" @click="showAlert">Show</sl-button>
</template>

<script setup lang="ts">
import { MessageDialog } from '@sl-design-system/message-dialog';
import '@sl-design-system/message-dialog/register.js';

const showAlert = async () => {
  await MessageDialog.alert('Test description', 'Test');
};
</script>
