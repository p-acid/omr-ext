import { type CSSProperties } from "react";

import type { Time } from "@/types/time";

type TimerProps = Time;

export function Timer({ hours, minutes, seconds }: TimerProps) {
  return (
    <span className="countdown font-mono text-xl">
      <span style={{ "--value": hours } as CSSProperties} aria-live="polite" />
      :
      <span
        style={{ "--value": minutes } as CSSProperties}
        aria-live="polite"
      />
      :
      <span
        style={{ "--value": seconds } as CSSProperties}
        aria-live="polite"
      />
    </span>
  );
}
