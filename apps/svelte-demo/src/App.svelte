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
  import InlineMessage from './components/sl-inline-message/sl-inline-message.svelte';
  import Menu from './components/sl-menu/sl-menu.svelte';
  import MessageDialog from './components/sl-message-dialog/sl-message-dialog.svelte';
  import NumberField from './components/sl-number-field/sl-number-field.svelte';
  import TabGroup from './components/sl-tab-group/sl-tab-group.svelte';

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
    { path: '/sl-inline-message', label: 'sl-inline-message', component: InlineMessage },
    { path: '/sl-menu', label: 'sl-menu', component: Menu },
    { path: '/sl-message-dialog', label: 'sl-message-dialog', component: MessageDialog },
    { path: '/sl-number-field', label: 'sl-number-field', component: NumberField },
    { path: '/sl-tab-group', label: 'sl-tab-group', component: TabGroup },
  ];

  const initialPath = window.location.pathname === '/' ? '/sl-accordion' : window.location.pathname;
  if (window.location.pathname === '/') {
    window.history.replaceState(null, '', '/sl-accordion');
  }
  let currentPath = $state(initialPath);
  let navCollapsed = $state(false);

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
  <nav class="sidebar" class:collapsed={navCollapsed} aria-label="Main navigation" id="app-sidebar">
    <button
      class="sidebar-toggle"
      aria-controls="app-sidebar"
      onclick={() => (navCollapsed = !navCollapsed)}
      aria-expanded={!navCollapsed}
      title="Toggle navigation"
    >
      <span aria-hidden="true">☰</span>
      <span class="visually-hidden">{navCollapsed ? 'Expand navigation' : 'Collapse navigation'}</span>
    </button>
    <h2>Svelte Demo App</h2>
    <ul class="sidebar-list">
      {#each navItems as item}
        <li>
          <a
            href={item.path}
            class:active={currentPath === item.path}
            onclick={(e) => { e.preventDefault(); navigate(item.path); }}
          ><span class="label">{item.label}</span></a>
        </li>
      {/each}
    </ul>
  </nav>
  <main id="main" class="content">
    <CurrentPage />
  </main>
</div>
