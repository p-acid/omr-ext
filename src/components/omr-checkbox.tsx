import type { InputHTMLAttributes } from "react";

interface OmrAnswerProps extends InputHTMLAttributes<HTMLInputElement> {
  answerNumber: number;
}

export function OmrAnswer({ answerNumber, ...props }: OmrAnswerProps) {
  return (
    <label className="cursor-pointer">
      <input type="radio" className="peer hidden" {...props} />
      <div className="flex h-5 w-3 items-center justify-center rounded-full border-1 border-zinc-400 text-xs font-medium text-zinc-400 transition-colors duration-150 peer-checked:border-zinc-400 peer-checked:bg-zinc-400 peer-checked:text-zinc-400">
        {answerNumber}
      </div>
    </label>
  );
}
