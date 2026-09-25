import { Component } from '@angular/core';
import { TreeComponent } from '@sl-design-system/angular/tree';
import { NestedTreeDataSource } from '@sl-design-system/tree';

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

@Component({
  selector: 'app-tree-page',
  templateUrl: './sl-tree.component.html',
  styleUrls: ['./sl-tree.component.scss'],
  imports: [TreeComponent],
})
export class TreePageComponent {
  readonly dataSource = new NestedTreeDataSource<TreeItem>(
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
}
