import { z } from "zod";

import { hasSequentialNumbers } from "../../../../Shared/utils/zodValidationMethod.util";
import { UserRole } from "../../../../Core/enum/UserRole.enum";
import { roleEnum } from "../../../../Shared/constants/validationZod.constant";

const basedUserSchema = z.object({
  email: z.email(),
  name: z
    .string()
    .min(3, "student name is too short")
    .max(30, "student name is too long")
    .trim(),
  phoneNumber: z.string(),
  dateOfBirth: z.string().trim().length(4, "invalid date of birth !!"),
  role: UserRole,
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

export const RegisterStudetSchema = basedUserSchema
  .extend({
    gradateYear: z.string().trim().length(4, "invalid graduate year formate"),
    studentCardId: z.string(),
    universityName: z.string(),
    studentGovId: z.string(),
    role: z.literal("student"),
    major: z.string(),
    address: z.string().optional(),
    verificationFiles: z.any(),
  })
  .strict();

export const RegisterLandloardSchema = basedUserSchema
  .extend({
    cliQAccount: z.string(),
    LandloardGovId: z.string(),
    role: z.literal("landloard"),
    address: z.string().optional(),
    document: z.any(),
  })
  .strict();
