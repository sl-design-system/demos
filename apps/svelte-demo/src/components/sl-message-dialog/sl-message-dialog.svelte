<script lang="ts">
  import { MessageDialog } from '@sl-design-system/message-dialog';
  import '@sl-design-system/message-dialog/register.js';

  async function showAlert() {
    await MessageDialog.alert('Test description', 'Test');
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-button variant="primary" fill="solid" onclick={showAlert}>Show</sl-button>
