<template>
  <div class="switch-container">
    <sl-switch value="12345">Text inside the switch</sl-switch>
    <sl-switch value="12345" :disabled="true">Disabled switch</sl-switch>
  </div>
</template>

<style scoped lang="scss">
@use './sl-switch.scss';
</style>
