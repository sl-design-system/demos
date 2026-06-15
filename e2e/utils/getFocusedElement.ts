import type { Page } from '@playwright/test';

export async function getFocusedElement(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    let el = document.activeElement;
    while (el?.shadowRoot?.activeElement) {
      el = el.shadowRoot.activeElement;
    }

    if (!el) return null;

    // Clone the element to avoid modifying the DOM
    const clone = el.cloneNode(true) as Element;

    // Remove all aria-hidden elements and their content
    const hiddenElements = clone.querySelectorAll('[aria-hidden="true"]');
    hiddenElements.forEach((hiddenEl) => hiddenEl.remove());

    return clone.textContent?.trim() ?? null;
  });
}
