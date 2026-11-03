import { z } from "zod";

export const verifiedLandlordSchema = z
  .object({
    // Use .transform to automatically convert "true"/"false" strings to booleans
    Verified: z.enum(["true", "false"]).transform((val) => val === "true"),
  })
  .strict();
