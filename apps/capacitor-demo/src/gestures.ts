export interface EdgeSwipeBackOptions {
  /** Whether a back navigation is currently possible. */
  canGoBack(): boolean;
  /** Called when the gesture starts being tracked. */
  onStart(): void;
  /** Called with the current horizontal finger offset in pixels. */
  onMove(dx: number): void;
  /** Called when the gesture passed the threshold; navigate back. */
  onCommit(): void;
  /** Called when the gesture was released below the threshold. */
  onCancel(): void;
}

const COMMIT_DISTANCE = 90;
const COMMIT_VELOCITY = 0.45; // px per ms
const MIN_ENGAGE_DISTANCE = 8;

/**
 * Tracks a "swipe from the left edge to go back" gesture, like the native
 * iOS navigation stack. Pointer events are observed on a narrow strip
 * along the left edge of the screen (with `touch-action: none`), so the
 * gesture never interferes with vertically scrolling content or
 * horizontally scrollable components further in.
 */
export class EdgeSwipeBack {
  #options: EdgeSwipeBackOptions;
  #pointerId?: number;
  #startX = 0;
  #startTime = 0;
  #dx = 0;
  #engaged = false;

  constructor(options: EdgeSwipeBackOptions) {
    this.#options = options;
  }

  attach(edge: HTMLElement): void {
    edge.addEventListener('pointerdown', (event) => {
      if (this.#pointerId !== undefined || !this.#options.canGoBack()) {
        return;
      }

      this.#pointerId = event.pointerId;
      this.#startX = event.clientX;
      this.#startTime = event.timeStamp;
      this.#dx = 0;
      this.#engaged = false;

      edge.setPointerCapture(event.pointerId);
    });

    edge.addEventListener('pointermove', (event) => {
      if (event.pointerId !== this.#pointerId) {
        return;
      }

      this.#dx = Math.max(0, event.clientX - this.#startX);

      if (!this.#engaged && this.#dx > MIN_ENGAGE_DISTANCE) {
        this.#engaged = true;
        this.#options.onStart();
      }

      if (this.#engaged) {
        this.#options.onMove(this.#dx);
      }
    });

    const end = (event: PointerEvent, cancelled: boolean): void => {
      if (event.pointerId !== this.#pointerId) {
        return;
      }

      this.#pointerId = undefined;

      if (!this.#engaged) {
        return;
      }

      const velocity =
        this.#dx / Math.max(1, event.timeStamp - this.#startTime);

      if (
        !cancelled &&
        (this.#dx > COMMIT_DISTANCE ||
          (this.#dx > MIN_ENGAGE_DISTANCE * 4 && velocity > COMMIT_VELOCITY))
      ) {
        this.#options.onCommit();
      } else {
        this.#options.onCancel();
      }
    };

    edge.addEventListener('pointerup', (event) => end(event, false));
    edge.addEventListener('pointercancel', (event) => end(event, true));
  }
}
