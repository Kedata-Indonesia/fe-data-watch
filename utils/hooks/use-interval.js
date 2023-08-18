import { useEffect, useRef } from 'react';

/**
 * @param {(state: number, ref: MutableRefObject<any>) => {}} callback
 * @param {object} options
 * @param {number} options.delay
 * @param {number} options.startAt
 * @param {'increment' | 'decrement'} options.stateType
 * @returns {MutableRefObject<any>}
 */
const useInterval = (callback, { delay = 1000, startAt = null, stateType = 'increment' }) => {
  const callbackRef = useRef(callback);
  const intervalState = useRef(startAt || 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (startAt !== null) {
      intervalState.current = startAt;
    }
  }, [startAt]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (delay === null || typeof delay !== 'number') return;

    console.log('>>> START INTERVAL <<<');

    intervalRef.current = setInterval(() => {
      callbackRef.current(intervalState.current, intervalRef.current);

      stateType === 'decrement' ? intervalState.current-- : intervalState.current++;
    }, delay);

    return () => clearInterval(intervalRef.current);
  }, [delay, stateType]);

  return intervalRef;
};

export default useInterval;
