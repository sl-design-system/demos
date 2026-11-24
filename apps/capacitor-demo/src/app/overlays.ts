/**
 * Finds open popovers and modal dialogs anywhere in the document, including
 * inside shadow roots, in document order.
 */
function findOpenOverlays(
  root: Document | ShadowRoot,
  found: HTMLElement[] = [],
): HTMLElement[] {
  for (const element of root.querySelectorAll<HTMLElement>('*')) {
    if (
      (element instanceof HTMLDialogElement && element.open) ||
      (element.hasAttribute('popover') && element.matches(':popover-open'))
    ) {
      found.push(element);
    }

    if (element.shadowRoot) {
      findOpenOverlays(element.shadowRoot, found);
    }
  }

  return found;
}

/**
 * Closes the overlay that was opened last (the deepest open dialog or popover),
 * the way the Escape key would. Returns whether an overlay was closed.
 *
 * Used for the Android back button, which should dismiss an overlay before it
 * navigates.
 */
export function closeTopmostOverlay(): boolean {
  const overlay = findOpenOverlays(document).at(-1);
  if (!overlay) {
    return false;
  }

  if (overlay instanceof HTMLDialogElement) {
    // Let the owning component react (or veto) the same way it would for Escape.
    const cancel = new Event('cancel', { cancelable: true });
    if (overlay.dispatchEvent(cancel)) {
      overlay.close();
    }
  } else {
    overlay.hidePopover();
  }

  return true;
}
