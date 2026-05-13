<template>
  <ul>
    <li v-for="item in visibleItems" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  <sl-paginator-status
    :page="page"
    :page-size="pageSize"
    :total-items="allItems.length"
    item-label="items"
  ></sl-paginator-status>
  <sl-paginator
    ref="paginatorRef"
    :page="page"
    :page-size="pageSize"
    :total-items="allItems.length"
  ></sl-paginator>
  <sl-paginator-page-size
    ref="pageSizeRef"
    :page-size="pageSize"
    item-label="Items"
  ></sl-paginator-page-size>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
  Paginator,
  PaginatorPageSize,
  PaginatorStatus,
} from '@sl-design-system/paginator';

if (!customElements.get('sl-paginator'))
  customElements.define('sl-paginator', Paginator);
if (!customElements.get('sl-paginator-page-size'))
  customElements.define('sl-paginator-page-size', PaginatorPageSize);
if (!customElements.get('sl-paginator-status'))
  customElements.define('sl-paginator-status', PaginatorStatus);

import {
  ALL_ITEMS,
  type Item,
} from '../../../../../shared/utils/paginator-items.js';

const allItems: Item[] = ALL_ITEMS;

const page = ref(0);
const pageSize = ref(5);

const visibleItems = computed(() =>
  allItems.slice(
    page.value * pageSize.value,
    page.value * pageSize.value + pageSize.value,
  ),
);

const paginatorRef = ref<Paginator | null>(null);
const pageSizeRef = ref<PaginatorPageSize | null>(null);

function onPageChange(e: Event) {
  page.value = (e as CustomEvent<number>).detail;
}

function onPageSizeChange(e: Event) {
  pageSize.value = (e as CustomEvent<number>).detail;
  page.value = 0;
}

onMounted(() => {
  pageSizeRef.value?.pageSizes = [5, 10];
  paginatorRef.value?.addEventListener('sl-page-change', onPageChange);
  pageSizeRef.value?.addEventListener('sl-page-size-change', onPageSizeChange);
});

onUnmounted(() => {
  paginatorRef.value?.removeEventListener('sl-page-change', onPageChange);
  pageSizeRef.value?.removeEventListener(
    'sl-page-size-change',
    onPageSizeChange,
  );
});
</script>
