/**
 * Minimal ambient declarations for the Navigation API
 * (https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API),
 * covering only the surface used by router.ts. TypeScript's lib.dom does
 * not ship these types yet; remove this file once it does.
 */

interface NavigationDestination {
  readonly url: string;
}

interface NavigationInterceptOptions {
  handler?: () => Promise<void>;
}

interface NavigateEvent extends Event {
  readonly canIntercept: boolean;
  readonly destination: NavigationDestination;
  readonly downloadRequest: string | null;
  readonly hashChange: boolean;
  intercept(options?: NavigationInterceptOptions): void;
}

interface NavigationEventMap {
  navigate: NavigateEvent;
}

interface NavigationHistoryEntry {
  readonly url: string | null;
}

interface NavigationResult {
  readonly committed: Promise<NavigationHistoryEntry>;
  readonly finished: Promise<NavigationHistoryEntry>;
}

interface Navigation extends EventTarget {
  navigate(url: string): NavigationResult;
  addEventListener<K extends keyof NavigationEventMap>(
    type: K,
    listener: (this: Navigation, ev: NavigationEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

interface Window {
  readonly navigation?: Navigation;
}
