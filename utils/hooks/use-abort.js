import { useCallback, useRef, MutableRefObject, useEffect } from 'react';

/**
 * @typedef UseAbortController
 * @property {() => void} abort
 * @property {() => void} invoke
 */

/**
 * @returns {[() => AbortSignal, UseAbortController]}
 */
const useAbort = () => {
  /**
   * @type {MutableRefObject<AbortController|null>}
   */
  const signalRef = useRef();

  /**
   * @description call `abort()`
   */
  const abort = useCallback(() => {
    signalRef.current?.abort();
  }, []);

  /**
   * @description create new instance
   */
  const invoke = useCallback(() => {
    signalRef.current = new AbortController();
  }, []);

  const getSignal = useCallback(() => {
    return signalRef.current?.signal;
  }, []);

  useEffect(() => {
    signalRef.current = new AbortController();
  }, []);

  return [getSignal, { abort, invoke }];
};

export default useAbort;
