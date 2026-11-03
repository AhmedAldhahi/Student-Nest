import { z } from "zod";

export const resendOtpSchema = z
  .object({
    email: z.email(),
  })
  .strict();

export const VerifiedOTpSchema = z.object({
  otpCode: z.string(),
  email: z.email(),
}).strict();


