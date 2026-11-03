import { z } from "zod";
import { hasSequentialNumbers } from "../../../../Shared/utils/zodValidationMethod.util";


export const ForgetPasswordSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .refine(
      (val) => !hasSequentialNumbers(val),
      "Password cannot contain sequential numbers like 123 or 987"
    ),
});
