import type { Page } from '@playwright/test';

export async function getFocusedElement(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    let el = document.activeElement as Element | null;

    if (!el) return null;

    // Traverse through shadow DOM levels, keeping track of previous element
    let prevEl: Element | null = null;
    while (el?.shadowRoot?.activeElement) {
      prevEl = el;
      el = el.shadowRoot.activeElement as Element;
    }

    // el is now the deepest element, prevEl is the second-to-deepest

    if (!el) return null;

    // Check for aria-label on deepest element (highest priority)
    if (el.hasAttribute('aria-label')) {
      return (el.getAttribute('aria-label') ?? '').trim();
    }

    // Try to get innerText from the deepest element
    const deepestText = el.innerText?.trim();
    
    if (deepestText) {
      return deepestText;
    }

    // If deepest has no innerText, try the second-to-deepest element
    if (prevEl) {
      // Check for aria-label on second-to-deepest
      if (prevEl.hasAttribute('aria-label')) {
        return (prevEl.getAttribute('aria-label') ?? '').trim();
      }

      const prevText = prevEl.innerText?.trim();
      if (prevText) {
        return prevText;
      }

      // Fallback to textContent of second-to-deepest
      const prevContentText = prevEl.textContent?.trim();
      return prevContentText || null;
    }

    // Fallback: use textContent of deepest if innerText is empty
    const contentText = el.textContent?.trim();
    return contentText || null;
  });
}
