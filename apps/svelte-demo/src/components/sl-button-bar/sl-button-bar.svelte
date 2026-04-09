<script lang="ts">
  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-button-bar align="start">
  <sl-button variant="primary" fill="solid" disabled>Test 1</sl-button>
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <sl-button variant="primary" fill="solid" onclick={openBlankPage}>Test 2</sl-button>
</sl-button-bar>
