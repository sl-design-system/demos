<template>
  <sl-callout variant="info">
    <h2 slot="title">Test title</h2>
    Test description.
    <a href="about:blank" target="_blank" rel="noopener noreferrer"
      >Open link</a
    >
    <sl-button fill="outline" variant="info" @click="openBlankPage"
      >Open page</sl-button
    >
  </sl-callout>
</template>

<script setup lang="ts">
const openBlankPage = () => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>
