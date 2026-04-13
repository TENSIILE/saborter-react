import { useRef, useEffect, useState } from 'react';
import { Aborter } from 'saborter';
import { RequestState } from 'saborter/types';
import { dispose as disposeFn } from 'saborter/lib';
import * as Shared from '../../shared';
import { createAbortableUnmountError } from './use-aborter.utils';
import * as Types from './use-aborter.types';

export const useAborter = (props: Types.UseAborterProps = {}): Types.UseAborterResult => {
  const { onAbort, onStateChange, dispose = true } = props;

  const aborterRef = useRef(new Aborter({ onAbort: onAbort as any, onStateChange }));
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isDisposeEnabledRef = Shared.Hooks.useMutableRef(dispose);

  useEffect(() => {
    const currentAborter = aborterRef.current;
    const isDisposeEnabledCurrent = isDisposeEnabledRef.current;

    const unsubscribeRequestState = currentAborter.listeners.state.subscribe(setRequestState);

    const unsubscribeLoading = currentAborter.listeners.state.subscribe((state) => {
      setLoading(state === 'pending');
    });

    return () => {
      unsubscribeRequestState();
      unsubscribeLoading();

      const unmountAbortError = createAbortableUnmountError();
      currentAborter.abort(unmountAbortError);

      if (isDisposeEnabledCurrent) {
        disposeFn(currentAborter);
      }
    };
  }, [isDisposeEnabledRef]);

  return { aborter: aborterRef.current, requestState, loading };
};
