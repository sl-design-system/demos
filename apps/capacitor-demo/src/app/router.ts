import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** What the router stores in `history.state` for each entry it creates. */
interface RouterState {
  /** Position in this app's own history; 0 is the entry the app started on. */
  index: number;
}

/**
 * How a navigation moves through the app: deeper (`forward`), back up
 * (`back`), or sideways without a history entry (`replace`, e.g. a tab switch).
 */
export type NavigationDirection = 'forward' | 'back' | 'replace';

/**
 * Called for every route change. `apply` updates the router (and requests a
 * host update); the host decides when to call it, for example inside a view
 * transition.
 */
export type RouteChangeHandler = (
  direction: NavigationDirection,
  apply: () => void,
) => void;

function isRouterState(value: object | null): value is RouterState {
  return value !== null && 'index' in value && typeof value.index === 'number';
}

/**
 * Minimal History API router. It numbers the history entries it creates and
 * remembers their paths, so "back" can use real history navigation when the
 * previous entry is the screen we want to return to, and fall back to
 * replacing the current entry otherwise (e.g. after a deep link or a reload).
 */
export class Router implements ReactiveController {
  #host: ReactiveControllerHost;
  #onChange?: RouteChangeHandler;
  #index = 0;
  /** Paths of the history entries this router knows about, by index. */
  #entries: string[] = [];
  /** Increases with every route change; see `#commit`. */
  #latestCommit = 0;

  path = Router.#normalize(window.location.pathname);

  /** The path of the previous history entry, if the app created it. */
  get previousPath(): string | undefined {
    return this.#index > 0 ? this.#entries[this.#index - 1] : undefined;
  }

  constructor(host: ReactiveControllerHost, onChange?: RouteChangeHandler) {
    this.#host = host;
    this.#onChange = onChange;
    host.addController(this);
  }

  hostConnected(): void {
    const state: object | null = window.history.state;
    if (isRouterState(state)) {
      this.#index = state.index;
    } else {
      window.history.replaceState({ index: 0 } satisfies RouterState, '');
    }

    this.#entries[this.#index] = this.path;
    window.addEventListener('popstate', this.#onPopState);
  }

  hostDisconnected(): void {
    window.removeEventListener('popstate', this.#onPopState);
  }

  navigate(
    path: string,
    {
      replace = false,
      direction = replace ? 'replace' : 'forward',
    }: { replace?: boolean; direction?: NavigationDirection } = {},
  ): void {
    path = Router.#normalize(path);
    if (path === this.path) {
      return;
    }

    if (replace) {
      window.history.replaceState(
        { index: this.#index } satisfies RouterState,
        '',
        path,
      );
    } else {
      this.#index += 1;
      this.#entries.length = this.#index;
      window.history.pushState(
        { index: this.#index } satisfies RouterState,
        '',
        path,
      );
    }

    this.#entries[this.#index] = path;
    this.#commit(direction, () => (this.path = path));
  }

  /** Return to `path`: a real "back" if it is the previous entry, otherwise replace the current entry. */
  back(path: string): void {
    if (this.previousPath === Router.#normalize(path)) {
      window.history.back();
    } else {
      this.navigate(path, { replace: true, direction: 'back' });
    }
  }

  #onPopState = (event: PopStateEvent): void => {
    const state: object | null = event.state,
      index = isRouterState(state) ? state.index : 0,
      path = Router.#normalize(window.location.pathname);

    const direction = index < this.#index ? 'back' : 'forward';
    this.#index = index;
    this.#entries[index] = path;
    this.#commit(direction, () => (this.path = path));
  };

  /**
   * Applies a route change, through the host's handler when it has one. The
   * handler may apply it later (after a view transition starts); if another
   * route change was committed in the meantime, the older one is dropped so
   * it can't overwrite the newer route. History bookkeeping is updated
   * before this is called, so only `path` waits.
   */
  #commit(direction: NavigationDirection, change: () => void): void {
    const commit = ++this.#latestCommit;
    const apply = (): void => {
      if (commit !== this.#latestCommit) {
        return;
      }

      change();
      this.#host.requestUpdate();
    };

    if (this.#onChange) {
      this.#onChange(direction, apply);
    } else {
      apply();
    }
  }

  /** Strips a trailing slash, except for the root path. */
  static #normalize(path: string): string {
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  }
}
