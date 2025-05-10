import { z } from "zod";

export const omrOptionFormSchema = z.object({
  timeLimit: z.number().min(1, "Type time limit for test"),
  numberOfQuestions: z.number().min(1, "Type number of questions for test"),
  numberOfAnswers: z.number(),
  saveAsDefault: z.boolean(),
});

export type OmrOptionFormSchema = z.infer<typeof omrOptionFormSchema>;
