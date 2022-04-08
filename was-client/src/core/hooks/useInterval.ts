import { useEffect, useRef } from 'react';

type callbackType = (...args: any[]) => void;

export function useInterval(callback: callbackType, delay: number) {
  const savedCallback = useRef<callbackType>(undefined!);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current();
    const timer = setInterval(tick, delay);
    return () => clearInterval(timer);
  }, [delay]);
}