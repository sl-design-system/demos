<template>
  <sl-button id="popover-trigger" @click="togglePopover" variant="primary">Toggle Popover</sl-button>
  <sl-popover anchor="popover-trigger" position="bottom">I'm a popover example</sl-popover>
</template>

<script setup lang="ts">
import '@sl-design-system/button/register.js';
import '@sl-design-system/popover/register.js';

const togglePopover = () => {
  const popover = document.querySelector('sl-popover');
  popover?.togglePopover();
};
</script>
