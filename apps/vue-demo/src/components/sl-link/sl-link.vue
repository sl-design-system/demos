<template>
  <section class="link-demo">
    <h2>Native anchor</h2>
    <sl-link>
      <a href="https://sanomalearning.design" target="_blank" rel="noopener noreferrer">
        Open Sanoma Learning Design
      </a>
    </sl-link>
    <h2>Vue Router link</h2>
    <sl-link>
      <router-link to="/sl-button">Go to sl-button demo</router-link>
    </sl-link>
  </section>
</template>

<script setup lang="ts">
import '@sl-design-system/link/register.js';
</script>

<style scoped lang="scss">
.link-demo {
  display: grid;
  gap: 12px;
  max-width: 480px;
}

h2 {
  margin: 16px 0 0;
  font-size: 16px;
}

a,
sl-link {
  width: fit-content;
}
</style>
