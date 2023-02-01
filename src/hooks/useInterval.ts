import { useEffect, useRef } from 'react';

type IntervalFunction = () => unknown | void;

export default function useInterval(
  callback: IntervalFunction,
  delay: number | null,
) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
