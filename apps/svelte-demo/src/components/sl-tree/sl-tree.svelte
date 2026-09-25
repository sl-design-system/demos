<script lang="ts">
	import {
		NestedTreeDataSource,
		Tree,
	} from '@sl-design-system/tree';

	interface TreeItem {
		id: string;
		label: string;
		children?: TreeItem[];
	}

	if (!customElements.get('sl-tree')) customElements.define('sl-tree', Tree);

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
			getChildren: item => item.children,
			getId: item => item.id,
			getLabel: item => item.label,
			isExpandable: item => Boolean(item.children?.length),
		},
	);

	let treeElement: Tree | undefined = $state();

	$effect(() => {
		if (treeElement) treeElement.dataSource = dataSource;
	});
</script>

<sl-tree bind:this={treeElement} aria-label="Product navigation"></sl-tree>
