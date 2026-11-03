import { z } from "zod";

export const apartmentVerifiedZod = z
  .object({
    Verified: z.boolean(),
  })
  .strict();
