<script lang="ts">
  import '@sl-design-system/form/register.js';
  import '@sl-design-system/text-field/register.js';
  import '@sl-design-system/checkbox/register.js';
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/button-bar/register.js';

  let name = $state('');
  let agreed = $state(false);

  function onNameChange(event: Event) {
    name = ((event.target as HTMLElement & { value: string }).value ?? '').trim();
  }

  function onAgreeChange(event: Event) {
    agreed = (event.target as HTMLElement & { checked: boolean }).checked;
  }

  function onSubmit() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<sl-form>
  <sl-form-field label="Name">
    <sl-text-field name="name" required onsl-change={onNameChange}></sl-text-field>
  </sl-form-field>

  <sl-form-field label="I agree">
    <sl-checkbox name="agree" onsl-change={onAgreeChange}></sl-checkbox>
  </sl-form-field>

  <sl-button-bar>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <sl-button variant="primary" disabled={!name || !agreed} onclick={onSubmit}>Confirm</sl-button>
  </sl-button-bar>
</sl-form>
