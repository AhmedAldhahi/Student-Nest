import { z } from "zod";
import { VerifiedLandlordStatus } from "../../../../Domain/Shared/Enum/VerfiedLandlordStatus.enum";

export const UpdatePaymentStatus = z
  .object({
    status: z.enum(VerifiedLandlordStatus),
  })
  .strict();
