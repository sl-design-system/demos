<script lang="ts">
  import './app.css';
  import Accordion from './components/sl-accordion.svelte';
  import Breadcrumbs from './components/sl-breadcrumbs.svelte';
  import Button from './components/sl-button.svelte';
  import ButtonBar from './components/sl-button-bar.svelte';
  import Callout from './components/sl-callout.svelte';
  import Checkbox from './components/sl-checkbox.svelte';
  import Combobox from './components/sl-combobox.svelte';

  const navItems = [
    { path: '/sl-accordion', label: 'sl-accordion', component: Accordion },
    { path: '/sl-breadcrumbs', label: 'sl-breadcrumbs', component: Breadcrumbs },
    { path: '/sl-button', label: 'sl-button', component: Button },
    { path: '/sl-button-bar', label: 'sl-button-bar', component: ButtonBar },
    { path: '/sl-callout', label: 'sl-callout', component: Callout },
    { path: '/sl-checkbox', label: 'sl-checkbox', component: Checkbox },
    { path: '/sl-combobox', label: 'sl-combobox', component: Combobox },
  ];

  let currentPath = $state(
    window.location.pathname === '/' ? '/sl-accordion' : window.location.pathname
  );

  const CurrentPage = $derived(
    navItems.find((item) => item.path === currentPath)?.component ?? Accordion
  );

  function navigate(path: string) {
    window.history.pushState(null, '', path);
    currentPath = path;
  }

  $effect(() => {
    const onPopState = () => { currentPath = window.location.pathname; };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  });
</script>

<div class="app-layout">
  <a href="#main" class="skip-link">Skip to main content</a>
  <nav class="sidebar">
    <h2>Svelte Demo App</h2>
    <ul>
      {#each navItems as item}
        <li>
          <a
            href={item.path}
            class:active={currentPath === item.path}
            onclick={(e) => { e.preventDefault(); navigate(item.path); }}
          >{item.label}</a>
        </li>
      {/each}
    </ul>
  </nav>
  <main id="main" class="content">
    <CurrentPage />
  </main>
</div>
