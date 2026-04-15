<script lang="ts">
  import type { Form } from '@sl-design-system/form';
  import '@sl-design-system/form/register.js';
  import '@sl-design-system/text-field/register.js';
  import '@sl-design-system/checkbox/register.js';
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/button-bar/register.js';

  let formEl = $state<Form | null>(null);

  function onSubmit() {
    if (!formEl?.reportValidity()) {
      return;
    }
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-form bind:this={formEl}>
  <sl-form-field label="Name">
    <sl-text-field name="name" required></sl-text-field>
  </sl-form-field>

  <sl-form-field label="I agree">
    <sl-checkbox name="agree" required></sl-checkbox>
  </sl-form-field>

  <sl-button-bar>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <sl-button variant="primary" onclick={onSubmit}>Confirm</sl-button>
  </sl-button-bar>
</sl-form>
