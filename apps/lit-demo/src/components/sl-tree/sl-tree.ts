import { html, LitElement, TemplateResult } from 'lit';
import {
  ScopedElementsMixin,
  type ScopedElementsMap,
} from '@open-wc/scoped-elements/lit-element.js';
import { NestedTreeDataSource, Tree } from '@sl-design-system/tree';

interface TreeItemData {
  id: string;
  label: string;
  children?: TreeItemData[];
}

export class TreePage extends ScopedElementsMixin(LitElement) {
  static scopedElements: ScopedElementsMap = {
    'sl-tree': Tree as never,
  };

  private readonly _dataSource = new NestedTreeDataSource<TreeItemData>(
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

  override render(): TemplateResult {
    return html`
      <sl-tree
        aria-label="Product navigation"
        .dataSource=${this._dataSource}
      >
      </sl-tree>
    `;
  }
}
