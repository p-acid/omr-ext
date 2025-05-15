import { Timer } from "@/components/timer";
import useTimer from "@/hooks/use-timer";
import type { Time } from "@/types/time";
import { Pause, Play, RotateCw, TimerIcon } from "lucide-react";

interface OmrTimerProps {
  initialTime: Partial<Time>;
}

export function OmrTimer({ initialTime }: OmrTimerProps) {
  const { counter, startCounter, stopCounter, resetCounter } = useTimer({
    initialTime,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2">
          <TimerIcon className="size-5" />
          <Timer {...counter} />
        </div>
      </div>

      <div className="join rounded-lg">
        <button className="btn btn-square btn-ghost" onClick={stopCounter}>
          <Pause className="size-5" />
        </button>
        <button className="btn btn-square btn-ghost" onClick={startCounter}>
          <Play className="size-5" />
        </button>
        <button className="btn btn-square btn-ghost" onClick={resetCounter}>
          <RotateCw className="size-5" />
        </button>
      </div>
    </div>
  );
}
