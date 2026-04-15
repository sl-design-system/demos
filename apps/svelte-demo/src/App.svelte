<script lang="ts">
  import './app.css';
  import Accordion from './components/sl-accordion/sl-accordion.svelte';
  import Breadcrumbs from './components/sl-breadcrumbs/sl-breadcrumbs.svelte';
  import Button from './components/sl-button/sl-button.svelte';
  import ButtonBar from './components/sl-button-bar/sl-button-bar.svelte';
  import Callout from './components/sl-callout/sl-callout.svelte';
  import Checkbox from './components/sl-checkbox/sl-checkbox.svelte';
  import Combobox from './components/sl-combobox/sl-combobox.svelte';
  import Dialog from './components/sl-dialog/sl-dialog.svelte';
  import FormField from './components/sl-form-field/sl-form-field.svelte';
  import Form from './components/sl-form/sl-form.svelte';

  const navItems = [
    { path: '/sl-accordion', label: 'sl-accordion', component: Accordion },
    { path: '/sl-breadcrumbs', label: 'sl-breadcrumbs', component: Breadcrumbs },
    { path: '/sl-button', label: 'sl-button', component: Button },
    { path: '/sl-button-bar', label: 'sl-button-bar', component: ButtonBar },
    { path: '/sl-callout', label: 'sl-callout', component: Callout },
    { path: '/sl-checkbox', label: 'sl-checkbox', component: Checkbox },
    { path: '/sl-combobox', label: 'sl-combobox', component: Combobox },
    { path: '/sl-dialog', label: 'sl-dialog', component: Dialog },
    { path: '/sl-form-field', label: 'sl-form-field', component: FormField },
    { path: '/sl-form', label: 'sl-form', component: Form },
  ];

  const initialPath = window.location.pathname === '/' ? '/sl-accordion' : window.location.pathname;
  if (window.location.pathname === '/') {
    window.history.replaceState(null, '', '/sl-accordion');
  }
  let currentPath = $state(initialPath);

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
  <main class="content">
    <CurrentPage />
  </main>
</div>
