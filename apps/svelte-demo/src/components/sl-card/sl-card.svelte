<script lang="ts">
  import '@sl-design-system/badge/register.js';
  import '@sl-design-system/button/register.js';
  import '@sl-design-system/button-bar/register.js';
  import '@sl-design-system/card/register.js';
  function openBlankPage() {
    window.open('about:blank', '_blank', 'noopener,noreferrer');
  }
</script>

<style lang="scss">
  @use './sl-card.scss';

  .card-wrapper {
    inline-size: 100%;
  }
</style>

<div class="card-wrapper">
  <sl-card orientation="horizontal" class="card">
    <img
      slot="media"
      src="https://images.unsplash.com/photo-1586622992874-27d98f198139?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Illustration for digital learning"
    />
    <h2>Captivating Nyhavn Moments</h2>
    <span slot="header">
      <sl-badge color="purple" size="lg">new</sl-badge>
    </span>
    <p slot="body">
      Immerse yourself in the vibrant hues of Nyhavn, Copenhagen's iconic waterfront. This picturesque
      scene, adorned with colorful facades and historic ships, invites you to explore the charm of
      Danish culture against the backdrop of serene canals.
    </p>
    <sl-button-bar slot="actions">
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <sl-button variant="primary" onclick={openBlankPage}>Download</sl-button>
    </sl-button-bar>
  </sl-card>
</div>