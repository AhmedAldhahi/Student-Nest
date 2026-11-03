import { z } from "zod";
import { UserAccountStatus } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserAccountStatus.enum";

export const verificationUserStatusSchema = z
  .object({
    status: z.enum(UserAccountStatus),
  })
  .strict();
