<script lang="ts">
  import '@sl-design-system/tabs/register.js';
  import '@sl-design-system/button/register.js';

  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-tab-group>
  <sl-tab slot="tabs">General</sl-tab>
  <sl-tab slot="tabs">Settings</sl-tab>
  <sl-tab disabled slot="tabs">Disabled</sl-tab>

  <sl-tab-panel>This is the <strong>General</strong> tab content. It contains basic information about the component.
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <sl-button onclick={openBlankPage}>Action</sl-button></sl-tab-panel>
  <sl-tab-panel>This is the <strong>Settings</strong> tab content. Here you can configure various options.</sl-tab-panel>
  <sl-tab-panel>Disabled tab content</sl-tab-panel>
</sl-tab-group>
