<template>
  <sl-button-bar align="start">
    <sl-button variant="primary" fill="solid" :disabled="true"
      >Test 1</sl-button
    >
    <sl-button variant="primary" fill="solid" @click="openBlankPage"
      >Test 2</sl-button
    >
  </sl-button-bar>
</template>

<script setup lang="ts">
const openBlankPage = () => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>
