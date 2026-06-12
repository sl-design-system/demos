export interface Item {
  id: number;
  name: string;
}

export const ALL_ITEMS: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));
