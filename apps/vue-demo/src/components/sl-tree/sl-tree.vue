<template>
  <sl-tree ref="treeElement" aria-label="Product navigation"></sl-tree>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NestedTreeDataSource, Tree } from '@sl-design-system/tree';

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

if (!customElements.get('sl-tree')) customElements.define('sl-tree', Tree);

const treeElement = ref<InstanceType<typeof Tree>>();

const dataSource = new NestedTreeDataSource<TreeItem>(
  [
    {
      id: 'products',
      label: 'Products',
      children: [
        { id: 'analytics', label: 'Analytics' },
        { id: 'reports', label: 'Reports' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      children: [
        { id: 'profile', label: 'Profile' },
        { id: 'members', label: 'Members' },
      ],
    },
  ],
  {
    getChildren: (item) => item.children,
    getId: (item) => item.id,
    getLabel: (item) => item.label,
    isExpandable: (item) => Boolean(item.children?.length),
  },
);

onMounted(() => {
  treeElement.value!.dataSource = dataSource;
});
</script>
