import { expect, type Page } from '@playwright/test';

export async function hasMainHorizontalOverflow(page: Page): Promise<boolean> {
  const main = page.locator('main#main').first();
  await expect(main).toBeVisible();

  return main.evaluate((el) => {
    const node = el as HTMLElement;
    return node.scrollWidth > node.clientWidth;
  });
}
