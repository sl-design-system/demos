<script lang="ts">
  let dialogEl: HTMLElement;

  function openDialog() {
    (dialogEl as any).showModal();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-button variant="primary" fill="solid" onclick={openDialog}>Test</sl-button>
<sl-dialog bind:this={dialogEl}>
  <h1 slot="title">Test title</h1>
  Test description
  <sl-button slot="primary-actions" sl-dialog-close>Close</sl-button>
</sl-dialog>
