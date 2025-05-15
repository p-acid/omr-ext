import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";

import { Timer } from "@/components/timer";
import { PAGE_ROUTES } from "@/constants/page-routes";
import { SESSION_STORAGE_KEY } from "@/constants/storage-key";
import type { OmrOptionsSchema } from "@/types/omr-options";
import { OmrCard } from "./ui/omr-card";
import { TimerIcon } from "lucide-react";

export function Omr() {
  const sessionOptions = window.sessionStorage.getItem(
    SESSION_STORAGE_KEY.OMR_OPTIONS,
  );

  if (!sessionOptions) {
    redirect({ to: PAGE_ROUTES.HOME });
    toast.error("You need to set OMR options.");
  }

  const omrOptions: OmrOptionsSchema = JSON.parse(sessionOptions as string);

  const initialTime = {
    hours: Math.floor(omrOptions.timeLimit / 60),
    minutes: omrOptions.timeLimit % 60,
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center gap-8 px-6 py-9">
      <div className="flex items-center gap-2">
        <TimerIcon className="size-5" />
        <Timer initialTime={initialTime} />
      </div>
      <OmrCard
        numberOfQuestions={omrOptions.numberOfQuestions}
        numberOfAnswers={omrOptions.numberOfAnswers}
        numberOfQuestionCategories={omrOptions.numberOfQuestionCategories}
      />
    </main>
  );
}
