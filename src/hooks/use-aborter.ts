import { useRef, useEffect, useState } from 'react';
import { Aborter, RequestState } from 'saborter';

interface UseAborterResult {
  aborter: Aborter;
  requestState: RequestState | null;
  isLoading: boolean;
}

export const useAborter = (): UseAborterResult => {
  const aborterRef = useRef(new Aborter());
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentAborter = aborterRef.current;

    const unsubscribe = currentAborter.listeners.state.subscribe((state) => {
      setRequestState(state);

      if (state === 'cancelled') {
        return;
      }

      setIsLoading(state === 'pending');
    });

    return () => {
      unsubscribe();
      currentAborter.abort();
      currentAborter.dispose();
    };
  }, []);

  return { aborter: aborterRef.current, requestState, isLoading };
};
