export async function computedDescription(item: any): Promise<string[]> {
  return await item.evaluate((el) => {
    const button = el as HTMLElement;
    const fromElements = Array.from(button.ariaDescribedByElements ?? [])
      .map((node) => node.textContent?.trim() ?? '')
      .filter(Boolean);
    const fromAriaDescription = button.ariaDescription?.trim();

      return fromAriaDescription
        ? [...new Set([...fromElements, fromAriaDescription])]
        : fromElements;
    });
}
