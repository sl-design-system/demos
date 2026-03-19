<template>
  <div id="app">
    <h1>Hello Vue Demo!</h1>
    <h2>sl-button</h2>
    <sl-button variant="info" size="lg" @click="openBlankPage">Button</sl-button>
  </div>
</template>

<script setup lang="ts">
const openBlankPage = () => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>

<style src="app.css" scoped></style>
