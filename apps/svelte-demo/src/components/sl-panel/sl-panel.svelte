<script lang="ts">
  import '@sl-design-system/badge/register.js';
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/icon/register.js';
  import '@sl-design-system/panel/register.js';
  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-panel collapsible heading="Panel Title">
  <sl-button slot="actions" tooltip="Pinata" fill="ghost"><sl-icon name="pinata"></sl-icon></sl-button>
  <sl-button slot="actions" tooltip="Smile" fill="ghost"><sl-icon name="face-smile"></sl-icon></sl-button>
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <sl-button slot="actions" tooltip="Warning" fill="ghost" on:click={openBlankPage}><sl-icon name="triangle-exclamation-solid"></sl-icon></sl-button>

  <sl-badge slot="suffix" emphasis="subtle" size="lg" variant="info">suffix</sl-badge>
  <span>Collapsible panel content</span>
</sl-panel>
