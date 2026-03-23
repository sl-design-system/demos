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
    <h2>sl-accordion</h2>
    <sl-accordion single>
        <sl-accordion-item summary="Test 1">
            Extended content for Test 1
        </sl-accordion-item>
        <sl-accordion-item summary="Test 2" disabled>
            Extended content for Test 2
        </sl-accordion-item>
    </sl-accordion>
</main>
