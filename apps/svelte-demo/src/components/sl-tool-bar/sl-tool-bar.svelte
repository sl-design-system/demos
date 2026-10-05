<script lang="ts">
  function openBlankPage(): void {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-tool-bar>
  <sl-button>Cut</sl-button>
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <sl-button onclick={openBlankPage}>Copy</sl-button>
  <sl-button disabled>Paste</sl-button>

  <sl-tool-bar-divider></sl-tool-bar-divider>

  <sl-menu-button>
    <div slot="button">Edit</div>
    <sl-menu-item>Rename...</sl-menu-item>
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <sl-menu-item onclick={openBlankPage}>Delete...</sl-menu-item>
  </sl-menu-button>
</sl-tool-bar>