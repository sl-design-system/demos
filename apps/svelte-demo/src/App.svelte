<script lang="ts">
    import './app.css';
    let name: string = "Svelte Demo";

    const openBlankPage = () => {
        window.open('about:blank', '_blank', 'noopener,noreferrer');
    };
</script>

<main>
    <h1>Hello {name}!</h1>
    <h2>sl-accordion</h2>
    <sl-accordion single>
        <sl-accordion-item summary="Test 1">
            Extended content for Test 1
        </sl-accordion-item>
        <sl-accordion-item summary="Test 2" disabled>
            Extended content for Test 2
        </sl-accordion-item>
    </sl-accordion>
    <h2>sl-breadcrumbs</h2>
    <sl-breadcrumbs>
        <a href="about:blank" target="_blank" rel="noopener noreferrer">Test 1</a>
    </sl-breadcrumbs>
    <h2>sl-button</h2>
    <sl-button variant="info" size="lg" on:click={openBlankPage}>Button</sl-button>
    <h2>sl-button-bar</h2>
    <sl-button-bar align="start">
        <sl-button variant="primary" fill="solid" disabled>Test 1</sl-button>
        <sl-button variant="primary" fill="solid" on:click={openBlankPage}>Test 2</sl-button>
    </sl-button-bar>
    <h2>sl-callout</h2>
    <sl-callout variant="info">
        <h2 slot="title">Test title</h2>
        Test description.
        <a href="about:blank" target="_blank" rel="noopener noreferrer">Open link</a>
        <sl-button fill="outline" variant="info" on:click={openBlankPage}>Open page</sl-button>
    </sl-callout>
</main>
