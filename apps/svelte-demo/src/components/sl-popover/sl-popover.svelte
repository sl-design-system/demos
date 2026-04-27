<script lang="ts">
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/popover/register.js';

  function togglePopover() {
    const popover = document.querySelector('sl-popover');
    popover?.togglePopover();
  }

  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-button id="popover-trigger" onclick={togglePopover} variant="primary">Toggle Popover</sl-button>
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-popover anchor="popover-trigger" position="bottom">I'm a popover example with <sl-button variant="primary" onclick={openBlankPage}>Action</sl-button></sl-popover>
