import { AbortError } from 'saborter/errors';
import * as Constants from './use-aborter.constants';

/**
 * Creates an `AbortError` specifically for scenarios where an operation is aborted
 * because the component or context it belongs to unmounted.
 *
 * This error is typically used in React components or similar environments where
 * asynchronous operations should be cancelled when the component is removed from
 * the DOM. The error includes a predefined message and sets the `type` to `'aborted'`
 * and `initiator` to a constant indicating unmount.
 *
 * @returns {AbortError} A new `AbortError` instance with preset message, type, and initiator.
 */
export const createAbortableUnmountError = (): AbortError => {
  return new AbortError(Constants.ABORTED_SIGNAL_WITHOUT_MESSAGE, {
    type: 'aborted',
    initiator: Constants.ABORTABLE_UNMOUNTED_INITIATOR
  });
};
