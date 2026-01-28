import { Aborter, OnAbortCallback, OnStateChangeCallback, RequestState, AbortInitiator as Initiator } from 'saborter';
import { ABORTABLE_UNMOUNTED_INITIATOR } from './use-aborter.constants';

export interface UseAborterResult {
  aborter: Aborter;
  requestState: RequestState | null;
}

export interface UseAborterProps {
  onAbort?: OnAbortCallback;
  onStateChange?: OnStateChangeCallback;
  isDisposeEnabled?: boolean;
}

export type AbortInitiator = Initiator | typeof ABORTABLE_UNMOUNTED_INITIATOR;
