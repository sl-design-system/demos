<template>
  <sl-button variant="primary" fill="solid" @click="openDialog">Test</sl-button>
  <sl-dialog ref="dialogRef">
    <h1 slot="title">Test title</h1>
    Test description
    <sl-button slot="primary-actions" sl-dialog-close>Close</sl-button>
  </sl-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialogRef = ref<HTMLElement | null>(null);

const openDialog = () => {
  (dialogRef.value as any)?.showModal();
};
</script>
