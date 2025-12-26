import { z } from "zod";

export const DeleteBatchSchema = z
  .object({
    ids: z.array(
      z
        .number("invalid type error: ID must be numbers ")
        .min(1, "at lease on notification id is require !!")
    ),
  })
  .strict();
