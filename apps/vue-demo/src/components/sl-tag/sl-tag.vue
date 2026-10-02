<template>
  <sl-tag-group aria-label="Subjects">
    <sl-tag removable>Mathematics</sl-tag>
    <sl-tag removable>Physics</sl-tag>
    <sl-tag disabled=${true} removable>Chemistry</sl-tag>
  </sl-tag-group>
</template>

<script setup lang="ts">
  import '@sl-design-system/tag/register.js';
</script>
