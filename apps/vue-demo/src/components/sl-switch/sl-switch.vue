<template>
  <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;">
    <sl-switch value="12345">Text inside the switch</sl-switch>
    <sl-switch value="12345" :disabled="true">Disabled switch</sl-switch>
  </div>
</template>