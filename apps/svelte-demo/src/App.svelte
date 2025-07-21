<script lang="ts">
  import './App.css';
  let name: string = "Svelte Demo";
  let count: number = 0;
</script>

<main>
  <h1>Hello {name}!</h1>
  <h2>Count: {count}</h2>
  <button on:click={() => count++}>Increment</button>
  <sl-button variant="info" size="lg" on:click={() => count++}>Button</sl-button>
</main>
