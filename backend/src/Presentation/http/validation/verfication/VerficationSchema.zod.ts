import { z } from "zod";

export const resendOtpSchema = z
  .object({
    email: z.email(),
  })
  .strict();
