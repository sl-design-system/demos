<template>
  <sl-button variant="info" size="lg" @click="openBlankPage">Button</sl-button>
</template>

<script setup lang="ts">
const openBlankPage = () => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>
