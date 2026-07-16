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
    const ariaLabel = el.getAttribute('aria-label')?.trim();
    if (ariaLabel) return ariaLabel;

    // Try to get innerText from the deepest element (HTMLElement only)
    const deepestText = el instanceof HTMLElement ? el.innerText.trim() : '';
    
    if (deepestText) {
      return deepestText;
    }

    // If deepest is an input, check for associated label via id/for attributes
    if (el instanceof HTMLInputElement) {
      const inputId = el.getAttribute('id');
      if (inputId) {
        // First try to find label in the same shadow root as the input
        const root = el.getRootNode() as Document | ShadowRoot;
        let label = root.querySelector(`label[for="${inputId}"]`) as HTMLLabelElement | null;
        
        // If not found and we're in a shadow DOM, also try the document root
        if (!label && root instanceof ShadowRoot) {
          label = document.querySelector(`label[for="${inputId}"]`) as HTMLLabelElement | null;
        }
        
        const labelText = label?.textContent?.trim();
        if (labelText) return labelText;
      }
    }

    // If deepest has no innerText, try the second-to-deepest element
    if (prevEl) {
      const prevAriaLabel = prevEl.getAttribute('aria-label')?.trim();
      if (prevAriaLabel) return prevAriaLabel;

      const prevText = prevEl instanceof HTMLElement ? prevEl.innerText.trim() : '';
      const MAX_PREV_TEXT_LENGTH = 100;
      // Only use prevText if it's reasonably short (avoid large container text like combobox options)
      if (prevText && prevText.length < MAX_PREV_TEXT_LENGTH) {
        return prevText;
      }
    }

    // Fallback: use textContent of deepest if innerText is empty
    const contentText = el.textContent?.trim();
    return contentText || null;
  });
}
