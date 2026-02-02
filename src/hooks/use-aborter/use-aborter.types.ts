import { Aborter, OnAbortCallback, OnStateChangeCallback, RequestState, AbortInitiator as Initiator } from 'saborter';
import { ABORTABLE_UNMOUNTED_INITIATOR } from './use-aborter.constants';

export interface UseAborterResult {
  /**
   * `Aborter` class instance
   */
  aborter: Aborter;
  /**
   * `StateObserver` is a class for observing the state of a request.
   * 
   * Current state value. May be undefined if state hasn't been set yet.
   *  - cancelled - the previous operation was cancelled
      - pending - the current operation is still in progress
      - fulfilled - the operation was completed successfully
      - rejected - the operation was a failure. An error was caught in the request itself, or a syntax error
      - aborted - the operation was interrupted

      @default null
   */
  requestState: RequestState | null;
}

export interface UseAborterProps {
  /**
    Callback function for abort events.
    Associated with EventListener.onabort.
    It can be overridden via `aborter.listeners.onabort`
  */
  onAbort?: OnAbortCallback;
  /**
    A function called when the request state changes.
    It takes the new state as an argument.
    Can be overridden via `aborter.listeners.state.onstatechange`
  */
  onStateChange?: OnStateChangeCallback;
  /**
    A flag responsible for releasing resources.
    This includes unsubscribing, clearing fields, and removing references to passed callback functions.
    @default true
  */
  isDisposeEnabled?: boolean;
}

/**
 * When the error is triggered by a `timeout`, it means that automatic request cancellation was configured and the cancellation was successful.

  When the error is triggered by the `user`, it means that the user interrupted the request by calling the abort() method.

  When the error is triggered by the `system`, it means that you caught an error canceling a previous request.

  When the error is triggered by the `component-unmounted`, it means that the request was interrupted because the component in which the hook was initialized was unmounted.
 */
export type AbortInitiator = Initiator | typeof ABORTABLE_UNMOUNTED_INITIATOR;
