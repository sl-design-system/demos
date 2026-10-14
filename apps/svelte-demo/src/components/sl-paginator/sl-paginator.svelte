<script lang="ts">
  import { Paginator, PaginatorPageSize, PaginatorStatus } from '@sl-design-system/paginator';
  import { ALL_ITEMS, type Item } from '../../../../../shared/utils/paginator-items.js';

  if (!customElements.get('sl-paginator')) customElements.define('sl-paginator', Paginator);
  if (!customElements.get('sl-paginator-page-size')) customElements.define('sl-paginator-page-size', PaginatorPageSize);
  if (!customElements.get('sl-paginator-status')) customElements.define('sl-paginator-status', PaginatorStatus);

  const allItems: Item[] = ALL_ITEMS;

  let page = $state(0);
  let pageSize = $state(5);

  const visibleItems = $derived(allItems.slice(page * pageSize, page * pageSize + pageSize));

  let paginatorEl: HTMLElement | null = $state(null);
  let pageSizeEl: HTMLElement | null = $state(null);

  $effect(() => {
    if (!paginatorEl) return;
    const handler = (e: Event) => {
      page = (e as CustomEvent<number>).detail;
    };
    paginatorEl.addEventListener('sl-page-change', handler);
    return () => paginatorEl?.removeEventListener('sl-page-change', handler);
  });

  $effect(() => {
    if (!pageSizeEl) return;
    const handler = (e: Event) => {
      pageSize = (e as CustomEvent<number>).detail;
      page = 0;
    };
    pageSizeEl.addEventListener('sl-page-size-change', handler);
    return () => pageSizeEl?.removeEventListener('sl-page-size-change', handler);
  });
</script>

<ul>
  {#each visibleItems as item}
    <li>{item.name}</li>
  {/each}
</ul>
<sl-paginator-status
  page={page}
  page-size={pageSize}
  total-items={allItems.length}
  item-label="items"
></sl-paginator-status>
<sl-paginator
  bind:this={paginatorEl}
  page={page}
  page-size={pageSize}
  total-items={allItems.length}
></sl-paginator>
<sl-paginator-page-size
  bind:this={pageSizeEl}
  page-size={pageSize}
  page-sizes={JSON.stringify([5, 10])}
  item-label="Items"
></sl-paginator-page-size>

