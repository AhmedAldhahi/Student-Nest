import { z } from "zod";
import { graduationYearSchema } from "../../../Shared/utils/zodValidationMethod.util";
import { DateOfBirth } from "../../../Shared/utils/zodValidationMethod.util";
import { hasSequentialNumbers } from "../../../Shared/utils/zodValidationMethod.util";
import { UserRole } from "../../../Core/enum/UserRole.enum";
import { roleEnum } from "../../../Shared/constants/validationZod.constant";

const basedUserSchema = z.object({
  email: z.email(),
  name: z
    .string()
    .min(3, "studet name is too short")
    .max(30, "student name is too long")
    .trim(),
  phoneNumber: z.string(),
  dateOfBirth: DateOfBirth,
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
    graduatYear: graduationYearSchema,
    studentCardId: z.string(),
    unversityName: z.string(),
    studentGovId:z.string(),
    role: roleEnum.default("student"),
    major: z.string(),
    address: z.string().optional(),
  })
  .strict();
