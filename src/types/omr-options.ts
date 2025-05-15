import { z } from "zod";

export const omrOptionsSchema = z.object({
  timeLimit: z.number().min(1, "Type time limit for test"),
  numberOfQuestions: z.number().min(1, "Type number of questions for test"),
  numberOfAnswers: z.number(),
});

export type OmrOptionsSchema = z.infer<typeof omrOptionsSchema>;
