<template>
  <div id="app">
    <h1>Hello Vue Demo!</h1>
    <h2>sl-button</h2>
    <sl-button variant="info" size="lg" @click="openBlankPage"
      >Button</sl-button
    >
    <h2>sl-accordion</h2>
    <sl-accordion single>
      <sl-accordion-item summary="Test 1">
        Extended content for Test 1
      </sl-accordion-item>
      <sl-accordion-item summary="Test 2" :disabled="true">
        Extended content for Test 2
      </sl-accordion-item>
    </sl-accordion>
    <h2>sl-breadcrumbs</h2>
    <sl-breadcrumbs>
      <a href="about:blank" target="_blank" rel="noopener noreferrer">Test 1</a>
    </sl-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
const openBlankPage = () => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>

<style src="app.css" scoped></style>
