interface OmrCardProps {
  numberAsQuestions: number;
  numberAsAnswers: number;
}

export function OmrCard({ numberAsAnswers, numberAsQuestions }: OmrCardProps) {
  return (
    <div className="border-neutral-content flex flex-col gap-1 border p-1">
      {Array.from({ length: numberAsQuestions }).map((_value, index) => (
        <Question
          questionNumber={index + 1}
          numberAsAnswers={numberAsAnswers}
        />
      ))}
    </div>
  );
}

interface QuestionProps extends Pick<OmrCardProps, "numberAsAnswers"> {
  questionNumber: number;
}

function Question({ questionNumber, numberAsAnswers = 0 }: QuestionProps) {
  return (
    <div className="border-neutral-content flex items-center border">
      <span className="text-neutral-content border-neutral-content flex h-[30px] w-7 items-center justify-center border-r text-xs tracking-tighter">
        {questionNumber}
      </span>
      <div className="flex">
        {Array.from({ length: numberAsAnswers }).map((_value, index) => (
          <div
            key={`${questionNumber}-${index}`}
            className="border-neutral-content flex border-r p-1.5 last-of-type:border-r-0"
          >
            <input
              name={`question-${questionNumber}`}
              type="radio"
              className="radio radio-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
