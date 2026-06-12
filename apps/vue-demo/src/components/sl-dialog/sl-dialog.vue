<template>
  <sl-button variant="primary" fill="solid" @click="openDialog">Test</sl-button>
  <sl-dialog ref="dialogRef">
    <h1 slot="title">Test title</h1>
    Test description
    <sl-button slot="primary-actions" @click="closeDialog">Close</sl-button>
  </sl-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Dialog } from '@sl-design-system/dialog';

const dialogRef = ref<Dialog | null>(null);

const openDialog = () => {
  dialogRef.value?.showModal();
};

const closeDialog = () => {
  dialogRef.value?.close();
};
</script>
