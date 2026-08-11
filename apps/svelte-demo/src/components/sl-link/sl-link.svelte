<script lang="ts">
  import '@sl-design-system/link/register.js';

  function navigate(path: string) {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
</script>

<section class="link-demo">
  <h2>Native anchor</h2>
  <sl-link>
    <a href="https://sanomalearning.design" target="_blank" rel="noopener noreferrer">
      Open Sanoma Learning Design
    </a>
  </sl-link>

  <h2>Svelte SPA navigation</h2>
  <sl-link>
    <a href="/sl-button" on:click|preventDefault={() => navigate('/sl-button')}>
      Go to sl-button demo
    </a>
  </sl-link>
</section>

<style lang="scss">
  .link-demo {
    display: grid;
    gap: 12px;
    max-width: 480px;
  }

  h2 {
    margin: 16px 0 0;
    font-size: 16px;
  }

  a,
  sl-link {
    width: fit-content;
  }
</style>
