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
  <sl-tab slot="tabs">Advanced</sl-tab>

  <sl-tab-panel>This is the <strong>General</strong> tab content. It contains basic information about the component.
    <sl-button onclick={openBlankPage}>Action</sl-button></sl-tab-panel>
  <sl-tab-panel>This is the <strong>Settings</strong> tab content. Here you can configure various options.</sl-tab-panel>
  <sl-tab-panel>Disabled tab content</sl-tab-panel>
  <sl-tab-panel>This is the <strong>Advanced</strong> tab content. Power-user features live here.</sl-tab-panel>
</sl-tab-group>
