<script lang="ts">
  import type { Dialog } from "@sl-design-system/dialog";

  let dialogEl: Dialog | undefined;

  function openDialog() {
    dialogEl?.showModal();
  }

  function closeDialog() {
    dialogEl?.close();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-button variant="primary" fill="solid" onclick={openDialog}>Test</sl-button>
<sl-dialog bind:this={dialogEl}>
  <h1 slot="title">Test title</h1>
  Test description
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <sl-button slot="primary-actions" onclick={closeDialog}>Close</sl-button>
</sl-dialog>
