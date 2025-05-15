import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormSetValue,
} from "react-hook-form";
import { omrCardSchema, type OmrCardSchema } from "../types/omr-card-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { chunkArray } from "@/utils/chunk-array";

interface OmrCardProps {
  numberOfQuestions: number;
  numberOfAnswers: number;
  numberOfQuestionCategories: number;
}

export function OmrCard({
  numberOfAnswers,
  numberOfQuestions,
  numberOfQuestionCategories,
}: OmrCardProps) {
  const initialQuestions = Array.from({ length: numberOfQuestions }).map(
    () => 0,
  );

  const categorizedQuestions = chunkArray(
    initialQuestions,
    numberOfQuestionCategories,
  );

  const { setValue, handleSubmit } = useForm<OmrCardSchema>({
    defaultValues: { questionAnswers: categorizedQuestions },
    resolver: zodResolver(omrCardSchema),
  });

  const submitOmrCard: SubmitHandler<OmrCardSchema> = ({ questionAnswers }) => {
    const copyText = questionAnswers
      .map((answers, categoryIndex) =>
        answers
          .map((answer, answerIndex) => {
            const answerNumber =
              categoryIndex * numberOfQuestionCategories + (answerIndex + 1);
            return `${answerNumber}. ${answer}`;
          })
          .join(", "),
      )
      .join("\n");

    navigator.clipboard.writeText(copyText);
    toast.success("Coppied!");
  };

  const handleError: SubmitErrorHandler<OmrCardSchema> = () => {
    toast.error("Somethings worng, refresh browser please.");
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(submitOmrCard, handleError)}
    >
      {categorizedQuestions.map((questions, categoryIndex) => (
        <div
          key={categoryIndex}
          className="border-neutral-content flex flex-col gap-1 border p-1"
        >
          {questions.map((_value, questionIndex) => (
            <Question
              key={questionIndex}
              categoryIndex={categoryIndex}
              questionIndex={questionIndex}
              numberOfAnswers={numberOfAnswers}
              numberOfQuestionCategories={numberOfQuestionCategories}
              setValue={setValue}
            />
          ))}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Copy Answers
      </button>
    </form>
  );
}

interface QuestionProps
  extends Pick<OmrCardProps, "numberOfAnswers" | "numberOfQuestionCategories"> {
  categoryIndex: number;
  questionIndex: number;
  setValue: UseFormSetValue<OmrCardSchema>;
}

function Question({
  categoryIndex,
  questionIndex,
  numberOfAnswers = 0,
  numberOfQuestionCategories,
  setValue,
}: QuestionProps) {
  const questionNumber =
    categoryIndex * numberOfQuestionCategories + (questionIndex + 1);
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
                    `questionAnswers.${categoryIndex}.${questionIndex}`,
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
