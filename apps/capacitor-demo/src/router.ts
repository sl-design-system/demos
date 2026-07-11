export type RouteDirection = 'forward' | 'back';

/**
 * A tiny hash based router built on the Navigation API
 * (https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API).
 *
 * Hash URLs (`#/home`) are used instead of paths because Capacitor serves
 * the app from the local `capacitor://` origin, where a reload on a path
 * like `/home` would not resolve to `index.html`.
 *
 * With the Navigation API, plain `<a href="#/page">` anchors are enough:
 * the `navigate` event is intercepted centrally, so no per-link click
 * handlers are needed. Traversals (back/forward button, swipe-back
 * gesture) are detected by comparing history entry indices, so the app
 * can animate pushes and pops in opposite directions. On browsers without
 * the Navigation API (for example Firefox) the router falls back to the
 * `hashchange` event, which works with the exact same anchors.
 */
export class Router extends EventTarget {
  #routes: string[];
  #fallback: string;
  #route: string;
  #direction: RouteDirection = 'forward';

  constructor(routes: string[], fallback: string) {
    super();

    this.#routes = routes;
    this.#fallback = fallback;
    this.#route = this.#parse(window.location.href);
  }

  get route(): string {
    return this.#route;
  }

  /** The direction of the last route change. */
  get direction(): RouteDirection {
    return this.#direction;
  }

  get canGoBack(): boolean {
    return window.navigation
      ? window.navigation.canGoBack
      : window.history.length > 1;
  }

  start(): void {
    const navigation = window.navigation;

    if (navigation) {
      navigation.addEventListener('navigate', (event) => {
        // Let the browser handle downloads, cross-origin navigations and
        // anything else that cannot be intercepted (e.g. target="_blank")
        if (
          !event.canIntercept ||
          event.downloadRequest !== null ||
          new URL(event.destination.url).origin !== window.location.origin
        ) {
          return;
        }

        const url = event.destination.url;

        // A traverse to a lower history index is a "back" navigation;
        // pushes and forward traversals animate forwards.
        const direction: RouteDirection =
          event.navigationType === 'traverse' &&
          event.destination.index < (navigation.currentEntry?.index ?? -1)
            ? 'back'
            : 'forward';

        event.intercept({
          handler: () => {
            this.#update(url, direction);

            return Promise.resolve();
          },
        });
      });
    } else {
      window.addEventListener('popstate', () => {
        this.#update(window.location.href, 'forward');
      });
      window.addEventListener('hashchange', () => {
        this.#update(window.location.href, 'forward');
      });
    }

    if (!window.location.hash) {
      window.location.replace(`#/${this.#fallback}`);
    }

    this.#update(window.location.href, 'forward');
  }

  navigate(path: string): void {
    if (window.navigation) {
      window.navigation.navigate(`#/${path}`);
    } else {
      window.location.hash = `#/${path}`;
    }
  }

  back(): void {
    if (window.navigation) {
      if (window.navigation.canGoBack) {
        window.navigation.back();
      }
    } else {
      window.history.back();
    }
  }

  #parse(href: string): string {
    const path = new URL(href).hash.replace(/^#\/?/, '');

    return this.#routes.includes(path) ? path : this.#fallback;
  }

  #update(href: string, direction: RouteDirection): void {
    const route = this.#parse(href);

    if (route !== this.#route) {
      this.#route = route;
      this.#direction = direction;
      this.dispatchEvent(new Event('route-change'));
    }
  }
}
