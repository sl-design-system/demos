<script lang="ts">
  let popoverEl: HTMLElement;

  function togglePopover() {
    (popoverEl as any).togglePopover();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-button id="popover-anchor" onclick={togglePopover}>Show more information</sl-button>
<sl-popover bind:this={popoverEl} anchor="popover-anchor" aria-label="test title">
  <h2>test title</h2>
  <p>test description</p>
</sl-popover>
