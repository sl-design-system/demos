<script lang="ts">
  import '@sl-design-system/form/register.js';
  import '@sl-design-system/time-field/register.js';
</script>

<style lang="scss">
  @use './sl-time-field.scss';
</style>

<sl-form-field label="Appointment time">
  <sl-time-field max="18:20" min="08:40"></sl-time-field>
</sl-form-field>

<sl-form-field label="Concert time">
  <sl-time-field max="18:20" min="08:40" disabled></sl-time-field>
</sl-form-field>
