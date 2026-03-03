import { useRef, useEffect, useState } from 'react';
import { Aborter } from 'saborter';
import { AbortError } from 'saborter/errors';
import { RequestState } from 'saborter/types';
import { dispose as disposeFn } from 'saborter/lib';
import * as Shared from '../../shared';
import * as Constants from './use-aborter.constants';
import * as Types from './use-aborter.types';

export const useAborter = (props: Types.UseAborterProps = {}): Types.UseAborterResult => {
  const { onAbort, onStateChange, dispose = true } = props;

  const aborterRef = useRef(new Aborter({ onAbort: onAbort as any, onStateChange }));
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  const isDisposeEnabledRef = Shared.Hooks.useMutableRef(dispose);

  useEffect(() => {
    const currentAborter = aborterRef.current;
    const isDisposeEnabledCurrent = isDisposeEnabledRef.current;

    const unsubscribe = currentAborter.listeners.state.subscribe(setRequestState);

    return () => {
      unsubscribe();
      currentAborter.abort(
        new AbortError(Constants.ABORTED_SIGNAL_WITHOUT_MESSAGE, {
          type: 'aborted',
          initiator: Constants.ABORTABLE_UNMOUNTED_INITIATOR
        })
      );
      if (isDisposeEnabledCurrent) {
        disposeFn(currentAborter);
      }
    };
  }, [isDisposeEnabledRef]);

  return { aborter: aborterRef.current, requestState };
};
