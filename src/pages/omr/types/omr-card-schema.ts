import { z } from "zod";

export const omrCardSchema = z.object({
  questionAnswers: z.array(z.array(z.number())),
});

export type OmrCardSchema = z.infer<typeof omrCardSchema>;
