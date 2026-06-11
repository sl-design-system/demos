<script lang="ts">
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/tooltip/register.js';
</script>

<div class="tooltip-example">
  <sl-button aria-describedby="tooltip" variant="primary">Button</sl-button>
  <sl-tooltip id="tooltip" position="top">This is the tooltip message</sl-tooltip>
</div>
