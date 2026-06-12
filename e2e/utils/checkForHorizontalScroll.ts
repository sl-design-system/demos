import { expect, type Page } from '@playwright/test';

export async function hasMainHorizontalOverflow(page: Page): Promise<boolean> {
  const main = page.locator('main#main').first();
  await expect(main).toBeVisible();

  return main.evaluate((el) => {
    const node = el as HTMLElement;
    const overflowX = getComputedStyle(node).overflowX;

    // Hidden/clip content is not user-scrollable horizontally.
    if (overflowX === 'hidden' || overflowX === 'clip') {
      return false;
    }

    // WebKit can report tiny fractional differences without actual user-visible overflow.
    return node.scrollWidth - node.clientWidth > 1;
  });
}
