<script lang="ts">
  import type { Form } from '@sl-design-system/form';
  import type { Select } from '@sl-design-system/select';
  import '@sl-design-system/form/register.js';
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/button-bar/register.js';
  import '@sl-design-system/listbox/register.js';
  import '@sl-design-system/select/register.js';

  let formEl = $state<Form | null>(null);
  let basicSelectEl = $state<Select | null>(null);

  function reportValidity() {
    const selectedValue = String(basicSelectEl?.value ?? '');
    const hasSelectedOption = ['1', '2'].includes(selectedValue);

    basicSelectEl?.setCustomValidity(
      hasSelectedOption ? '' : 'Please choose an option from the list.'
    );
    formEl?.reportValidity();
  }
</script>

<sl-form bind:this={formEl}>
  <sl-form-field>
    <sl-select bind:this={basicSelectEl} required clearable placeholder="Select an option" size="md">
      <sl-option value="1">Option 1</sl-option>
      <sl-option value="2">Option 2</sl-option>
    </sl-select>
  </sl-form-field>

  <sl-button-bar>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <sl-button onclick={reportValidity}>Report validity</sl-button>
  </sl-button-bar>

  <sl-form-field>
    <sl-select disabled placeholder="Disabled select" size="md">
      <sl-option value="1">Disabled option 1</sl-option>
      <sl-option value="2">Disabled option 2</sl-option>
    </sl-select>
  </sl-form-field>
</sl-form>
