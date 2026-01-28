import { useRef, useEffect, useState } from 'react';
import { Aborter, RequestState, OnAbortCallback, OnStateChangeCallback } from 'saborter';

interface UseAborterResult {
  aborter: Aborter;
  requestState: RequestState | null;
}

interface UseAborterProps {
  onAbort?: OnAbortCallback;
  onStateChange?: OnStateChangeCallback;
}

export const useAborter = (props: UseAborterProps = {}): UseAborterResult => {
  const aborterRef = useRef(new Aborter(props));
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  useEffect(() => {
    const currentAborter = aborterRef.current;

    const unsubscribe = currentAborter.listeners.state.subscribe(setRequestState);

    return () => {
      unsubscribe();
      currentAborter.abort();
      currentAborter.dispose();
    };
  }, []);

  return { aborter: aborterRef.current, requestState };
};
