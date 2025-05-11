import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormSetValue,
} from "react-hook-form";
import { omrCardSchema, type OmrCardSchema } from "../types/omr-card-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface OmrCardProps {
  numberOfQuestions: number;
  numberOfAnswers: number;
}

export function OmrCard({ numberOfAnswers, numberOfQuestions }: OmrCardProps) {
  const initialQuestions = Array.from({ length: numberOfQuestions }).map(
    () => 0,
  );

  const { setValue, handleSubmit } = useForm<OmrCardSchema>({
    defaultValues: { questionAnswers: initialQuestions },
    resolver: zodResolver(omrCardSchema),
  });

  const submitOmrCard: SubmitHandler<OmrCardSchema> = ({ questionAnswers }) => {
    const answerSet = new Set(questionAnswers);

    if (answerSet.has(0)) {
      toast.error("You need to check answers.");
      return;
    }

    const copyText = questionAnswers
      .map((answer, index) => `${index + 1}-${answer}\n`)
      .join("");

    navigator.clipboard.writeText(copyText);
    toast.success("Coppied!");
  };

  const handleError: SubmitErrorHandler<OmrCardSchema> = () => {
    toast.error("Somethings worng, refresh browser please.");
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitOmrCard, handleError)}
    >
      <div className="border-neutral-content flex flex-col gap-1 border p-1">
        {initialQuestions.map((_value, index) => (
          <Question
            key={index}
            questionNumber={index + 1}
            numberOfAnswers={numberOfAnswers}
            setValue={setValue}
          />
        ))}
      </div>
      <button type="submit" className="btn btn-primary">
        Copy Answers
      </button>
    </form>
  );
}

interface QuestionProps extends Pick<OmrCardProps, "numberOfAnswers"> {
  questionNumber: number;
  setValue: UseFormSetValue<OmrCardSchema>;
}

function Question({
  questionNumber,
  numberOfAnswers = 0,
  setValue,
}: QuestionProps) {
  return (
    <div className="border-neutral-content flex items-center border">
      <span className="text-neutral-content border-neutral-content flex h-[30px] w-7 items-center justify-center border-r text-xs tracking-tighter">
        {questionNumber}
      </span>
      <div className="flex">
        {Array.from({ length: numberOfAnswers }).map((_value, index) => {
          const answerNumber = index + 1;
          return (
            <div
              key={`${questionNumber}-${answerNumber}`}
              className="border-neutral-content relative flex border-r p-1.5 last-of-type:border-r-0"
            >
              <input
                name={`question-${questionNumber}`}
                type="radio"
                value={answerNumber}
                className="radio radio-sm"
                onChange={() => {
                  setValue(
                    `questionAnswers.${questionNumber - 1}`,
                    answerNumber,
                  );
                }}
              />
              <span className="absolute top-[50%] left-[50%] -z-10 -translate-x-[50%] -translate-y-[50%] transform text-xs text-neutral-500">
                {answerNumber}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
