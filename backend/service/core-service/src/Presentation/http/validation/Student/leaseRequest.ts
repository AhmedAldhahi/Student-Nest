import { z } from "zod";

export const CreateLeaseRequestSchema = z
  .object({
    requestMessage: z.string(),
    startDate: z.string(),
    rentTerm: z.string(),
  })
  .strict();
