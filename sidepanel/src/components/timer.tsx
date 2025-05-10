import { useEffect, useState, type CSSProperties } from "react";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface TimerProps {
  initialTime: Partial<Time>;
}

export function Timer({ initialTime }: TimerProps) {
  const [counter, setCounter] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ...initialTime,
  });

  useEffect(() => {
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

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="countdown font-mono text-xl">
      <span
        style={{ "--value": counter.hours } as CSSProperties}
        aria-live="polite"
      />
      :
      <span
        style={{ "--value": counter.minutes } as CSSProperties}
        aria-live="polite"
      />
      :
      <span
        style={{ "--value": counter.seconds } as CSSProperties}
        aria-live="polite"
      />
    </span>
  );
}
