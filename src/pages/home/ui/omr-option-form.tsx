import { Hash, Info, Timer } from "lucide-react";

import {
  DEFAULT_NUMBER_OF_ANSWER_OPTION,
  NUMBER_OF_ANSWER_OPTIONS,
} from "@/constants/omr-options";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import {
  omrOptionFormSchema,
  type OmrOptionFormSchema,
} from "../types/omr-option-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  LOCAL_STORAGE_KEY,
  SESSION_STORAGE_KEY,
} from "@/constants/storage-key";
import { useNavigate } from "@tanstack/react-router";
import { PAGE_ROUTES } from "@/constants/page-routes";
import type { OmrOptionsSchema } from "@/types/omr-options";

export function OmrOptionForm() {
  const storageOptions = window.localStorage.getItem(
    LOCAL_STORAGE_KEY.DEFAULT_OPTIONS,
  );
  const defaultOptions: OmrOptionsSchema = storageOptions
    ? JSON.parse(storageOptions)
    : {
        timeLimit: 60,
        numberOfQuestions: 40,
        numberOfAnswers: 5,
        numberOfQuestionCategories: 0,
      };

  const navigate = useNavigate();

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
    numberOfQuestionCategories,
  }) => {
    const options = JSON.stringify({
      timeLimit,
      numberOfAnswers,
      numberOfQuestions,
      numberOfQuestionCategories,
    });

    if (saveAsDefault) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY.DEFAULT_OPTIONS, options);
    }

    window.sessionStorage.setItem(SESSION_STORAGE_KEY.OMR_OPTIONS, options);
    navigate({ to: PAGE_ROUTES.OMR });
    toast.success("Testing has begun! Good luck 🍀");
  };

  const handleSubmitError: SubmitErrorHandler<OmrOptionFormSchema> = (
    error,
  ) => {
    const errorText = Object.values(error)[0]?.message;

    if (errorText) {
      toast.error(errorText);
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(submitForm, handleSubmitError)}
    >
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Time Limit (Minutes)</legend>
        <label className="input w-full">
          <Timer className="size-4 opacity-50" />
          <input
            {...register("timeLimit", { valueAsNumber: true })}
            type="number"
            placeholder="Type minutes"
            min="1"
            max="720"
            title="Must be between be 1 to 720"
          />
        </label>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Number of Questions</legend>
        <label className="input w-full">
          <Hash className="size-4 opacity-50" />
          <input
            {...register("numberOfQuestions", { valueAsNumber: true })}
            type="number"
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

      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Number of Questions per Category
        </legend>
        <label className="input w-full">
          <Hash className="size-4 opacity-50" />
          <input
            {...register("numberOfQuestionCategories", { valueAsNumber: true })}
            type="number"
            placeholder="If 0 is entered, categories are not distinguished"
          />
        </label>
      </fieldset>

      <button type="submit" className="btn btn-primary btn-md mt-2">
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
