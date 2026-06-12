<script lang="ts">
  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-callout variant="info">
  <h2 slot="title">Test title</h2>
  Test description.
  <a href="about:blank" target="_blank" rel="noopener noreferrer">Open link</a>
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <sl-button fill="outline" variant="info" onclick={openBlankPage}>Open page</sl-button>
</sl-callout>
