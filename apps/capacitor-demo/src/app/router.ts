import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** What the router stores in `history.state` for each entry it creates. */
interface RouterState {
  /** Position in this app's own history; 0 is the entry the app started on. */
  index: number;
}

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
  #index = 0;
  /** Paths of the history entries this router knows about, by index. */
  #entries: string[] = [];

  path = Router.#normalize(window.location.pathname);

  /** The path of the previous history entry, if the app created it. */
  get previousPath(): string | undefined {
    return this.#index > 0 ? this.#entries[this.#index - 1] : undefined;
  }

  constructor(host: ReactiveControllerHost) {
    this.#host = host;
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
    { replace = false }: { replace?: boolean } = {},
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
    this.path = path;
    this.#host.requestUpdate();
  }

  /** Return to `path`: a real "back" if it is the previous entry, otherwise replace the current entry. */
  back(path: string): void {
    if (this.previousPath === Router.#normalize(path)) {
      window.history.back();
    } else {
      this.navigate(path, { replace: true });
    }
  }

  #onPopState = (event: PopStateEvent): void => {
    const state: object | null = event.state;
    this.#index = isRouterState(state) ? state.index : 0;
    this.path = Router.#normalize(window.location.pathname);
    this.#entries[this.#index] = this.path;
    this.#host.requestUpdate();
  };

  /** Strips a trailing slash, except for the root path. */
  static #normalize(path: string): string {
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  }
}
