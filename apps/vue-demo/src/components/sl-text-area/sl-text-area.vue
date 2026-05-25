<template>
  <div class="text-area-container">
    <sl-text-area
      aria-label="Text area"
      placeholder="Type your message"
      rows="4"
    ></sl-text-area>
  </div>
</template>

<script setup lang="ts">
import '@sl-design-system/text-area/register.js';
</script>

<style scoped lang="scss" src="./sl-text-area.scss"></style>
