import { CircleHelp, Info, Timer } from "lucide-react";

import {
  DEFAULT_NUMBER_OF_ANSWER_OPTION,
  NUMBER_OF_ANSWER_OPTIONS,
} from "@/constants/omr-options";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  omrOptionFormSchema,
  type OmrOptionFormSchema,
} from "../types/omr-option-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEY } from "@/constants/storage-key";

export function OmrOptionForm() {
  const storageOptions = window.localStorage.getItem(
    LOCAL_STORAGE_KEY.DEFAULT_OPTIONS,
  );
  const defaultOptions: Omit<OmrOptionFormSchema, "saveAsDefault"> =
    storageOptions
      ? JSON.parse(storageOptions)
      : {
          timeLimit: 60,
          numberOfQuestions: 40,
          numberOfAnswers: 5,
        };

  const { register, handleSubmit } = useForm<OmrOptionFormSchema>({
    resolver: zodResolver(omrOptionFormSchema),
    defaultValues: {
      ...defaultOptions,
      saveAsDefault: false,
    },
  });

  const submitForm: SubmitHandler<OmrOptionFormSchema> = ({
    saveAsDefault,
    timeLimit,
    numberOfAnswers,
    numberOfQuestions,
  }) => {
    if (saveAsDefault) {
      const options = JSON.stringify({
        timeLimit,
        numberOfAnswers,
        numberOfQuestions,
      });
      window.localStorage.setItem(LOCAL_STORAGE_KEY.DEFAULT_OPTIONS, options);
    }

    toast.success("Testing has begun! Good luck 🍀");
  };

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(submitForm)}
    >
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Time Limit (Minutes)</legend>
        <label className="input validator w-full">
          <Timer className="size-4 opacity-50" />
          <input
            {...register("timeLimit", { valueAsNumber: true })}
            type="number"
            required
            placeholder="Type minutes"
            min="1"
            max="720"
            title="Must be between be 1 to 720"
          />
        </label>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Number of Questions</legend>
        <label className="input validator w-full">
          <CircleHelp className="size-4 opacity-50" />
          <input
            {...register("numberOfQuestions", { valueAsNumber: true })}
            type="number"
            required
            placeholder="Type a number between 1 to 100"
            min="1"
            max="100"
            title="Must be between be 1 to 100"
          />
        </label>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Number of Answers</legend>

        <select
          {...register("numberOfAnswers", { valueAsNumber: true })}
          defaultValue={DEFAULT_NUMBER_OF_ANSWER_OPTION.value}
          className="select w-full"
        >
          <option disabled>Choose number of answer options</option>
          {NUMBER_OF_ANSWER_OPTIONS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </fieldset>

      <button type="submit" className="btn btn-md mt-2">
        Start
      </button>

      <label className="label mt-3 gap-2 text-sm">
        <input
          {...register("saveAsDefault")}
          type="checkbox"
          className="checkbox checkbox-xs"
        />
        Save as default
        <div
          className="tooltip"
          data-tip="Enable this to make this selection the default for future use."
        >
          <Info className="size-4" />
        </div>
      </label>
    </form>
  );
}
