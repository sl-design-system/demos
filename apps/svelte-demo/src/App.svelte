<script lang="ts">
  let name: string = "Svelte Demo";
  let count: number = 0;
</script>

<main>
  <h1>Hello {name}!</h1>
  <h2>Count: {count}</h2>
  <button on:click={() => count++}>Increment</button>
</main>

<style>
  h1 { color: #ff3e00; }
  h2 { color: #36a7fa; }
  button {
    font-size: 1em;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    cursor: pointer;
  }
</style>

