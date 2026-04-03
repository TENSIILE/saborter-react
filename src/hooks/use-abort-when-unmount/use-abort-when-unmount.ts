import { useEffect } from 'react';
import { Aborter } from 'saborter';
import * as Shared from '../../shared';
import { createAbortableUnmountError } from '../use-aborter/use-aborter.utils';

/**
 * React hook that automatically aborts an `Aborter` instance when the component unmounts.
 *
 * The hook creates a mutable reference to the `aborter` instance and sets up a `useEffect`
 * cleanup function that calls `aborter.abort()` with a special `AbortError` indicating
 * that the operation was aborted due to unmount.
 *
 * @param aborter - The `Aborter` instance to be aborted on unmount.
 * @returns void
 */
export const useAbortWhenUnmount = (aborter: Aborter): void => {
  const aborterRef = Shared.Hooks.useMutableRef(aborter);

  useEffect(() => {
    const aborterCurrent = aborterRef.current;

    return () => {
      aborterCurrent.abort(createAbortableUnmountError());
    };
  }, [aborterRef]);
};
