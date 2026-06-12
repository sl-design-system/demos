<script lang="ts">
  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }

  function directClick(node: HTMLElement) {
    node.addEventListener('click', openBlankPage);
    return { destroy: () => node.removeEventListener('click', openBlankPage) };
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<sl-menu-button>
  <span slot="button">Menu</span>
  <sl-menu-item onclick={openBlankPage}>Test 1</sl-menu-item>
  <sl-menu-item>
    Test 2
    <sl-menu slot="submenu">
      <sl-menu-item use:directClick>Test 3</sl-menu-item>
    </sl-menu>
  </sl-menu-item>
</sl-menu-button>
