<template>
  <sl-button id="popover-anchor" @click="togglePopover">Show more information</sl-button>
  <sl-popover id="sl-popover-1" ref="popoverRef" anchor="popover-anchor" aria-label="test title">
    <h2>test title</h2>
    <p>test description</p>
  </sl-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverRef = ref<HTMLElement | null>(null);

const togglePopover = () => {
  (popoverRef.value as any)?.togglePopover();
};
</script>
