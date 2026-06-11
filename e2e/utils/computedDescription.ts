import type { Locator } from '@playwright/test';

export async function computedDescription(item: Locator): Promise<string[]> {
  return item.evaluate((el) => {
    const element = el as HTMLElement;
    const fromElements = Array.from(element.ariaDescribedByElements ?? [])
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean);
    const fromAriaDescription = element.ariaDescription?.trim();
    return fromAriaDescription
      ? [...new Set([...fromElements, fromAriaDescription])]
      : fromElements;
  });
}
