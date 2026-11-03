import { z } from "zod";
import { VerifiedLandlordStatus } from "../../../../Domain/BoundedContexts/Payment/Enum/VerfiedLandlordStatus.enum";

export const UpdatePaymentStatus = z
  .object({
    status: z.enum(VerifiedLandlordStatus),
  })
  .strict();
