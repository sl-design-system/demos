<template>
  <sl-tool-bar>
    <sl-button>Cut</sl-button>
    <sl-button @click="openBlankPage">Copy</sl-button>
    <sl-button disabled>Paste</sl-button>

    <sl-tool-bar-divider></sl-tool-bar-divider>

    <sl-menu-button>
      <div slot="button">Edit</div>
      <sl-menu-item>Rename...</sl-menu-item>
      <sl-menu-item @click="openBlankPage">Delete...</sl-menu-item>
    </sl-menu-button>
  </sl-tool-bar>
</template>

<script setup lang="ts">
const openBlankPage = (): void => {
  window.open('about:blank', '_blank', 'noopener,noreferrer');
};
</script>