<script lang="ts">
  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-button variant="info" size="lg" onclick={openBlankPage}>Button</sl-button>
