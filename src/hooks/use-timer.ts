import { useCallback, useEffect, useRef, useState } from "react";

import type { Time } from "@/types/time";

interface UseTimerParams {
  initialTime: Partial<Time>;
}

const useTimer = ({ initialTime }: UseTimerParams) => {
  const initialCounter = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ...initialTime,
  };

  const [counter, setCounter] = useState<Time>(initialCounter);
  const intervalId = useRef<ReturnType<typeof setInterval>>(null);

  const startCounter = useCallback(() => {
    if (intervalId.current !== null) {
      return;
    }

    const interval = setInterval(() => {
      setCounter((prev) => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          return prev;
        }

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);
    intervalId.current = interval;
    return interval;
  }, []);

  const stopCounter = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const resetCounter = () => {
    setCounter(initialCounter);
  };

  useEffect(() => {
    startCounter();
    return () => stopCounter();
  }, [startCounter, stopCounter]);

  return { counter, startCounter, stopCounter, resetCounter };
};

export default useTimer;
