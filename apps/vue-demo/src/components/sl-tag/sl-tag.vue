<template>
  <sl-tag-list class="tags" aria-label="Subjects">
    <sl-tag removable="true">Mathematics</sl-tag>
    <sl-tag removable="true">Physics</sl-tag>
    <sl-tag :disabled="true" removable="true">Chemistry</sl-tag>
  </sl-tag-list>
</template>

<style scoped lang="scss">
@use './sl-tag.scss';
</style>

<script setup lang="ts">
import '@sl-design-system/tag/register.js';
</script>
