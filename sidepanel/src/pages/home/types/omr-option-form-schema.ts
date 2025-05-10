import { omrOptionsSchema } from "@/types/omr-options";
import { z } from "zod";

export const omrOptionFormSchema = z
  .object({
    saveAsDefault: z.boolean(),
  })
  .merge(omrOptionsSchema);

export type OmrOptionFormSchema = z.infer<typeof omrOptionFormSchema>;
