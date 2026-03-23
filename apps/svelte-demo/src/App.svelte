<script lang="ts">
    import './app.css';
    let name: string = "Svelte Demo";

    const openBlankPage = () => {
        window.open('about:blank', '_blank', 'noopener,noreferrer');
    };
</script>

<main>
    <h1>Hello {name}!</h1>
    <h2>sl-button</h2>
    <sl-button variant="info" size="lg" on:click={openBlankPage}>Button</sl-button>
</main>
